const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const db = require('./config/db');
const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');
const usersRoutes = require('./routes/user/users');
const todosRoutes = require('./routes/todos/todos');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/error_handler');

const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

db.getConnection()
    .then(() => console.log('DB Connectée'))
    .catch((err) => console.error('error DB', err));

db.getConnection()
    .then(() => console.log('cé co mgl'))
    .catch((err) => console.error('ERROR ERROR MAC GREGOR', err));

app.use(authRoutes);
app.use(userRoutes);
app.use(usersRoutes);
app.use(todosRoutes);

app.get('/', (req, res) => {
    res.status(200).send('<body style="display:flex;justify-content:center;align-items:center;height:100vh;margin:0"><h1>Epytodo Backend - Jules & Léo</h1></body>');
});

app.use(notFound);
app.use(errorHandler);

app.listen(parseInt(PORT), () => {
    console.log(`server open: http://localhost:${PORT}`);
});
