const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();

connectDB();
const app = express();

const port = process.env.PORT || 2598;

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server listing on port ${port}`)
})



