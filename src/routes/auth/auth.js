const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;


router.post('/register', async (req, res, next) => {
    const { email, password, name, firstname } = req.body;
    const saltRounds = 10;

    try {
        const [existingUser] = await db.query(
            'SELECT * FROM user WHERE email = ?',
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(409).send({
                status: "error",
                msg: "Account already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await db.query(
            'INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, name, firstname]
        );

        const userID = await db.query(
            'SELECT id FROM user WHERE email = ?',
            [email]
        );

        const payload = { id: userID };
        const token = jwt.sign(payload, secret);

        res.status(201).send({
            status: "success",
            token: token
        });
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(401).send({
                status: "error",
                msg: "Invalid Credentials",
            });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({
                status: "error",
                msg: "Invalid Credentials",
            });
        }

        const token = jwt.sign(
            { id: user.id },
            secret,
            { expiresIn: '1m' }
        );

        delete user.password;

        return res.status(200).send({
            status: "success",
            token: token
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
