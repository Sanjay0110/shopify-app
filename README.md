# Shopify Customer Management App

This project is designed to manage customers in a Shopify store through a simple web application. Below are the steps to set up and run both the Express API and React UI.

## Prerequisites

- **Node.js** (v21.0.2)
- **react** (v18+)
- **Git**

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Sanjay0110/shopify-app.git
cd shopify-app
```

### 2. Run the API Server:
Navigate to the api directory
```bash
cd express-api
```

Create a .env file:
```bash
PORT=3001
SHOPIFY_ACCESS_TOKEN=<access_token>
SHOPIFY_DOMAIN=<domain>
```

Install the dependencies and start the server
```bash
npm install
npm start
```

### 2. Run the React App:
Navigate to the react app directory
```bash
cd react-frontend
```

Create a .env file:
```bash
REACT_APP_API_URL=http://localhost:3001
```

Install the dependencies and start the react app
```bash
npm install
npm start
```

## Accessing the Application

- **API Server**: Open your browser and go to http://localhost:3001 to access the API.
- **React App**: Open your browser and go to http://localhost:3000 to access the customer management UI.