# Information
This application imports products from <a href="https://dummyjson.com/docs/products">here</a> (clickable) in the background using BullMQ queue management system. Once imported, you can retrieve a list of products or get details about a specific product through the API.

Before you begin, ensure you have the following installed:
- docker
- docker-compose

# Getting started
## Environment Setup
Create a ```.env``` file in the root directory based on the provided example:
```bash
cp .env.example .env
```
Modify any configuration variables in the ```.env``` file if needed.

## Starting the application
Run the following command to start the application in detached mode:
```bash
docker-compose up -d
```
This will:
- start a PostgreSQL database container
- start a Redis container for queue management
- start the backend application that handles product imports and API requests

To restart the application run the following command:
```bash
docker-compose down
docker-compose up -d
```

## Accessing the API
Once the application is running, you can access:
- swagger documentation: ```http://localhost:{your_port}/swagger```, where your_port = 4444 by default (if not provided in ```.env``` file, then 4000)
- API endpoint to import products: ```http://localhost:{your_port}/import```
- API endpoint for all products: ```http://localhost:{your_port}/products```
- API endpoint for a specific product: ```http://localhost:{your_port}/products/{id}```
