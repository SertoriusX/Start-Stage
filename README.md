
---

### How it looks in markdown:

# Start-Stage

```bash
mkdir flask_app && cd flask_app
python -m venv venv
venv\Scripts\activate

pip install Flask Flask-WTF Flask-Login Flask-SQLAlchemy Flask-Migrate Pillow flask-cors flask_bcrypt flask_jwt_extended

flask --app core:create_app db init
flask --app core:create_app db migrate -m "Initial migration"
flask --app core:create_app db upgrade
