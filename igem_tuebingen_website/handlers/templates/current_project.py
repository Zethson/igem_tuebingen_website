from flask import render_template
from igem_tuebingen_website.app import app

@app.route('/current_project')
def current_project():
    return render_template('current_project.html')
