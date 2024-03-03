# Django Deployment Challenge

### Background

The Schoolinks Platform runs on a frontend (React) and a backend API (Django),
on top of (MySQL). Additionally, our caching layer is Redis and asynchronous
task management uses Celery. If you join Schoolinks you will spend a lot of
time with this infrastructure.

One of the core users we serve is our Implementation Managers and Specialists
on our Customer Success team.  As part of the implementation and support
process, they must be able to access Django admin to perform various tasks
which are users cannot perform for themselves within the app.

### Objective

The objective of this challenge is to take the backend codebase provided and
deploy it on an infrastructure of your choice. Below we will outline more
detailed requirements, but at a high level, the objectives are:

1. Access and login into Django Admin and use it to perform CRUD actions.
1. Setup metric and log collection.
1. Bonus: IaC.

### Getting Started

Before deploying we should make sure we can run the project locally

1. cd to `src`.
1. Setup the project
   1. Install pipenv by running `pipenv install`
1. Create a database with name, username, and password as specified in the
   settings file
1. Run `python manage.py migrate` to run migrations
1. Run server by doing `python manage.py runserver`
1. You should be able to access the main app at
   [http://127.0.0.1:8000](http://127.0.0.1:8000/) and Django admin at
[http://127.0.0.1:8000/admin/login/?next=/admin/](http://127.0.0.1:8000/admin/login/?next=/admin/)
1. In order to access the admin we need to Run `python manage.py
   createsuperuser` with any creds you’d like
1. Ensure you can access the Django admin via the creds you created

### Requirements

- You may deploy the project on any AWS infrastructure using any services you
  prefer.
  - Please share the URLs to use to access Django admin
  - Bonus: Have the ability to scale horizontally
- The infrastructure must be accessible via SSH. Please provide details so we
  can SSH onto the machine. They can be shared creds
- All dependencies in Pipfile must be successfully installed on the server
  - The project comes packed with dependencies which you can find in the
    `Pipfile`
    - To install run `pipenv install`
- Database must be created, migrations should be ran successfully. The
  configurations for the database are found in settings.py. This is where you
will see what the database should be named and the username and password we
expect to be able to use to access it.
  - We should be able to access the MySQL monitor by running `python manage.py
    dbshell` in the shell from the server that the code is hosted on.
- The metrics collected should be either in dashboard or searchable. Please
  provide access to it.
- Logs should be searchable. Please provide access to them.
