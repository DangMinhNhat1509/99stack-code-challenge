# Problem 5 – CRUD Backend (ExpressJS + TypeScript + PostgreSQL + Docker)

This project implements a simple CRUD backend using **ExpressJS**, **TypeScript**, and **PostgreSQL**.  
It is built as part of the 99 Stack / 99Tech code challenge.

---

## 🚀 Features

- Create a resource
- List resources (support filtering by name)
- Get resource details
- Update resource
- Delete resource
- PostgreSQL database persistence
- Docker-compatible

## 🛠 Tech Stack

- **Node.js + Express**
- **TypeScript**
- **PostgreSQL**
- **Docker Compose**
- **pg (PostgreSQL client)**

---

## 📁 Project Structure

problem-5-backend/
├── src/
│ ├── db.ts
│ └── server.ts
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── README.md
└── .env

## ⚙️ Environment Setup

Create a file named **.env** in the project root:

PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=mydb

## 🐳 Running PostgreSQL Using Docker

Make sure **Docker Desktop is running**, then start the DB:

docker-compose up -d

yaml
Copy code

This launches PostgreSQL with:

| Key      | Value     |
| -------- | --------- |
| Host     | localhost |
| Port     | 5432      |
| User     | user      |
| Password | password  |
| Database | mydb      |

## 🗄️ Database Schema

Run inside the container:

docker exec -it problem-5-backend-db-1 psql -U user -d mydb
Then create table:
CREATE TABLE resources (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL
);

📦 Install Dependencies
npm install

▶️ Run the Server
Development mode:
npm run dev

Server runs at:
http://localhost:5000
