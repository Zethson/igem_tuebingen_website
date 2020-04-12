from flask import render_template
from igem_tuebingen_website.app import app

@app.route('/impressum')
def impressum():
    return render_template('impressum.html')
