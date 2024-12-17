import { db } from './db.js';

const getAllTasks = () => {
    return db.all('SELECT * FROM tasks');
};

const addTask = (params) => {
    if (params.length === 3) {
        try {
            db.run('INSERT INTO tasks(header, description, color) VALUES(?,?,?)', params);
            console.log('data added');
        } catch (err) {
            console.log('Can not add data to DB.');
        } finally {
            db.close();
        }
    } else {
        console.log('missing parameters');
        return;
    }
};

export {
    addTask,
    getAllTasks
}