const background = document.getElementById('backgroud');
const taskBoard = document.getElementById('taskBoard');
const newTask = document.getElementById('newTask');
const createTaskModal = document.getElementById('createTaskModal');
const loader = document.getElementById('loader');
const newTaskForm = document.getElementById('newTaskForm');
const addTaskButton = document.getElementById('addTask');
const cancelButton = document.getElementById('cancel');
const headerInput = document.getElementById('headerInput');
const descriptionInput = document.getElementById('descriptionInput');
const message = document.getElementById('message');
const registerButton = document.getElementById('register');
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginButton = document.getElementById('login');
const logoutButton = document.getElementById('logoutButton');
const colorPalette = ['#E2DAF1', '#EFD6E8', '#F6D5DC', '#F7D6D0', '#F1D9C8', '#E6DDC5', '#D8E1C9'];

export function getDom(route) {

    switch(route) {   
        case 'login':
            return { 
                username, 
                password,
                loginButton,
                logoutButton
            };
        case 'home':
            return { 
                background, 
                taskBoard, 
                newTask,
                createTaskModal,
                loader,
                newTaskForm,
                addTaskButton,
                cancelButton,
                headerInput,
                descriptionInput,
                message,
                registerButton,
                logoutButton,
                colorPalette
            };
        case 'task-operations':
            return {
                createTaskModal,
                newTaskForm,
                loader
            }
        case 'task-construct':
            return {
                taskBoard
            }
        default:
            console.log('error from dom-elements.js');
    }

}