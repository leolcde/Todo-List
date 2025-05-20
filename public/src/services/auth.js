export async function login(email, password) {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Login failed')
  }

  return await response.json()
}

export async function register(email, password, name, firstname) {
  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name, firstname })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Register failed')
  }

  return await response.json()
}
