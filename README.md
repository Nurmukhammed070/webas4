Hotel Booking Platform API

 Project Description

This project is a Hotel Booking Platform REST API built with Node.js, Express, and MongoDB.
The application follows the MVC (Model–View–Controller) architecture and implements secure authentication and Role-Based Access Control (RBAC) using JWT and bcrypt.

The API allows users to view hotels and bookings, while administrative actions such as creating, updating, and deleting data are restricted to admin users.

⸻

 Project Architecture (MVC)

hotel-booking-api/
│
├── server.js
├── app.js
├── .env
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   ├── Hotel.js
│   └── Booking.js
│
├── controllers/
│   ├── authController.js
│   ├── hotelController.js
│   └── bookingController.js
│
├── routes/
│   ├── authRoutes.js
│   ├── hotelRoutes.js
│   └── bookingRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
└── package.json


⸻

Technologies Used
	•	Node.js
	•	Express.js
	•	MongoDB + Mongoose
	•	JWT (JSON Web Tokens)
	•	bcrypt
	•	dotenv
	•	Postman (for testing)

⸻

 Data Models
1️User (Authentication)
	•	email (String, unique)
	•	password (hashed using bcrypt)
	•	role (user or admin)

 Hotel (Primary Object)
	•	name
	•	city
	•	address
	•	pricePerNight
	•	roomsAvailable
	•	description

 Booking (Secondary Object)
	•	user (reference to User)
	•	hotel (reference to Hotel)
	•	checkIn
	•	checkOut
	•	guests
	•	status

⸻

Authentication & Authorization (RBAC)

Password Security
	•	Passwords are hashed using bcrypt before being stored.
	•	Plain-text passwords are never saved.

JWT Authentication
	•	After registration or login, the server returns a JWT token.
	•	The token must be sent in the request headers for protected routes.

Authorization Header format:

Authorization: Bearer <token>

Role-Based Access Control

Role	Permissions
User	Can view hotels and bookings (GET)
Admin	Can CREATE, UPDATE, DELETE hotels and bookings


⸻

API Endpoints

Authentication

Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login and get JWT


⸻

Hotels

Method	Endpoint	Access
GET	/api/hotels	Public
GET	/api/hotels/:id	Public
POST	/api/hotels	Admin only
PUT	/api/hotels/:id	Admin only
DELETE	/api/hotels/:id	Admin only


⸻

Bookings

Method	Endpoint	Access
GET	/api/bookings	Public
GET	/api/bookings/:id	Public
POST	/api/bookings	Admin only
PUT	/api/bookings/:id	Admin only
DELETE	/api/bookings/:id	Admin only


⸻

Installation & Setup

Clone the repository

git clone <your-repo-link>
cd hotel-booking-api

 Install dependencies

npm install

 Environment Variables (.env)

Create a .env file in the root directory:

PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/hotel_booking
JWT_SECRET=your_secret_key
JWT_EXPIRES=7d

Start the server

npm run dev

Server will run at:

http://127.0.0.1:5001


⸻

Testing (Postman)

The project includes Postman tests to demonstrate:
	•	Successful registration and login
	•	Access allowed for admin users
	•	Access denied (403) for regular users on protected routes

The Postman collection shows:
	•	Admin vs User role behavior
	•	JWT-protected endpoints
	•	RBAC enforcement

⸻

Key Features Summary
	•	 MVC architecture
	•	Secure password hashing
	•	JWT authentication
	• Role-Based Access Control
	•	Two related objects (Hotel & Booking)
	• Clean and scalable backend structure

⸻

Conclusion

This project demonstrates a scalable and secure backend architecture following industry standards.
It implements proper authentication, authorization, and clean separation of concerns using MVC, making it suitable for real-world hotel booking systems.
