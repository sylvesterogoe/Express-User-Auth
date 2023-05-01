import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use('/api/user', authRoute);

const PORT = parseInt(process.env.PORT);
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready and Server is Listening on Port", PORT);
    })
})
.catch((err)=>{
    console.log("A error has been occurred while connecting to database.", err);   
});
