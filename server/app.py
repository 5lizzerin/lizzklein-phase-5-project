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
    
class CombinationsByUser(Resource):
    def get(self, id):
        combinations = [combination.to_dict() for combination in Combination.query.filter_by(user_id=id)]
        if not combinations:
            make_response({"error" : "no combinations"}, 404)
        else:
            return make_response(combinations, 200)
    def post(self, id):
        data = request.get_json()
        combination = Combination(name=data["name"], image=data["image"], user_id=int(data["user_id"]))
        db.session.add(combination)
        db.session.commit()
        return make_response({"Combination": combination.to_dict()}, 201 )
api.add_resource(CombinationsByUser, "/api/v1/users/<id>/allcombinations")

class Combinations(Resource):
    def get(self):
        combinations = [combination.to_dict() for combination in Combination.query.all()]
        if not combinations:
            return make_response({"Error": "No combinations found."}, 404)
        else:
            return make_response(combinations, 200)
    def post(self):
        data = request.get_json()
        combination = Combination(name=data["name"], image=data["image"], user_id=int(data["user_id"]))
        db.session.add(combination)
        db.session.commit()
        return make_response({"Combination": combination.to_dict()}, 201 )
api.add_resource(Combinations, "/api/v1/allcombinations")

class CombinationById(Resource):
    def get(self, id):
        combination = Combination.query.get(id)
        if not combination:
            return make_response({"Error": "No combination found with that id."}, 404)
        else:
            return make_response(combination.to_dict(), 200)

    def patch(self, id):
        combination = Combination.query.get(id)
        if not combination:
            return make_response({"Error": "No combination found with that id"}, 404)
        data = request.json
        for attr in data:
            setattr(combination, attr, data[attr])
        db.session.commit()
        return make_response(combination.to_dict(), 200)
    
    def delete(self, id):
        combination = Combination.query.get(id)
        if not combination:
            return make_response({"Error" : "No combination found with that id."}, 404)
        db.session.delete(combination)
        db.session.commit()
        return make_response("", 204)
api.add_resource(CombinationById, "/api/v1/allcombinations/<id>")

class Moves(Resource):
    def get(self):
        moves = [move.to_dict() for move in Move.query.all()]
        if not moves:
            return make_response({"Error": "no moves found"}, 404)
        else:
            return make_response(moves, 200)
api.add_resource(Moves, "/api/v1/allmoves")

class MovesById(Resource):
    def get(self, id):
        move_id = Move.query.get(id)
        if not move_id:
            make_response({"Error": "no move found with that id"}, 404)
        else:
            return make_response(move_id.to_dict(), 200)
api.add_resource(MovesById, "/api/v1/allmoves/<id>")


class CombinationMoves(Resource):
    def get(self):
        combo_moves = [combo_move.to_dict() for combo_move in Combination_move.query.all()]
        if not combo_moves:
            return make_response({"Error" : "No combo_moves found"}, 404)
        else:
            return make_response(combo_moves, 200)
api.add_resource(CombinationMoves, "/api/v1/allcombinationmoves")

class CombinationMovesByCombinationId(Resource):
    def get(self, id):
        combo_move_id = Combination.query.get(id)
        if not combo_move_id:
            return make_response({"Error": "No combination found with that id."}, 404)
        else:
            return make_response(combo_move_id.to_dict(rules=("-move.image", "-move.description", "-combination.image"),), 200)
api.add_resource(CombinationMovesByCombinationId, "/api/v1/allcombinationmoves/<id>")


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)