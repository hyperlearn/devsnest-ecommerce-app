#!/bin/bash
echo ‘installing requirements…’ 
apt-get install -y npm
npm install
echo ‘start server…’
pm2 restart test

echo ‘started server. ending SSH session..’
exit