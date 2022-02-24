# Clients 'N' Cities 🙎‍♂🗺

This API RESTful includes the four basic CRUD operations and it is about a relational system between clients and its cities.

## 💾 Resources

- Node.JS v14.17.6;
- Docker v20.10.11;
- Docker-compose v1.29.2;
- PosgresSQL v14.1;
- Postman v8.12.5 (for testing endpoits).


## 💻 Run locally

If you want to run the project on your local machine, just follow the steps below:

### 1️⃣ Starting...

To get started, you simply need to clone the project repository on your machine and install the dependencies.

```
  git clone https://github.com/ludico1959/clients-n-cities
```

### 2️⃣ Requirements

Before installing the dependencies from the project, you need to have already installed on your machine:

* **Node.Js**: If you don't have it, just download [here](https://nodejs.org/en/download/).
* **Docker Desktop**: If you don't have it, just download [here](https://docs.docker.com/get-docker/).

### 3️⃣ Instaling dependencies

Open cmd.exe your command-line interpreter and enter the path of your project. Then just type the following instruction: 

```
npm install
```

By typing the statement above, it will automatically download all the dependencies listed in the package.json file inside the folder **node_modules**:

### 4️⃣ Setting environment variables

For using and creating tables in the Postgres database on your Docker container, you must set the ormconfig variables. But don't worry, it's very easy! There's a file called ormconfig.example.json in the root of the folders project. There, you can edit the variables as you like and than rename it to **ormconfig.json**. 
For more information about, [click here](https://typeorm.io/#/using-ormconfig).

Also, it's required that you also rename the file called config.example.env to **config.env**. You may change the PORT environment variable if you want, but if you don't, it will be setted as 3333 in the server file, located in the root folder.

### 5️⃣ Creating and running the Docker containers 

Before finally running the app, you need to create the docker container to run our Postgres database. For that, we will use the **docker-compose.yml** file on the root of the project. First thing is to open your Docker Desktop and type this command on the command-line interpreter: 

*Note: There is also a Dockerfile in the root of the project, but just ignore it for this moment. It's goal is to create a image from this API, just like the other services in the docker-compose file: postgres and pgadmin. By the way, inside of this file you can see the app service commented! But, as I said, you don't need to worry about that.*   
```
    docker-compose up
```
Now your containers are running! You can see them on your Docker Desktop window. But we are not finished, there are other few commands I need you to write. Starting with this:
```
    docker ps
```
It will show a list of your containers running. For now, just select the CONTAINER ID from the one with the postgres image, its name is **database_pg** and type the command below, changing the placeholder %ID% with the CONTAINER ID you just copied:
```
    docker exec -it %ID% bash
```
It will execute your database container. There, just type the command below:
```
    psql -U docker
```
"docker" is the username set on the docker-compose.yml file. Than type this Postgrest command o create a database:
```
    create database client-n-cities
```
As you can see, it will create our database called client-n-cities. 
And now, finally, run our migrations to create our tables in the database. 
You will do this through this last comand!
```
    node node_modules/typeorm/cli.js
```
Great! Just one more simple step and your app will finally work!

### 6️⃣ Running the application

Well, now on the command-line interpreter, just start the server for the project to run locally typing:

```
node src/app/server.js
```
And that's it, folks! Congratulations, your app is running locally.

## 🚀 Test

I will put here two options for using this API: 

#### 🧮 Swagger UI

The first one, using Swagger UI, is more user friendly. To use it, just type the following route in the seach bar of your favorite brownser!
But wait! It is import to notice that maybe you will have to change some information on this url, like the port number 3333, for example.

```
http://localhost:3333/api/v1/api-docs/
```

#### 📮 Postman

The second one is not so user friendly, so I strong recommeded using the Swagger UI option above. But, as long as I was using Postman while I was creating the endpoints, I think it is valid to keep it and even a similar program called Insomnia as options. 
For using it, just import the **postman_collection.json** from inside the test folder. 

* **Postman**: [download here](https://www.postman.com/downloads/).
* **Insomnia**: [download here](https://insomnia.rest/download).


## 📡 Run remotely

To be updated...
