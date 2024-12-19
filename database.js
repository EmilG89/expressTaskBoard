import { db } from './db.js';

const getAllTasks = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM tasks', (err, rows) => {
            if (err) 
                reject(err);
             else 
                resolve(rows);
        });
    });
};

const addTask = (params) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO tasks (header, description, color) VALUES (?,?,?)', params, (err, row) => {
            if (err) 
                reject(err);
            else
                resolve(`Task: ${params[0]} added.`);
        });
    });
};

export {
    addTask,
    getAllTasks
}