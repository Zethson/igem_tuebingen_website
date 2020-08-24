from flask import request, render_template
from flask_mail import Mail
from flask_mail import Message
from igem_tuebingen_website.app import app
from smtplib import SMTPException
from threading import Thread
from igem_tuebingen_website.app import app

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route('/contact_request', methods=['POST'])
def contact_request():
    print("Contact request")
    # validate form
    if not request.form['name'] or not request.form['email'] or not request.form['message'] or "@" not in request.form[
        'email'] or not request.form['dsgvo']:
        return render_template("errors/contact_error.html")
    msg = Message("iGEM Tuebingen Website Request by: " + request.form['name'],
                  sender=request.form['email'],
                  recipients=['elias.schreiner@student.uni-tuebingen.de'])
    sent_by = "The request was sent by: " + request.form['name'] + " with the contact e-mail: " + request.form[
        'email'] + " with Nr. " + request.form['phone'] + "\n\n"
    message = "His/her message is: " + request.form['message']
    msg.body = sent_by + message
    try:
        print("Send Mail")
        if len(request.form['emailSPAM']) == 0:
            Thread(target=send_async_email, args=(app, msg)).start()
    except SMTPException as e:
        return render_template("errors/contact_error.html")
    return render_template("feedback/contact_successful.html")


def send_async_email(app, msg):
    mail = Mail(app)
    with app.app_context():
        mail.send(msg)
