from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-_password_hash",)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    @property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, plain_text_password):
        byte_object = plain_text_password.encode("utf-8")
        encrypted_password_object = bcrypt.generate_password_hash(byte_object)
        hashed_password_string = encrypted_password_object.decode("utf-8")
        self._password_hash = hashed_password_string
    
    def authenticate(self, password_string):
        byte_object = password_string.encode('utf-8')
        return bcrypt.check_password_hash(self.password_hash, byte_object)


class Move(db.Model, SerializerMixin):
    __tablename__ = "moves"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)
    combination_moves = db.Relationship("Combination_move", back_populates = "move")



class Combination(db.Model, SerializerMixin):
    __tablename__ = "combinations"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    user_id =db.Column(db.Integer, db.ForeignKey("users.id"))

    combination_moves = db.relationship("Combination_move", order_by="Combination_move.sequence_number", back_populates = "combination")



class Combination_move(db.Model, SerializerMixin):
    __tablename__ = "combination_moves"
    serialize_rules = ("-combination.combination_moves", "-move.combination_moves",)

    id = db.Column(db.Integer, primary_key=True)
    move_id = db.Column(db.Integer, db.ForeignKey("moves.id"))
    combination_id = db.Column(db.Integer, db.ForeignKey("combinations.id"))
    sequence_number = db.Column(db.Integer)

    move = db.relationship("Move", back_populates="combination_moves")
    combination = db.relationship("Combination", back_populates="combination_moves")