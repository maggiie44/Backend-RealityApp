const express = require('express');

const userRouter = require('./routes/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');

const app = express();

// MiddleWare
app.use(bodyParser.json());

app.use('/users', userRouter);

const boot = async () => {
    // Connect to MongoDB 
    const URI = config.URI;
    await mongoose.connect(URI);
    // Start express server
    app.listen(4000, () => {
        console.log('Server is running');
    }); 
};

boot();