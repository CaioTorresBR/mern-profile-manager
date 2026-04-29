MERN Profile Manager is a secure web application built with MongoDB, Express, React, and Node.js. It provides role-based access control for Administrators and standard Users, utilizing JWT for protected REST API routes. Key features include encrypted password storage, real-time email verification via external APIs, a custom random password generator, and a dynamic API documentation page adapted to user privileges.
Perfeito — aqui está um **README em inglês, claro, profissional e direto**, ideal para o seu projeto 👇

---

# 📘 README – Profile Management Application (MERN)

## 📌 Overview

This project is a **Profile Management Web Application** built using the **MERN stack** (MongoDB, Express, React, Node.js).

It allows users to:

* Create accounts
* Log in securely
* View and edit their own profile
* Generate random passwords
* Perform administrative actions (for admin users only)

---

## 🧱 Tech Stack

* **MongoDB** – Database
* **Express.js** – Backend framework
* **Node.js** – Server runtime
* **React.js** – Frontend UI
* **JWT (JSON Web Token)** – Authentication
* **bcrypt** – Password hashing

---

## 🔐 Authentication & Authorization

The application uses **JWT-based authentication**.

### Roles:

* **User**

  * Can view and edit their own profile
* **Admin**

  * Can access all users
  * Can delete users

### Protected Routes:

All routes require authentication except:

```txt
POST /profils
```

---

## 📡 API Endpoints

| Method | Route               | Description       | Access      |
| ------ | ------------------- | ----------------- | ----------- |
| POST   | /profils            | Create user       | Public      |
| POST   | /auth/login         | Login             | Public      |
| GET    | /profils            | Get all users     | Admin       |
| GET    | /profils/:id        | Get user          | Owner/Admin |
| PUT    | /profils/:id        | Update user       | Owner/Admin |
| DELETE | /profils/:id        | Delete user       | Admin       |
| GET    | /motdepasse/:length | Generate password | Public      |

---

## ⚙️ Installation

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
EMAIL_API_KEY=your_email_api_key
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm start
```

---

### 2. Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Run the app:

```bash
npm run dev
```

---

## 🌐 Usage

1. Create a user (optionally as admin)
2. Log in
3. Depending on role:

   * **User** → manage own profile
   * **Admin** → search and delete users

---

## 🔑 Password Generation

You can generate a random password using:

```txt
GET /motdepasse/:length
```

The password contains:

* uppercase letters
* lowercase letters
* numbers

---

## ⚠️ Security Notes

* Passwords are hashed using **bcrypt**
* JWT tokens are required for protected routes
* Sensitive credentials are stored in `.env`

---

## 🧪 Testing

The API can be tested using:

* **curl**
* **Postman**
* Frontend interface

---

## 📂 Project Structure

```txt
tp2_mern/
  backend/
  frontend/
```

---

## 👨‍💻 Authors

* Gabriel Barroso Magno Viana
* Caio Torres de Carvalho

---

# 🎯 Final

👉 Esse README está:
✔ profissional
✔ claro
✔ completo
✔ pronto pra GitHub ou entrega

---

Se quiser, posso te dar uma versão ainda mais “top” com badges e estilo GitHub ⭐
