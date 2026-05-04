# 🔐 Authentication & Authorization System (JWT + Cookies)

## 📌 Project Overview

This project implements a secure authentication and authorization system using **JWT (JSON Web Tokens)** stored in cookies. It provides role-based access control with protected routes for **Student** and **Admin** users.

The system includes:
- User Signup & Login
- Password hashing using `bcrypt`
- JWT generation and verification
- Middleware-based route protection

---

## 🚀 Features

- ✅ User Signup and Login
- ✅ JWT Authentication
- ✅ Token stored in `httpOnly` cookies
- ✅ Token extraction from:
  - Request Body
  - Cookies
  - Authorization Header
- ✅ Role-based Authorization:
  - `Student`
  - `Admin`
- ✅ Protected Routes using Middleware

---

## 🧠 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB (Mongoose) | Database |
| bcrypt | Password Hashing |
| jsonwebtoken | JWT |
| cookie-parser | Cookie Handling |

---

## 📂 Project Structure

```
├── Config/
│   └── database.js
├── Controller/
│   └── Auth.js
├── Models/
│   └── User.js
├── Routes/
│   └── user.js
├── MiddleWare/
│   └── auth.js
├── index.js
└── .env
```

---

## 🔑 Authentication Flow

1. User sends signup/login request
2. Password is hashed using `bcrypt`
3. On login:
   - JWT token is generated
   - Token is stored in cookie (`devangCookie`)
4. Middleware verifies token before accessing protected routes

---

## 📂 API Routes

### 🔓 Public Routes

| Method | Route | Description |
|---|---|---|
| POST | `/api/v1/signUp` | Register a new user |
| POST | `/api/v1/login` | Login user |

### 🔐 Protected Routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/student` | Only accessible by Student |
| GET | `/api/v1/admin` | Only accessible by Admin |

---

## 🛡️ Middleware

### 1️⃣ `auth` — Authentication

- Verifies JWT token
- Extracts token from:
  - `req.body.token`
  - `req.cookies.devangCookie`
  - `req.headers.authorization`
- If valid → attaches decoded data to `req.user`
- Else → returns `401 Unauthorized`

```js
const token =
  req.body?.token ||
  req.cookies?.devangCookie ||
  req.headers.authorization?.split(" ")[1];
```

### 2️⃣ `isStudent` — Authorization

Allows access only if:
```js
req.user.role === "Student"
```

### 3️⃣ `isAdmin` — Authorization

Allows access only if:
```js
req.user.role === "Admin"
```

---

## 🔐 JWT Payload

```json
{
  "email": "user@example.com",
  "role": "Student",
  "id": "user._id"
}
```

---

## 🍪 Cookie Configuration

| Property | Value |
|---|---|
| Cookie Name | `devangCookie` |
| httpOnly | `true` |
| Expiry | 3 days |

---

## 🔒 Password Security

Passwords are hashed using `bcrypt`:

```js
bcrypt.hash(password, 10)
```

Prevents storing plain-text passwords.

---

## ⚙️ How to Run

**1. Install dependencies**
```bash
npm install
```

**2. Create `.env` file**
```env
PORT=4000
URL=your_mongodb_connection
JWT_SECRET=your_secret_key
```

**3. Run server**
```bash
npm start
```

---

## 📌 Key Concepts (Exam-Oriented)

| Concept | Description |
|---|---|
| Authentication | Verifies user identity using JWT |
| Authorization | Verifies user role (Admin / Student) |
| JWT in Cookies | More secure than localStorage, prevents XSS when using `httpOnly` |

---

## ❗ Error Handling

| Status | Reason |
|---|---|
| `401` | Missing token / Invalid or expired token / User not found |
| `403` | Wrong password / Insufficient role |

---

## 📈 Future Improvements

- [ ] Refresh Tokens
- [ ] Logout functionality
- [ ] Token blacklisting
- [ ] Role management system

---

## 👨‍💻 Author

**Devang Singh Mehta**
