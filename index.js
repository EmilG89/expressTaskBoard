import express from 'express';
import * as path from 'path';
import * as taskActions from './database.js';
const PORT = 4001;

const app = express();

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/get-all-tasks', async (req, res) => {
    try {
        const allTasks = await taskActions.getAllTasks();
        await new Promise(resolve => setTimeout(resolve, 1000));
        res.status(200).json({ allTasks });
    } catch {
        res.status(400).json({ error: '400 Bad Request' });
    }
});

app.post('/api/add-task', async (req, res) => {
    const { header, description, color } = req.body;
    try{
        const addedTaskId = await taskActions.addTask([header, description, color]);
        await new Promise(resolve => setTimeout(resolve, 1000));
        res.status(201).json({ message: `Task ${header} added`, id: addedTaskId });
    } catch {
        res.status(400).json({ error: '400 Bad Request' });
    }
});

app.delete('/api/delete-task', async (req, res) => {
    const { id } = req.body;
    try {
        const response = await taskActions.deleteTask(id);
        await new Promise(resolve => SetTimeout(resolve, 1000));
        res.status(200).json({ message: response });
    } catch {
        console.log('here');
        res.status(400).json({ error: '400 Bad Request' });
    }
});

app.listen(PORT, () => {
    console.log(`listening to http://localhost:${PORT}`);
});