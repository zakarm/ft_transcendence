# Set default shell
SHELL := /bin/bash

# Set variables
DOCKER_COMPOSE		:= docker-compose
DOCKER_COMPOSE_FILE	:= docker-compose.yml
DATA_DIR			:= ${HOME}/Desktop/data
HOST_NAME			:= $(shell hostname)
IP_ADDRESS			:= $(shell dig +short $(HOST_NAME))
CONTAINERS			:= $(shell docker ps --format '{{.Names}}')

# Define colors
RED		:= $(shell tput -Txterm setaf 1)
GREEN	:= $(shell tput -Txterm setaf 2)
YELLOW	:= $(shell tput -Txterm setaf 3)
BLUE	:= $(shell tput -Txterm setaf 4)
MAGENTA	:= $(shell tput -Txterm setaf 5)
CYAN	:= $(shell tput -Txterm setaf 6)
WHITE	:= $(shell tput -Txterm setaf 7)
RESET	:= $(shell tput -Txterm sgr0)

# Define targets
.PHONY: help start build up down restart logs create-data-dir remove-data-dir remove-volumes clean re check tools

help: ## Show this help message
	@echo "$(YELLOW)Usage: make [target]$(RESET)"
	@echo ""
	@echo "$(YELLOW)Targets:$(RESET)"
	@egrep '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(RESET) %s\n", $$1, $$2}'

start: build up ## Start Docker containers

build: create-data-dir ## Build Docker images
	@echo "$(GREEN)Building Docker images...$(RESET)"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build --no-cache

up: create-data-dir ## Start Docker containers
	@echo "$(GREEN)Starting Docker containers...$(RESET)"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d

down: ## Stop and remove Docker containers
	@echo "$(YELLOW)Stopping and removing Docker containers...$(RESET)"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down

restart: ## Restart Docker containers
	@echo "$(YELLOW)Restarting Docker containers...$(RESET)"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) restart

logs: ## View logs from Docker containers
	@echo "$(GREEN)Viewing logs from Docker containers...$(RESET)"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f

logs-container: ## View logs from a specific Docker container
	@echo "$(GREEN)Viewing logs from a specific Docker container...$(RESET)"
	@echo "$(YELLOW)Available containers:$(RESET)"
	@counter=1; \
	for container in $(CONTAINERS); do \
		echo "$(RED)$$counter. $(BLUE)$$container$(RESET)"; \
		counter=$$((counter + 1)); \
	done
	@read -p "$(MAGENTA)Select a container to view logs (1-$(words $(CONTAINERS))): $(RESET)" container_choice; \
	container_name=$$(echo "$(CONTAINERS)" | tr ' ' '\n' | sed -n "$$container_choice"p); \
	if [ -z "$$container_name" ]; then \
		echo "Invalid choice!"; \
		exit 1; \
	fi; \
	echo "$(GREEN)Viewing logs from the $$container_name container...$(RESET)"; \
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f $$container_name

restart-container: ## Restart a specific Docker container
	@echo "$(YELLOW)Restarting a specific Docker container...$(RESET)"
	@echo "$(YELLOW)Available containers:$(RESET)"
	@counter=1; \
	for container in $(CONTAINERS); do \
		echo "$(RED)$$counter. $(BLUE)$$container$(RESET)"; \
		counter=$$((counter + 1)); \
	done
	@read -p "$(MAGENTA)Select a container to restart (1-$(words $(CONTAINERS))): $(RESET)" container_choice; \
	container_name=$$(echo "$(CONTAINERS)" | tr ' ' '\n' | sed -n "$$container_choice"p); \
	if [ -z "$$container_name" ]; then \
		echo "Invalid choice!"; \
		exit 1; \
	fi; \
	echo "$(YELLOW)Restarting the $$container_name container...$(RESET)"; \
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) restart $$container_name

build-container: ## Build a specific Docker container
	@echo "$(YELLOW)Building a specific Docker container...$(RESET)"
	@echo "$(YELLOW)Available containers:$(RESET)"
	@counter=1; \
	for container in $(CONTAINERS); do \
		echo "$(RED)$$counter. $(BLUE)$$container$(RESET)"; \
		counter=$$((counter + 1)); \
	done
	@read -p "$(MAGENTA)Select a container to build (1-$(words $(CONTAINERS))): $(RESET)" container_choice; \
	container_name=$$(echo "$(CONTAINERS)" | tr ' ' '\n' | sed -n "$$container_choice"p); \
	if [ -z "$$container_name" ]; then \
		echo "Invalid choice!"; \
		exit 1; \
	fi; \
	echo "$(YELLOW)Building the $$container_name container...$(RESET)"; \
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build --no-cache $$container_name

create-data-dir: ## Create the data directory
	@echo "$(GREEN)Creating data directory $(DATA_DIR)...$(RESET)"
	@mkdir -p $(DATA_DIR)

remove-data-dir: ## Remove the data directory
	@echo "$(YELLOW)Removing data directory $(DATA_DIR)...$(RESET)"
	@${sudo} rm -rf $(DATA_DIR)

remove-volumes: ## Remove Docker volumes
	@echo "$(YELLOW)Removing Docker volumes...$(RESET)"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down -v

remove-images: ## Remove Docker images
	@echo "$(YELLOW)Removing Docker images...$(RESET)"
	@docker rmi -f $(shell docker images -q)

