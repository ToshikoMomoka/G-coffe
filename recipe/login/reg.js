const users = [
    { username: 'admin', password: '1234' },
    { username: 'admin2', password: '12345' }
];

localStorage.setItem('users', JSON.stringify(users));

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Reset error messages
    document.getElementById('usernameError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';

    let isValid = true;

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Username validation
    if (username === '') {
        document.getElementById('usernameError').innerText = 'Username is required';
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    } else if (username.length < 3 || username.length > 15) {
        document.getElementById('usernameError').innerText = 'Username must be between 3 and 15 characters';
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    }

    // Password validation
    if (password === '') {
        document.getElementById('passwordError').innerText = 'Password is required';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert('Login successful!');
            window.location.href = "index.html";
        } else {
            document.getElementById('passwordError').innerText = 'Invalid username or password';
            document.getElementById('passwordError').style.display = 'block';
        }
    }
}); 
