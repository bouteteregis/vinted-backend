sudo docker run -d --net mongo-network --name mongodb  -e MONGO_INITDB_ROOT_USERNAME=admin  -e MONGO_INITDB_ROOT_PASSWORD=password   -p 27017:27017  mongo