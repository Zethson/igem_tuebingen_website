#!/usr/bin/env python
# encoding: utf-8

from .app import babel
from flask import request
from . import cli


@babel.localeselector
def get_locale():
    #  return 'de': use this for testing purposes or set preferred language in your browser
    return request.accept_languages.best_match(['en', 'de'])
