# NGO Registration and Donation Management System (NSS Project)

## Overview
The **NGO Registration and Donation Management System** is a full-stack web application developed to address common challenges faced by non-governmental organizations in managing user registrations and donations.

In many real-world NGO platforms, user data is often lost when a donation process is interrupted or not completed. This project solves that problem by **decoupling user registration from the donation workflow**, ensuring that all registered users are securely stored in the system regardless of donation status.

The application emphasizes **data integrity, transparency, and ethical handling of donations**, making it suitable for academic demonstration as well as real-world inspiration.

The system provides:
- Secure and independent user registration
- Structured donation tracking
- Dedicated administrative controls for NGOs
- Clear separation of frontend and backend responsibilities following industry standards

This project was developed as part of an academic initiative and demonstrates the **practical application of core software engineering and full-stack development principles**.

---

## Tech Stack

### Frontend
The frontend is responsible for user interaction and presentation.
- **HTML5** – Structure of web pages
- **CSS3** – Styling and responsive layout
- **JavaScript (Vanilla JS)** – Client-side logic and API interaction

### Backend
The backend handles business logic, authentication, and data persistence.
- **Node.js** – JavaScript runtime environment
- **Express.js** – Web framework for building REST APIs
- **MongoDB** – NoSQL database for storing user and donation data
- **Mongoose** – ODM for schema modeling and database operations

### Other Tools
- **Git & GitHub** – Version control and collaboration
- **REST APIs** – Communication between frontend and backend

---

## Project Structure
The project follows a modular and organized directory structure to improve maintainability and scalability.

```
NSS_Project/
│
├── backend/
│   ├── routes/
│   │   ├── auth.js        # User authentication and authorization routes
│   │   ├── donation.js    # Donation creation and retrieval APIs
│   │   └── admin.js       # Admin-level operations and analytics
│   │
│   ├── server.js          # Backend entry point and server configuration
│   ├── package.json       # Backend dependencies and scripts
│   └── node_modules/      # Installed backend dependencies
│
├── frontend/
│   ├── css/
│   │   └── style.css      # Global styling for the application
│   ├── js/
│   │   ├── auth.js        # Authentication-related client logic
│   │   ├── user.js        # User dashboard and donation handling logic
│   │   └── admin.js       # Admin dashboard interactions
│   │
│   ├── index.html         # Landing page
│   ├── login.html         # User login page
│   ├── register.html      # User registration page
│   ├── user.html          # User dashboard interface
│   └── admin.html         # Admin dashboard interface
│
└── README.md              # Project documentation
```

---

## Features

### User Module
The user module focuses on accessibility and data persistence.
- User registration without requiring an immediate donation
- Secure login using backend authentication APIs
- Ability to make donations after successful registration
- User data remains stored even if donation is cancelled or fails

### Donation Module
The donation module is designed with transparency and ethical handling in mind.
- Donation recording and history tracking
- Clear separation between user identity and donation data
- Structured backend APIs for donation management

### Admin Module
The admin module provides visibility and control to NGO administrators.
- Secure admin login
- View and manage registered users
- Monitor and analyze donation records
- Improved transparency and reporting capabilities

---

## Installation & Setup

### Prerequisites
Before running the project, ensure the following are installed:
- Node.js (v16 or higher recommended)
- MongoDB (local installation or cloud service)
- Git

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd NSS_Project
```

2. **Backend setup**
```bash
cd backend
npm install
node server.js
```
This starts the backend server on the configured port.

3. **Frontend setup**
- Open `frontend/index.html` in a web browser
- Ensure the backend server is running for API communication

---

## Environment Variables
Create a `.env` file inside the `backend` directory and configure the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
These variables help keep sensitive configuration separate from source code.

---

## API Endpoints

### Authentication
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Authenticate user credentials

### Donations
- `POST /donation/add` – Record a new donation
- `GET /donation/all` – Retrieve all donation records (admin only)

### Admin
- `GET /admin/users` – Fetch all registered users

---

## Design Principles
- Clear separation of concerns between frontend and backend
- RESTful API architecture
- Modular and scalable code structure
- Ethical and transparent handling of donation workflows

---

## Future Enhancements
- Integration with payment gateways (Razorpay / Stripe)
- Email notifications for registrations and donations
- Role-based access control (RBAC)
- Deployment on cloud platforms (AWS / Render / Vercel)

---

## Academic & Resume Relevance
This project highlights:
- End-to-end full-stack web development experience
- Backend API design using REST architecture
- Persistent data management with databases
- Practical problem solving through a real-world NGO use case

This makes the project suitable for **academic coursework, internships, and entry-level software engineering portfolios**.

---

## Authors
- **Yash Jain**  
- **Atishay Jain**  
- **Rishabh Gupta**

---

## License
This project is developed for educational purposes. You are free to modify, extend, and use it with proper attribution.