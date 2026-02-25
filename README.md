# 🏠 Airbnb Clone – Fullstack Django & Next.js

A full-stack Airbnb-style web application built using **Django (Backend API)** and **Next.js (Frontend)**.

This project was built to practice modern full-stack development concepts including REST APIs, authentication, image uploads, relational databases, and real-time features.

---

## 📌 Project Overview

This application allows users to:

- Register and log in
- Create and manage property listings
- Upload property images
- Browse available properties
- View detailed property pages
- Book properties
- Chat with other users in real-time
- Manage their personal dashboard

The frontend communicates with a Django REST API backend running with **PostgreSQL** via Docker.

---

# 🛠 Tech Stack

## 🔹 Frontend

- Next.js
- React
- Tailwind CSS
- Axios (API requests)
- React Hooks
- Zustand (State Management)

## 🔹 Backend

- Django
- Django REST Framework
- Django Allauth (Authentication)
- Django Channels (Real-time features)
- Pillow (Image handling)
- PostgreSQL (via Docker)
- JWT Authentication (access and refresh tokens)

---

# 🧠 Core Concepts Implemented

## 🔹 Backend Concepts

- Django project & app structure
- Custom User Model
- Model relationships:
  - ForeignKey
  - OneToMany
- Django ORM
- RESTful API architecture
- Serializers (ModelSerializer)
- ViewSets & APIViews
- Routers
- Authentication & Authorization
- JWT Authentication using access and refresh tokens
- Media & static file handling
- Image upload configuration
- Real-time features with Django Channels
- API endpoint structuring
- Dockerized backend with PostgreSQL

## 🔹 Frontend Concepts

- Component-based architecture
- Reusable UI components
- Client-side routing (Next.js routing)
- Dynamic routes
- API integration using Axios
- State management with Zustand
- Form handling
- Conditional rendering
- Responsive design with Tailwind CSS

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```
git clone https://github.com/skh502/airbnb-clone.git
cd server
```

---

## 2️⃣ Backend Setup (Docker)

Make sure you have **Docker** installed.

Start the backend and database:

```
docker-compose up --build
```

This will:

- Build and start the Django backend (`web` service)
- Start PostgreSQL database (`db` service)
- Expose backend at `http://localhost:8000`

Apply migrations (inside backend container):

```
docker-compose exec web python manage.py migrate
```

Create superuser (optional):

```
docker-compose exec web python manage.py createsuperuser
```

---

## 3️⃣ Frontend Setup

Navigate to frontend folder:

```
cd client
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

# 📈 Learning Outcomes

Through this project, the following skills were practiced:

- Building REST APIs with Django
- Structuring scalable backend architecture
- Implementing JWT authentication systems
- Handling file uploads
- Connecting frontend and backend applications
- Managing application state with Zustand
- Implementing real-time features with Django Channels
- Working with PostgreSQL databases
- Debugging full-stack applications
