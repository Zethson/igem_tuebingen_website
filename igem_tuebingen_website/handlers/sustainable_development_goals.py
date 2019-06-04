from flask import render_template
from ..app import app


@app.route('/sustainable_development_goals')
def sustainable_development_goals():
    return render_template("sustainable_development_goals.html")
