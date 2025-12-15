# 🛡️ Secure Articles API (WSE Praktikum 8)

> **Web Service Engineering - RESTful API with JWT Authentication & RBAC.**

Project ini adalah implementasi backend API yang aman untuk manajemen artikel. Dibangun menggunakan **Node.js**, **Express**, dan **MongoDB**, project ini menerapkan standar keamanan modern seperti Authentication (JWT), Authorization (Role-Based Access Control), Rate Limiting, dan Request Validation.

---

## 🚀 Features

* **Authentication:** Sistem Login & Register aman menggunakan JSON Web Token (JWT).
* **Role-Based Access Control (RBAC):**
    * **User:** Bisa membaca artikel, membuat artikel baru.
    * **Admin:** Bisa melakukan segalanya termasuk menghapus artikel dan mengedit artikel orang lain.
* **Article Management:** CRUD (Create, Read, Update, Delete) artikel.
* **Advanced Query:** Fitur pencarian (Search) dan Pagination pada list artikel.
* **Security:**
    * Password Hashing (Bcrypt).
    * Helmet (HTTP Headers protection).
    * Rate Limiting (Mencegah spam/DDoS sederhana).
    * CORS enabled.
* **Validation:** Input validasi menggunakan Joi.
* **Documentation:** API Documentation interaktif menggunakan **Swagger UI**.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Auth:** JWT (Access Token & Refresh Token)
* **Logging:** Pino & Pino-Http
* **Docs:** Swagger UI Express

---

## ⚙️ Installation & Setup

Ikuti langkah ini untuk menjalankan project di komputer lokal:

### 1. Clone Repository
```bash
git clone [https://github.com/Rainyday404/P8-SecureArticles-230104040205.git](https://github.com/Rainyday404/P8-SecureArticles-230104040205.git)
cd P8-SecureArticles-230104040205
````

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Setup Environment Variables

Buat file baru bernama `.env` di root folder, lalu copy konfigurasi berikut:

```env
# Server Config
PORT=3000
NODE_ENV=development

# Database Config
MONGO_URI=mongodb://localhost:27017/wse_p8_secure_articles

# JWT Secrets (Ganti dengan string acak yang aman)
JWT_ACCESS_SECRET=rahasia_access_token_super_aman
JWT_REFRESH_SECRET=rahasia_refresh_token_super_aman
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
```

### 4\. Run Server

```bash
# Mode Development (dengan Nodemon)
npm run dev

# Mode Production
npm start
```

Server akan berjalan di: `http://localhost:3000`

-----

## 📖 API Documentation (Swagger)

Setelah server berjalan, buka browser dan kunjungi alamat berikut untuk melihat dokumentasi lengkap dan mencoba API secara langsung:

👉 **http://localhost:3000/docs**

### Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Mendaftar user baru | Public |
| **POST** | `/api/auth/login` | Masuk & dapatkan Token | Public |
| **GET** | `/api/auth/me` | Cek profil user login | User/Admin |
| **GET** | `/api/articles` | Lihat semua artikel | Public |
| **POST** | `/api/articles` | Buat artikel baru | User/Admin |
| **PUT** | `/api/articles/:id` | Edit artikel | Owner/Admin |
| **DELETE**| `/api/articles/:id` | Hapus artikel | **Admin Only** |

-----

## 👤 Author

**Ivan Dwika Bagaskara**

  * **NIM:** 23104040205
  * **Major:** Information Technology

-----

Made with ❤️ and ☕ for Web Service Engineering Class.

```

---