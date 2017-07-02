'''
This file is only the entry point to run the app. All routes are defined
in the app.routes and app.api_routes modules.
'''

from app import app

if __name__ == '__main__':
    app.run()
