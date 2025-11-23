# Scoreboard Service - Backend Module

## Overview / Purpose

This module implements a **real-time scoreboard** service for a website.  
It maintains top user scores and allows live updates upon user actions.

**Goals:**

- Provide top 10 users leaderboard.
- Update scores in real-time.
- Ensure security to prevent score tampering.
- Be scalable and maintainable for high load.

---

## Functional Requirements

1. Users perform actions on the website (any action type).
2. Each action triggers an **API call** to increment the user’s score.
3. Scoreboard displays **Top 10 users** with live updates.
4. Authorization is enforced to prevent malicious score manipulation.

---

## API Specification

### 1️⃣ Increment User Score

**POST** `/score/increment`  
**Headers:** `Authorization: Bearer <JWT>`  
**Body:**
{
"userId": 123,
"deltaScore": 10
}
Responses:

200 OK → { "userId": 123, "newScore": 120 }

401 Unauthorized → invalid/missing token

400 Bad Request → invalid input

2️⃣ Get Top 10 Scoreboard
GET /score/top10
Headers: optional Authorization: Bearer <JWT> (if needed)

Response:
[
{ "userId": 1, "name": "Alice", "score": 500 },
{ "userId": 2, "name": "Bob", "score": 480 },
...
]

Database Schema
Users Table
CREATE TABLE users (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
score INT DEFAULT 0
);

Score Log Table
CREATE TABLE score_log (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
delta_score INT NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);

Flow / Sequence Diagram (ASCII)
flowchart TD
A[User Action on Website] --> B[Client triggers API call]
B --> C[POST /score/increment]
C --> D[API Server: validate JWT & input]
D --> E[Update DB: users.score, score_log]
E --> F[Update Cache: Redis top 10]
F --> G[Broadcast via WebSocket to clients]
B --> H[GET /score/top10]
H --> F

Security Measures
JWT Authentication for each request
Input validation to prevent injection
Rate limiting to prevent score spam
Server-side verification for valid user actions
Optional: logging suspicious activities

Future Improvements / Notes
Queue system (RabbitMQ/Kafka) for handling high throughput updates
Microservice scaling: separate scoreboard service from main app
Caching strategy: Redis top 10 for faster reads
Analytics module: track user behavior, trends
WebSocket vs SSE: support live update to clients efficiently

Tech Stack Recommendation
Node.js + Express
PostgreSQL for persistent storage
Redis for caching top scores
WebSocket (or SSE) for live updates
Optional: message queue for async processing

Summary
This module is designed to be secure, scalable, and maintainable.
It can serve as a foundation for a competitive scoreboard system while preventing cheating and allowing high performance live updates.
