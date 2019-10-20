from flask import render_template, redirect, url_for, flash, Markup
from ..app import app

from ..scripts.forms import SequenceForm, UniprotForm, IGEMForm
from c3pred.c3pred import *


@app.route('/c3pred/')
def c3pred():
    return render_template('c3pred.html')


@app.route('/fromsequence/', methods=['GET', 'POST'])
def fromsequence():
    form = SequenceForm()
    if form.validate_on_submit():
        results = predict_fasta(form.sequence.data)
        if results.error:
            table_to_print = '<table class ="tg" align="center"><tr><th class="tg-lboi">Sequence</th><th class="tg-lboi">' + form.sequence.data + \
                             '</td></tr><tr><td class="tg-lboi">Error</td><td class="tg-lboi">' + results.error_type + \
                             '</td></tr></table>'
            flash(Markup(table_to_print))
        else:
            table_to_print = '<table class ="tg" align="center"><tr><th class="tg-lboi">Sequence</th><th class="tg-lboi">' + form.sequence.data + \
                             '</td></tr><tr><td class="tg-lboi">Activity</td><td class="tg-lboi">' + str(results.activity) +  \
                             '</td></tr><tr><td class="tg-lboi">Activity class</td><td class="tg-lboi">' + results.activity_class +  \
                             '</td></tr></table>'
            flash(Markup(table_to_print))
        return redirect(url_for('fromsequence'))
    return render_template('fromsequence.html', title='Prediction', form=form)


@app.route('/from_up/', methods=['GET', 'POST'])
def from_up():
    form = UniprotForm()
    if form.validate_on_submit():
        results = predict_uniprot(form.sequence.data)
        if results.error:
            table_to_print = '<table class ="tg" align="center"><tr><th class="tg-lboi">Accession Number</th><th class="tg-lboi">' + form.sequence.data + \
                             '</td></tr><tr><td class="tg-lboi">Error</td><td class="tg-lboi">' + results.error_type + \
                             '</td></tr></table>'
            flash(Markup(table_to_print))
        else:
            table_to_print = '<table class ="tg" align="center"><tr><th class="tg-lboi">Accession Number</th><th class="tg-lboi">' + form.sequence.data + \
                             '</th></tr><tr><td class="tg-lboi">Description</td><td class="tg-lboi">' + results.description + \
                             '</td></tr><tr><td class="tg-lboi">Sequence</td><td class="tg-lboi">' + results.sequence + \
                             '</td></tr><tr><td class="tg-lboi">Activity</td><td class="tg-lboi">' + str(results.activity) + \
                             '</td></tr><tr><td class="tg-lboi">Activity class</td><td class="tg-lboi">' + results.activity_class +  \
                             '</td></tr></table>'
            flash(Markup(table_to_print))
        return redirect(url_for('from_up'))
    return render_template('from_up.html', title='Prediction', form=form)


@app.route('/from_igem/', methods=['GET', 'POST'])
def from_igem():
    form = IGEMForm()
    if form.validate_on_submit():
        results = predict_igem(form.sequence.data)
        if results.error:
            table_to_print = '<table class ="tg" align="center"><tr><th class="tg-lboi">Registry Id</th><th class="tg-lboi">' + form.sequence.data + \
                             '</td></tr><tr><td class="tg-lboi">Error</td><td class="tg-lboi">' + results.error_type + \
                             '</td></tr></table>'
            flash(Markup(table_to_print))

        else:
            table_to_print = '<table class ="tg" align="center"><tr><th class="tg-lboi">Registry ID</th><th class="tg-lboi">' + form.sequence.data + \
                             '</th></tr><tr><td class="tg-lboi">Description</td><td class="tg-lboi">' + results.description + \
                             '</td></tr><tr><td class="tg-lboi">Sequence</td><td class="tg-lboi">' + results.sequence + \
                             '</td></tr><tr><td class="tg-lboi">Activity</td><td class="tg-lboi">' + str(results.activity) + \
                             '</td></tr><tr><td class="tg-lboi">Activity class</td><td class="tg-lboi">' + results.activity_class +  \
                             '</td></tr></table>'
            flash(Markup(table_to_print))
        return redirect(url_for('from_igem'))
    return render_template('from_igem.html', title='Prediction', form=form)
