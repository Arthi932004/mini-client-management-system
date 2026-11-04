# Mini Client Management System

## Project Overview

-> The Mini Client Management System is a full-stack web application developed to manage client information efficiently.

-> It allows administrators to log in securely, view client statistics, and manage client records through a user-friendly dashboard.

## Features

### 1. Authentication

* User login functionality.
* JWT-based authentication.
* Protected dashboard access.

### 2. Dashboard

* Display total clients.
* Display active clients.
* Display inactive clients.
* Navigation between dashboard and client management.

### 3. Client Management

* Add new client details.
* View registered clients.
* Edit existing client information.
* Delete client records.
* Search clients by name, email, and company.

### 4. Form Validation

* Required field validation.
* Email format validation.
* Phone number validation.
* Success and error messages.

### 5. Responsive Design

* User-friendly interface.
* Responsive layout for desktop, tablet, and mobile devices.





## Technologies Used

### Frontend
- React.js
- HTML
- CSS
- JavaScript
- Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Token)

### Tools
- Visual Studio Code
- Postman
- MongoDB Atlas
- Git and GitHub



## Project Folder Structure

client-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Client.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── clientRoutes.js
│   ├── .env
│   ├── package.json
│   ├── resetPassword.js
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Clients.css
│   │   │   ├── Clients.jsx
│   │   │   ├── Dashboard.css
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.css
│   │   │   └── Login.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore




## Installation and Setup

### 1. Clone the Repository

git clone <your-github-repository-url>

### 2. Backend Setup

cd backend

npm install

npm run dev

### 3. Frontend Setup

cd frontend

npm install

npm run dev

### 4. Environment Variables

Create a .env file inside the backend folder.

Add the following variables:

PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>

JWT_SECRET=your_secret_key

# Login 
<img width="1895" height="907" alt="Screenshot 2026-11-04 164957" src="https://github.com/user-attachments/assets/90a0b805-bd3f-4517-b237-c7f2aba6d461" />

# Dashboard
<img width="1842" height="867" alt="Screenshot 2026-11-04 165134" src="https://github.com/user-attachments/assets/884cace0-d33d-4bc7-b37e-7e07f92485f5" />

<img width="1783" height="868" alt="Screenshot 2026-11-04 165149" src="https://github.com/user-attachments/assets/b6b681fa-8120-445e-9725-13ae4f4cccc7" />

# ADD Client
<img width="1886" height="870" alt="Screenshot 2026-11-04 165204" src="https://github.com/user-attachments/assets/e0ea077f-f347-41f2-8983-9b5cd600bc2c" />
<img width="1818" height="905" alt="Screenshot 2026-11-04 165421" src="https://github.com/user-attachments/assets/4052227a-d516-4f05-8647-634f80a97af6" />
<img width="1860" height="878" alt="Screenshot 2026-11-04 165435" src="https://github.com/user-attachments/assets/9da68794-ee63-470a-8daf-93785110f449" />

# UPDATE Client
<img width="1782" height="872" alt="Screenshot 2026-11-04 165505" src="https://github.com/user-attachments/assets/31145ff7-db45-49dc-8944-d2e65ee54915" />
<img width="1847" height="898" alt="Screenshot 2026-11-04 165516" src="https://github.com/user-attachments/assets/2e7cf2c4-ab8a-47e9-9e56-ce6f7e96f802" />

# DELETE Client
<img width="1852" height="902" alt="Screenshot 2026-11-04 165332" src="https://github.com/user-attachments/assets/8207dd85-7c46-4cc5-b2d6-de323ed4c0ac" />
<img width="1855" height="867" alt="Screenshot 2026-11-04 165348" src="https://github.com/user-attachments/assets/42f359a0-7d42-4727-b21c-b8822740bebf" />



## Database Information

- Database: MongoDB
- ODM: Mongoose
- Hosting: MongoDB Atlas

Client information and user authentication details are stored in MongoDB.

<img width="1890" height="900" alt="Screenshot 2026-11-04 165635" src="https://github.com/user-attachments/assets/c24b5465-464a-4828-a163-9ad8d1565a31" />

<img width="1828" height="843" alt="Screenshot 2026-11-04 165649" src="https://github.com/user-attachments/assets/7478d88f-524c-4bed-8029-eae5090acbe6" />


## API Endpoints

# 1. Authentication APIs

* **POST** `/api/auth/register` – Register a new admin.
* **POST** `/api/auth/login` – Admin login.
* **GET** `/api/auth/profile` – Get authenticated user profile (JWT required).

# 2. Client Management APIs

* **POST** `/api/clients` – Add a new client.
* **GET** `/api/clients` – Retrieve all clients.
* **GET** `/api/clients/search?keyword=value` – Search clients by name, email, or company.
* **PUT** `/api/clients/:id` – Update client details.
* **DELETE** `/api/clients/:id` – Delete a client.

