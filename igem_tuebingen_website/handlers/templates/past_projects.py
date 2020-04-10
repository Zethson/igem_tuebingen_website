from flask import render_template
from igem_tuebingen_website.app import app

@app.route('/past_projects')
def past_projects():
    return render_template('past_projects.html')
