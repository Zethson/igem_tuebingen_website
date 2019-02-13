from flask import request, render_template
from flask_mail import Mail
from flask_mail import Message
from ..app import app


@app.route('/contact_request', methods=['POST'])
def contact_request():
    mail = Mail(app)

    # validate form
    if not request.form['name'] or not request.form['email'] or not request.form['message'] or "@" not in request.form['email']:
        return render_template("contact_error.html")

    msg = Message("iGEM Tuebingen Website Request by: " + request.form['name'],
                  sender=request.form['email'],
                  recipients=['lukas.heumos@gmail.com'])
    sent_by = "The request was sent by: " + request.form['name'] + " with the contact e-mail: " + request.form['email'] + "\n\n"
    message = "His/her message is: " + request.form['message']
    msg.body = sent_by + message
    mail.send(msg)
    return render_template("contact_successful.html")
