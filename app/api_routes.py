from flask import (
    request, abort, send_from_directory, g, jsonify
)

from flask_login import (
    current_user, login_required, login_user, logout_user
)
from . import app
from .models.user import *
from .mail import send_email

@app.route('/ajax/contact-zephony', methods=['POST'])
def contact_zephony():
    payload = request.get_json()
    print(payload)
    print('____________')
    send_email('glenpadua01@gmail.com')
    response = {
        'status': 'success'
    }
    return jsonify(response)

@app.route('/api/v1/users', methods=['GET', 'POST'])
def api_users():
    if request.method == 'GET':
        response = User.get_all_users_details()
        return jsonify(response)
    else:
        payload = request.json
        response = User.add(payload)

@app.route('/api/v1/users/<int:id>', methods=['GET'])
def api_user(id):
    user = User.query.get_or_404(id)
    if request.method == 'GET':
        response = user.get_details()
        return jsonify(response)
    else:
        pass

