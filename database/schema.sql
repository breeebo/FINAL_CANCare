CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  surname VARCHAR(255),
  phone VARCHAR(50),
  user_type VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  price_range INTEGER,
  specialties TEXT[],
  needs TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);