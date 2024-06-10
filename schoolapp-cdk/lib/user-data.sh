#!/bin/bash
sudo su
yum -y update
yum -y install docker

usermod -a -G docker ec2-user
id ec2-user
newgrp docker

curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

systemctl enable docker.service
systemctl start docker.service
