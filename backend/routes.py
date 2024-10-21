from flask import Flask, jsonify, request
from models import db, User, Workout, Group, Goal

app = Flask(__name__)
app.config.from_object('config.Config')
db.init_app(app)

@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    new_user = User(name=data['name'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'id': new_user.id}), 201

@app.route('/login', methods=['POST'])
def login_user():
    data = request.json
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    return jsonify({'id': user.id}) if user else ('', 404)

@app.route('/workouts', methods=['POST'])
def add_workout():
    data = request.json
    new_workout = Workout(user_id=data['user_id'], type=data['type'],
                          duration=data['duration'], calories=data['calories'])
    db.session.add(new_workout)
    db.session.commit()
    return jsonify({'id': new_workout.id}), 201

@app.route('/users/<int:user_id>/workouts', methods=['GET'])
def get_user_workouts(user_id):
    workouts = Workout.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': w.id, 'type': w.type, 'duration': w.duration, 'calories': w.calories} for w in workouts])

@app.route('/groups', methods=['POST'])
def create_group():
    data = request.json
    new_group = Group(name=data['name'], description=data['description'])
    db.session.add(new_group)
    db.session.commit()
    return jsonify({'id': new_group.id}), 201

@app.route('/goals', methods=['POST'])
def add_goal():
    data = request.json
    new_goal = Goal(user_id=data['user_id'], description=data['description'],
                    target=data['target'], frequency=data['frequency'])
    db.session.add(new_goal)
    db.session.commit()
    return jsonify({'id': new_goal.id}), 201

# Add other necessary routes...

if __name__ == '_main_':
    app.run(debug=True)