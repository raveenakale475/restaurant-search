# Restaurant Search API

A Node.js + MySQL backend service that allows users to search for restaurants based on dish names with price range filtering.

## Features

- Search restaurants by dish name
- Mandatory price range filtering
- Returns top 10 restaurants by order count
- Clean RESTful API design
- Comprehensive seed data

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone and install
```bash
git clone <your-repo-url>
cd restaurant-search-api
npm install
```

### 2. Configure database
Create a MySQL database:
```sql
CREATE DATABASE restaurant_db;
```

### 3. Set up environment
Create `.env` file with your MySQL credentials

### 4. Seed the database
```bash
npm run seed
```

### 5. Start the server
```bash
npm run dev
```

## API Usage

**Endpoint:** `GET /search/dishes`

**Parameters:**
- name (required): Dish name
- minPrice (required): Minimum price
- maxPrice (required): Maximum price

**Example:**
```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300"
```

## Technologies

- Node.js
- Express.js
- MySQL
- dotenv
- CORS