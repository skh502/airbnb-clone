# Use official Python image
FROM python:3.12.2-slim-bullseye

# Set work directory inside container
WORKDIR /app/djnagoserver

# Prevent Python from writing pyc files & enable unbuffered logging
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies (like netcat for wait scripts)
RUN apt-get update && apt-get install -y netcat

# Upgrade pip
RUN pip install --upgrade pip

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy entrypoint script and make it executable
COPY entrypoint.sh .
RUN sed -i 's/\r$//g' entrypoint.sh
RUN chmod +x entrypoint.sh

# Copy all backend files
COPY . .

# Set entrypoint
ENTRYPOINT ["/app/djnagoserver/entrypoint.sh"]

# Default command (if your entrypoint doesn’t run server)
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
