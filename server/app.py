#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Combination, Move, Combination_move


class Users(Resource):
    def post(self):
        data = request.get_json()
        user = User(username = data["username"].lower(), email = data["email"].lower(), password_hash=data["password"])
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return make_response({"user": user.to_dict()}, 201)
api.add_resource(Users, "/api/v1/users")

@app.route("/api/v1/authorized")
def authorized():
    try:
        user = User.query.filter_by(id=session.get('user_id')).first()
        return make_response(user.to_dict(), 200)
    except:
        return make_response({"error": "User not found"}, 404)
    

@app.route("/api/v1/logout", methods=['DELETE'])
def logout():
    session['user_id'] = None
    return make_response('', 204)


@app.route("/api/v1/login", methods=["POST"])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(username=data['username'].lower()).first()
        
        print(user)
        if user.authenticate(data['password']):
            session['user_id'] = user.id
            return make_response({'user': user.to_dict()}, 200)
        else:
            return make_response({"error": "password incorrect"}, 401)
    except:
        return make_response({'error': 'username incorrect'}, 401)

class Combinations(Resource):
    def get(self):
        combinations = [combination.to_dict() for combination in Combination.query.all()]
        if not combinations:
            return make_response({"Error": "No combinations found."}, 404)
        else:
            return make_response(combinations, 200)
api.add_resource(Combinations, "/api/v1/allcombinations")

class CombinationById(Resource):
    def get(self, id):
        combination = Combination.query.get(id)
        if not combination:
            return make_response({"Error": "no combinations by that id"}, 404)
        else:
            return make_response(combination.to_dict(), 200)

    def patch(self, id):
        combination = Combination.query.get(id)
        if not combination:
            return make_response({"Error": "no scientist found with that id"}, 404)
        data = request.json
        for attr in data:
            setattr(combination, attr, data[attr])
        db.session.commit()
        return make_response(combination.to_dict(), 200)
api.add_resource(CombinationById, "/api/v1/allcombinations/<id>")


class Moves(Resource):
    def get(self):
        moves = [move.to_dict() for move in Move.query.all()]
        if not moves:
            return make_response({"Error": "no moves found"}, 404)
        else:
            return make_response(moves, 200)
api.add_resource(Moves, "/api/v1/allmoves")

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)