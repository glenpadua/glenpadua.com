# from app.routes import *
# # from app.api_routes import *

# from app import app

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, render_template

app = Flask(__name__)

## Home route
@app.route('/')
def home():
    # return "Home Page"
    return render_template("index.html")


## Portfoilio route
@app.route('/portfolio')
def portfolio():
    # return "Portfolio Page"
    return render_template("portfolio.html")

if __name__ == '__main__':
    app.run(debug=True)
