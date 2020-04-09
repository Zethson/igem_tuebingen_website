export FLASK_APP=igem_tuebingen_website/app.py
flask translate update
flask translate compile
sudo python3 setup.py clean --all install
igem_tuebingen_website -l 127.0.0.1
