import express from 'express';
import * as path from 'path';
import * as dbActions from './database.js';
import session from 'express-session';

const PORT = 4001;

const app = express();

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Session cookie instantiation
app.use(session({
    secret: 'Emils_secret_from_env',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        httpOnly: true,
        secure: false
    }
}));

// Authorization middleware
function authorize(req, res, next) {
    console.log('here1');
    if (req.session.user) { 
        console.log('here2'); 
        next();
    }
    else {
        console.log('here3');
        res.redirect('/login');
    }
}

app.get('/', authorize, (req, res) => {
    res.sendFile('index');
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: path.join(import.meta.dirname, '/public') });
});

app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await dbActions.getUser(username, password);
        req.session.user = user.id;
        res.cookie('sessionID', req.sessionID);
        await new Promise(resolve => setTimeout(resolve, 1000));
        res.status(200);
        res.redirect('/login');
    } catch (e) {
        console.log(e)
        res.status(400).json({error: '400 Bad Request'});
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

app.get('/api/logout', authorize, (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('sessionID');
        res.status(200);
        res.redirect('/login');
    });
});

app.listen(PORT, () => {
    console.log(`listening to http://localhost:${PORT}`);
});