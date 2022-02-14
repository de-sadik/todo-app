
# Todo-app :star:

### Problem statement
Build a service in Node.js that can be deployed to Docker which exposes a To Do List API and can be consumed from any client.

### Tech Stack used:
1. Node.js Express framework using TypeScript
2. PostgreSQL database
3.	Jest - For unit testing
4.	Yarn - Package Manager
5.	Docker - Containerization
6.	Winston - Logging library

#### server
1. ##### To start server in dev enviornment - 
    ```bash 
    $ yarn run dev
    ```
2. ##### To start server in prodution environment locally - 
    ```bash 
    $ yarn run build 
    $ yarn run prod 
    ```  

##### To Run Test
    $ yarn run test
   

#### Start sever in docker container 
     $ docker-compose up
