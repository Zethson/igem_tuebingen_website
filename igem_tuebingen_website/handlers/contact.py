from flask import render_template
from ..app import app

@app.route("/contact")
def contact():
    return render_template("contact.html")
