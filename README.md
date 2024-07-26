# ZK-Snark Demo

This repository contains a full-stack demo application that generates and verifies Zero-Knowledge SNARK proofs. The application is divided into two main parts: the backend server and the frontend client.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Overview

This project demonstrates the use of Zero-Knowledge SNARK proofs. The backend is responsible for generating and verifying the proofs, while the frontend provides an interface for users to interact with these functionalities.

## Technologies Used

- **Backend**: Node.js, Express, SNARKJS
- **Frontend**: Next.js, React, Tailwind CSS

## Folder Structure

```plaintext
zk-snark-demo/
├── backend/
│   ├── node_modules/
│   ├── jkp/
│   │   ├── circuit_js/
│   │   │   └── circuit.wasm
│   │   └── circuit_0000.zkey
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── next.svg
│   │   └── vercel.svg
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   └── Navbar.js
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   ├── pages/
│   │   │   ├── api/
│   │   │   │   └── endpoint.js
│   │   │   └── zk-snark.js
│   ├── package.json
│   ├── package-lock.json
│   └── tailwind.config.js
└── README.md
```

## Installation

### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

### Running the Backend Server

1. Start the backend server:
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:3000`.

### Running the Frontend

1. Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend will run on `http://localhost:3000`.

### Accessing the Application

Open your browser and navigate to `http://localhost:3000/zk-snark` to access the ZK-SNARK demo page.

## API Endpoints

### Backend API

- **POST** `/api/data`
  - **Description**: Receives data and stores it.
  - **Body**: `{ "data": "some data" }`
  - **Response**: `{ "message": "Data received successfully" }`

- **GET** `/api/status`
  - **Description**: Returns the status of the received data.
  - **Response**: `{ "status": "No data received" }`

- **POST** `/api/generateProof`
  - **Description**: Generates a proof based on the provided secret.
  - **Body**: `{ "secret": "your secret" }`
  - **Response**: `{ "proof": "...", "publicSignals": "..." }`

- **POST** `/api/verifyProof`
  - **Description**: Verifies the provided proof and public signals.
  - **Body**: `{ "proof": "...", "publicSignals": "..." }`
  - **Response**: `{ "message": "Verification OK" }` or `{ "message": "Invalid proof" }`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

This README provides a comprehensive guide to your project, including an overview, technologies used, folder structure, installation steps, usage instructions, API endpoints, and license information. Adjust the paths and descriptions as necessary to fit your specific setup and requirements.