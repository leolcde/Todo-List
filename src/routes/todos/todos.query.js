const db = require('../../config/db');

const getAllTodos = async () => {
    const [rows] = await db.query(
        "SELECT * FROM todo"
    );
    return rows.length > 0 ? [rows] : null;
};

const getTodoByIdAndUser = async (todoId, userId) => {
    const [rows] = await db.query(
        `SELECT
           id,
           title,
           description,
           DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
           DATE_FORMAT(due_time,   '%Y-%m-%d %H:%i:%s') AS due_time,
           user_id,
           status
         FROM todo
         WHERE id = ? AND user_id = ?`,
        [todoId, userId]
    );
    return rows.length > 0 ? rows[0] : null;
};

const findTodoByTitleAndUser = async (title, userId) => {
    const [rows] = await db.query(
        `SELECT
           id,
           title,
           description,
           DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
           DATE_FORMAT(due_time,   '%Y-%m-%d %H:%i:%s') AS due_time,
           user_id,
           status
         FROM todo
         WHERE title = ? AND user_id = ?`,
        [title, userId]
    );
    return rows.length > 0 ? rows[0] : null;
};

const createTodo = async (title, description, dueTime, userId, status) => {
    await db.query(
        `INSERT INTO todo (title, description, due_time, user_id, status)
         VALUES (?, ?, ?, ?, ?)`,
        [title, description, dueTime, userId, status]
    );
};

const updateTodo = async (fields, values) => {
    await db.query(
        `UPDATE todo SET ${fields.join(', ')} WHERE id = ?`,
        values
    );
};

const getTodoById = async (todoId) => {
    const [rows] = await db.query(
        `SELECT
        id,
        title,
        description,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
        DATE_FORMAT(due_time,   '%Y-%m-%d %H:%i:%s') AS due_time,
        user_id,
        status
      FROM todo
      WHERE id = ?`,
     [todoId]
    );
    return rows.length > 0 ? rows[0] : null;
};

const deleteTodoById = async (todoId) => {
    await db.query(
        "DELETE FROM todo WHERE id = ?",
        [todoId]
    );
};

module.exports = {
    getAllTodos,
    getTodoByIdAndUser,
    findTodoByTitleAndUser,
    createTodo,
    updateTodo,
    getTodoById,
    deleteTodoById
};
