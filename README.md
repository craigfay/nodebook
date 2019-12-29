# About
This repository is an example of how to achieve a fully containerized application runtime with multi-tenancy. This is to say that one containerized application can manage the creation of others, for use by individual clients.

This example gives clients an interface for running safe (containerized) server side code (NodeJS) from the browser, in the style of [Runkit](https://runkit.com/home) or [Jupyter Notebook](https://jupyter.org/).

# System Requirements
* Docker version 19.03.5
* docker-compose version 1.24.1

# How to Use
* Run application: `docker-compose up`
* Interact at `localhost:8080/index.html`
