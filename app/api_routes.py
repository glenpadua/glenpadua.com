from flask import (
    request, abort, send_from_directory, g, jsonify
)

from flask_login import (
    current_user, login_required, login_user, logout_user
)
from . import app
from .models.user import *

@app.route('/api/v1/users', methods=['GET', 'POST'])
def api_users():
    if request.method == 'GET':
        response = User.get_all_users_details()
        return jsonify(response)
    else:
        payload = request.json
        response = User.add(payload)
        pass

@app.route('/api/v1/users/<int:id>', methods=['GET'])
def api_user(id):
    user = User.query.get_or_404(id)
    if request.method == 'GET':
        response = user.get_details()
        return jsonify(response)
    else:
        pass

