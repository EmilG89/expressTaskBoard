import express from 'express';
import { engine } from 'express-handlebars';
import * as path from 'path';
const PORT = 4001;
import sqlite3 from 'sqlite3';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = new sqlite3.Database('./data.db');

const addTaskToDB = (params) => {
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

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    const { Header, Description } = req.body;
    console.log(req.body);
    addTaskToDB([Header, Description, 'white']);
    res.redirect('/');
})

app.listen(PORT, () => {
    console.log(`listening to http://localhost:${PORT}`);
});