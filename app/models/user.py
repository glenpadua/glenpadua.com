from .. import db
from .basemodel import BaseModel
from datetime import datetime

class User(BaseModel):
    __tablename__ = 'user'
    name = db.Column(db.String(50))
    email = db.Column(db.String(128), unique=True)
    password = db.Column(db.String(100))
    account_type = db.Column(db.String(50))
    # account_type
    # 0 - User
    # 1 - Moderator
    # 2 - Admin

    def __init__(self, name, email, password, account_type=0):
        self.name = name
        self.email = email
        self.password = password
        if account_type:
            self.account_type = account_type

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_admin(self):
        if self.account_type == 2:
            return True
        return False

    def get_id(self):
        return str(self.id)

    def is_anonymous(self):
        return False

    @staticmethod
    def add(payload):
        u = User.query.filter_by(email=payload['email']).first()
        print(u)
        if u:
            return {
                'status': 'error',
                'data': None,
                'message': 'Email already exists',
            }

        u = User(
            payload['name'],
            payload['email'],
            payload['password'],
        )

        db.session.add(u)
        db.session.commit()
        response = u.get_details()
        response['message'] = 'User is registered successfully!'
        return response

    def get_all_details():
        users = User.query.all()
        user_list = []
        for user in users:
            user_list.append(user.get_details()['data'])
        return {
            'status': 'success',
            'data': user_list,
            'message': None
        }

    def get_details(self):
        return {
            'status': 'success',
            'data': {
                'id': self.id,
                'name': self.name,
                'email': self.email,
                'password': self.password,
            },
            'message': None
        }

    def update_profile(self, name=None, email=None, account_type=None):
        if name:
            self.name = name
        if email:
            self.email = email
        if account_type:
            self.account_type = account_type
