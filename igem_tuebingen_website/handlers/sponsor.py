from flask import render_template
from ..app import app

@app.route('/sponsor')
def sponsor():
    return render_template('sponsor.html')