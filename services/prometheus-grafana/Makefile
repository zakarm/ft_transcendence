# Start Docker Compose
up:
	docker-compose up -d

# Stop Docker Compose
down:
	docker-compose down

# Remove all Docker containers, images, volumes, and networks created by Docker Compose
clean:
	docker-compose down --rmi all --volumes --remove-orphans

# Rebuild the Docker images
build:
	docker-compose build

# Restart the Docker Compose services
re:
	docker-compose down
	docker-compose up -d

.PHONY: up down clean build restart
