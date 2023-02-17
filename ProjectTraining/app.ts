import express,{Request,Response} from 'express';
const app = express();

// middlewares
app.use(express.json());

app.use('/list',require('./src/routes/getList'));
app.use('/add',require('./src/routes/addUser'));

module.exports = app;