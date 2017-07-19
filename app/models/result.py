import logging

from .. import db
from .basemodel import BaseModel
from datetime import datetime

class Result(BaseModel):
    __tablename__ = 'result'
    text = db.Column(db.String(200))
    description = db.Column(db.String(1000))
    answer_set = db.Column(db.String(100))
    id_questionnaire = db.Column(db.Integer, db.ForeignKey('questionnaire.id'))

    def __init__(self, text, description, id_questionnaire, answer_set):
        self.text = text
        self.description = description
        self.id_questionnaire = id_questionnaire
        self.answer_set = answer_set

    @staticmethod
    def add(payload, qr):
        r = Result(
            payload['text'],
            payload['description'],
            qr.id,
            payload['answer_set'],
        )

        db.session.add(r)
        db.session.commit()
        return r.get_details()

    @staticmethod
    def get_all_details(id_questionnaire=None):
        """
        Return results of the mentioned questionnaire or return all the
        results.
        """
        if id_questionnaire:
            r_s = Result.query.filter_by(id_questionnaire=id_questionnaire)
        else:
            r_s = Result.query.all()
        
        results = []
        for r in r_s:
            results.append(r.get_details()['data'])

        return {
            'status': 'success',
            'data': results,
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
                'answer_set': self.answer_set,
            },
            'message': None
        }

    @staticmethod
    def split_answer_set(string):
        return [x for x in string.split(',')]

    @staticmethod
    def join_answer_set(arr):
        answer_set = ''
        for i in arr:
            if isinstance(i, list):
                answer_set += '.'.join([str(x) for x in i])
            else:
                answer_set += str(i)
            answer_set += ','
        return answer_set[:-1]
