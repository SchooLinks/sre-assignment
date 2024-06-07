FROM python:3.9-slim

RUN apt update && apt install -y default-libmysqlclient-dev build-essential
RUN python -m pip install --upgrade pip pipenv

COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock
RUN python -m pipenv install

COPY . .
