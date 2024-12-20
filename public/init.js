import { getAllTasks, addTask, deleteTask } from './modules/task-operations.js';
import * as domElement from './modules/dom-elements.js';
import { constructTaskElement } from './modules/task-construct.js';

// Import color palette for task constructor
const colorPalette = domElement.colorPalette;

// Get all task from DB
const tasks = await getAllTasks();

// If there were tasks in db, each task will be added to
// browser window one by one.
if (tasks) {
    tasks.forEach(task => constructTaskElement(task));
}

// Listen if newTask div is cliecked. When clicked container for creating new task
// will appear
domElement.newTask.addEventListener('click', (event) => {
    event.preventDefault();
    domElement.createTaskModal.style.display = 'block';
    domElement.newTaskForm.style.display = 'block';
});

// Listen if cancel button is clicked inside modal container
domElement.cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    domElement.createTaskModal.style.display = 'none';
    domElement.newTaskForm.style.display = 'none';
    domElement.message.innerHTML = '';
});

// Listen if add data is clicked
domElement.addTaskButton.addEventListener('click', async (event) => {
    event.preventDefault();
    domElement.message.innerHTML = '';

    // Create directory taht holds required field objects with properties
    let requiredFields = {
        header: {
            value: domElement.headerInput.value,
            length: 4
        },
        description: {
            value: domElement.descriptionInput.value,
            length: 12
        },
        color: {
            value: colorPalette[Math.floor(Math.random()*(colorPalette.length+1))]
        }
    };

    // Loop through required input fields and check if input is valid
    for (let key in requiredFields) {
        if (requiredFields[key].value.length < requiredFields[key].length) {
            domElement.message.innerHTML = key + ` must have at least ${requiredFields[key].length} symbols!`;
            return;
        }
    }
    // Add validated data to db and receive back id of newly created object
    const response = await addTask({
        header: requiredFields.header.value, 
        description: requiredFields.description.value, 
        color: requiredFields.color.value
    });

    if (response.error) {
        alert(response.error);
        return;
    } else {
        alert(response.message)
    }

    // Clear out input fields
    domElement.headerInput.value = '';
    domElement.descriptionInput.value = '';
    
    // use validated data and id of new object to create html element and disply it on screen
    constructTaskElement({ 
        id: response.id,
        header: requiredFields.header.value, 
        description: requiredFields.description.value, 
        color: requiredFields.color.value 
    });
});