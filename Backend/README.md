# 📝 Simple Note-Taking Backend API

A minimalistic and clean **Note-Taking Backend** built with **Node.js**, **Express**, and **MongoDB**. This project provides RESTful APIs to create, read, update, and delete notes — perfect for beginners learning backend development or for building a lightweight note-taking app.

---

## 🚀 Features

- Create a new note ✍️
- Get all notes 📒
- Get a single note by ID 🔍
- Update a note by ID 🔄
- Delete a note by ID 🗑️
- MongoDB Atlas integration 🌍

## 🧪 API Endpoints

All endpoints are prefixed with `/api/notes`.

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | `/create`           | Create a new note        |
| GET    | `/getAll`           | Get all notes            |
| GET    | `/:id`              | Get a single note by ID  |
| PUT    | `/:id`              | Update a note by ID      |
| DELETE | `/:id`              | Delete a note by ID      |

