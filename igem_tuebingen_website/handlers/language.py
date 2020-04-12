from flask import redirect, url_for, session
from ..app import app

"""This route is requested, whenever (and only if) the user changed the language manually"""
@app.route('/language/<language>')
@app.route('/language/<language>/<redirectUrl>')
def set_language(language=None, redirectUrl='home'):
    session['language'] = language
    print(redirectUrl)
    print('Dasdasdasdasdasdassssssdsasfsadasdasdasf')
    return redirect(url_for(redirectUrl))
