export default async function logout() {
    try {
        const response = await fetch('/api/logout');
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse.message);
            window.location.href = '/login';
            return;
        } 
        console.log('could not log out');
        throw new Error('Request failed!');
    }
    catch (error) {
        console.log(error);
    }
}