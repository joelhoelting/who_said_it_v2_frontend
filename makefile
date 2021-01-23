setup:
	docker volume create nodemodules
install:
	docker-compose -f docker-compose.builder.yml run --rm install
dev:
	docker-compose up
build:
	docker-compose -f docker-compose.builder.yml run --rm build