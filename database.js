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
        db.run('INSERT INTO tasks (header, description, color) VALUES (?,?,?)', params, (err) => {
            if (err) 
                reject(err);
            else
                resolve();
        });
    });
};

export {
    addTask,
    getAllTasks
}