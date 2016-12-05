"""
Used to create table and add some table data
by default.
"""
import logging

from . import app, bcrypt, db

db.init_app(app)

from .models.user import *

def seed_users():
    u = User(
        name = 'Kevin Isaac',
        email = 'kevin.isaac70@gmail.com',
        password = bcrypt.generate_password_hash('password'),
        account_type = 2
    )
    db.session.add(u)
    db.session.commit()

def drop_tables():
    db.drop_all()

def create_tables():
    db.create_all()

def seed():
    """
    This function is called to populate all the tables with the default
    values.
    """
    logger = logging.getLogger(__name__)
    logger.info('Seeding tables..')
    seed_users()
    logger.info('Done seeding tables!')

# NOTE: Do not call this seed() function within the file because, accidental
# execution of this file may lead to data loss.
# add_content() #add contents to all tables

def rebuild():
    drop_tables()
    create_tables()
    seed()
