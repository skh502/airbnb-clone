FROM python:3.12-slim

WORKDIR /app/djnagoserver

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy entrypoint to root directory
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
RUN sed -i 's/\r$//g' /entrypoint.sh

# Copy the rest of the code
COPY . .

ENTRYPOINT ["/entrypoint.sh"]