from flask import render_template
from ..app import app


@app.route("/project_2019")
def project_2019():
    return render_template("project_2019.html")


@app.route("/team_tuebingen_2019")
def team_tuebingen_2019():
    return render_template("project_2019.html")