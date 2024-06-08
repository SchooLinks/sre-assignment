#!/bin/bash
sudo su
yum -y update
yum -y install docker

usermod -a -G docker ec2-user
id ec2-user
newgrp docker

yum -y install python3-pip
pip3 install docker-compose

systemctl enable docker.service
systemctl start docker.service