remove-networks: ## Remove Docker networks
	@echo "$(YELLOW)Removing Docker networks...$(RESET)"
	@docker network prune -f

remove-containers: ## Remove Docker containers
	@echo "$(YELLOW)Removing Docker containers...$(RESET)"
	@docker rm -f $(shell docker ps -a -q)

clean: down remove-volumes remove-data-dir ## Clean up build artifacts and temporary files
	@echo "$(YELLOW)Cleaning up build artifacts and temporary files...$(RESET)"
	@${sudo} rm -rf ./app/front-end/node_modules
	@${sudo} rm -rf ./app/front-end/.next
	@find . -type d -name '__pycache__' -exec ${sudo} rm -rf {} +
	@${sudo} rm -rf ./app/back-end/authentication/migrations
	@${sudo} rm -rf ./app/back-end/compu_ai/migrations
	@${sudo} rm -rf ./app/back-end/game/migrations
	@${sudo} rm -rf ./app/back-end/dashboards/migrations
	@${sudo} rm -rf ./app/back-end/chat/migrations

re: clean start ## Clean and start Docker containers

check: ## Check the status of the Docker containers
	@echo "$(YELLOW)Available tools:$(RESET)"
	@echo "$(BLUE)1. TypeScript compiler (no emit)$(RESET)"
	@echo "$(BLUE)2. Check for package updates$(RESET)"
	@echo "$(BLUE)3. Check for Update package versions$(RESET)"
	@echo "$(BLUE)4. Check for unused dependencies$(RESET)"
	@read -p "Select a tool (1-4): " tool_choice; \
	case $$tool_choice in \
		1) tool_command="npx tsc --noEmit";; \
		2) tool_command="npx npm-check --skip-unused";; \
		3) tool_command="npx npm-check-updates --silent";; \
		4) tool_command="npx depcheck";; \
		*) echo "Invalid choice!"; exit 1;; \
	esac; \
	echo "$(YELLOW)Running $$tool_command...$(RESET)"; \
	docker exec -it front-end $$tool_command && echo "$(GREEN)=======>SUCCESS<=======$(RESET)" || echo "$(RED)=======>ERROR<=======$(RESET)"

test-images: ## Run tests for the images
	@echo "$(YELLOW)Running tests for the images...$(RESET)"
	@echo "$(BLUE)1. Test the front-end image$(RESET)"
	@echo "$(BLUE)2. Test the back-end image$(RESET)"
	@echo "$(BLUE)3. Test the data-base image$(RESET)"
	@echo "$(BLUE)4. Test the adminer image$(RESET)"
	@echo "$(BLUE)5. Test the redis image$(RESET)"
	@read -p "Select an image to test (1-5): " image_choice; \
	case $$image_choice in \
		1) image_name="front-end";; \
		2) image_name="back-end";; \
		3) image_name="data-base";; \
		4) image_name="adminer";; \
		5) image_name="redis";; \
		*) echo "Invalid choice!"; exit 1;; \
	esac; \
	echo "$(YELLOW)Testing the $$image_name image...$(RESET)"; \
	$(DOCKER_COMPOSE) -f docker-compose.yml build --no-cache --progress=plain $$image_name

nodelink: ## Link node modules
	@echo "$(YELLOW)Linking node modules...$(RESET)"
	@mkdir -p ${HOME}/goinfre/front
	@cp -r ./app/front-end/package*.json ${HOME}/goinfre/front
	@npm install --prefix ${HOME}/goinfre/front
	@ln -s ${HOME}/goinfre/front/node_modules ./app/front-end/node_modules
	@echo "$(GREEN)Node modules linked!$(RESET)"

venvlink: ## Link venv modules
	@echo "$(YELLOW)Linking venv...$(RESET)"
	@mkdir -p ${HOME}/goinfre/back
	@python3 -m venv ${HOME}/goinfre/back/venv
	@ln -s ${HOME}/goinfre/back/venv ./
	@echo "$(GREEN)Venv linked!$(RESET)"

prune: ## Remove all stopped containers, dangling images, and unused networks and volumes
	@echo "$(YELLOW)Pruning Docker system...$(RESET)"
	@docker system prune -a -f --volumes

linkIp: ## Link IP address
	@echo "$(YELLOW)Linking IP address...$(RESET)"
	@echo "$(GREEN)IP address: $(IP_ADDRESS)$(RESET)"
	@echo "$(GREEN)HOST name: $(HOST_NAME)$(RESET)"
	@echo "$(GREEN)Linking IP address...$(RESET)"
	@sed -i '' 's/localhost/${HOST_NAME}/g' .env
	@sed -i '' 's/localhost/${HOST_NAME}/g' ./app/front-end/.env
	@sed -i '' 's/localhost/${HOST_NAME}/g' ./services/nginx/nginx.conf
	@echo "$(GREEN)IP address linked!$(RESET)"

restorenv: ## Restore the .env file
	@echo "$(YELLOW)Restoring the .env file...$(RESET)"
	@cp .env.example .env
	@echo "$(GREEN).env file restored!$(RESET)"

data-generator: ## Generate data
	@echo "$(YELLOW)Generating data...$(RESET)"
	@docker exec -it back-end bash -c "python3 tools/scripts/generator/generator.py"

switch_docker_context: ## Switch Docker context
	@echo "$(YELLOW)Switching Docker context...$(RESET)"
	@docker context use default

print-%: ## Print the value of a variable
	@echo $($*)
