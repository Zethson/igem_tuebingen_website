from flask import render_template
from igem_tuebingen_website.app import app

@app.route('/project_2018')
def project_2018():
    return render_template('project_2018.html')
