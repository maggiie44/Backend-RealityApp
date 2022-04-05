require("dotenv").config();
const express = require('express');

const userRouter = require('./routes/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// MiddleWare
app.use(bodyParser.json());

app.use('/users', userRouter);

const boot = async () => {
    // Connect to MongoDB 
    const URI = 'mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.PASSWORD + '@' + process.env.PROJECT_NAME + '.mongodb.net/the_reality?retryWrites=true&w=majority'
    console.log(URI);
    await mongoose.connect(URI);
    // Start express server
    app.listen(4000, () => {
        console.log('Server is running');
    }); 
};

boot();