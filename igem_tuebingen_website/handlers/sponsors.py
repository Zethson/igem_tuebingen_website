from flask import render_template
from ..app import app


@app.route("/sponsors")
def sponsors():
    return render_template("sponsors.html")
