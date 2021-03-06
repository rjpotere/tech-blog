const login = async (ev) => {
    ev.preventDefault();

    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},

        })


        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText) }

            console.log(`RESPONSE:${response}`);
};

const signUpForm = async (ev) => {
    ev.preventDefault();

    const name = document.querySelector('#name-field').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users/newuser', {
            method: 'POST',
            body: JSON.stringify({"name": name, "email": email, "password": password}),
            headers: {'Content-Type': 'application/json'},
        });


        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText)
        }
    }
};

document
    .querySelector('.login')
    .addEventListener('submit', login);

document
    .querySelector('.sign-up')
    .addEventListener('submit', signUpForm);