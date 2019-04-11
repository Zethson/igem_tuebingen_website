import logging
import configparser
from flask import Flask, request, session
from flask_babel import Babel
import os
import click

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
app.secret_key = 'SOME_SUPERSECRETKEY'  # bad practice
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'

LANGUAGES = {
  'en': 'English',
  'de': 'German'
}

babel = Babel(app)

try:
    config = configparser.ConfigParser()
    config.read(STATIC_PATH + '/mail.conf')
    mail_username = config['DEFAULT']['gmail_user_name']
    mail_password = config['DEFAULT']['gmail_password']

    # EMAIL SETTINGS
    app.config.update(
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME=mail_username,
        MAIL_PASSWORD=mail_password
    )
except KeyError:
    LOG.warning("Mail config file could not be found! Sending emails via form has been disabled!")

    # EMAIL SETTINGS
    app.config.update(
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME="username_not_available",
        MAIL_PASSWORD="password_not_available"
    )


@app.cli.group()
def translate():
    """Translation commands"""
    pass


@translate.command()
@click.argument('lang')
def init(lang):
    """Initialize a new language"""
    if os.system('pybabel extract -F babel.cfg -o messages.pot .'):
        raise RuntimeError('extract command failed')
    if os.system('pybabel init -i messages.pot -d igem_tuebingen_website/translations -l ' + lang):
        raise RuntimeError('init command failed')
    os.remove('messages.pot')


@translate.command()
def update():
    """Update all languages"""

    if os.system('pybabel extract -F babel.cfg -o messages.pot .'):
        raise RuntimeError('extract command failed')
    if os.system('pybabel update -i messages.pot -d igem_tuebingen_website/translations'):
        raise RuntimeError('update command failed')
    os.remove('messages.pot')


@translate.command()
def compile():
    """Compile all languages"""

    if os.system('pybabel compile -d igem_tuebingen_website/translations'):
        raise RuntimeError('compile command failed')


"""This selector checks, if the user selected a language manually and in that case uses this language for translations.
    
   However, if the user has not selected any language (when accessing the page for the first time, new browser session,
   ...) it will choose the best matching language out of the configured ones, using browser settings and request headers
   "Accept-Language:" property
"""
@babel.localeselector
def get_locale():
    # if the user has set up the language manually it will be stored in the session,
    # so we use the locale from the user settings
    try:
        language = session['language']
    except KeyError:
        language = None
    if language is not None:
        return language
    return request.accept_languages.best_match(LANGUAGES.keys())


"""This function allows us to use all possible language options and the current language in our templates"""
@app.context_processor
def inject_conf_var():
    return dict(
                AVAILABLE_LANGUAGES=LANGUAGES,
                CURRENT_LANGUAGE=session.get('language', request.accept_languages.best_match(LANGUAGES.keys())))



from . import handlers
