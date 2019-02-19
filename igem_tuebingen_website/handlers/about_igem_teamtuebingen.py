from flask import render_template
from ..app import app


@app.route("/about_igem_teamtuebingen")
def about_igem_teamtuebingen():
    return render_template("about_igem_teamtuebingen.html")
