from flask import render_template
from ..app import app

@app.route('/project_2017')
def project_2017():
    return render_template('project_2017.html')
