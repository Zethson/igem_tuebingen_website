import os
import click
from .app import app


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
