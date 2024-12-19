const getAllTasks = async () => {
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
    }
};

const addTask = async (params) => {
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
            console.log(jsonResponse.message);
            return jsonResponse;
        }
        throw new Error('Request failed!');
    } catch (error) {
        console.log(error);
    }
};

export {
    getAllTasks,
    addTask
}

