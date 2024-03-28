### How to Start


#### change environment variables
```
- server
cd into server and make a copy of .env.example and rename it to .env

- client
cd into client and make a copy of .env.example and rename it to .env
```

### Database 
if you use docker cd into server and run the following command  

```shell
docker-compose up -d
```

otherwise please provide your local database instance and use the configuration from the env file in the server directory


### Data seeding

cd into server directory and run the following command

```shell
npm run seed
```

### Starting the Apps (client & server)

cd into the server directory and run the following command
```shell
npm run start
```



### open the client/web app
open your browser and navigate to the http://localhost:3000

### API documentation
open your browser and navigate to the http://localhost:3001/api-docs



<!-- npx ts-node src/swagger.ts -->