const express = require('express');
const app = express();
const path = require("path");
require('dotenv').config();
const connectDb = require('./server/utils/db');
const cors = require('cors');
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());


const mediaRoutes = require('./server/routes/media');
const userRoutes = require('./server/routes/userRoutes');

app.use('/api/media' , mediaRoutes);
app.use('/api/user' , userRoutes);


const PORT = process.env.PORT;

connectDb().then(()=>{
    app.listen(PORT , ()=>{
        console.log(`server is running on port ${PORT}`);
    });
});

