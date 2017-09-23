#!/bin/sh

export NODE_HOME=/usr/local/nodejs

export PATH=$NODE_HOME/bin:$PATH

cd /usr/share/nginx/normandy_front/front

git fetch $1 develop

git checkout -b $2 FETCH_HEAD

git checkout dev

git merge --no-ff $2

git push origin dev

git branch -D $2

NODE_ENV=production gulp ejs sass

npm run build

pm2 kill

npm run production
