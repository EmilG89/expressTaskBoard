const username = document.getElementById('username');
const password = document.getElementById('password');
const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('logoutButton');

// listen if login button is clicked on login page
loginButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const u = username.value;
    const p  = password.value;
    const response = await login(u, p);
    console.log('welcome ' + response.message);
});

logoutButton.addEventListener('click', async (event) => {
    event.preventDefault();
    await logout();
    console.log('user is logged out');
});

async function login (u, p){
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: u,
                password: p
            })
        });

        if(response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
        const errorMessage = await response.json();
        console.log(errorMessage);
        throw new Error('Request failed!', errorMessage.error);

    } catch (error) {
        console.log(error);
    }
}

async function logout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'GET',
            credentials: 'include',
            redirect: 'follow'
        });
        if (response.ok) {
            return;
        } 
        console.log('could not log out');
        throw new Error('Request failed!');
    }
    catch (error) {
        console.log(error);
    }
}
