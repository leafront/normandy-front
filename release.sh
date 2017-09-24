#!/bin/bash

export NODE_HOME=/usr/local/nodejs

export PATH=$NODE_HOME/bin:$PATH

export GULP_HOME=/usr/local/nodejs/bin/gulp

cd /usr/share/nginx/normandy_front/front

git fetch git@git.autotechfin.com:yeliang/front.git develop

git checkout -b yeliang/front-develop FETCH_HEAD

git checkout dev

git merge --no-ff yeliang/front-develop

git push origin dev

git branch -D yeliang/front-develop

NODE_ENV=production gulp ejs sass

NODE_ENV=production BABEL_ENV=production webpack -p
