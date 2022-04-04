const express = require('express');

const userRouter = require('./routes/user');
const bodyParser = require('body-parser');

const app = express();

// MiddleWare
app.use(bodyParser.json());

app.use('/users', userRouter);



app.listen(4000, () => {
    console.log('Server is running');
});