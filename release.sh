
#!/bin/sh

export NODE_HOME=/usr/local/nodejs
export PATH=$NODE_HOME/bin:$PATH

cd /usr/share/nginx/normandy_front/front

npm run production_pack
