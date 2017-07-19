from .. import db
from .answer import Answer
from .basemodel import BaseModel
from datetime import datetime

class Question(BaseModel):
    __tablename__ = 'question'
    text = db.Column(db.String(200))
    description = db.Column(db.String(1000))
    id_questionnaire = db.Column(db.Integer, db.ForeignKey('questionnaire.id'))

    def __init__(self, text, description, id_questionnaire):
        self.text = text
        self.description = description
        self.id_questionnaire = id_questionnaire

    @staticmethod
    def add(payload, qr):
        q = Question(
            payload['text'],
            payload['description'],
            qr.id,
        )
        db.session.add(q)
        db.session.commit()

        # Adding the answers
        for answer in payload['answers']:
            a = Answer.add(answer, q)

        return q.get_details()

    @staticmethod
    def get_all_details(id_questionnaire=None):
        if id_questionnaire:
            q_s = Question.query.filter_by(id_questionnaire=id_questionnaire)
        else:
            q_s = Question.query.all()
        
        questions = []
        for q in q_s:
            questions.append(q.get_details()['data'])

        return {
            'status': 'success',
            'data': questions,
            'message': None
        }

    def get_details(self):
        return {
            'status': 'success',
            'data': {
                'id': self.id,
                'text': self.text,
                'description': self.description,
                'id_questionnaire': self.id_questionnaire,
                'answers': Answer.get_all_details(self.id)['data'],
            },
            'message': None
        }

