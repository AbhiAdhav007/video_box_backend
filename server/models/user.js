const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    mobile_number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    password:{
        type : String,
        required : true
    },
    bio : {
        type : String
    },
    image_url : {
        type : String
    }
});

module.exports = mongoose.model('Users' , userSchema);