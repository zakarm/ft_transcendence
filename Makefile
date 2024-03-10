dc-up = docker-compose up
dc-upb = docker-compose up --build
dc-down = docker-compose down
dp = docker ps
drm = docker system prune -af
dc-downp = docker-compose down --rmi all --volumes --remove-orphans

all: mkdir upb

mkdir: 
	mkdir -p /Users/$(USER)/Desktop/data

rmdir: down
	rm -rf /Users/$(USER)/Desktop/data

up:
	$(dc-up)

upb:
	$(dc-upb)

down:
	$(dc-down)

ps:
	$(dp)

prune:
	$(drm)

fclean: rmdir prune

re: fclean all