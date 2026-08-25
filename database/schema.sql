CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('caregiver', 'patient')),
  location VARCHAR(255) NOT NULL,
  price_range INTEGER NOT NULL,
  specialties TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);