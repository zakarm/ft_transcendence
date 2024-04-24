PROJECT_NAME = elk
DOCKER_COMPOSE_FILE = docker-compose.yml

COMPOSE_UP = docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) up
COMPOSE_DOWN = docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) down
COMPOSE_BUILD = docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) build
COMPOSE_PULL = docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) pull
COMPOSE_LOGS = docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) logs -f
COMPOSE_PS = docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) ps

all: build up

build:
	@echo "Building containers..."
	@$(COMPOSE_BUILD)

up:
	@echo "Starting containers..."
	@$(COMPOSE_UP) -d

down:
	@echo "Stopping containers..."
	@$(COMPOSE_DOWN)

pull:
	@echo "Pulling latest images..."
	@$(COMPOSE_PULL)

clean: down
	@echo "Removing containers..."
	@$(COMPOSE_DOWN) --rmi all -v

logs:
	@echo "Following logs..."
	@$(COMPOSE_LOGS)

ps:
	@echo "Container status..."
	@$(COMPOSE_PS)

re: clean build up

.PHONY: all build up down pull clean logs ps rebuild
