#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc


# Local imports
from app import app
from models import db, Move, Combination, Combination_move

if __name__ == '__main__':
    with app.app_context():
        print("Deleting data...")
        Move.query.delete()
        Combination.query.delete()
        Combination_move.query.delete()


    # MOVES
        print("Creating Moves...")
        plie = Move(name = "plie", description = "A bending of the knee or knees. This is an exercise to render the joints and muscles soft and pliable and the tendons flexible and elastic, and to develop a sense of balance.", image = "https://www.pbt.org/wp-content/uploads/2016/10/Plie-Releve-Saute-870-opt..jpg")

        releve = Move(name = "releve", description = "A raising of the body on the points or demi-pointes, point or demi-pointe.", image = "https://www.pbt.org/wp-content/uploads/2016/10/Plie-Releve-Saute-870-opt..jpg")

        grand_plie = Move(name = "grand plie", description = "Full bending of the knees. The heels always rise off the ground and are lowered again as the knees straighten.", image = "https://sab.org/wp-content/uploads/2022/04/190507_sab_2596-scaled.jpg")

        port_de_bras = Move(name = "port de bras", description = "A movement or series of movements made by passing the arm or arms through various positions.", image = "https://balletforwomen.com/wp-content/uploads/2021/01/port-de-bras3.jpg")
        moves = [plie, releve, grand_plie, port_de_bras]


    # COMBINATIONS
        print("Creating Combinations...")
        plies1 = Combination(name = "Demi Plies", image = "https://2.bp.blogspot.com/_98gYZjx4gjA/TQcR5pkTgDI/AAAAAAAAAE8/WnYATGIGIXg/s1600/plie.jpg")
        combinations = [plies1]



    # COMBO MOVES
        print("Creating Combination_moves...")
        barre_plies1 = Combination_move(move = plie, combination = plies1, sequence_number = 1)
        barre_plies2 = Combination_move(move = plie, combination = plies1, sequence_number = 2)
        barre_plies3 = Combination_move(move = grand_plie, combination = plies1, sequence_number = 3)
        barre_plies4 = Combination_move(move = port_de_bras, combination = plies1, sequence_number = 4)
        combination_moves = [barre_plies1, barre_plies2, barre_plies3, barre_plies4]

        # barre_plies = []

        # for i in range (1, 6):

        #     barre_plies.append(Combination_move(move = plie, combination = plies1, sequence_number = i))

        # barre_plies[0].move = plie
        # barre_plies[1].move = plie
        # barre_plies[2].move = grand_plie
        # barre_plies[3].move = port_de_bras

        db.session.add_all(moves)
        db.session.add_all(combinations)
        db.session.add_all(combination_moves)
        db.session.commit()

        print("Starting seed...")
        
