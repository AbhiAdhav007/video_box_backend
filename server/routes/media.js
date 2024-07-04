const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const mediaController = require('../controllers/mediaController');
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync("public")) {
        fs.mkdirSync("public");
      }
  
      if (!fs.existsSync("public/videos")) {
        fs.mkdirSync("public/videos");
      }
  
      cb(null, "public/videos");
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + file.originalname);
    },
  });

const upload = multer({
    storage : storage,
    limits : {fileSize : 1024 * 1024 * 6},// 6mb limit
    fileFilter :(req , file , cb)=>{

        let ext = path.extname(file.originalname);

        if(ext !== '.mp4'){
            return cb(new Error('Only videos in .mp4 format are allowed'));
        }

        return cb(null , true);
    }
})

router.post(
  "/upload_video",
  upload.single('videos'),
  mediaController.uploadVideo
);
router.get('/all/:user_id' , mediaController.getAllVideos);

router.get('/video_listing' , mediaController.getVideos);

module.exports = router;