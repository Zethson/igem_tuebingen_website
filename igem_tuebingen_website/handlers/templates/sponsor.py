from flask import render_template
from igem_tuebingen_website.app import app
import os

@app.route('/sponsor')
def sponsor():
    sponsors = []
    for filename in os.listdir('static/img/sponsors/2020'):
        if filename.endswith(".png"):
            sponsors.append(os.path.join('static/img/sponsors/2020/', filename))
        else:
            continue

    return render_template('sponsor.html', sponsors=sponsors)