from flask import render_template
from ..app import app


@app.route("/software")
def software():
    return render_template("software.html")
