const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth');
require('dotenv').config();
const formatToUTC = require('../../middleware/date_format');
const {
    findTodoByTitleAndUser,
    createTodo,
    getAllTodos,
    getTodoByIdAndUser,
    getTodoById,
    deleteTodoById,
    updateTodo
} = require('./todos.query');

router.get('/todos', verifyToken, async (req, res, next) => {
    const userID = req.user.id;

    try {
        if (!userID) {
            return res.status(400).send({
                status: 'error',
                msg: 'Missing userID'
            });
        }

        const [AllTodo] = await getAllTodos()

        return res.status(200).send(AllTodo);
    } catch (err) {
        next(err);
    }
})

router.get('/todos/:id', verifyToken, async (req, res, next) => {
    const userID = req.user.id;
    const todoID = req.params.id;

    try {
        if (!userID || !todoID) {
            return res.status(400).send({
                status: 'error',
                msg: 'Missing userID or todoID'
            });
        }

        const todo = await getTodoByIdAndUser(todoID, userID)

        if (!todo) {
            return res.status(404).send({
                status: "error",
                msg: "Not found"
            });
        }

        return res.status(200).send(todo);
    } catch (err) {
        next(err);
    }
});

router.post('/todos', async (req, res, next) => {
    const { title, description, due_time, user_id, status } = req.body;

    if (!title || !description || !due_time || !user_id || !status) {
        return res.status(400).send({ "msg": "Bad parameter" });
    }

    try {
        const existingTodo = await findTodoByTitleAndUser(title, user_id)

        if (existingTodo) {
            return res.status(409).send({
                status: 'error',
                msg: 'Todo already exists'
            });
        }

        const utc_due_time = formatToUTC(due_time);
        await createTodo(title, description, utc_due_time, user_id, status)
        const todo = await findTodoByTitleAndUser(title, user_id)

        console.log(todo.due_time, typeof todo.due_time);
        const d = new Date(todo.due_time);
        console.log(d.toLocaleString());
        res.status(201).send(todo);
    } catch (err) {
        next(err);
    }
});

router.put('/todos/:id', verifyToken, async (req, res, next) => {
    const { title, description, due_time, user_id, status } = req.body;
    const todoID = req.params.id;

    try {
        const existingUser = await getTodoById(todoID);

        if (!existingUser) {
            return res.status(404).send({
                status: "error",
                msg: "Not found"
            });
        }

        const fields = [];
        const values = [];

        if (title) {
            fields.push('title = ?');
            values.push(title);
        }
        if (description) {
            fields.push('description = ?');
            values.push(description);
        }
        if (due_time) {
            fields.push('due_time = ?');
            values.push(due_time);
        }
        if (user_id) {
            fields.push('user_id = ?');
            values.push(user_id);
        }
        if (status) {
            fields.push('status = ?');
            values.push(status);
        }

        if (fields.length === 0) {
            return res.status(400).send({
                status: "error",
                msg: "No fields to update"
            });
        }

        values.push(todoID);
        await updateTodo(fields, values)

        const todo = await getTodoById(todoID);

        res.status(200).send(todo);
    } catch (err) {
        next(err);
    }
});

router.delete('/todos/:id', async (req, res, next) => {
    const todoID = req.params.id;

    try {
        const existingTodo = await getTodoById(todoID)

        if (!existingTodo) {
            return res.status(404).send({
                status: "error",
                msg: "Not found"
            });
        }

        await deleteTodoById(todoID)

        res.status(200).send({
            status: "success",
            msg: `Successfully deleted record number : ${todoID}`
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;