import os
import json
import re
import base64
import numpy as np
from io import BytesIO
from PIL import Image
from flask import Flask, jsonify, request, render_template, redirect, url_for
import random
import joblib  # ✅ added for ML model

# -------------------- Paths -------------------- #
APP_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(APP_DIR, "templates")
STATIC_DIR = os.path.join(APP_DIR, "static")
DATA_FILE = os.path.join(APP_DIR, "data", "crops.json")
FAV_FILE = os.path.join(APP_DIR, "data", "favorites.json")
MODEL_PATH = os.path.join(APP_DIR, "data", "crop_text_model.pkl")

# -------------------- App Init -------------------- #
app = Flask(__name__, static_folder=STATIC_DIR, template_folder=TEMPLATE_DIR)

# -------------------- Load Crop Prediction Model -------------------- #
model = None
if os.path.exists(MODEL_PATH):
    try:
        model = joblib.load(MODEL_PATH)
        print("✅ Crop prediction model loaded successfully!")
    except Exception as e:
        print("⚠️ Failed to load crop model:", e)
else:
    print("⚠️ crop_text_model.pkl not found, prediction API will be disabled.")

def clean_text(t):
    t = re.sub(r"[^a-zA-Z0-9\s]", " ", str(t))
    return re.sub(r"\s+", " ", t.lower()).strip()

# -------------------- Soil Type → Crops -------------------- #
SOIL_CROPS = {
    "Laterite": ["Tea", "Coffee", "Cashew", "Coconut", "Rubber", "Arecanut","Spices"],
    "Alluvial": ["Rice", "Wheat", "Sugarcane", "Jute", "Maize", "Barley", "Pulses","Fruits", "Vegetables"],
    "Black": ["Cotton", "Soybean", "Sunflower", "Groundnut", "Tobacco", "Millets"],
    "Red": ["Groundnut","Millets","Cotton","Wheat","Pulses","Potato"],  
    "Desert": ["Bajra","Barley","Guar","Mustard","Dates","Castor"],
    "Mountain": ["Maize","Barley","Tea","Walnut","Almond","Pear"]
}



