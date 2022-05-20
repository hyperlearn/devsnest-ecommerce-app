#!/bin/bash
echo ‘installing requirements…’ 
apt-get install -y npm
npm install
echo ‘start server…’
pm2 restart index

echo ‘started server. ending SSH session..’
exit