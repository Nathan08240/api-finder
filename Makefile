include .env
export 

.PHONY: mongodb
## start MongoDB
mongodb: down
	@docker compose up -d finder-mongodb finder-mongoadmin finder-redis

.PHONY: redis-commander
## start Redis Commander
redis-commander:
    @redis-commander --redis-port={REDIS_PORT} --redis-host={REDIS_HOST} --redis-password={REDIS_PASSWORD}

.PHONY: all
all: mongodb
	@yarn dev

.PHONY: down
## stop and remove containers, networks, images, and volumes
down:
	@docker compose down

GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

TARGET_MAX_CHAR_NUM=20
## Show help
help:
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)