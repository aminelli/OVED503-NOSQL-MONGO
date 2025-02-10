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

```shell    
docker network create net-corso-mongo
# "Subnet": "172.20.0.0/16",
# "Gateway": "172.20.0.1"
docker network ls

# Comando base
docker run -d --name mongo-standalone -h mongo-standalone -p 27117:27017 --network net-corso-mongo mongo
docker exec -it mongo-standalone /bin/bash
docker logs -f mongo-standalone


# Comando base con volumi
docker volume create vol-mongo-db
docker volume create vol-mongo-config
docker run -d --name mongo-standalone -h mongo-standalone -p 27117:27017 --network net-corso-mongo -v vol-mongo-db:/data/db -v vol-mongo-config:/data/configdb mongo

# Comando base con volumi + utenza admin default
docker run -d --name mongo-standalone -h mongo-standalone -p 27117:27017 --network net-corso-mongo -v vol-mongo-db:/data/db -v vol-mongo-config:/data/configdb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=Corso2025 mongo

# Di seguito comando in forma leggibile umana
# docker run 
#     -d 
#     --name mongo-standalone 
#     -h mongo-standalone 
#     -p 27117:27017 
#     --network net-corso-mongo 
#     -v vol-mongo-db:/data/db 
#     -v vol-mongo-config:/data/configdb 
#     -e MONGO_INITDB_ROOT_USERNAME=root 
#     -e MONGO_INITDB_ROOT_PASSWORD=Corso2025 
#     mongo

```