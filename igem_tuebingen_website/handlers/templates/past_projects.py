from flask import render_template
from igem_tuebingen_website.app import app

@app.route('/past_projects/<year>')
def past_projects(year=2020):
    return render_template('past_projects.html', year=year)
