# Secure Voting Application

## Overview

The Secure Voting Application is a decentralized and cryptographically secure voting system built using Post-Quantum Cryptography (PQC). It utilizes React for the frontend, Spring Boot for the backend, and an SQL database for storing votes and user information. The system ensures integrity, confidentiality, and authenticity using PQC algorithms such as Dilithium and Kyber.

## Features

*  Secure authentication and voter verification

*  End-to-end encryption using post-quantum cryptography

*  Tamper-proof and transparent voting process

*  Decentralized and scalable architecture

*  User-friendly UI for voting and results visualization

## Technologies Used

### Frontend:

*  React.js

*  JavaScript 

*  CSS / Material UI

* Axios for API communication

*  npm (Node Package Manager)

### Backend:

*  Spring Boot

*  Java with Lombok

*  MySQL (SQL database)

*  Hibernate (ORM for database interaction)

*  Spring Security for authentication

*  liboqs-java for post-quantum cryptographic operations

## Installation and Setup

###  Prerequisites

Ensure you have the following installed:

*  Node.js and npm

*  Java 17+

*  Spring Boot

*  MySQL

*  Docker (optional for containerization)

Clone the Repository

```
git clone https://github.com/your-username/secure-voting-app.git
cd secure-voting-app
```

### Backend Setup

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

### Frontend Setup

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


## Security and Post-Quantum Cryptography

* Digital signatures using Dilithium for voter authentication

* Key encapsulation using Kyber for secure key exchange

* Secure TLS 1.3 communication between client and server

Running with Docker

To containerize the application:
```
docker-compose up --build
```

Contributing

1. Fork the repository.

2. Create a feature branch (git checkout -b feature-name).

3. Commit changes (git commit -m "Added new feature").

4. Push to the branch (git push origin feature-name).

5. Open a Pull Request.


Contact

For inquiries, contact **aswinm2203@gmail.com**
