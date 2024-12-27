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
        db.run('INSERT INTO tasks (header, description, color) VALUES (?,?,?)', params, function (err) {
            if (err) {
                reject(err);
            }
            else {
                const id = this.lastID;
                resolve(id);
            }
        });
    });
};

const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM tasks WHERE id = (?)', id, (err) => {
            if (err)
                reject(err);
            else
                resolve('Task deleted');
        });
    });
}

const getUser = (username, password) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users WHERE username = (?) AND password = (?)', [username, password], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row[0]);
        });
    });
}

export {
    getAllTasks,
    addTask,
    deleteTask,
    getUser
}