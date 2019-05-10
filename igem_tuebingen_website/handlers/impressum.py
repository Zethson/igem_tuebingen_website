from flask import render_template
from ..app import app


@app.route('/impressum')
def impressum():
    return render_template("impressum.html")
