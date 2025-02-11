

```shell

# Creazione rete
docker network create net-mongo-cluster

# CREAZIONE REPLICASET CONFIG SERVERS
# docker run -d --name srv-conf-01 -h srv-conf-01 --add-host mongo.cluster.local:10.0.0.43 -p 29017:29017 --network net-mongo-cluster mongo mongod --port 29017 --configsvr --replSet srv-conf  --bind_ip_all
docker run -d --name srv-conf-01 -h srv-conf-01 --add-host mongo.cluster.local:10.0.0.43 -p 29017:27017 --network net-mongo-cluster mongo mongod --port 27017 --configsvr --replSet srv-conf  --bind_ip_all
docker run -d --name srv-conf-02 -h srv-conf-02 --add-host mongo.cluster.local:10.0.0.43 -p 29018:27017 --network net-mongo-cluster mongo mongod --port 27017 --configsvr --replSet srv-conf  --bind_ip_all
docker run -d --name srv-conf-03 -h srv-conf-03 --add-host mongo.cluster.local:10.0.0.43 -p 29019:27017 --network net-mongo-cluster mongo mongod --port 27017 --configsvr --replSet srv-conf  --bind_ip_all

docker exec -it srv-conf-01 mongosh --eval "rs.initiate({_id: 'srv-conf',configsvr: true,version: 1,members: [{ _id: 0, host : 'mongo.cluster.local:29017' },{ _id: 1, host : 'mongo.cluster.local:29018' },{ _id: 2, host : 'mongo.cluster.local:29019' }]})"
docker exec -it srv-conf-01 mongosh --eval "rs.status()"

# CREAZIONE SHARD 1
docker run -d --name srv-sh01-rs01 -h srv-sh01-rs01 --add-host mongo.cluster.local:10.0.0.43 -p 28017:27017 --network net-mongo-cluster mongo mongod --port 27017 --shardsvr --replSet srv-sh01 --bind_ip_all
docker run -d --name srv-sh01-rs02 -h srv-sh01-rs02 --add-host mongo.cluster.local:10.0.0.43 -p 28018:27017 --network net-mongo-cluster mongo mongod --port 27017 --shardsvr --replSet srv-sh01 --bind_ip_all
docker run -d --name srv-sh01-rs03 -h srv-sh01-rs03 --add-host mongo.cluster.local:10.0.0.43 -p 28019:27017 --network net-mongo-cluster mongo mongod --port 27017 --shardsvr --replSet srv-sh01 --bind_ip_all

docker exec -it srv-sh01-rs01 mongosh --eval "rs.initiate({_id: 'srv-sh01',version: 1,members: [{ _id: 0, host : 'mongo.cluster.local:28017' },{ _id: 1, host : 'mongo.cluster.local:28018' },{ _id: 2, host : 'mongo.cluster.local:28019' }]})"
docker exec -it srv-sh01-rs01 mongosh --eval "rs.status()"

# CREAZIONE SHARD 2
docker run -d --name srv-sh02-rs01 -h srv-sh02-rs01 --add-host mongo.cluster.local:10.0.0.43 -p 28117:27017 --network net-mongo-cluster mongo mongod --port 27017 --shardsvr --replSet srv-sh02 --bind_ip_all
docker run -d --name srv-sh02-rs02 -h srv-sh02-rs02 --add-host mongo.cluster.local:10.0.0.43 -p 28118:27017 --network net-mongo-cluster mongo mongod --port 27017 --shardsvr --replSet srv-sh02 --bind_ip_all
docker run -d --name srv-sh02-rs03 -h srv-sh02-rs03 --add-host mongo.cluster.local:10.0.0.43 -p 28119:27017 --network net-mongo-cluster mongo mongod --port 27017 --shardsvr --replSet srv-sh02 --bind_ip_all

docker exec -it srv-sh02-rs01 mongosh --eval "rs.initiate({_id: 'srv-sh02',version: 1,members: [{ _id: 0, host : 'mongo.cluster.local:28117' },{ _id: 1, host : 'mongo.cluster.local:28118' },{ _id: 2, host : 'mongo.cluster.local:28119'}]})"
docker exec -it srv-sh02-rs01 mongosh --eval "rs.status()"

# CREAZIONE SHARD 3
docker run -d --name srv-sh03-rs01 -h srv-sh03-rs01 --add-host mongo.cluster.local:10.0.0.43 -p 28217:27017 --network net-mongo-cluster mongo mongod --port 27017 --shardsvr --replSet srv-sh03 --bind_ip_all
docker run -d --name srv-sh03-rs02 -h srv-sh03-rs02 --add-host mongo.cluster.local:10.0.0.43 -p 28218:27017 --network net-mongo-cluster mongo mongod --port 27017 --shardsvr --replSet srv-sh03 --bind_ip_all
docker run -d --name srv-sh03-rs03 -h srv-sh03-rs03 --add-host mongo.cluster.local:10.0.0.43 -p 28219:27017 --network net-mongo-cluster mongo mongod --port 27017 --shardsvr --replSet srv-sh03 --bind_ip_all

docker exec -it srv-sh03-rs01 mongosh --eval "rs.initiate({_id: 'srv-sh03',version: 1,members: [{ _id: 0, host : 'mongo.cluster.local:28217' },{ _id: 1, host : 'mongo.cluster.local:28218' },{ _id: 2, host : 'mongo.cluster.local:28219'}]})"
docker exec -it srv-sh03-rs01 mongosh --eval "rs.status()"

# CREAZIONE ROUTERS
docker run -d --name srv-router-01 -h srv-router-01 --add-host mongo.cluster.local:10.0.0.43 -p 29117:27017 --network net-mongo-cluster mongo mongos --port 27017 --configdb srv-conf/mongo.cluster.local:29017,mongo.cluster.local:29018,mongo.cluster.local:29019  --bind_ip_all
docker run -d --name srv-router-02 -h srv-router-02 --add-host mongo.cluster.local:10.0.0.43 -p 29118:27017 --network net-mongo-cluster mongo mongos --port 27017 --configdb srv-conf/mongo.cluster.local:29017,mongo.cluster.local:29018,mongo.cluster.local:29019  --bind_ip_all


docker exec -it srv-router-01 mongosh --eval "sh.addShard('srv-sh01/mongo.cluster.local:28017');sh.addShard('srv-sh01/mongo.cluster.local:28018');sh.addShard('srv-sh01/mongo.cluster.local:28019');sh.addShard('srv-sh02/mongo.cluster.local:28117');sh.addShard('srv-sh02/mongo.cluster.local:28118');sh.addShard('srv-sh02/mongo.cluster.local:28119');sh.addShard('srv-sh03/mongo.cluster.local:28217');sh.addShard('srv-sh03/mongo.cluster.local:28218');sh.addShard('srv-sh03/mongo.cluster.local:28219');"
docker exec -it srv-router-02 mongosh --eval "sh.addShard('srv-sh01/mongo.cluster.local:28017');sh.addShard('srv-sh01/mongo.cluster.local:28018');sh.addShard('srv-sh01/mongo.cluster.local:28019');sh.addShard('srv-sh02/mongo.cluster.local:28117');sh.addShard('srv-sh02/mongo.cluster.local:28118');sh.addShard('srv-sh02/mongo.cluster.local:28119');sh.addShard('srv-sh03/mongo.cluster.local:28217');sh.addShard('srv-sh03/mongo.cluster.local:28218');sh.addShard('srv-sh03/mongo.cluster.local:28219');"


docker exec -it srv-router-01 mongosh --eval "sh.status();"
```

