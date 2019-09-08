# Usage:
#   Build: `docker build . -t nb`
#   Run: `docker run -ti -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock -v ~/volumes:/volumes nb`

FROM debian:latest

# Update package manager
RUN apt update

# Install Sudo
RUN apt install --yes sudo

# Install Curl
RUN apt install --yes curl

# Install Docker CLI and give it access to the parent Daemon
RUN apt install --yes docker.io
VOLUME [ "/var/run/docker.sock:/var/run/docker.sock" ]

# Install Node
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install -y nodejs

# Copy local files into container
COPY . .
WORKDIR /src
# RUN npm install

ENV PORT=8080
CMD npm run start
