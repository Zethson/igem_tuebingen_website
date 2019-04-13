# iGEM Tuebingen Website
[![Build Status](https://travis-ci.org/Zethson/igem_tuebingen_website.svg?branch=development)](https://travis-ci.org/Zethson/igem_tuebingen_website)

The website is accessible here:     
[iGEM Tuebingen](http://igem-tuebingen.de)

iGEM is an international competition for synthetic biology. The university of Tuebingen regularly participates successfully. The website provides information about the competition and team Tuebingen's projects.

# Local Setup
```
$ rename the mail_stub.conf in igem_tuebingen_website/static to mail.conf
$ overwrite the stub values in mail.conf with a gmail account 
$ enable less secure applications in your gmail account
$ python setup.py clean --all install
$ igem_tuebingen_website -l 127.0.0.1
```
If you don't want to enable messaging support you can skip steps 1-3.
Less secure applications need to be enabled to receive and send messages in any forms.    
You can find the credentials for our gmail website service account in our centralized drive document.   
Consult the [translation docs](docs/translations) for instructions to update the translations.         
Point your browser to http://127.0.0.1:5000/    

# Production Setup
A small description for the production setup (there are setup scripts provided) is given here: [Production Setup](production_setup/README.md)
