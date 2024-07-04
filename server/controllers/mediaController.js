const Media = require('../models/media');
const User = require('../models/user');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const secretToken = process.env.JWT_SECRET;

const getAllVideos = async (req , res)=>{

    try{
        let media;
        if(req.params.user_id){
            media = await Media.find({user_id : req.params.user_id});
            
        }else{
            media = await Media.find();
        }
        res.status(200).json(media);

    }catch(error){
        res.status(400).json({message : error.message});
    }
};

const uploadVideo = async (req , res)=>{

    try {
        const {title , description , token} = req.body;
        console.log(req.files)
        const user = await get_user_by_token(token);
        const video_url = `/public/videos/${req.file.filename}`;
        const createMedia = await Media.create({title,description,video_url, user_id : user._id.toString()});
        res.status(200).json({message : 'Video is added' , createMedia});
    } catch (error) {
        res.status(400).json({message : error.message});
    }
}

const getVideos = async (req , res)=>{

    let videos_data = [];

    const users = await User.find();

    if(!users || users.length < 1){
        return res.json({status : 'error' , message : 'Users not available'});
    }
    for(let user of users){

        let videos = await Media.find({user_id : user._id.toString()}).limit(5);

        videos_data.push({user , videos});
    }

    res.status(200).json({videos_data});
}
async function get_user_by_token(token){
    console.log(secretToken)

    let user_id = jwt.verify(token,secretToken);
    user_id = await create_objectId(user_id);
    
    return await User.findOne({'_id' : user_id});
}

async function create_objectId(id){

    return new mongoose.Types.ObjectId(id);
};
module.exports = {getAllVideos , uploadVideo , getVideos};