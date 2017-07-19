import logging
from logging.config import dictConfig

from datetime import datetime
from flask import (
    Flask, request, render_template, redirect, url_for, abort,
    send_from_directory, g, flash, jsonify, abort
)
# from flask_bcrypt import Bcrypt
from flask_debugtoolbar import DebugToolbarExtension
# from flask_sqlalchemy import SQLAlchemy
# from flask_login import (
#     LoginManager, UserMixin, current_user, login_required
# )

# Setting up the app object
app = Flask(__name__)
app.config.from_object('app.config')

try:
    # Initializing the logger
    dictConfig(app.config['LOGGING'])
    logger = logging.getLogger(__name__)

    # Importing the developer configuration settings
    app.config.from_object('app.dev_config')
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

# Setting directories
app.static_folder = '../static'
app.template_folder = '../static/templates'

## Initializing the database
# db = SQLAlchemy(app)

# ## Setting up flask-bcrypt
# bcrypt = Bcrypt(app)

# # Flask login stuff
# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = '/login'

from .routes import *
from .api_routes import *
