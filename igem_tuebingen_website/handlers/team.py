from flask import render_template
from ..app import app

@app.route('/team')
def team():
    return render_template('team.html')
