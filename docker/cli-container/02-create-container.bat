@echo off

docker run -it --rm --name mongo-shell -h mongo-shell --network=net-corso-mongo avanade-mongo-shell:v1.0 /bin/bash