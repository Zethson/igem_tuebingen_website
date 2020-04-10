from flask import render_template
from igem_tuebingen_website.app import app

@app.route('/sponsor')
def sponsor():
    return render_template('sponsor.html')