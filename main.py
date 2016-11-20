import logging

from logging.config import dictConfig
from sqlalchemy.sql import func

from datetime import datetime
from flask import (
    Flask, request, render_template, redirect, url_for, abort,
    send_from_directory, g, flash, jsonify, abort
)
from flask_bcrypt import Bcrypt
from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager, UserMixin, current_user, login_required,
    login_user, logout_user
)

# Setting up the app object1
app = Flask(__name__)
app.config.from_object('config')

try:
    # Initializing the logger
    dictConfig(app.config['LOGGING'])
    logger = logging.getLogger(__name__)

    # Importing the developer configuration settings
    app.config.from_object('dev_config')
except ImportError:
    pass
    logger.warning('''There is no dev_config.py file. Create that file to add
        developer specific configuration options.''')
else:
    # Initializing the logger
    dictConfig(app.config['LOGGING'])
    logger = logging.getLogger(__name__)

logger.debug('Logger initialized.')

toolbar = DebugToolbarExtension(app)

## Initializing the database
db = SQLAlchemy(app)

## Setting up flask-bcrypt
bcrypt = Bcrypt(app)

class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.Integer, default=0, nullable=False)
    # Possible values
    # 1. 'active' - default value
    # 2. 'deleted'
    created_at = db.Column(db.DateTime, server_default=func.now())
    deleted_at = db.Column(db.DateTime)

# Flask login stuff
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = '/login'

# Importing the models now (after config)
from models.user import *

# Import the decorator functions
from decorators import *

# @app.after_request
# def after_request():
#     """
#     Code to be executed after the request is added here.
#     Eg: Disconnect from the database
#     """
#     pass

# @app.before_request
# def before_request():
#     """
#     Code to be executed before the request is added here.
#     Eg: Connect to the database
#     """
#     pass

# For pagination
# def url_for_other_page(page):
#     args = request.view_args.copy()
#     args['search'] = request.args.get('search')
#     args['page'] = page
#     return url_for(request.endpoint, **args)

# For getting user profile
@login_manager.user_loader
def load_user(user_id):
    user = User.query.get(int(user_id))
    if user is None:
        # flask-login expects a None value on invalid id
        return None
    else:
        return user

## Home route
@app.route('/')
@login_required
def home():
    return render_template("index.html")

@app.route('/api/v1/users', methods=['GET', 'POST'])
def api_users():
    if request.method == 'GET':
        response = User.get_all_users_details()
        return jsonify(response)
    else:
        pass

@app.route('/api/v1/users/<int:id>', methods=['GET'])
def api_user(id):
    user = User.query.get_or_404(id)
    if request.method == 'GET':
        response = user.get_details()
        return jsonify(response)
    else:
        pass


# Auth
# @app.route("/register", methods=['GET', 'POST'])
# def register():
#     if request.method == 'GET':
#         return render_template('register.html')
#     else:
#         name = request.form.get('name', '')
#         email = request.form.get('email', '')
#         phone = request.form.get('phone', '')
#         password = request.form.get('pass_confirmation', '')
#         confirm_password = request.form.get('pass', '')
#         address = request.form.get('address', '')
#         account_type = 3
#         # Account_type - 3 ----> Guest
#         # account_type = request.form.get('account_type', '')
#         # hired_at = request.form.get('hired_at', '')

#         if len(name) < 2 :
#             return redirect(url_for('register', error='not-name-short'))

#         # if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
#         #     return redirect(url_for('register', error='not-email'))

#         if len(password) < 4 :
#             return redirect(url_for('register', error='password-too-short'))

#         if password != confirm_password:
#             return redirect(url_for('register', error='password-mismatch'))

#         # if account_type not in [0, 1, 2]:
#         #     return redirect(url_for('register', error='account-type-invalid'))

#         if email:
#             test_user = User.query.filter_by(email=email.lower()).first()
#             if test_user is not None:
#                 return redirect(url_for('register', error='acc-exists'))

#         u = User(
#             email = email.lower(),
#             password = pbkdf2_sha256.encrypt(password, rounds=200000, salt_size=16),
#             name = name,
#             address = address or '',
#             phone = phone or '',
#             account_type = int(account_type)
#         )
#         db.session.add(u)
#         db.session.commit()

#         user = User.query.filter_by(email=email).first()
#         # login_user(user)

#         # Send confirmation email
#         # text = url_for('verify_account', token=user.ver_token)
#         # send_email(
#         #     to = user.email,
#         #     subject = 'Your verification link',
#         #     text = text
#         # )

#         return redirect(url_for('login', register_success=1))

# Login
@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        email = request.form.get('email', '')
        password = request.form.get('password', '')
        user = User.query.filter(User.email==email.lower()).first()

        if user is None:
            return redirect(url_for('login', error='no-user'))

        pass_match = pbkdf2_sha256.verify(password, user.password)
        if not pass_match:
            return redirect(url_for('login', error='wrong-password'))

        # if user.ver_token != '':
        #     flash('User account is not verified')
        #     print 'User account not verified.'
        #     return redirect(url_for('signin', error='unverified'))

        login_user(user)
        return redirect(url_for('home', success='logged-in'))

# Logout
@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('home', success='logged-out'))

@app.route("/users", methods=['GET', 'POST'])
def users():
    return render_template('users.html')

@app.route("/users/<int:id>", methods=['GET', 'POST'])
def user():
    pass

@app.route("/users/add", methods=['GET', 'POST'])
def add_user():
    if request.method == 'GET':
        return render_template('add_user.html')
    else:
        name = request.form.get('name', '')
        email = request.form.get('email', '')
        phone = request.form.get('phone', '')
        password = request.form.get('password', '')
        confirm_password = request.form.get('repeat_password', '')
        address = request.form.get('address', '')
        # account_type = 3
        # Account_type - 3 ----> Guest
        account_type = request.form.get('account_type', '')
        # hired_at = request.form.get('hired_at', '')

        if len(name) < 2 :
            return redirect(url_for('add_user', error='not-name-short'))

        # if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        #     return redirect(url_for('add_user', error='not-email'))

        if len(password) < 4 :
            return redirect(url_for('add_user', error='password-too-short'))

        if password != confirm_password:
            return redirect(url_for('add_user', error='password-mismatch'))

        if int(account_type) not in [0, 1, 2, 3]:
            return redirect(url_for('add_user', error='account-type-invalid'))

        if email:
            test_user = User.query.filter_by(email=email.lower()).first()
            if test_user is not None:
                return redirect(url_for('add_user', error='acc-exists'))

        u = User(
            email = email.lower(),
            password = pbkdf2_sha256.encrypt(password, rounds=200000, salt_size=16),
            name = name,
            address = address or '',
            phone = phone or '',
            account_type = int(account_type)
        )
        db.session.add(u)
        db.session.commit()

        user = User.query.filter_by(email=email).first()
        # login_user(user)

        # Send confirmation email
        # text = url_for('verify_account', token=user.ver_token)
        # send_email(
        #     to = user.email,
        #     subject = 'Your verification link',
        #     text = text
        # )

        return redirect(url_for('users', add_user_success=1))

## Admin routes
if __name__ == '__main__':
    app.run()

logger.info('The application has started.')
