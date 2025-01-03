import  { getDom } from './dom-elements.js';
const domElement = getDom('task-construct');
import { deleteTask } from "./task-operations.js";

export async function constructTaskElement(task) {

    const taskId = task.id;
    const taskHeader = task.header;
    const taskDescription = task.description;
    const taskColor = task.color;

    // Create task data elements
    const taskDiv = document.createElement('div');
    const taskTitle = document.createElement('h4');
    const taskText = document.createElement('p');
    const completeMark = document.createElement('button');

    // Add data and identifiers for task data element
    taskDiv.classList.add('task');
    taskDiv.style.backgroundColor = taskColor;
    taskTitle.innerText = taskHeader;
    taskTitle.style.backgroundColor = taskColor;
    taskTitle.classList.add('taskHeader');
    taskText.innerText = taskDescription;
    taskText.classList.add('taskDescription');
    completeMark.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';

    // Add action to task child element that removes task and updates local storage
    completeMark.onclick = async () => {
        const response = await deleteTask(taskId);
        taskDiv.remove();
        if (response.error) {
            alert(response.error)
        } else {
            alert(response.message)
        }
    };

    // Place all task container elements inside task container
    taskDiv.append(taskTitle);
    taskDiv.append(taskText);
    taskDiv.append(completeMark);

    // Add created task to task board grid element before last task element
    domElement.taskBoard.insertBefore(taskDiv, domElement.taskBoard.children[domElement.taskBoard.children.length-1]);
}