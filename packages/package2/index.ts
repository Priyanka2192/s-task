import app from 'package1/index';
import express from 'express';

app.use(express.json())
app.use('/product',require('./src/routes/addProduct'));

export default app;