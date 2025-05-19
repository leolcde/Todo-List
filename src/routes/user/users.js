const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const { getUserByEmail, getUserById, updateUser, deleteUserById } = require('./user.query');


router.get('/users/:identifier', async (req, res, next) => {
    const identifier = req.params.identifier;
    let user;

    try {
        if (identifier.includes('@')) {
            user = await getUserByEmail(identifier);
        } else {
            user = await getUserById(identifier);
        }

        if (!user) {
            return res.status(404).send({
                status: "error",
                msg: "Not found"
            });
        }

        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});

router.put('/users/:id', async (req, res, next) => {
    const { email, password, name, firstname } = req.body;
    const userID = req.params.id;

    try {
        const existingUser = await getUserById(userID);

        if (!existingUser) {
            return res.status(404).send({
                status: "error",
                msg: "Not found"
            });
        }

        const fields = [];
        const values = [];

        if (email) {
            fields.push('email = ?');
            values.push(email);
        }
        if (name) {
            fields.push('name = ?');
            values.push(name);
        }
        if (firstname) {
            fields.push('firstname = ?');
            values.push(firstname);
        }
        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            fields.push('password = ?');
            values.push(hashed);
        }

        if (fields.length === 0) {
            return res.status(400).send({
                status: "error",
                msg: "No fields to update"
            });
        }

        values.push(userID);
        await updateUser(fields, values)

        const user = await getUserById(userID);

        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});

router.delete('/users/:id', async (req, res, next) => {
    const userID = req.params.id;

    try {
        const user = await getUserById(userID);

        if (!user) {
            return res.status(404).send({
                status: "error",
                msg: "Not found"
            });
        }

        await deleteUserById(userID);

        res.status(200).send({
            status: "success",
            msg: `Successfully deleted record number : ${userID}`
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;

