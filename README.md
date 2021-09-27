# docker-nodejs-template
This project will create a generic, Dockerized, NodeJS application ready for action!

After following the setup instructions and starting your Docker container, you should have a running NodeJS application with two routes:

* A "Hello, World" HTML page here: https://localhost:3002/
* A Health Check page here: https://localhost:3002/healthcheck


## Technology Stack
##### Language
NodeJS

##### Framework
Express

##### Development Operations
Docker Compose

## Local Development Environment Setup Instructions

### 1: Clone the repository to a local directory
```git clone git@github.com:harvard-lts/docker-nodejs-template.git```

### 2: Copy the cloned files into your own new project repository

After cloning your brand-new project repository, you can copy the files from this repository into it.

### 3: Create app config

##### Create config file for environment variables
- Make a copy of the config example file `./env-example.txt`
- Rename the file to `.env`
- Replace placeholder values as necessary

*Note: The config file .env is specifically excluded in .gitignore and .dockerignore, since it contains credentials it should NOT ever be committed to any repository.*

### 4: Change container and network names in `docker-compose-local.yml`
- change container name on [line 8](/docker-compose-local.yml#L8)
- change network name on [line 21](/docker-compose-local.yml#L21)
- change network name on [lines 26-27](/docker-compose-local.yml#L26-L27)

### 5: Change image names in `docker-compose.yml`
- change image name on [line 10](/docker-compose.yml#L10)

### 6: Change title, description, and author in `package.json`
- change title, description and author on [lines 2-6](/app/resources.py#L2-L6)

### 7: Change uid and gid in `Dockerfile`
- change uid and gid on [line 8](/Dockerfile#L8)

### 8: Start

##### START

This command builds all images and runs all containers specified in the docker-compose-local.yml configuration.

```
docker-compose -f docker-compose-local.yml up --build --force-recreate
```

### 9: SSH into Container (optional)

##### Run docker exec to execute a shell in the container by name

Open a shell using the exec command to access the hgl-downloader container.

```
docker exec -it docker-nodejs-template bash
```

### 10: Stop

##### STOP AND REMOVE

This command stops and removes all containers specified in the docker-compose-local.yml configuration. This command can be used in place of the 'stop' and 'rm' commands.

```
docker-compose -f docker-compose-local.yml down
```

