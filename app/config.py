import os, logging

APP_PORT = 5003
try:
    # Tries to import from the server config file
    from .server_config import *
except:
    APP_ENV = 'development'
DEBUG = True
DEBUG_TB_INTERCEPT_REDIRECTS = False
SECRET_KEY = 'fasdhbf@#$240Fa-234242'

# If set to True, Flask-SQLAlchemy will track modifications of objects and
# emit signals. The default is None, which enables tracking but issues a
# warning that it will be disabled by default in the future. This requires
# extra memory and should be disabled if not needed.
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://kevin:bennette@localhost/qanda'
SQLALCHEMY_TRACK_MODIFICATIONS = False
DEBUG_TB_INTERCEPT_REDIRECTS = False
# Configuration for the python logging module
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'root': {
        'level': logging.DEBUG,
        'handlers': ['console', 'file'],
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'level': logging.DEBUG,
            'formatter': 'detailed',
            'stream': 'ext://sys.stdout',
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'level': logging.DEBUG,
            'formatter': 'detailed',
            'filename': 'app.log',
            'mode': 'a',
            'maxBytes': 10485760,
            'backupCount': 5,
        }
    },
    'formatters': {
        'detailed': {
            'format': ('%(asctime)s %(name)-17s line:%(lineno)-4d '
                        '%(levelname)-8s %(message)s')
        }
    },
}

# Define the following variables inside the dev_config.py file
#SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://user:pass@server/db'

# Override any configuration value by redefining them in dev_config.py

# Staging config
if APP_ENV == 'staging':
    try:
        from .server_config import *
    except:
        pass

# Live config
if APP_ENV == 'live':
    MONGO_IP = '127.0.0.1'
    MONGO_DB = 'terminology'
    MONGO_USER = 'terminology'
    MONGO_PW = 'terminology'
    try:
        print('Live Environment is detected.')
        from .server_config import *
    except:
        pass

# Now, override the default config variables with the developer
# specific config variables.
# Environment variable is not required for development.
if APP_ENV == 'development':
    try:
        print('Development Environment is detected.')
        from .dev_config import *
    except:
        pass
