const mongoose = require('mongoose');

const URI = process.env.URI;
// const URI = 'mongodb://127.0.0.1:27017/video_box'

const connectDb = async ()=>{

    try{
        await mongoose.connect(URI);
        console.log('connection established with database');
    }catch(err){
        console.error(err);
        process.exit(0);
    }
}

module.exports = connectDb; 