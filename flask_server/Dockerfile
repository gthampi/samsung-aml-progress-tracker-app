# TODO: File not needed after yaml setup
# Dockerfile

# Use the base Python 3.9 image
FROM python:3.9

# Install required packages
# RUN apt-get update && apt-get install -y \
#     vim \
#     ssh \
#     scp

# Install the required package (pymatgen)
RUN pip install pymatgen

# Set the working directory
# WORKDIR .

# WORKDIR /app

# Copy your application code into the container
# COPY . /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

# Command to run your application
# CMD ["python", "server.py"]

# EXPOSE 5000
