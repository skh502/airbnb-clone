#!/bin/sh

# Wait for Postgres to be ready
echo "Waiting for Postgres..."
while ! nc -z $SQL_HOST $SQL_PORT; do
    sleep 0.1
done
echo "PostgreSQL started"

# Run Django migrations
python manage.py migrate

# Execute any command passed to container
exec "$@"
