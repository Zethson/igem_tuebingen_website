from flask import render_template
from ..app import app


@app.route("/team_tuebingen_2019")
def team_tuebingen_2019():
    return render_template("team_tuebingen_2019.html")
