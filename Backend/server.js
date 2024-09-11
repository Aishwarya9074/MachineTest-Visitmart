import express from 'express';
import cors from 'cors';
import mongoose from './db/db.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/index.js';

dotenv.config({path:'./.env'})



const app=express()
app.use(cors())
// app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(router)

app.listen(process.env.PORT,()=>{
    console.log('app is running @http://localhost:4000')
})