```javascript

// Inizializzazione replicaset per config servers

rs.initiate(
   {
      _id: 'srv-conf',
      configsvr: true,
      version: 1,
      members: [
         { _id: 0, host : 'mongo.cluster.local:29017' },
         { _id: 1, host : 'mongo.cluster.local:29018' },
         { _id: 2, host : 'mongo.cluster.local:29019' }
      ]
   }
)

// Inizializzazione replicaset shard 01

rs.initiate(
   {
      _id: 'srv-sh01',
      version: 1,
      members: [
         { _id: 0, host : 'mongo.cluster.local:28017' },
         { _id: 1, host : 'mongo.cluster.local:28018' },
         { _id: 2, host : 'mongo.cluster.local:28019' }
      ]
   }
)

// Inizializzazione replicaset shard 02

rs.initiate(
   {
      _id: 'srv-sh02',
      version: 1,
      members: [
         { _id: 0, host : 'mongo.cluster.local:28117' },
         { _id: 1, host : 'mongo.cluster.local:28118' },
         { _id: 2, host : 'mongo.cluster.local:28119'}
      ]
   }
)

// Inizializzazione replicaset shard 03

rs.initiate(
   {
      _id: 'srv-sh03',
      version: 1,
      members: [
         { _id: 0, host : 'mongo.cluster.local:28217' },
         { _id: 1, host : 'mongo.cluster.local:28218' },
         { _id: 2, host : 'mongo.cluster.local:28219'}
      ]
   }
)


// Configurazione sia per router 01 che per router 02
sh.addShard('srv-sh01/mongo.cluster.local:28017');
sh.addShard('srv-sh01/mongo.cluster.local:28018');
sh.addShard('srv-sh01/mongo.cluster.local:28019');
sh.addShard('srv-sh02/mongo.cluster.local:28117');
sh.addShard('srv-sh02/mongo.cluster.local:28118');
sh.addShard('srv-sh02/mongo.cluster.local:28119');
sh.addShard('srv-sh03/mongo.cluster.local:28217');
sh.addShard('srv-sh03/mongo.cluster.local:28218');
sh.addShard('srv-sh03/mongo.cluster.local:28219');


```

Conf routers:
srv-conf/mongo.cluster.local:29017,mongo.cluster.local:29018,mongo.cluster.local:29019


