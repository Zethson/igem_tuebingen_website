import csv
import logging
import os

from igem_tuebingen_website.model.core.dark_proteome import DarkProteome

console = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console.setFormatter(formatter)
LOG = logging.getLogger("Dark Proteome Parser")
LOG.addHandler(console)
LOG.setLevel(logging.INFO)

CURRENT_DIR = os.path.abspath(os.getcwd())
MODULE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_PATH = os.path.join(MODULE_DIR, '../../static')
TEMPLATES_PATH = os.path.join(MODULE_DIR, '../../templates')

DARK_PROTEOME_PATH = '/data/dark_proteome/dark_proteome.csv'


def parse_dark_proteome():
    LOG.info("Parsing dark proteome dataset")
    dark_proteomes = []
    try:
        with open(STATIC_PATH + DARK_PROTEOME_PATH, 'r') as csvfile:
            next(csvfile)  # skip the header
            csv_reader = csv.reader(csvfile, delimiter=",")
            for row in csv_reader:
                primary_accession = row[0]
                uncertainty = row[1]
                length = row[2]
                disorder = row[3]
                compositional_bias = row[4]
                membrane = row[5]
                dark_proteome = DarkProteome(primary_accession,
                                             uncertainty,
                                             length,
                                             disorder,
                                             compositional_bias,
                                             membrane)
                dark_proteomes.append(dark_proteome)

        assert(len(dark_proteomes) > 20200)
        LOG.info("Successfully parsed dark proteome dataset")

        return dark_proteomes
    except IOError as e:
        LOG.error("Error while parsing dark proteome data: ", e.message)
