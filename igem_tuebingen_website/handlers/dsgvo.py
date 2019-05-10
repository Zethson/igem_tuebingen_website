from flask import render_template
from ..app import app


@app.route('/dsgvo')
def dsgvo():
    return render_template("dsgvo.html")
