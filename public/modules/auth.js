const username = document.getElementById('username');
const password = document.getElementById('password');
const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('logoutButton');
// import {getDom} from './dom-elements.js';

// const loginelements = getDom(login);

// listen if login button is clicked on login page
loginButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const u = username.value;
    const p  = password.value;
    const response = await login(u, p);
    console.log('welcome ' + response);
    window.location.href = '/';
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
            console.log(jsonResponse.token);
            await setCookie('authorization', jsonResponse.token, 1);
            return jsonResponse.message;
        }
        const errorMessage = await response.json();
        console.log(errorMessage);
        throw new Error('Request failed!', errorMessage.error);
    } catch (error) {
        console.log(error);
    }
}

export async function logout() {
    try {
        const response = await fetch('/api/logout');
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse.message);
            return;
        } 
        console.log('could not log out');
        throw new Error('Request failed!');
    }
    catch (error) {
        console.log(error);
    }
}

async function setCookie(cname, cvalue, exhours) {
    const d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
