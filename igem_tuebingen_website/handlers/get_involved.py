from flask import render_template
from ..app import app


@app.route("/get_involved")
def get_involved():
    return render_template("get_involved.html")
