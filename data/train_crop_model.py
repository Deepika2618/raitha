import pandas as pd
import re
from collections import Counter
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score
from sklearn.pipeline import make_pipeline
import joblib

# -----------------------------
# 1️⃣ Load the dataset
# -----------------------------
print("🔹 Loading dataset...")
df = pd.read_csv(r"C:\Users\bhava\Downloads\crops_dataset_en_kn.csv", encoding="utf-8")


# Choose description + soil + temperature as features (both EN+KN)
text_columns = [col for col in df.columns if any(x in col for x in ["desc_", "soil_", "temperature_", "short_"])]
df["text"] = df[text_columns].astype(str).apply(lambda x: " ".join(x), axis=1)

# Choose label (crop name)
df["label"] = df["name_en"].fillna(df["id"])

print(f"Dataset: {len(df)} entries, {df['label'].nunique()} unique crops")

# -----------------------------
# 2️⃣ Clean text
# -----------------------------
def clean_text(t):
    t = re.sub(r"[^a-zA-Z0-9\s]", " ", str(t))
    return re.sub(r"\s+", " ", t.lower()).strip()

df["text"] = df["text"].apply(clean_text)

# -----------------------------
# 3️⃣ Merge duplicate / similar crop names
# -----------------------------
name_map = {
    "Paddy (Rice)": "Rice",
    "Groundnut (Peanut)": "Groundnut",
    "Cardamom – Black": "Cardamom",
    "Finger Millet (Ragi)": "Ragi",
    "Pearl Millet (Bajra)": "Bajra",
}
df["label"] = df["label"].replace(name_map)

# -----------------------------
# 4️⃣ Filter out rare classes (< 2 samples)
# -----------------------------
# -----------------------------
# 4️⃣ Data balancing / augmentation
# -----------------------------
from random import randint, shuffle

augmented_rows = []
class_counts = Counter(df["label"])

for label, count in class_counts.items():
    if count < 5:  # duplicate rare crops up to ~5 samples each
        subset = df[df["label"] == label]
        for i in range(5 - count):
            row = subset.sample(1).iloc[0].copy()
            # slightly vary text (simple noise to simulate natural variation)
            text = row["text"]
            words = text.split()
            shuffle(words)
            row["text"] = " ".join(words)
            augmented_rows.append(row)

# Combine augmented data
if augmented_rows:
    df = pd.concat([df, pd.DataFrame(augmented_rows)], ignore_index=True)

print(f"✅ After augmentation: {len(df)} samples, {df['label'].nunique()} unique crops")

# -----------------------------
# 5️⃣ Train-test split (stratified)
# -----------------------------
# If very few samples remain, adjust test size automatically
test_size = 0.4 if len(df) < 50 else 0.2

# If very few samples remain, adjust test size automatically
test_size = 0.4 if len(df) < 50 else 0.2

try:
    X_train, X_test, y_train, y_test = train_test_split(
        df["text"], df["label"], test_size=test_size, random_state=42, stratify=df["label"]
    )
except ValueError:
    # fallback: no stratify if too few samples per class
    X_train, X_test, y_train, y_test = train_test_split(
        df["text"], df["label"], test_size=test_size, random_state=42
    )


# -----------------------------
# 6️⃣ TF-IDF + Logistic Regression pipeline
# -----------------------------
model = make_pipeline(
    TfidfVectorizer(ngram_range=(1, 2), max_features=5000, stop_words="english"),
    LogisticRegression(max_iter=2000, class_weight="balanced", C=5)
)

print("🚀 Training model...")
model.fit(X_train, y_train)

# -----------------------------
# 7️⃣ Evaluate
# -----------------------------
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print("\n📊 Model Evaluation:")
print(classification_report(y_test, y_pred, zero_division=0))
print(f"🎯 Accuracy: {acc*100:.2f}%")

# -----------------------------
# 8️⃣ Save model + vectorizer
# -----------------------------
joblib.dump(model, "crop_text_model.pkl")
print("✅ Model saved as crop_text_model.pkl")

# -----------------------------
# 9️⃣ Interactive test
# -----------------------------
while True:
    user_input = input("\nEnter crop description (or 'exit' to quit): ").strip()
    if user_input.lower() == "exit":
        break
    cleaned = clean_text(user_input)
    prediction = model.predict([cleaned])[0]
    print(f"Predicted Crop: 🌾 {prediction}")
