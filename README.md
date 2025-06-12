# 📝 Task Manager Microservices App (Dockerized)

This is a simple **Task Manager** application built with **Node.js** and **MongoDB**, containerized using Docker. The app exposes APIs to create and view tasks. It demonstrates Docker's power to run microservices using manual commands—no Docker Compose.

---

## 📌 Application Description

- **Backend**: Node.js Express API that allows users to `GET` all tasks and `POST` a new task.
- **Database**: MongoDB container stores task records.
- **Interaction**: Backend service communicates with MongoDB using a shared Docker network.

---

## 🧭 Architecture Diagram

            +--------------------+
            |  Client (Browser)  |
            +--------------------+
                     |
                     v
           http://localhost:3000/tasks
                     |
             +---------------+
             |   Node.js API |
             | (Express App) |
             +---------------+
                     |
                     v
             +----------------+
             |  MongoDB       |
             | (Dockerized DB)|
             +----------------+


- **Node.js API** talks to **MongoDB** using a custom Docker network (`app-network`).
- Data is persisted using Docker **volumes**.

---

## ⚙️ Tech Stack

| Component  | Technology         |
|------------|--------------------|
| Backend    | Node.js (Express)  |
| Database   | MongoDB            |
| Container  | Docker             |
| Healthcheck| `curl` in Dockerfile |

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Taha-Jamal/DevOps-Assignment.git
cd Backend
npm i

## Commands

##Create docker network:
docker network create app-network

##Start MongoDB Container:
docker volume create mongo-data

docker run -d \
  --name mongo-container \
  --network app-network \
  -v mongo-data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  mongo

 ## Build backend image:
  docker build -t task-backend .

## Run Backend Container:

docker run -d \
  --name backend-container \
  --network app-network \
  -p 3000:3000 \
  -e MONGO_URL="mongodb://admin:secret@mongo-container:27017" \
  task-backend

## Screenshots
![Curl](./image.png)
![Curl](./image-1.png)
![Docker Containers](./image-2.png)
![Docker Hub Image](./image-3.png)

## Explanation of the creative enhancement.
To simulate load balancing, I manually ran multiple instances of the backend service on different ports:

docker run -d --name backend-container-2 --network app-network -p 3001:3000 task-backend

This demonstrates how Docker can be used to horizontally scale services by running multiple containers behind a future load balancer (e.g., Nginx or HAProxy). It's a simple but effective way to show how scalability works in a microservices setup.


## Docker Hub Image
Backend Image: mtahajamal/task-backend on Docker Hub



See reflection.txt for the full reflection on the project.

