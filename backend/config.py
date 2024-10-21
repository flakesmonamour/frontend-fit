import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://postgres:Mark2024@localhost:5432/fitness'
    SQLALCHEMY_TRACK_MODIFICATIONS = False