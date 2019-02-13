from flask import render_template
from ..app import app


@app.route("/generic")
def generic():
    return render_template("generic.html")
