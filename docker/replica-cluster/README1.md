

```shell

# Creazione rete
docker network create net-mongo-cluster

# Creazione mongodb primary
docker run -d --name mongo-repl-primary -h mongo-repl-primary -p 28017:27017 --network net-mongo-cluster mongo mongod --replSet avanadeRepSet  --bind_ip_all  
# --bind_ip 10.0.0.43,mongo-repl-primary

docker run -d --name mongo-repl-secondary-01 -h mongo-repl-secondary-01 -p 28018:27017 --network net-mongo-cluster mongo mongod --replSet avanadeRepSet  --bind_ip_all 
#--bind_ip 10.0.0.43,mongo-repl-secondary-01
docker run -d --name mongo-repl-secondary-02 -h mongo-repl-secondary-02 -p 28019:27017 --network net-mongo-cluster mongo mongod --replSet avanadeRepSet  --bind_ip_all 
#--bind_ip 10.0.0.43,mongo-repl-secondary-02

# initiate classic
docker exec -it mongo-repl-primary mongosh --eval 'rs.initiate({_id: "avanadeRepSet",members: [{ _id: 0, host : "mongo-repl-primary:27017" },{ _id: 1, host : "mongo-repl-secondary-01:27017" },{ _id: 2, host : "mongo-repl-secondary-02:27017"}]})'

# initiate with horizons
docker exec -it mongo-repl-primary mongosh --eval 'rs.initiate({_id: "avanadeRepSet",members: [{ _id: 0, host : "mongo-repl-primary:27017",      horizons: { "mongo-repl-primary:27017"      : "localhost:28017" } },{ _id: 1, host : "mongo-repl-secondary-01:27017", horizons: { "mongo-repl-secondary-01:27017" : "localhost:28018"  }},{ _id: 2, host : "mongo-repl-secondary-02:27017", horizons: { "mongo-repl-secondary-02:27017" : "localhost:28019" }}]})'


docker exec -it mongo-repl-primary mongosh --eval "rs.status()"
docker exec -it mongo-repl-secondary-01 mongosh --eval "rs.status()"
docker exec -it mongo-repl-secondary-02 mongosh --eval "rs.status()"

```

mongodb://localhost:28017,localhost:28018,localhost:28019/?tls=false&replicaSet=avanadeRepSet
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongo-repl-primary


```javascript
rs.initiate({_id: "avanadeRepSet",members: [{ _id: 0, host : "mongo-repl-primary:27017" },{ _id: 1, host : "mongo-repl-secondary-01:27017" },{ _id: 2, host : "mongo-repl-secondary-02:27017"}]})


rs.initiate(
   {
      _id: "avanadeRepSet",
      members: [
         { _id: 0, host : "mongo-repl-primary:27017" },
         { _id: 1, host : "mongo-repl-secondary-01:27017" },
         { _id: 2, host : "mongo-repl-secondary-02:27017"}
      ]
   }
)


rs.initiate(
   {
      _id: "avanadeRepSet",
      members: [
         { _id: 0, host : "mongo-repl-primary:27017", hostAliases: [] },
         { _id: 1, host : "mongo-repl-secondary-01:27017" },
         { _id: 2, host : "mongo-repl-secondary-02:27017"}
      ],
        // Impostazioni aggiuntive del ReplicaSet
        settings: {
            chainingAllowed: true
        }
   }
)



rs.initiate(
   {
      _id: "avanadeRepSet",
      members: [
         { _id: 0, host : "mongo-repl-primary:27017",      horizons: { "mongo-repl-primary:27017"      : "localhost:28017" }},
         { _id: 1, host : "mongo-repl-secondary-01:27017", horizons: { "mongo-repl-secondary-01:27017" : "localhost:28018" }},
         { _id: 2, host : "mongo-repl-secondary-02:27017", horizons: { "mongo-repl-secondary-02:27017" : "localhost:28019" }}
      ]
   }
)

```