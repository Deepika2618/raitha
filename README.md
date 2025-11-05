# Raitha Bandhu - Flask (Full v2)

Includes 70+ crops with English and farmer-friendly Kannada content, search, favorites, language toggle, and browser TTS.

## Local Development

Run locally (Windows PowerShell):
```
cd raitha_bandhu_full_v2
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
$env:FLASK_APP = 'app.py'
flask run
```

Linux / macOS:
```
cd raitha_bandhu_full_v2
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export FLASK_APP=app.py
flask run
```

Open http://127.0.0.1:5000 in your browser.

## Deployment to Heroku

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login to Heroku: `heroku login`
3. Create a new Heroku app: `heroku create your-app-name`
4. Initialize git repository: `git init`
5. Add files: `git add .`
6. Commit: `git commit -m "Initial commit"`
7. Push to Heroku: `git push heroku main`
8. Open the app: `heroku open`

Generated on 2025-09-03T13:43:20.226763 UTC
