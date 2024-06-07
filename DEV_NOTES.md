# Overview
These are notes related to my solution. A place for me to keep track of issues and problems I have to solve related to the project.

# Plan
## Work through the "Getting Started" section
The following were some issues encountered while running through the "Getting Started" section.
### Made edits to the README.md due to the `pipenv install` line being confusing.
It wanted me to install the dependencies, not install pipenv.
### Had to install pipenv via instructions on https://pipenv.pypa.io/en/latest/
Had to use `pip install pipenv` instead of the `pip install -user pipenv` because I was installing in a venv created by pyenv.
### Created a docker-compose.yml to provision a local mysql
- Ran `docker-compose up -d --build` to build the mysql server container
- Ran `DATABASE_HOST=127.0.0.1 pipenv run python schoolapp/manage.py migrate`. Had to override the `DATABASE_HOST` because using `localhost` tries connecting via sockets rather than tcp.
### Attempting access once the server was running produced a 400 response.
- Response was `Invalid HTTP_HOST header: '127.0.0.1:8000'. You may need to add '127.0.0.1' to ALLOWED_HOSTS.`
- Adding "127.0.0.1" to the ALLOWED_HOSTS in the `setting.py` allowed access.
### Successfully connected to the admin after creating a user.
After creating a user and getting a better understanding of the project, I moved on to working on the "Requirments".

## Work through "Requirements"
After some analysis paralysis, I decided to go with building out the docker-compose.yml to spin up the database and django app. Once that is working, I'll create an AWS CDK project to create an EC2 instance in the free tier with docker-compose installed. When the instance is created, the code can be copied to the instance and deployed using `docker-compose`.

### Docker Compose instructions
These can be run locally or on the infrastructure after the code is copied to it.
1. Build the images: `docker-compose build`
1. Start the services: `docker-compose up -d`
1. Run migrations: `docker-compose run schoolapp pipenv run python manage.py migrate`
1. Create an admin user: `docker-compose run schoolapp pipenv run python manage.py createsuperuser`
1. (Local Only) Open a browser to the following site: `http://localhost:80`

### AWS CDK instructions

### Possible Improvements
- Add running the migrations as part of the app Dockerfile.
