import logging
import json as json

from flask import render_template

from ..app import app
from igem_tuebingen_website.model.parser.dark_proteins_parser import parse_dark_proteins
from igem_tuebingen_website.model.parser.dark_proteome_parser import parse_dark_proteome

console = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console.setFormatter(formatter)
LOG = logging.getLogger("Explore")
LOG.addHandler(console)
LOG.setLevel(logging.INFO)


@app.route("/explore")
def explore():
    dark_proteomes = parse_dark_proteome()
    dark_proteins = parse_dark_proteins()
    return render_template("explore.html",
                           dark_proteomes=json.dumps(dark_proteomes, default=lambda x: x.__dict__),
                           dark_proteins=json.dumps(dark_proteins, default=lambda x: x.__dict__))
