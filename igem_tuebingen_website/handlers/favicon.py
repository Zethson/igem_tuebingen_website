from flask import redirect, url_for
from ..app import app


@app.route('/favicon.ico')
def hello():
    return redirect(url_for('static', filename='protein_icon.png'), code=302)
