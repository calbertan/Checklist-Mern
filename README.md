# Simple Checklist app built using the MERN-Stack

A simple MERN app that allows the user to add/remove items from their checklists. It acts as a simple starter tool that solely relies on the MERN stack without other libraries and dependencies in order to act as a simple template.

``IMPORTANT``
This app has been configured for deployment to Openshift, so the changes
will need to be made in reverse.

The client runs on port 2015, hosted using Caddy
The server/api runs on port 3001 

## Setting up local development
When setting up for local development, here are some of the 
lines that need to be present.

/api/server.js
```
10  mongoose.connect("mongodb://127.0.0.1:27017/checklist-mern", {
```

/client/src/App.js
```
2  const API_BASE = "http://localhost:3001"
```

1. npm install in both api and client directory
2. npm start on api, then client directory

```
cd ./api
npm install
npm start

cd ../client
npm install
npm start
```

## Creating Docker Images
When moving from a local to a containerized environment, it is important to make the following changes. 

/api/server.js
```
10 mongoose.connect("mongodb://mongo:27017/checklist-mern", {
```

/client/src/App.js
```
2  const API_BASE = "http://localhost:3001"
```


1. After creating the Dockerfile, cd into the client folder containing the file and run the command `docker build -t react-app .`

2. To verify everything is fine, run the command `docker run -p 3000:3000 react-app` .

3. cd into the api folder and run the command `docker build -t node-app .` to build the backend

Below are the commands needed to create the docker images

```
cd ./client
docker build -t react-app .
cd ../api
docker build -t node-app .
```

## Steps to creating a Docker Compose
1. define version and services
2. services will consist of 3 components: `app, api, and mongo`
3. define the images and ports for the components
  3.1 stdin_open keeps the container alive after startup
  3.2 depends_on ensures the depency is installed first (in this case, mongo)

IMPROVEMENTS
4. networks allows for multiple apps to run on separate virtual networks, needs to be defined in each component too
5. volumes allows data persistence, needs to be defined in the database component

running the docker-compose file can be done with the following commands
```
docker-compose build
docker-compose up
```

## Deploying to Openshift
There are several changes that needs to be made before deploying to
Openshift

/api/server.js
```
10  mongoose.connect( process.env.MONGO_URL, {
```

/client/src/App.js
```
2  const API_BASE = process.env.API_URL
```

In addition, an environment variable will need to be added for both the api-pod
and the client pod, which should be callede MONGO_URL and API_URL respectively.
Here are examples of what those environment variables should look like:

```
MONGO_URL=mongodb://dbuser:dbpass@10.96.63.220:27017/mongodb-dev
API_URL=https://api-dev-fe805a-dev.apps.clab.devops.gov.bc.ca
```

The MONGO_URL specifically will require the user and password of the mongo pod,
followed by the location of the mongo service.