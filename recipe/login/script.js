        // Fetch existing users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        document.getElementById('loginForm').addEventListener('submit', function (event) {
            event.preventDefault();

            // Reset error messages
            document.getElementById('usernameError').style.display = 'none';
            document.getElementById('passwordError').style.display = 'none';

            let isValid = true;

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Validate username
            if (username === '') {
                document.getElementById('usernameError').style.display = 'block';
                isValid = false;
            }

            // Validate password
            if (password === '') {
                document.getElementById('passwordError').style.display = 'block';
                isValid = false;
            }   

            if (isValid) {
                const user = users.find(user => user.username === username && user.password === password);

                if (user) {
                    alert('Login successful!');
                    window.location.href = 'index.html'; // Redirect to a homepage after successful login
                } else {
                    document.getElementById('passwordError').innerText = 'Invalid username or password';
                    document.getElementById('passwordError').style.display = 'block';
                }
            }
        });

