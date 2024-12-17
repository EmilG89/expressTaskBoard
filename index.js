import express from 'express';
import { engine } from 'express-handlebars';
import * as path from 'path';
import * as taskActions from './database.js';
const PORT = 4001;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    const allTasks = taskActions.getAllTasks;
    res.render('index', {allTasks: allTasks});
});

app.post('/', (req, res) => {
    console.log('here');
    const { Header, Description } = req.body;
    console.log(req.body);
    taskActions.addTask([Header, Description, 'white']);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`listening to http://localhost:${PORT}`);
});