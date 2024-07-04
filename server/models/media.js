const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({

    title : {
        type : String,
        require : true 
    },
    video_url : {
        type : String,
        require : true 
    },
    description :{
        type : String,
        require : true
    },
    user_id : {
        type : String,
        require : true,
    }
});


module.exports = mongoose.model('Media' , MediaSchema);