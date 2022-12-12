install:
		sh bin/install.sh

ps:
		docker-compose ps

up:
		docker-compose up -d

bash:
		docker exec -ti symfony_websocket sh

bash-front:
		docker exec -ti react_websocket sh

stop:
		docker-compose stop

restart: stop up

build-native:
		docker exec react_websocket sh -c 'cd ../react_native_app && yarn install'
start-react-native:
		docker exec react_websocket sh -c 'cd ../react_native_app && yarn web'

build-dev:
		docker-compose up -d
	    docker exec symfony_websocket chown -R www-data: var/
		docker exec symfony_websocket sh -c 'composer install'
		docker exec symfony_websocket sh -c 'symfony console assets:install public'
		docker exec symfony_websocket sh -c 'symfony console doctrine:schema:update --force'
		docker exec symfony_websocket sh -c 'symfony console cache:clear'
		make build-native
		make start-react-native
