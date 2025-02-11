FROM ubuntu:noble
# FROM ubuntu:latest


RUN apt-get update
RUN apt-get install -y wget curl nano htop jq iputils-ping net-tools iproute2 git
RUN apt-get install -y gnupg

RUN wget -qO- https://www.mongodb.org/static/pgp/server-8.0.asc | tee /etc/apt/trusted.gpg.d/server-8.0.asc
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list

RUN apt-get update
RUN apt-get install -y mongodb-mongosh

RUN wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2404-x86_64-100.11.0.deb
RUN apt install -y ./mongodb-database-tools-*.deb
RUN rm -rf *.deb

CMD ["/bin/bash"]




