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
COMMAND := npx tsc --noEmit

# Define colors
GREEN := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
RESET := $(shell tput -Txterm sgr0)

# Define targets
.PHONY: help start create-data-dir remove-data-dir build up down restart logs version remove-volumes clean check

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@egrep '^(.+)\:\ ##\ (.+)' $(MAKEFILE_LIST) | column -t -c 2 -s ':#'

start: build up ## Start Docker containers

create-data-dir: ## Create the data directory
	@echo "$(GREEN)Creating data directory $(DATA_DIR)...$(RESET)"
	@mkdir -p $(DATA_DIR)

remove-data-dir: ## Remove the data directory
	@echo "$(YELLOW)Removing data directory $(DATA_DIR)...$(RESET)"
	@rm -rf $(DATA_DIR)

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

version: ## Show the current version
	@echo "$(GREEN)Current version: $(VERSION)$(RESET)"

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

check:
	@docker exec -it $(DOCKER_FRONT) $(COMMAND); \
    status=$$?; \
    if [ $$status -eq 0 ]; then \
        echo "$(GREEN)SUCCESS$(RESET)"; \
    fi


# update-version: ## Update the version number
# 	@read -p "Enter new version (MAJOR.MINOR.PATCH): " NEW_VERSION; \
# 	MAJOR=$$(echo $$NEW_VERSION | cut -d'.' -f1); \
# 	MINOR=$$(echo $$NEW_VERSION | cut -d'.' -f2); \
# 	PATCH=$$(echo $$NEW_VERSION | cut -d'.' -f3); \
# 	sed -i '' "s/MAJOR ?= [0-9]*/MAJOR ?= $$MAJOR/" $(MAKEFILE_LIST); \
# 	sed -i '' "s/MINOR ?= [0-9]*/MINOR ?= $$MINOR/" $(MAKEFILE_LIST); \
# 	sed -i '' "s/PATCH ?= [0-9]*/PATCH ?= $$PATCH/" $(MAKEFILE_LIST); \
# 	echo "$(GREEN)Version updated to $$NEW_VERSION$(RESET)"
