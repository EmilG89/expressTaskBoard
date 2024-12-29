import express from 'express';
import * as path from 'path';
import * as dbActions from './database.js';
import jwt from 'jsonwebtoken';


const PORT = 4001;

const app = express();

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Authorization middleware with JWT validation
const authorize = (req, res, next) => {
    const token = req.headers['authorization'];// || getCookie(req, 'authprization');
    if (!token) {
      return res.redirect('/login');
    }
  
    jwt.verify(token, 'secret', (err) => {
      if (err) {
        console.log(err);
        return res.redirect('/login');
      }
      next();
    });
};



app.get('/', (req, res) => {
    res.sendFile('home.html', { root: path.join(import.meta.dirname, '/public') });
});



app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: path.join(import.meta.dirname, '/public') });
});



app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await dbActions.getUser(username, password);
        const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
        await new Promise(resolve => setTimeout(resolve, 1000));
        res.status(200).json({ message: user.username, token });
    } catch (e) {
        console.log(e)
        res.status(400).json({error: 'Could not log in!'});
    }
});



app.get('/api/get-all-tasks', authorize, async (req, res) => {
    try {
        const allTasks = await dbActions.getAllTasks();
        await new Promise(resolve => setTimeout(resolve, 1000));
        res.status(200).json({ allTasks });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: '400 Bad Request' });
    }
});



app.post('/api/add-task', authorize, async (req, res) => {
    const { header, description, color } = req.body;
    try{
        const addedTaskId = await dbActions.addTask([header, description, color]);
        await new Promise(resolve => setTimeout(resolve, 1000));
        res.status(201).json({ message: `Task: ${header} added`, id: addedTaskId });
    } catch (e){
        console.log(e);
        res.status(400).json({ error: '400 Bad Request' });
    }
});



app.delete('/api/delete-task', authorize, async (req, res) => {
    const { id } = req.body;
    try {
        const response = await dbActions.deleteTask(id);
        await new Promise(resolve => setTimeout(resolve, 1000));
        res.status(200).json({ message: response });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: '400 Bad Request' });
    }
});



app.get('/api/logout', (req, res) => {
    res.clearCookie('authorization');
    res.status(200).json({ message: 'logged out.' });
});



app.listen(PORT, () => {
    console.log(`listening to http://localhost:${PORT}`);
});