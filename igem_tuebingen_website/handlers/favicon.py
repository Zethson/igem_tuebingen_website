from flask import redirect, url_for
from ..app import app


@app.route('/favicon.ico')
def hello():
    return redirect(url_for('static', filename='images/icons/logo_1.5.jpg'), code=302)
