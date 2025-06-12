
## Tech Stack
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Docker:** For containerization and networking

## Docker Usage
- Each service runs in its own container.
- Services communicate via a custom Docker bridge network.
- MongoDB data is stored using Docker volumes.
- A `HEALTHCHECK` monitors the Node.js API.
- Custom monitoring script pings MongoDB and restarts if unhealthy (creative enhancement).

---

## Setup Instructions

### Step 1: Create Docker Network
```bash
docker network create app-network

![alt text](image.png)
![alt text](image-1.png)
