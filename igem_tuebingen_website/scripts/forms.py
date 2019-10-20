from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired


class SequenceForm(FlaskForm):
    sequence = StringField('Amino Acid Sequence', validators=[DataRequired()])
    submit = SubmitField('Predict')


class UniprotForm(FlaskForm):
    sequence = StringField('UniProtKB Accession Number', validators=[DataRequired()])
    submit = SubmitField('Predict')


class IGEMForm(FlaskForm):
    sequence = StringField('iGEM Registry ID', validators=[DataRequired()])
    submit = SubmitField('Predict')
