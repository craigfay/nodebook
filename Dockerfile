# Usage:
#   Build: `docker build . -t nb`
#   Run: `docker run -t -p 8080:8080 nb`

FROM ubuntu:latest

# Update package manager
RUN apt update

# Install Curl
RUN apt install --yes curl

# Install Docker
RUN apt install --yes docker.io

# Install Node
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install -y nodejs

# Copy local files into container
COPY . .
WORKDIR /src
RUN npm install

ENV PORT=8080
CMD npm run start
