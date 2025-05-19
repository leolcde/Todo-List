const db = require('../../config/db');


const getUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

const getTodosByUserId = async (userID) => {
    const [rows] = await db.query(
        "SELECT * FROM todo WHERE user_id = ?",
        [userID]
    );
    return rows.length > 0 ? [rows] : null;
};

const getUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
};

const updateUser = async (fields, values) => {
    await db.query(
        `UPDATE user SET ${fields.join(', ')} WHERE id = ?`,
        values
    );
};

const deleteUserById = async (id) => {
    await db.query('DELETE FROM user WHERE id = ?', [id]);
};


module.exports = {
    getUserById,
    getTodosByUserId,
    getUserByEmail,
    updateUser,
    deleteUserById
};