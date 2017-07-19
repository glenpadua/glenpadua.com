from app.routes import *
from app.api_routes import *

from app import app
from app.config import APP_PORT

if __name__ == '__main__':
    app.run(debug=True, port=APP_PORT)
