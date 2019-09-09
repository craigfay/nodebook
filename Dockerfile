FROM debian:latest

# Update package manager
RUN apt update

# Install Sudo
RUN apt install --yes sudo

# Install Curl
RUN apt install --yes curl

# Install Docker CLI to access the parent's Docker Daemon
RUN apt install --yes docker.io

# Install Node
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install -y nodejs
