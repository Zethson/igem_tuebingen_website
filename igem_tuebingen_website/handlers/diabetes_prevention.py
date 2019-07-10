from flask import render_template
from ..app import app


@app.route('/diabetes_prevention')
def diabetes_prevention():
    return render_template("diabetes_prevention.html")