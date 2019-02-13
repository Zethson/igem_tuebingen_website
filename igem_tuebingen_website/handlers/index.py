from flask import render_template, redirect, url_for
from ..app import app

@app.route('/')
def root():
    return redirect(url_for('index'))


@app.route("/index")
def index():
    return render_template("index.html")
