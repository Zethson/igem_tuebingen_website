#!/bin/bash
# Reference:
# https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-gunicorn-and-nginx-on-ubuntu-18-04

apt-get update

apt-get install python3-pip python3-dev nginx -y

pip3 install virtualenv

cd ~

git clone https://github.com/Zethson/igem_tuebingen_website

cd igem_tuebingen_website

virtualenv dpenv

source dpenv/bin/activate

pip3 install gunicorn

python setup.py clean --all install

cp /home/zeth/igem_tuebingen_website/production_setup/igem_tuebingen_website.service \
/etc/systemd/system/igem_tuebingen_website.service

systemctl start igem_tuebingen_website

systemctl enable igem_tuebingen_website

cp /home/zeth/igem_tuebingen_website/production_setup/igem_tuebingen_website \
/etc/nginx/sites-available/igem_tuebingen_website

ln -s /etc/nginx/sites-available/igem_tuebingen_website /etc/nginx/sites-enabled

nginx -t

systemctl restart nginx

ufw delete allow 5000

ufw allow 'Nginx Full'

add-apt-repository ppa:certbot/certbot -y

apt install python-certbot-nginx -y

certbot --nginx -d igem-tuebingen.com -d www.igem-tuebingen.com --non-interactive --agree-tos -m lukas.heumos@posteo.net







