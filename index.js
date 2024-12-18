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
    const allTasks = await taskActions.getAllTasks();
    res.json({ allTasks });
});

app.post('/api/add-task', async (req, res) => {
    const { header, description, color } = req.body;
    await taskActions.addTask([header, description, color]);
    res.json({message: 'Task added.'});
});

app.listen(PORT, () => {
    console.log(`listening to http://localhost:${PORT}`);
});