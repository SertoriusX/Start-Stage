
---

### How it looks in markdown:

# Start-Stage

```bash
mkdir flask_app && cd flask_app
python -m venv venv
venv\Scripts\activate

pip install Flask Flask-WTF Flask-Login Flask-SQLAlchemy Flask-Migrate Pillow flask-cors flask_bcrypt flask_jwt_extended

flask --app core db init
flask --app core db migrate -m "Initial migration"
flask --app core db upgrade

### How it looks rendered:

# React Setup

```bash
# Create React app (if you haven't yet)
npx create-react-app my-app
cd my-app

# Install dependencies
npm install

# Install axios for HTTP requests
npm install axios

