const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { authenticate } = require('../middleware/auth');


router.post('/sign_up' , userController.sign_up);
router.post('/login' , userController.login);

// This is example of token based authentication
router.get('/get_user/:token' ,authenticate, userController.get_user);
router.put('/add_bio' , userController.addBio);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync("public")) {
        fs.mkdirSync("public");
      }
  
      if (!fs.existsSync("public/images")) {
        fs.mkdirSync("public/images");
      }
  
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + file.originalname);
    },
  });

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB limit
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
});


function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }


  router.put('/upload_image' , upload.single('image'), userController.add_image);

module.exports = router;