A full-stack web application for university students to securely view their academic profiles and grades online.

Overview
This project is a web-based student portal that allows university students to:

Login securely with their credentials
View their personal academic profile
Check their grades filtered by semester
Logout safely

Built as part of my university coursework to demonstrate full-stack web development skills including frontend design, backend logic, database management, and security best practices.

✨ Features
Authentication

 Secure login system with email and password
 Session-based authentication
 Password hashing using bcrypt
 Session timeout (30 minutes of inactivity)
 Logout functionality with confirmation

Student Profile

 Display student information (name, ID, email, phone, etc.)
 Real-time data fetching from database
 Loading states and error handling

Grades Management

 View grades filtered by semester (S1, S2, S3, S4)
 Display module name, grade, and status (Validated/Not Validated/Rattrapage)
 Dynamic table generation
 Visual status indicators

Security

 SQL injection prevention using prepared statements
 Password encryption (bcrypt)
 Server-side session management
 Protected routes (unauthorized access prevention)
 Input validation (client and server-side)


🛠️ Technologies Used
Frontend

HTML5 - Structure and markup
CSS3 - Styling and responsive design
JavaScript (ES6+) - Client-side logic

Fetch API for AJAX requests
Async/await for asynchronous operations
DOM manipulation


SweetAlert2 - Beautiful alert popups

Backend

PHP 7/8 - Server-side programming

PDO (PHP Data Objects) for database access
Session management
RESTful API design
Password hashing (bcrypt)



Database

MySQL/MariaDB - Relational database

Foreign key constraints
Data integrity enforcement



Development Environment

XAMPP - Local development server
phpMyAdmin - Database management
VS Code - Code editor
