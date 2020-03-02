all:
	docker build -t ft_server .
	docker run -P -p 80:80 -p443:443 -p8080:8080 -it ft_server
