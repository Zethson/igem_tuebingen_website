from flask import render_template
from ..app import app


@app.route("/elements")
def elements():
    return render_template("elements.html")
