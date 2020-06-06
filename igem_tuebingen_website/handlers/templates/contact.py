from flask import request, render_template
from flask_mail import Mail
from flask_mail import Message
from igem_tuebingen_website.app import app
from smtplib import SMTPException

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route('/contact_request', methods=['POST'])
def contact_request():
    mail = Mail(app)

    # validate form
    if not request.form['name'] or not request.form['email'] or not request.form['message'] or "@" not in request.form['email']:
        return render_template("errors/contact_error.html")

    msg = Message("iGEM Tuebingen Website Request by: " + request.form['name'],
                  sender=request.form['email'],
                  recipients=['elias.schreiner@student.uni-tuebingen.de'])
    sent_by = "The request was sent by: " + request.form['name'] + " with the contact e-mail: " + request.form['email'] + " with Nr. " + request.form['phone'] + "\n\n"
    message = "His/her message is: " + request.form['message']
    msg.body = sent_by + message
    try:
        mail.send(msg)
    except SMTPException as e:
        return render_template("errors/contact_error.html")
    return render_template("feedback/contact_successful.html")
