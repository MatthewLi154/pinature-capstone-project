"""create all table

Revision ID: d1200bec44e7
Revises:
Create Date: 2022-11-28 13:49:48.967773

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'd1200bec44e7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('firstName', sa.String(length=55), nullable=True),
    sa.Column('lastName', sa.String(length=55), nullable=True),
    sa.Column('profileImg', sa.String(), nullable=True),
    sa.Column('about', sa.String(), nullable=True),
    sa.Column('website', sa.String(), nullable=True),
    sa.Column('pronouns', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    op.create_table('boards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=55), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('profileId', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.ForeignKeyConstraint(['profileId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE boards SET SCHEMA {SCHEMA};")
    op.create_table('pins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profileId', sa.Integer(), nullable=False),
    sa.Column('destinationLink', sa.String(length=255), nullable=False),
    sa.Column('title', sa.String(length=55), nullable=False),
    sa.Column('about', sa.String(length=255), nullable=False),
    sa.Column('altText', sa.String(length=255), nullable=True),
    sa.Column('note', sa.String(length=255), nullable=True),
    sa.Column('image', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['profileId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE pins SET SCHEMA {SCHEMA};")
    op.create_table('boardPins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('pinsId', sa.Integer(), nullable=True),
    sa.Column('boardsId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['boardsId'], ['boards.id'], ),
    sa.ForeignKeyConstraint(['pinsId'], ['pins.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE boardPins SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('boardPins')
    op.drop_table('pins')
    op.drop_table('boards')
    op.drop_table('users')
    # ### end Alembic commands ###