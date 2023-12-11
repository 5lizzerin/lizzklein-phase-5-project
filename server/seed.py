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
        plie = Move(name = "Plie", description = "A bending of the knee or knees. This is an exercise to render the joints and muscles soft and pliable and the tendons flexible and elastic, and to develop a sense of balance.", image = "https://www.pbt.org/wp-content/uploads/2016/10/Plie-Releve-Saute-870-opt..jpg")

        releve = Move(name = "Releve", description = "A raising of the body on the points or demi-pointes, point or demi-pointe.", image = "https://www.pbt.org/wp-content/uploads/2016/10/Plie-Releve-Saute-870-opt..jpg")

        grand_plie = Move(name = "Grand plie", description = "Full bending of the knees. The heels always rise off the ground and are lowered again as the knees straighten.", image = "https://sab.org/wp-content/uploads/2022/04/190507_sab_2596-scaled.jpg")

        port_de_bras = Move(name = "Port de bras", description = "A movement or series of movements made by passing the arm or arms through various positions.", image = "https://balletforwomen.com/wp-content/uploads/2021/01/port-de-bras3.jpg")

        tendu = Move(name = "Tendu", description = "Involves stretching the leg and foot while keeping the foot on the floor.", image = "https://static.wixstatic.com/media/be2847_434abd726a2f474cafbe4baf053ffd43~mv2_d_5142_3428_s_4_2.jpg/v1/fill/w_1000,h_667,al_c,q_85,usm_0.66_1.00_0.01/be2847_434abd726a2f474cafbe4baf053ffd43~mv2_d_5142_3428_s_4_2.jpg")

        balance = Move(name = "Balance", description = "A quick balance check to ensure the body is properly aligned", image = "https://i.pinimg.com/736x/ec/2f/bb/ec2fbbd33f56c026d1b7079081fb9a38.jpg")

        rond_de_jambe = Move(name = "Rond de jambe", description = "Involves moving one leg away from the body in a straight line, followed by a semi-circular motion", image = "https://i.pinimg.com/564x/1b/10/ad/1b10ad072b3997ec424e7c496e3c2d58.jpg")

        dégagé = Move(name = "Dégagé", description = "A movement where the working leg disengages from the supporting leg.", image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAM7vSFpKrchZqgHN7oFd3WmwvgaqfXkBlUA&usqp=CAU")

        développé = Move(name = "Développé", description = "A smooth, gradual unfolding of the leg.", image = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Santavuori-balettia-kaikille-developpe.png/220px-Santavuori-balettia-kaikille-developpe.png")

        enveloppé = Move(name = "Enveloppé", description = "The action of wrapping around the supporting leg inward from an open position", image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlymK13t7QGMvppFSzGGvPk1PluwI_JYl2dw&usqp=CAU")

        moves = [plie, releve, grand_plie, port_de_bras, tendu, balance, rond_de_jambe, dégagé, développé, enveloppé]


    # COMBINATIONS
        print("Creating Combinations...")
        plies_A = Combination(name = "Demi Plies 1", image = "https://2.bp.blogspot.com/_98gYZjx4gjA/TQcR5pkTgDI/AAAAAAAAAE8/WnYATGIGIXg/s1600/plie.jpg")

        plies_B = Combination(name = "Demi Plies 2", image = "https://mybeginnerpointe.com/wp-content/uploads/2015/02/269233-1.744vaganova_20academy_2_orig.jpg" )

        tendu_A = Combination(name = "Tendus 1", image = "https://i.pinimg.com/564x/30/3f/fe/303ffe5f57fe6c5c2d25e3872e8c8c88.jpg")

        degege_A = Combination(name = "Degeges 1", image = "https://o.quizlet.com/5y7mNq3pa7Gup23K2h1oYw.png")

        combinations = [plies_A, plies_B, tendu_A, degege_A]



    # COMBO MOVES
        print("Creating Combination_moves...")

        barre_plies_A1 = Combination_move(move = plie, combination = plies_A, sequence_number = 1)
        barre_plies_A2 = Combination_move(move = plie, combination = plies_A, sequence_number = 2)
        barre_plies_A3 = Combination_move(move = grand_plie, combination = plies_A, sequence_number = 3)
        barre_plies_A4 = Combination_move(move = port_de_bras, combination = plies_A, sequence_number = 4)

        barre_plies_B1 = Combination_move(move = plie, combination = plies_B, sequence_number = 1)
        barre_plies_B2 = Combination_move(move = plie, combination = plies_B, sequence_number = 2)
        barre_plies_B3 = Combination_move(move = plie, combination = plies_B, sequence_number = 3)
        barre_plies_B4 = Combination_move(move = releve, combination = plies_B, sequence_number = 4)
        barre_plies_B5 = Combination_move(move = grand_plie, combination = plies_B, sequence_number=5)
        barre_plies_B6 = Combination_move(move = balance, combination = plies_B, sequence_number = 6)
        barre_plies_B7 = Combination_move(move = port_de_bras, combination = plies_B, sequence_number = 7)
        barre_plies_B8 = Combination_move(move = releve, combination = plies_B, sequence_number = 8)

        tendu_A1 = Combination_move(move = tendu, combination = tendu_A, sequence_number = 1)
        tendu_A2 = Combination_move(move = plie, combination = tendu_A, sequence_number = 2)
        tendu_A3 = Combination_move(move = tendu, combination = tendu_A, sequence_number = 3)
        tendu_A4 = Combination_move(move = tendu, combination = tendu_A, sequence_number = 4)
        tendu_A5 = Combination_move(move = plie, combination = tendu_A, sequence_number = 5)
        tendu_A6 = Combination_move(move = tendu, combination = tendu_A, sequence_number = 6)
        tendu_A7 = Combination_move(move = rond_de_jambe, combination = tendu_A, sequence_number = 7)
        tendu_A8 = Combination_move(move = tendu, combination = tendu_A, sequence_number = 8)
        tendu_A9 = Combination_move(move = tendu, combination = tendu_A, sequence_number = 9)
        tendu_A10 = Combination_move(move = tendu, combination = tendu_A, sequence_number = 10)
        tendu_A11 = Combination_move(move = tendu, combination = tendu_A, sequence_number = 11)
        tendu_A12 = Combination_move(move = port_de_bras, combination = tendu_A, sequence_number = 12)

        degege_A1 = Combination_move(move = dégagé, combination = degege_A, sequence_number = 1)
        degege_A2 = Combination_move(move = développé, combination = degege_A, sequence_number = 2)
        degege_A3 = Combination_move(move = dégagé, combination = degege_A, sequence_number = 3)
        degege_A4 = Combination_move(move = dégagé, combination = degege_A, sequence_number = 4)
        degege_A5 = Combination_move(move = enveloppé, combination = degege_A, sequence_number = 5)

        
        combination_moves = [barre_plies_A1, barre_plies_A2, barre_plies_A3, barre_plies_A4, barre_plies_B1, barre_plies_B2, barre_plies_B3, barre_plies_B4, barre_plies_B4, barre_plies_B5, barre_plies_B6, barre_plies_B7, barre_plies_B8, tendu_A1, tendu_A2, tendu_A3, tendu_A4, tendu_A5, tendu_A6, tendu_A7, tendu_A8, tendu_A9, tendu_A10, tendu_A11, tendu_A12, degege_A1, degege_A2, degege_A3, degege_A4, degege_A5]

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
        