# -------------------- Utility Functions -------------------- #
def load_crops():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def load_favs():
    if not os.path.exists(FAV_FILE):
        with open(FAV_FILE, "w", encoding="utf-8") as f:
            json.dump([], f, ensure_ascii=False, indent=2)
    with open(FAV_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_favs(favs):
    with open(FAV_FILE, "w", encoding="utf-8") as f:
        json.dump(favs, f, ensure_ascii=False, indent=2)

# -------------------- Frontend Routes -------------------- #
@app.route("/")
def index():
    return redirect(url_for('register'))

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/categories")
def categories():
    return render_template("categories.html")

# 🌱 Soil Scan Page
@app.route("/soil-scan")
def soil_scan():
    return render_template("soil_scan.html")

# 🌱 Manual Soil Selection
@app.route('/manual_soil', methods=['POST'])
def manual_soil():
    soil_type = request.form['soil_type']
    lang=request.form['soil_type']   
    if lang=="kn": 
        crops=SOIL_CROPS_KN.get(soil_type,["ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ"])
    else:    
        crops = SOIL_CROPS.get(soil_type, ["No crop data available"])
    return render_template("soil_scan.html", result=soil_type, crops=crops, image_path=None)

# 🌱 Predict Soil via Image Upload
@app.route('/predict_soil', methods=['POST'])
def predict_soil():
    file = request.files['file']
    upload_dir = os.path.join(APP_DIR, "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    filepath = os.path.join(upload_dir, file.filename)
    file.save(filepath)

    # Random fallback (you can integrate ML soil model here later)
    soil_types = list(SOIL_CROPS.keys())
    soil_type = random.choice(soil_types)

    crops = SOIL_CROPS.get(soil_type, ["No crop data available"])
    return render_template("soil_scan.html", result=soil_type, crops=crops, image_path=filepath)

# 🌱 Live Scanner (camera capture)
@app.route("/live_scan", methods=["POST"])
def live_scan():
    data = request.get_json()
    img_data = data["image"]

    # Remove base64 header
    img_data = re.sub('^data:image/.+;base64,', '', img_data)
    img = Image.open(BytesIO(base64.b64decode(img_data))).resize((128, 128))
    img_array = np.array(img) / 255.0

    # Random soil type
    soil_type = random.choice(list(SOIL_CROPS.keys()))
    crops = SOIL_CROPS.get(soil_type, ["No crop data available"])

    return jsonify({"soil_type": soil_type, "crops": crops})

# -------------------- Crop Pages -------------------- #
@app.route("/crop/<crop_id>")
def crop_page(crop_id):
    crops = load_crops()
    crop = next((c for c in crops if c["id"] == crop_id), None)
    if not crop:
        return "Crop not found", 404

    predicted_crop = None
    confidence = None

    # 🌾 Predict from description
    if model and "desc_en" in crop:
        try:
            cleaned = clean_text(crop["desc_en"])
            prediction = model.predict([cleaned])[0]
            proba = model.predict_proba([cleaned])[0]
            # Scale confidence between 50% - 85%
            confidence = round(50 + np.max(proba) * (85 - 50), 2)
            predicted_crop = prediction
        except Exception:
            predicted_crop = None

    return render_template("crop.html", crop=crop, predicted_crop=predicted_crop, confidence=confidence)

@app.route("/<page>")
def render_static_page(page):
    if not page.endswith(".html"):
        page += ".html"
    try:
        return render_template(page)
    except Exception:
        return "Page not found", 404

# -------------------- API Routes -------------------- #
@app.route("/api/crops")
def api_crops():
    q = request.args.get("q", "").strip().lower()
    lang = request.args.get("lang", "en")
    crops = load_crops()

    if q:
        crops = [c for c in crops if q in c["name_en"].lower() 
                 or q in c["name_kn"].lower() 
                 or q in c.get("short_en", "").lower() 
                 or q in c.get("short_kn", "").lower() 
                 or q in c.get("desc_en", "").lower() 
                 or q in c.get("desc_kn", "").lower()]

    out = []
    for c in crops:
        out.append({
            "id": c["id"],
            "name": c["name_en"] if lang == "en" else c["name_kn"],
            "thumb": c.get("thumb", ""),
            "short": c.get("short_en", "") if lang == "en" else c.get("short_kn", "")
        })
    return jsonify(out)

@app.route("/api/crop/<crop_id>")
def api_crop(crop_id):
    crops = load_crops()
    crop = next((c for c in crops if c["id"] == crop_id), None)
    if not crop:
        return jsonify({"error": "not found"}), 404
    return jsonify(crop)

@app.route("/api/favorites", methods=["GET", "POST", "DELETE"])
def api_favorites():
    if request.method == "GET":
        return jsonify(load_favs())

    data = request.get_json() or {}
    favs = load_favs()

    if request.method == "POST":
        crop_id = data.get("id")
        if crop_id and crop_id not in favs:
            favs.append(crop_id)
            save_favs(favs)
        return jsonify(favs)

    if request.method == "DELETE":
        crop_id = data.get("id")
        if crop_id and crop_id in favs:
            favs.remove(crop_id)
            save_favs(favs)
        return jsonify(favs)

# 🌾 ML Prediction API (with confidence 50-85%)
@app.route("/api/predict_crop", methods=["POST"])
def predict_crop():
    if not model:
        return jsonify({"error": "Model not loaded"}), 500

    data = request.get_json() or {}
    description = data.get("description", "").strip()
    if not description:
        return jsonify({"error": "No description provided"}), 400

    cleaned = clean_text(description)
    prediction = model.predict([cleaned])[0]

    proba = model.predict_proba([cleaned])[0]
    # Scale confidence between 50% - 85%
    confidence = round(50 + np.max(proba) * (85 - 50), 2)

    return jsonify({
        "predicted_crop": prediction,
        "confidence": confidence
    })

# -------------------- Run -------------------- #
if __name__ == "__main__":
    #app.run(debug=True)
    app.run(host='0.0.0.0',port=5000)
    
