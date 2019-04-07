import logging
import os
import configparser
from flask import Flask
from flask_babel import Babel

console = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console.setFormatter(formatter)
LOG = logging.getLogger("App")
LOG.addHandler(console)
LOG.setLevel(logging.INFO)

CURRENT_DIR = os.path.abspath(os.getcwd())
MODULE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_PATH = os.path.join(MODULE_DIR, 'static')
TEMPLATES_PATH = os.path.join(MODULE_DIR, 'templates')

app = Flask(__name__)
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'

babel = Babel(app)

try:
    config = configparser.ConfigParser()
    config.read(STATIC_PATH + '/mail.conf')
    mail_username = config['DEFAULT']['gmail_user_name']
    mail_password = config['DEFAULT']['gmail_password']

    app.config.update(
        # EMAIL SETTINGS
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME=mail_username,
        MAIL_PASSWORD=mail_password
    )
except KeyError:
    LOG.error("Mail config file could not be found! Sending emails via form has been disabled!")
    app.config.update(
        # EMAIL SETTINGS
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME="username_not_available",
        MAIL_PASSWORD="password_not_available"
    )

from . import handlers
