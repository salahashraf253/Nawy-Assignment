# Apartments in Egypt
<p>This project provides a complete platform to browse, search, and view apartment listings, with a backend API, PostgreSQL database, and a modern frontend.</p>



### 📸 Project Preview
#### API (Swagger Documentation)
![ERD](https://github.com/salahashraf253/Nawy-Assignment/blob/main/Screenshots/Swagger.png)
#### Main Listing Page
![ERD](https://github.com/salahashraf253/Nawy-Assignment/blob/main/Screenshots/apartment%20listing.png)
#### Apartment Details Page
![ERD](https://github.com/salahashraf253/Nawy-Assignment/blob/main/Screenshots/apartment%20details%201.png)
![ERD](https://github.com/salahashraf253/Nawy-Assignment/blob/main/Screenshots/apartment%20details%202.png)

### ✨ Features

* Frontend: Next + TailwindCSS
* Backend: NestJS + Swagger API Documentation
* Database: PostgreSQL
* Dockerized: Easy setup with Docker Compose
* Filtering: Cities, Bedrooms, Bathrooms
* Details Page: Full property information with gallery

## 🚀 Getting Started
### Prerequisites
<ul>
  <li>Docker and Docker Compoes installed</li>
  <li>(Optional) Node.js and npm/yarn if you want to run without Docker</li>
</ul>

### Run with Docker

1. Clone the repository

```bash
git clone https://github.com/salahashraf253/Nawy-Assignment
cd Nawy-Assignment
```

2. Configure environment variables:
```
# Root .env file (for Docker)
cp .env.example .env

# Backend .env
cp backend/.env.example backend/.env

# Frontend .env
cp frontend/.env.local.example frontend/.env.local
```

3. Edit all three .env files with your credentials
   
4. Start services:
```
docker-compose up --build -d
```

### 🌐 Running Services

| Service | Port | Description |
| --- | --- | --- |
| Backend | 5000 | NestJS API (Swagger at ```/api```) |
| Frontend | 3000 | Next frontend app|
| Database | 5432 | 	PostgreSQL database|

### API Endpoints (Apartments)
| Method | Endpoint | Description|
| --- | --- | ---|
| GET | ```/apartments``` | List all apartments|
| POST | ```apartments``` | Create a new apartment|
| GET | ```apartment/{id}``` | Get a specific apartment|
| DELETE | ```apartments/{id}``` | Delete an apartment|


