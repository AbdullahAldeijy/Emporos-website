# Use the official Python image as a parent image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Upgrade OS packages for security
RUN apt-get update && apt-get upgrade -y && apt-get clean

# Copy requirements.txt and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Run the application with Gunicorn for better production performance
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app