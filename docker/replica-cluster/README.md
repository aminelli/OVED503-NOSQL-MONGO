

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

docker exec -it mongo-repl-primary mongosh --eval 'rs.initiate({_id: "avanadeRepSet",members: [{ _id: 0, host : "mongo-repl-primary:27017" },{ _id: 1, host : "mongo-repl-secondary-01:27017" },{ _id: 2, host : "mongo-repl-secondary-02:27017" }]})'


docker exec -it mongo-repl-primary mongosh --eval "rs.status()"
docker exec -it mongo-repl-secondary-01 mongosh --eval "rs.status()"
docker exec -it mongo-repl-secondary-02 mongosh --eval "rs.status()"

```
"rs.initiate({_id: \"avanadeRepSet\",members: [{ _id: 0, host : \"mongo-repl-primary:27017\" },{ _id: 1, host : \"mongo-repl-secondary-01:27017\" },{ _id: 2, host : \"mongo-repl-secondary-02:27017\" }]})"
"rs.initiate({_id: 'avanadeRepSet',members: [{ _id: 0, host : 'mongo-repl-primary:27017' },{ _id: 1, host : 'mongo-repl-secondary-01:27017' },{ _id: 2, host : 'mongo-repl-secondary-02:27017' }]})"
      

```javascript

rs.initiate(
   {
      _id: "avanadeRepSet",
      members: [
         { _id: 0, host : "mongo-repl-primary:27017" },
         { _id: 1, host : "mongo-repl-secondary-01:27017" },
         { _id: 2, host : "mongo-repl-secondary-02:27017" }
      ]
   }
)

```