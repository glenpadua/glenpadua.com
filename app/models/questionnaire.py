import logging

from .. import db
from .basemodel import BaseModel
from .question import Question
from .result import Result
from .vote import Vote
from datetime import datetime
from flask_login import current_user

class Questionnaire(BaseModel):
    __tablename__ = 'questionnaire'
    text = db.Column(db.String(200))
    description = db.Column(db.String(1000))
    slug = db.Column(db.String(200))
    # The following two fields are cached values. Make sure you update them as
    # the vote table changes
    upvotes = db.Column(db.Integer(), default=0)
    downvotes = db.Column(db.Integer(), default=0)

    def __init__(self, text, description):
        self.text = text
        self.description = description

    @staticmethod
    def add(payload):
        qr = Questionnaire(payload['text'], payload['description'])
        db.session.add(qr)
        db.session.commit()

        # The following list is used to map the user specified indices of
        # result_set to the actual answer id in the database.
        map_ = []
        # Adding the questions
        for question in payload['questions']:
            answer_ids = []
            q = Question.add(question, qr)
            
            for a in q['data']['answers']:
                answer_ids.append(a['id'])
            map_.append(answer_ids)

        print(map_)

        # Adding the results
        for result in payload['results']:
            # Re-number answer_set inside each result
            ans_s = Result.split_answer_set(result['answer_set'])
            answer_set_final = []
            for index, ans in enumerate(ans_s):
                if ans.isdigit():
                    answer_set_final.append(map_[index][int(ans)-1])
                else:
                    seq = []
                    for i, j in enumerate(ans.split('.')):
                        seq.append(map_[index][int(j)-1])
                    answer_set_final.append(seq)

            print()
            print()
            print(answer_set_final)
            print()
            print()
            result['answer_set'] = Result.join_answer_set(answer_set_final)
            logging.debug(result['answer_set'])
            r = Result.add(result, qr)

        return qr.get_details()

    def add_answers(self, payload):
        # 1. Get all results
        r_s = Result.query.filter_by(id_questionnaire=self.id)

        # 2. Match the user entered answers with the answer_set and return it
        for r in r_s:
            if Questionnaire.check_answer(r.answer_set, payload['answer_set']):
                logging.debug('%s : %s', r.answer_set, payload['answer_set'])
                response = r.get_details()
                response['message'] = 'This is your matched result'
                return response

        return {
            'status': 'error',
            'data': None,
            'message': 'No matched result',
        }

    @staticmethod
    def check_answer(r_answer_set, answer_set):
        """
        r_answer_set: the answer set stored in database (Eg: `1,2,2.3,3,2,2,1`)
        answer_set: the combination entered by the end user
        """
        a = r_answer_set.split(',')
        b = answer_set.split(',')

        for i, el in enumerate(a):
            print(a[i], b[i])
            if a[i] != b[i] and (b[i] not in a[i].split('.')):
                logging.debug('%s - %s', a[i], b[i])
                return False
        logging.debug('%s : %s', r_answer_set, answer_set)
        return True

    def vote(self, payload):
        # Check if user has already voted
        v = Vote.query\
                .filter_by(id_questionnaire=self.id)\
                .filter_by(id_user=current_user.id)\
                .first()
        if v:
            return {
                'status': 'error',
                'data': None,
                'message': 'Youve already voted!'
            }

        # Set vote cache here
        if payload['vote'] == 1:
            self.upvotes += 1
        elif payload['vote'] == -1:
            self.downvotes += 1

        payload['id_user'] = current_user.id

        # Create the row in the vote table
        response = Vote.add(payload)
        db.session.add(self)
        db.session.commit()
        return response

    def remove_vote(self):
        # Check if user has already voted
        v = Vote.query\
                .filter_by(id_questionnaire=self.id)\
                .filter_by(id_user=current_user.id)\
                .first()
        if not v:
            return {
                'status': 'error',
                'data': None,
                'message': 'You haven\'t cast any vote!'
            }

        db.session.delete(v)
        db.session.commit()
        return {
            'status': 'success',
            'data': None,
            'message': 'Vote removed!'
        }

    @staticmethod
    def get_all_details():
        q_s = Questionnaire.query.all()
        
        questionnaires = []
        for q in q_s:
            questionnaires.append(q.get_details()['data'])

        return {
            'status': 'success',
            'data': questionnaires,
            'message': None
        }

    def get_details(self):
        return {
            'status': 'success',
            'data': {
                'id': self.id,
                'text': self.text,
                'description': self.description,
                'slug': self.slug,
                'upvotes': self.upvotes,
                'downvotes': self.downvotes,
                'questions': Question.get_all_details(self.id)['data'],
                'results': Result.get_all_details(self.id)['data'],
            },
            'message': None
        }
