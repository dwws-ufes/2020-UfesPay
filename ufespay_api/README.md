# Ufespay

This is the back-end of the ufespay application.

Tech stack:

- Node
- Express
- Typeorm
- Postgres
- Yarn (as package manager)
- JWT
- Cors

In order to run the server you need to create a .env file with the following text:

```
SECRET=secret
PORT=3003
```

------------------------------

# Steps to run the API

## Docker

1. [Install Docker](https://www.notion.so/Instalando-Docker-6290d9994b0b4555a153576a1d97bee2)

2. To make sure that docker was installed properly, run ```docker -v``` on the terminal;
It should result in something like this:
```
Docker version 20.10.5, build 55c4c88
```

3. We need to install postgres on the port :5432, so this port should be free.
To check if the port is free, run the command ```lsof -i :5423```.
Nothing should appear in the terminal with this command if the port is free.

4. Install the postgres image and create the container:
```
docker run --name ufespay-postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

To check if the container was successfully created (and is running), run:
```
docker ps
```

* Everytime your restart your computer, the docker stop its containers and you need to restart them.
To do that, run the command:
```
docker start ufespay-postgres
```

To stop the container, if needed, run:
```
docker stop ufespay-postgres
```

------------------------------
## DBeaver

1. [Install DBeaver](https://dbeaver.io/download/)

2. After start Dbeaver, create a connection with postgres:
  - Select Postgres and click next;
  - On the main tab, set the field:
  ```
  Host: localhost
  Port: 5432
  Database: postgres
  username: postgres
  Password: docker
  ```
  - On the PostgresSQL tab, mark "Show all databases" as selected;
  - Click ```Finish```.

3. Right click on the ```postgres``` connection on the left bar and select ```create > database```
4. Set the datebase name as ```ufespay``` and click ok.

- If Everything went right, the database was created.
------------------------------
## Run project

1. To install the project dependencies, run:
```
yarn
```
or 
```
npm install
```

2. Now, run the command to create all the tables from the DB:
```
yarn typeorm migration:run
```
3. To run the server on [http://localhost:3003](http://localhost:3003).
```
yarn dev:server
```


cainan:

tem coisa de postgre rodando na porta 5432 qnd eu reinicio o pc

p apagar ele preciso pegar o PID em:
  sudo lsof -i :5432

e matar o processo com:
  sudo kill -9 <PID>

só então devo dar start no container:
  sudo docker start ufespay-postgres