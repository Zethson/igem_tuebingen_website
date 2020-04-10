from flask import render_template
from igem_tuebingen_website.app import app

@app.route('/project_2019')
def project_2019():
    return render_template('project_2019.html')
