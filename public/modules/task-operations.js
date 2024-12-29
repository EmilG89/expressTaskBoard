import * as domElement from './dom-elements.js';

const getAllTasks = async () => {

    //await checkCookieExp();
    domElement.createTaskModal.style.display = 'flex';
    domElement.loader.style.display = 'block';

    try {
        const response = await fetch('/api/get-all-tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': await getCookie('authorization'),
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse.allTasks;
        } else {
        throw new Error('Request failed!');
        }
    } catch (error) {
        console.log(error);
    } finally {
        domElement.createTaskModal.style.display = 'none';
        domElement.loader.style.display = 'none';
    }
};

const addTask = async (params) => {

    //checkCookieExp();
    domElement.newTaskForm.style.display = 'none';
    domElement.loader.style.display = 'block';

    try {
        const response = await fetch('/api/add-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': await getCookie('authorization'),
            },
            body: JSON.stringify({
                header: params.header,
                description: params.description,
                color: params.color
            })
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        }
        const errorMessage = await response.json();
        return errorMessage;
    } catch (error) {
        console.log(error);
    } finally {
        domElement.createTaskModal.style.display = 'none';
        domElement.loader.style.display = 'none';
    }
};

const deleteTask = async (id) => {
    
    //checkCookieExp();
    try {
        const response = await fetch('/api/delete-task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': await getCookie('authorization'),
            },
            body: JSON.stringify({
                id: id
            })
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        }
        const errorMessage = await response.json();
        return errorMessage;
    } catch (error) {
        console.log(error);
    }
};

async function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

async function checkCookieExp() {
    let cookie = await getCookie('authorization');
    console.log(expiration);
    return;
}



export {
    getAllTasks,
    addTask,
    deleteTask
}

