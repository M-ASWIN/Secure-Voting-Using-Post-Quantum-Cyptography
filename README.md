Secure Voting Application

Overview

The Secure Voting Application is a decentralized and cryptographically secure voting system built using Post-Quantum Cryptography (PQC). It utilizes React for the frontend, Spring Boot for the backend, and an SQL database for storing votes and user information. The system ensures integrity, confidentiality, and authenticity using PQC algorithms such as Dilithium and Kyber.

Features

Secure authentication and voter verification

End-to-end encryption using post-quantum cryptography

Tamper-proof and transparent voting process

Decentralized and scalable architecture

User-friendly UI for voting and results visualization

Technologies Used

Frontend:

React.js

TypeScript (optional)

Tailwind CSS / Material UI

Axios for API communication

Redux for state management (if required)

npm (Node Package Manager)

Backend:

Spring Boot

Java with Lombok

PostgreSQL / MySQL (SQL database)

Hibernate (ORM for database interaction)

Spring Security for authentication

liboqs-java for post-quantum cryptographic operations

Hardware Security Module (HSM) integration

Installation and Setup

Prerequisites

Ensure you have the following installed:

Node.js and npm

Java 17+

Spring Boot

PostgreSQL / MySQL

Docker (optional for containerization)

Clone the Repository

```
git clone https://github.com/your-username/secure-voting-app.git
cd secure-voting-app
```

Backend Setup

Navigate to the backend folder:

```
cd backend
```

Install dependencies:

```
mvn clean install
```

Configure database in application.properties:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/secure_voting
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
```

Run the Spring Boot server:

```
mvn spring-boot:run
```

Frontend Setup

Navigate to the frontend folder:

```
cd frontend
```

Install dependencies:
```
npm install
```
Start the development server:
```
npm start
```
API Endpoints

Method

Endpoint

Description

POST

/api/auth/register

Register a new user

POST

/api/auth/login

User authentication

GET

/api/vote/candidates

Get list of candidates

POST

/api/vote/cast

Cast a secure vote

GET

/api/vote/results

Retrieve voting results

Security and Post-Quantum Cryptography

Digital signatures using Dilithium for voter authentication

Key encapsulation using Kyber for secure key exchange

Secure TLS 1.3 communication between client and server

Hardware Security Module (HSM) used for key generation and storage

Running with Docker

To containerize the application:

docker-compose up --build

Contributing

Fork the repository.

Create a feature branch (git checkout -b feature-name).

Commit changes (git commit -m "Added new feature").

Push to the branch (git push origin feature-name).

Open a Pull Request.


Contact

For inquiries, contact your-email@example.com.
