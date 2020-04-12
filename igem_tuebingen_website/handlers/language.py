from flask import redirect, url_for, session
from ..app import app

"""This route is requested, whenever (and only if) the user changed the language manually additionally a redirectURL can be added to not always land on index"""
@app.route('/language/<language>')
@app.route('/language/<language>/<redirectUrl>')
def set_language(language='en', redirectUrl='home'):
    session['language'] = language
    print('Language set to: ' + language)
    print('Redirect URL: ' + redirectUrl)
    return redirect(url_for(redirectUrl))
