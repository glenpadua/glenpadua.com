from .. import db
from .basemodel import BaseModel
# from .question import Question
from datetime import datetime

class Vote(BaseModel):
    __tablename__ = 'vote'
    id_questionnaire = db.Column(db.Integer, db.ForeignKey('questionnaire.id'))
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    vote = db.Column(db.Integer)

    def __init__(self, id_questionnaire, id_user, vote):
        self.id_questionnaire = id_questionnaire
        self.id_user = id_user
        self.vote = vote # -1 or +1

    @staticmethod
    def add(payload):
        v = Vote(
            payload['id_questionnaire'],
            payload['id_user'],
            payload['vote'],
        )
        db.session.add(v)
        db.session.commit()

        return v.get_details()

    def get_details(self):
        return {
            'status': 'success',
            'data': {
                'id': self.id,
                'id_questionnaire': self.id_questionnaire,
                'id_user': self.id_user,
                'vote': self.vote,
            },
            'message': None
        }

