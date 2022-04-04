const mongoose = require('mongoose');

const run = async () => {
    const URI = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.sddfq.mongodb.net/sample_training?retryWrites=true&w=majority'
    await mongoose.connect(URI);

    const zips = await mongoose.connection.db.collection('zips').find({}).toArray();

    console.log(zips);
};

run().then( () => {
    console.log('Done');
    process.exit(0);
})
.catch((e) => {
    console.log(e);
    process.exit(1);
})