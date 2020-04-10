from flask import render_template
from igem_tuebingen_website.app import app

@app.route("/contact")
def contact():
    return render_template("contact.html")
