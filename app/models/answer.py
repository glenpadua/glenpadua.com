from .. import db
from .basemodel import BaseModel
from datetime import datetime

class Answer(BaseModel):
    __tablename__ = 'answer'
    text = db.Column(db.String(200))
    description = db.Column(db.String(1000))
    id_question = db.Column(db.Integer, db.ForeignKey('question.id'))

    def __init__(self, text, id_question, description=''):
        self.text = text
        self.description = description
        self.id_question = id_question

    @staticmethod
    def add(payload, q):
        a = Answer(
            payload,
            q.id,
        )

        db.session.add(a)
        db.session.commit()
        return a.get_details()

    @staticmethod
    def get_all_details(id_question=None):
        if id_question:
            q_s = Answer.query.filter_by(id_question=id_question)
        else:
            q_s = Answer.query.all()
        
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
                'id_question': self.id_question,
            },
            'message': None
        }
