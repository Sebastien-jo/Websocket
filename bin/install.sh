#!/bin/bash

# build docker compose
docker-compose up --force-recreate --build -d

docker exec symfony_websocket sh -c 'composer install'
docker exec symfony_websocket sh -c 'symfony console assets:install public'

docker exec symfony_websocket sh -c 'symfony console doctrine:database:create --if-not-exists'
docker exec symfony_websocket sh -c 'symfony console cache:clear'

docker exec symfony_websocket sh -c 'chown -Rf www-data: var/'
docker exec symfony_websocket sh -c 'symfony console d:s:u --force'
docker exec symfony_websocket sh -c 'symfony console d:f:l --append'

docker exec react_websocket sh -c 'cd ../react_native_app && yarn install'
docker exec react_websocket sh -c 'cd ../react_native_app && yarn web'

#docker exec symfony_websocket sh -c 'npm install'
#docker exec symfony_websocket sh -c 'npm run watch'