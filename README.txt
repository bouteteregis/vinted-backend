sudo docker run -d --net mongo-network --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -p 27017:27017 mongo

sudo docker run -d --net mongo-network -e ME_CONFIG_MONGODB_SERVER=mongodb -p 8081:8081 --name mongo-express -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=password mongo-express
