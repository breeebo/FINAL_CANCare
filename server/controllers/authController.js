const bcrypt = require('bcryptjs');
const { query } = require("../../database/db.js");

const saltRounds = 10;

exports.checkSession = (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ loggedIn: false });
    }
    res.json({ loggedIn: true, userId: req.session.userId });
};


exports.signup = async (req, res) => {
    
    try {
        const {email, password, name, surname, phone, user_type, location, price_range, specialties} = req.body;
        const errors = [];

        if (!email) errors.push('Email is required');
        if (!password) errors.push('Password is required');
        if (!name) errors.push('First name is required');
        if (!surname) errors.push('Surname is required');
        if (!user_type) errors.push('User type is required');
        if (!location) errors.push('Location is required');
        if (!price_range) errors.push('Price range is invalid');

        if (errors.length > 0) return res.status(400).json({ errors });


        const result = await query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rowCount > 0) {
            return res.status(400).json({ errors: ['An account with this email already exists'] });
        }


        const hashedPassword = await bcrypt.hash(password, saltRounds);


        const newResult = await query(
            'INSERT INTO users (email, password, name, surname, phone, user_type, location, price_range, specialties) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
            [email, hashedPassword, name, surname, phone, user_type, location, price_range, specialties]
        );

        const userId = newResult.rows[0].id;
        req.session.userId = userId;
        return res.status(201).json({ userId: req.session.userId });

    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const errors = [];

            if (!email) errors.push('Email is required');
            if (!password) errors.push('Password is required');

            if (errors.length > 0) return res.status(400).json({ errors });


            const result = await query('SELECT * FROM users WHERE email = $1', [email]);
            if (result.rowCount === 0) {
                return res.status(401).json({ errors: ['Invalid email or password'] });
            }

            const storedPassword = result.rows[0].password;
            const isPasswordCorrect = await bcrypt.compare(password, storedPassword);
            if (!isPasswordCorrect) {
                return res.status(401).json({ errors: ['Invalid email or password'] });
            }


            const userId = result.rows[0].id;
            req.session.userId = userId;
            return res.json({ userId: req.session.userId });
            
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ error: 'Something went wrong' });
        }
    };

exports.logout = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: ['Logout unsuccessful'] });
            } else {
                return res.status(200).json({ loggedIn: false });
            }
        });
    };