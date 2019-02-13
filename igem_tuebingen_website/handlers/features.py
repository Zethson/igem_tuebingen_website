from flask import render_template
from ..app import app


@app.route("/features")
def features():
    return render_template("features.html")
