from flask import redirect, url_for, session
from ..app import app


"""This route is requested, whenever (and only if) the user changed the language manually"""
@app.route('/language/<language>')
def set_language(language=None):
    session['language'] = language
    return redirect(url_for('index'))
