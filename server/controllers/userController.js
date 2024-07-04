const User = require('../models/user');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const secretToken = process.env.JWT_SECRET;

const sign_up = async(req , res)=>{
    
    try {

        const {first_name , last_name , mobile_number , email} = req.body;

        const userExist = await User.findOne({email : email});

        if(userExist){
            return res.status(200).json({status : 'error', msg : 'email already exists'});
        }

        const password = create_password(first_name,last_name,mobile_number);
        const userCreated = await User.create({first_name,last_name,mobile_number,email,password});

        res.status(200).json({status : 'success', msg : 'User Created..!', user : userCreated});

    } catch (error) {
        
        res.status(500).json({msg : "Internal Server Error" , error : error.message});
    }
};

function create_password(first_name,last_name,mobile_number) {
    
    let firstPart = first_name.substring(0,2);
    let lastPart = last_name.substring(0,2);

    let mobilePart = mobile_number.substring(mobile_number.length - 4);

    let rawPassword = firstPart + lastPart + mobilePart;
    
    let password = rawPassword.toLowerCase();
    
    password = shuffleString(password);
    console.log(password);
    return password;
    
}

function shuffleString(str){

    let arr = str.split('');

    for(let i = arr.length - 1; i > 0 ; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [arr[i] , arr[j]] = [arr[j] , arr[i]];
    }
    return arr.join('');
};


const login = async (req , res)=> {

    const {first_name , password } = req.body;

    try {

        const find_user = await User.findOne({first_name , password});
        if(!find_user){
            return res.status(404).json({message : "Invalid Credentials"});
        }
        const token = jwt.sign(find_user._id.toString(), secretToken);
        return res.status(200).json({status : 'success' ,msg : 'Successfully LoggedIn' , token : token , password : find_user.password})
    }catch(error){
        res.status(500).json({message : "Internal Server Error" , error : error.message});
    }
}
async function get_user(req , res){
    let token = req.params.token;
    console.log('token' , token)
    const user = await get_user_by_token(token);
    console.log(user);
    res.status(200).json({user}) 
};
const addBio = async (req , res)=>{

    let {bio , token} = req.body;

    const user = await get_user_by_token(token);

    await User.updateOne({_id : user._id} , {$set : {bio}});

    res.status(200).json({message : 'Bio is added'});

}
const add_image = async (req ,res)=>{

    let {token} = req.body;

    const image_url = `/public/images/${req.file.filename}`;
    console.log(image_url);

    const user = await get_user_by_token(token);

    await User.updateOne({_id : user._id} , {$set : {image_url}});

    res.status(200).json({message : 'Image is added'});
}
async function get_user_by_token(token){

    let user_id = jwt.verify(token,secretToken);
    user_id = await create_objectId(user_id);
    
    return await User.findOne({'_id' : user_id});
}

async function create_objectId(id){

    return new mongoose.Types.ObjectId(id);
};
module.exports = {sign_up , login , get_user , addBio , add_image};