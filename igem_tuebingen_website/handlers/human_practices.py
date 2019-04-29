from flask import render_template
from ..app import app


@app.route('/human_practices')
def human_practices():
    return render_template("human_practices.html")
