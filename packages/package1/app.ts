import express, { Application } from 'express';
const app: Application = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use('/product', require('./src/routes/getProduct'));

export default app;