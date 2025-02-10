# OVED503-NOSQL-MONGO

# Part 1 - Ambiente sviluppo

Tools
- Docker o Podman
- VS Code
- git

Repository:
```shell
git clone https://github.com/aminelli/OVED503-NOSQL-MONGO.git
```


# Part 2 - Tools

## VS Code Plugin

- MongoDB : https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode
- 


## Portainer

- Installation: https://docs.portainer.io/start/install-ce


```shell+
docker volume create portainer_data
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:2.21.5

```

## Mongo DB

```shell
docker pull mongo
```

### Mongo DB - Standalone