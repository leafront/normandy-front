#!/bin/bash

export NODE_HOME=/root/.nvm/versions/node/v8.6.0

export PATH=$NODE_HOME/bin:$PATH

cd /usr/share/nginx/normandy_front/front

git fetch git@git.autotechfin.com:jinjizhao/front.git dev

git checkout -b jinjizhao/front-dev FETCH_HEAD

git checkout dev

git merge --no-ff jinjizhao/front-dev

git push

git branch -D jinjizhao/front-dev

npm run production_pack
