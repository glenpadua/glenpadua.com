import logging

from logging.config import dictConfig
from datetime import datetime
from flask import (
    render_template, g, flash, abort, redirect, url_for
)
from flask_login import current_user, login_required, logout_user

# Import the decorator functions
from .decorators import *

# Importing the models now (after config)
from .models.questionnaire import *
from .models.question import *
from .models.answer import *
from .models.result import *
from .models.user import *

from . import app, login_manager

# For getting user profile
@login_manager.user_loader
def load_user(user_id):
    user = User.query.get(user_id)
    # flask-login expects a None value on invalid id
    return user

## Home route
@app.route('/')
def home():
    return render_template(
        'index.html',
        questionnaires = Questionnaire.get_all_details()['data'],
    )

@app.route("/<int:id>", methods=['GET', 'POST'])
def questionnaire(id):
    qr = Questionnaire.query.get_or_404(id)
    return render_template(
        'questionnaire.html',
        q = qr.get_details()['data'],
        questionnaires = Questionnaire.get_all_details()['data'],
    )

@app.route("/create", methods=['GET', 'POST'])
def create_questionnaire():
    return render_template(
        'create_questionnaire.html',
        questionnaires = Questionnaire.get_all_details()['data'],
    )

@app.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return redirect(url_for('home'))
