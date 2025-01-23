const apiBaseUrl = 'http://localhost:3000/api/auth';

// Register user
document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${apiBaseUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        alert(data.message || 'Registered successfully!');
    } catch (error) {
        alert('Error during registration');
    }
});

// Login user
document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${apiBaseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('authToken', data.token);
            alert(data.message || 'Login successful!');
            document.getElementById('protected-route').style.display = 'block';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        alert('Error during login');
    }
});

// Access protected route
document.getElementById('access-protected').addEventListener('click', async () => {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://localhost:3000/protected', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();

        if (response.ok) {
            document.getElementById('protected-response').innerText = JSON.stringify(data);
        } else {
            alert(data.message || 'Access denied');
        }
    } catch (error) {
        alert('Error accessing protected route');
    }
});
