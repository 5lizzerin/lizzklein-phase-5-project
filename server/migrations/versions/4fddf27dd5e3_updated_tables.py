"""updated tables

Revision ID: 4fddf27dd5e3
Revises: a77f23d38ddc
Create Date: 2023-12-08 11:04:33.854287

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4fddf27dd5e3'
down_revision = 'a77f23d38ddc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('combination_moves', schema=None) as batch_op:
        batch_op.add_column(sa.Column('move_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('combination_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_combination_moves_combination_id_combinations'), 'combinations', ['combination_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_combination_moves_move_id_moves'), 'moves', ['move_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('combination_moves', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_combination_moves_move_id_moves'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_combination_moves_combination_id_combinations'), type_='foreignkey')
        batch_op.drop_column('combination_id')
        batch_op.drop_column('move_id')

    # ### end Alembic commands ###
