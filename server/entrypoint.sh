#!/bin/sh

echo "Waiting for PostgreSQL..."

while ! nc -z $SQL_HOST $SQL_PORT; do
  sleep 0.5
done

echo "PostgreSQL is up - running migrations"
python manage.py makemigrations --no-input
python manage.py migrate --no-input

echo "Starting server..."
exec "$@"