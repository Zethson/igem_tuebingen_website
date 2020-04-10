from flask import render_template, redirect, url_for
import os
from igem_tuebingen_website.app import app

@app.route('/')
def root():
    return redirect(url_for('index'))


@app.route("/index")
def index():
    return render_template("home.html")


@app.route("/home")
def home():
    return render_template("home.html")
