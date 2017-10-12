#!/bin/bash

export NODE_HOME=/root/.nvm/versions/node/v8.6.0

export PATH=$NODE_HOME/bin:$PATH

cd /usr/share/nginx/normandy_front/front

git fetch git@git.autotechfin.com:$1/front.git dev

git checkout -b $1/front-dev FETCH_HEAD

git checkout dev

git merge --no-ff $1/front-dev

git push

git branch -D $1/front-dev

npm run production_pack
