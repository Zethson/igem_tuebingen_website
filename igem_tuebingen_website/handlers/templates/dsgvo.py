from flask import render_template
from igem_tuebingen_website.app import app

@app.route('/dsgvo')
def dsgvo():
    return render_template('dsgvo.html')
