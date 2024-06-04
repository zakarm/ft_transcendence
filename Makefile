# Makefile
# Set default shell
SHELL := /bin/bash

# Set variables
DOCKER_COMPOSE := docker-compose
DOCKER_COMPOSE_FILE := docker-compose.yml
DOCKER_COMPOSE_FLAGS := --env-file .env
# MAJOR ?=
# MINOR ?=
# PATCH ?=
VERSION := $(MAJOR).$(MINOR).$(PATCH)
DATA_DIR := ${HOME}/Desktop/data
DOCKER_FRONT := front-end

# Define colors
GREEN := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
RESET := $(shell tput -Txterm sgr0)
RED := $(shell tput -Txterm setaf 1)
BLUE := $(shell tput -Txterm setaf 4)

# Define targets
.PHONY: help version start build up down restart logs create-data-dir remove-data-dir remove-volumes clean re check tools

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@egrep '^(.+)\:\ ##\ (.+)' $(MAKEFILE_LIST) | column -t -c 2 -s ':#'

version: ## Show the current version
	@echo "$(GREEN)Current version: $(VERSION)$(RESET)"

start: build up ## Start Docker containers

build: create-data-dir ## Build Docker images
	@echo "$(GREEN)Building Docker images...$(RESET)"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) $(DOCKER_COMPOSE_FLAGS) build --no-cache

up: create-data-dir ## Start Docker containers
	@echo "$(GREEN)Starting Docker containers...$(RESET)"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) $(DOCKER_COMPOSE_FLAGS) up -d

down: ## Stop and remove Docker containers
	@echo "$(YELLOW)Stopping and removing Docker containers...$(RESET)"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) $(DOCKER_COMPOSE_FLAGS) down

restart: down build up ## Restart Docker containers

logs: ## View logs from Docker containers
	@echo "$(GREEN)Viewing logs from Docker containers...$(RESET)"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) $(DOCKER_COMPOSE_FLAGS) logs -f

create-data-dir: ## Create the data directory
	@echo "$(GREEN)Creating data directory $(DATA_DIR)...$(RESET)"
	@mkdir -p $(DATA_DIR)

remove-data-dir: ## Remove the data directory
	@echo "$(YELLOW)Removing data directory $(DATA_DIR)...$(RESET)"
	@rm -rf $(DATA_DIR)

remove-volumes: ## Remove Docker volumes
	@echo "$(YELLOW)Removing Docker volumes...$(RESET)"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) $(DOCKER_COMPOSE_FLAGS) down -v

clean: down remove-volumes remove-data-dir ## Clean up build artifacts and temporary files
	@echo "$(YELLOW)Cleaning up build artifacts and temporary files...$(RESET)"
	@rm -rf ./app/front-end/node_modules
	@rm -rf ./app/front-end/.next
	@rm -rf ./app/back-end/__pycache__
	@find . -type f -name '*.pyc' -delete
	@find . -type d -name '__pycache__' -delete
	@rm -rf ./app/back-end/authentication/migrations
	@rm -rf ./app/back-end/game/migrations
	@rm -rf ./app/back-end/dashboards/migrations

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
		4) tool_command="npm run depcheck";; \
		*) echo "Invalid choice!"; exit 1;; \
	esac; \
	echo "$(YELLOW)Running $$tool_command...$(RESET)"; \
	docker exec -it $(DOCKER_FRONT) $$tool_command && echo "$(GREEN)=======>SUCCESS<=======$(RESET)" || echo "$(RED)=======>ERROR<=======$(RESET)"

testfront: ## Run tests for the front-end
	@echo "$(YELLOW)Running tests for the front-end...$(RESET)"
	$(DOCKER_COMPOSE) -f docker-compose_test.yml $(DOCKER_COMPOSE_FLAGS) build --no-cache --progress=plain

nodelink: ## Link node modules
	@echo "$(YELLOW)Linking node modules...$(RESET)"
	@mkdir -p /tmp/front
	@cp -r ./app/front-end/package*.json /tmp/front/
	@npm install --prefix /tmp/front
	@ln -s /tmp/front/node_modules ./app/front-end/node_modules
	@echo "$(GREEN)Node modules linked!$(RESET)"

# update-version: ## Update the version number
# 	@read -p "Enter new version (MAJOR.MINOR.PATCH): " NEW_VERSION; \
# 	MAJOR=$$(echo $$NEW_VERSION | cut -d'.' -f1); \
# 	MINOR=$$(echo $$NEW_VERSION | cut -d'.' -f2); \
# 	PATCH=$$(echo $$NEW_VERSION | cut -d'.' -f3); \
# 	sed -i '' "s/MAJOR ?= [0-9]*/MAJOR ?= $$MAJOR/" $(MAKEFILE_LIST); \
# 	sed -i '' "s/MINOR ?= [0-9]*/MINOR ?= $$MINOR/" $(MAKEFILE_LIST); \
# 	sed -i '' "s/PATCH ?= [0-9]*/PATCH ?= $$PATCH/" $(MAKEFILE_LIST); \
# 	echo "$(GREEN)Version updated to $$NEW_VERSION$(RESET)"
