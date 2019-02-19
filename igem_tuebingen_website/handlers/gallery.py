from flask import render_template
from ..app import app


@app.route("/gallery")
def gallery():
    return render_template("gallery.html")
