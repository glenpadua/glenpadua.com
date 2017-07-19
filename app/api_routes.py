from flask import (
    request, abort, send_from_directory, g, jsonify
)

from flask_login import (
    current_user, login_required, login_user, logout_user
)
from . import app
from .models.questionnaire import *
from .models.question import *
from .models.answer import *
from .models.result import *
from .models.user import *

@app.route('/api/v1/questions')
def api_questions():
    response = Question.get_all_details()
    return jsonify(response)

@app.route('/api/v1/questionnaires', methods=['GET', 'POST'])
def api_questionnaires():
    if request.method == 'GET':
        response = Questionnaire.get_all_details()
        return jsonify(response)
    else:
        payload = request.json['data']
        response = Questionnaire.add(payload)
        return jsonify(response)

@app.route('/api/v1/questionnaires/<int:id>', methods=['GET', 'POST'])
def api_questionnaire(id):
    qr = Questionnaire.query.get_or_404(id)
    if request.method == 'GET':
        response = qr.get_details()
        return jsonify(response)
    else:
        # Posting answers to a questionnaire
        payload = request.json['data']
        response = qr.add_answers(payload)
        return jsonify(response)

@app.route('/api/v1/questionnaires/<int:id>/vote', methods=['POST', 'DELETE'])
def api_vote(id):
    if not current_user.is_authenticated:
        return jsonify({
            'status': 'error',
            'data': None,
            'message': 'Gotta login honey!',
        }), 401
    qr = Questionnaire.query.get_or_404(id)

    if request.method == 'POST':
        # Cast vote
        payload = request.json['data']
        payload['id_questionnaire'] = id
        response = qr.vote(payload)
    else:
        # Delete vote
        response = qr.remove_vote()
    return jsonify(response)

@app.route('/ajax/login', methods=['POST'])
def ajax_login():
    email = request.json['data']['email']
    password = request.json['data']['password']

    u = User.query.filter_by(email=email).first()
    if not u or u.password != password:
        return jsonify({
            'status': 'error',
            'data': None,
            'message': 'Username/password is wrong!',
        })
    
    # Login user
    login_user(u)
    return jsonify({
        'status': 'success',
        'data': None,
        'message': 'Login was successful!',
    })

@app.route('/ajax/register', methods=['POST'])
def ajax_register():
    payload = request.json['data']
    response = User.add(payload)
    return jsonify(response)
