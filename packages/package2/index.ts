require('dotenv').config();
import app from 'package1/index';
import express, { Application } from 'express';

app.use(express.json())
app.use('/product',require('./src/routes/addProduct'));

export default app;