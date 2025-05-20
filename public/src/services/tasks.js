function getUserId(token) {
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        const id = JSON.parse(payload).id;
        return id;
    } catch (e) {
        return null;
    }
}

export async function addTask(title, description, due_time, token) {
    const user_id = getUserId(token)
    const status = "todo"
    const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, due_time, user_id, status })
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Values for task are wrongs')
    }

    return await response.json()
}

export async function removeTask(task_id) {
    const response = await fetch(`http://localhost:3000/todos/${task_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Remove is impossible for this task')
    }

    return await response.json()
}

export async function updateTaskStatus(task_id, token, newStatus) {
    const response = await fetch(`http://localhost:3000/todos/${task_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
    });

    return await response.json();
}

export async function getTasks(token) {
    const response = await fetch(`http://localhost:3000/user/todos`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    })

    return await response.json()
}
