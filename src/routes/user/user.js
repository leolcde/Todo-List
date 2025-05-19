const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('../../config/db');
const verifyToken = require('../../middleware/auth');
const { getUserById, getTodosByUserId } = require('./user.query');


router.get('/user', verifyToken, async (req, res, next) => {
    try {
        const userID = req.user.id;
        const user = await getUserById(userID);

        if (!user) {
            return res.status(404).send({ msg: "Not found" });
        }

        return res.status(200).send(user);
    } catch (err) {
        next(err);
    }
});

router.get('/user/todos', verifyToken, async (req, res, next) => {
    try {
        const userID = req.user.id;

        if (!userID) {
            return res.status(400).send({
                status: 'error',
                message: 'Missing userID'
            });
        }

        const [rows] = await getTodosByUserId(userID)

        if (!rows) {
            return res.status(404).send({ msg: "Not found" });
        }

        return res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
});

module.exports = router;