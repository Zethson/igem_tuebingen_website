from flask import render_template
from ..app import app

@app.route('/human_practice')
def human_practice():
    return render_template('human_practice.htmlØ')
