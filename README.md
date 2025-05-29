# 📝 ToDoList Web App

A clean and responsive ToDoList web application with user authentication (Login/Register). Built with modern web technologies to help you stay productive and organized.

---

## 🚀 Features

- ✅ User registration & login system  
- 🧠 Personalized ToDo list per user  
- 📝 Add, edit, and delete tasks  
- 🌙 Simple, responsive, and user-friendly interface  
- 🔐 Authentication with session/token support (depending on implementation)  

---

## 🧰 Tech Stack

- **Frontend**: VueJs  
- **Backend**: Node.js, Express  
- **Database**: MySql *(or other, specify if needed)*  
- **Auth**: JWT / Sessions *(specify what's used)*

---

## 💻 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/todolist-app.git
cd todolist-app
npm install
```
## Start the development servers:
- Run the backend
```bash
npx nodemon .
```
- Run the frontend
```
npm run dev
```

📁 Project Structure
```
/todolist-app
│
├── /public         # Static assets
├── /src
│   ├── /routes     # API routes (auth, tasks)
│   ├── /views      # HTML templates or frontend files
│   └── /controllers
│
├── .env            # Environment variables
├── package.json
└── server.js       # Main server file
