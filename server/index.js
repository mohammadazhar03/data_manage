const express=require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const enquiryRoutes = require('./App/Routes/web/createRouting');
let app=express();
require('dotenv').config();
app.use(express.json());

app.use(cors())
app.use('/api/web/',enquiryRoutes);

mongoose.connect(process.env.DBURL).then(()=>{
    console.log('mongoose in connected')
    app.listen(process.env.PORT , ()=>{
    console.log('Server is running on PORT '+process.env.PORT)
})
}).catch((err)=>{
    console.log('mongoose is disconnected')
})