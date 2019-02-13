import csv
import logging
import os

from igem_tuebingen_website.model.core.dark_protein import DarkProtein

console = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console.setFormatter(formatter)
LOG = logging.getLogger("Dark Proteins Parser")
LOG.addHandler(console)
LOG.setLevel(logging.INFO)

CURRENT_DIR = os.path.abspath(os.getcwd())
MODULE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_PATH = os.path.join(MODULE_DIR, '../../static')
TEMPLATES_PATH = os.path.join(MODULE_DIR, '../../templates')

DARK_PROTEOME_PATH = '/data/dark_proteome/dark_proteins_all_cut_150k.csv'


def parse_dark_proteins():
    LOG.info("Parsing dark proteins dataset")
    dark_proteins = []
    try:
        with open(STATIC_PATH + DARK_PROTEOME_PATH, 'r') as csvfile:
            csv_reader = csv.reader(csvfile)
            next(csvfile)  # skip the header
            for row in csv_reader:
                primary_accession = row[0]
                domain = row[1]
                kingdom = row[2]
                organism_id = row[3]
                darkness = row[4]
                length = row[5]
                disorder = row[6]
                compositional_bias = row[7]
                membrane = row[8]
                dark_protein = DarkProtein(primary_accession,
                                           domain,
                                           kingdom,
                                           organism_id,
                                           darkness,
                                           length,
                                           disorder,
                                           compositional_bias,
                                           membrane)
                dark_proteins.append(dark_protein)

        LOG.info("Successfully parsed dark proteins dataset")

        return dark_proteins
    except IOError as e:
        LOG.error("Error while parsing dark proteins data: ", e.message)