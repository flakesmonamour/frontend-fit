from flask import Flask
from models import db
from routes import app as routes_app

def create_app():
    app = Flask(__name__)  # Corrected here
    app.config.from_object('config.Config')
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()  # Create database tables

    # Register routes
    app.register_blueprint(routes_app)

    return app

if __name__ == '__main__':  # Corrected here
    app = create_app() 
    app.run(debug=True)
