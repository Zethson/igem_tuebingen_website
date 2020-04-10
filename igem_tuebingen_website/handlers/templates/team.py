from flask import render_template
from igem_tuebingen_website.app import app

@app.route('/team')
def team():
    return render_template('team.html')
