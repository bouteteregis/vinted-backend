sudo docker run -d --net mongo-network -e ME_CONFIG_MONGODB_SERVER=mongodb  -p 8081:8081 --name mongo-express  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin  -e ME_CONFIG_MONGODB_ADMINPASSWORD=password  mongo-express