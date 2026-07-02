# Distributed Job Scheduling Platform

A production-inspired distributed job scheduling platform built using Node.js, Express, PostgreSQL, Prisma, and React. The system supports asynchronous background job execution, retries, dead letter queues, scheduled jobs, worker monitoring, and a real-time dashboard.

---

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication

### Project and Queue Management

* Create Projects
* Create Queues
* Queue Monitoring

### Job Scheduling

* Create and Execute Jobs
* Scheduled Jobs
* Cron Jobs
* Background Worker Processing

### Reliability Features

* Atomic Job Claiming
* Retry Mechanism
* Exponential Backoff
* Dead Letter Queue (DLQ)
* Graceful Worker Shutdown

### Monitoring

* Worker Heartbeats
* Dashboard Statistics
* Job Explorer
* Execution Logs

---

## Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* JWT Authentication

### Frontend

* React.js
* Axios
* CSS

---

## System Architecture

React Dashboard → Express REST APIs → Prisma ORM → PostgreSQL Database → Worker Services

The system uses background workers to process jobs asynchronously while maintaining reliability through retries and dead letter queues.

---

## Database Entities

* User
* Project
* Queue
* Job
* RetryPolicy
* JobExecution
* DeadLetterQueue
* Worker
* WorkerHeartbeat

---

## Prerequisites

* Node.js (v18 or later)
* PostgreSQL
* npm
* Git

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Distributed-Job-Scheduler.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/scheduler
JWT_SECRET=your_secret_key
PORT=5000
```

Run migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Jobs

* POST `/api/jobs`
* GET `/api/jobs`
* GET `/api/jobs/:id`

### Dashboard

* GET `/api/dashboard/stats`

---

## Reliability Features

### Retry Mechanism

Failed jobs are automatically retried using exponential backoff.

### Dead Letter Queue

Jobs exceeding the maximum retry limit are moved to a Dead Letter Queue for later inspection.

### Atomic Job Claiming

Database-level atomic updates prevent multiple workers from executing the same job simultaneously.

### Worker Monitoring

Workers periodically send heartbeats and expose their status through the dashboard.

---

## Testing

The following functionalities were tested:

* User Registration
* User Login
* JWT Authentication
* Job Creation
* Scheduled Jobs
* Retry Mechanism
* Dead Letter Queue
* Worker Processing
* Dashboard APIs

Testing was performed using Postman and manual integration testing.

---

## Future Improvements

* WebSocket-based real-time dashboard
* Multiple distributed worker instances
* Queue pause and resume
* Email notifications
* Docker deployment
* Kubernetes support
* Redis-based job queue

---


## Author

**Dhruv**

Distributed Job Scheduling Platform – Software Engineering Assignment.
