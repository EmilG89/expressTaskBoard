import * as domElement from './dom-elements.js';

const getAllTasks = async () => {

    domElement.createTaskModal.style.display = 'flex';
    domElement.loader.style.display = 'block';

    try {
        const response = await fetch('/api/get-all-tasks');
        if (response.ok) {
            const jsonResponse = await response.json();
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

    domElement.newTaskForm.style.display = 'none';
    domElement.loader.style.display = 'block';

    try {
        const response = await fetch('/api/add-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
    try {
        const response = await fetch('/api/delete-task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
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


export {
    getAllTasks,
    addTask,
    deleteTask
}

