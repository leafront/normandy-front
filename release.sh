#!/bin/sh

export NODE_HOME=/usr/local/nodejs

export PATH=$NODE_HOME/bin:$PATH

cd /usr/share/nginx/normandy_front/front

git fetch git@git.autotechfin.com:yeliang/front.git develop

git checkout -b yeliang/front-develop FETCH_HEAD

git checkout dev

git merge --no-ff yeliang/front-develop

git push origin dev

git branch -D yeliang/front-develop

npm run production_pack
