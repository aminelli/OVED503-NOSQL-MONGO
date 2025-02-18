

```shell

# Creazione rete
docker network create net-mongo-cluster

# nei comandi docker successivi sostituire 10.0.0.43 l'ip della propria macchina
# Creazione mongodb primary
docker run -d --name mongo-repl-primary -h mongo-repl-primary --add-host mongo.cluster.local:10.0.0.43 -p 28017:27017 --network net-mongo-cluster mongo mongod --replSet avanadeRepSet  --bind_ip_all  
# --bind_ip 10.0.0.43,mongo-repl-primary

docker run -d --name mongo-repl-secondary-01 -h mongo-repl-secondary-01 --add-host mongo.cluster.local:10.0.0.43 -p 28018:27017 --network net-mongo-cluster mongo mongod --replSet avanadeRepSet  --bind_ip_all 
#--bind_ip 10.0.0.43,mongo-repl-secondary-01
docker run -d --name mongo-repl-secondary-02 -h mongo-repl-secondary-02 --add-host mongo.cluster.local:10.0.0.43 -p 28019:27017 --network net-mongo-cluster mongo mongod --replSet avanadeRepSet  --bind_ip_all 
#--bind_ip 10.0.0.43,mongo-repl-secondary-02

# initiate classic
docker exec -it mongo-repl-primary mongosh --eval 'rs.initiate({_id: "avanadeRepSet",members: [{ _id: 0, host : "mongo.cluster.local:28017" },{ _id: 1, host : "mongo.cluster.local:28018" },{ _id: 2, host : "mongo.cluster.local:28019"}]})'

docker exec -it mongo-repl-primary mongosh --eval "rs.initiate({_id: 'avanadeRepSet',members: [{ _id: 0, host : 'mongo.cluster.local:28017' },{ _id: 1, host : 'mongo.cluster.local:28018' },{ _id: 2, host : 'mongo.cluster.local:28019'}]})"

# apt-get install -y wget curl nano htop jq iputils-ping net-tools iproute2 git


docker exec -it mongo-repl-primary mongosh --eval "rs.status()"
docker exec -it mongo-repl-secondary-01 mongosh --eval "rs.status()"
docker exec -it mongo-repl-secondary-02 mongosh --eval "rs.status()"

```
### Modifica file host locale (della macchina host per intenderci); sostituire a 10.0.0.43 l'ip della propria macchina
10.0.0.43 mongo.cluster.local 



## String di connessione per client
mongodb://mongo.cluster.local:28017,mongo.cluster.local:28018,mongo.cluster.local:28019/?tls=false&replicaSet=avanadeRepSet

# docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongo-repl-primary



```javascript

// Initiate base 

rs.initiate(
   {
      _id: "avanadeRepSet",
      members: [
         { _id: 0, host : "mongo.cluster.local:28017" },
         { _id: 1, host : "mongo.cluster.local:28018" },
         { _id: 2, host : "mongo.cluster.local:28019"}
      ]
   }
)

// Initiate with arbitrer and hidden replica node

rs.initiate(
   {
      _id: "avanadeRepSet",
      members: [
         { _id: 0, host : "mongo.cluster.local:28017", priority: 1, votes: 1 },
         { _id: 1, host : "mongo.cluster.local:28018", priority: 1, },
         { _id: 2, host : "mongo.cluster.local:28019", priority: 0, hidden: true},
         { _id: 3, host : "mongo.cluster.local:28020", arbiterOnly: true}
      ]
   }
)



```