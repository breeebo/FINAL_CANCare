require('dotenv').config();

const express = require('express');
const session = require('express-session');
const app = express();

app.use(
    session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // expires in 24 hours
    },
    resave: true,
    saveUninitialized: false,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check endpoint
app.get('/health', (_, res) => {
    res.json({ status: 'ok' });
});

const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

module.exports = app;