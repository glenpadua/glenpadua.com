import logging

from logging.config import dictConfig
from datetime import datetime
from flask import (
    render_template, g, flash, abort, request, jsonify
)

from . import app
from .mail import send_email

## Home route
@app.route('/')
def home():
    return render_template("index.html")

## Portfoilio route
@app.route('/portfolio')
def portfolio():
    return render_template("portfolio.html")

# Contact route
@app.route('/ajax/contact-zephony', methods=['GET', 'POST'])
def contact_zephony():
    payload = request.get_json()
    response = send_email(payload)
    return jsonify(response)
