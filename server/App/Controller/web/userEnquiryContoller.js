const express = require('express');
const enquiryModel = require('../../Models/enquiryModel');
const {ObjectId} = require('mongodb');
const { status } = require('express/lib/response');
const enquiryInsert = async (req,res) =>{
    const {name,password,email,address,city}=req.body;
    const insertedData = new enquiryModel({
        name,
        password,
        email,
        address,
        city,
    })
    insertedData.save()
    .then(()=> res.status(201).json({status:1, msg:'data inserted Successfully', data:insertedData}))
    .catch((err)=>{res.status(400).json({status:0, msg:'data failed to fetch dont enter same data'})
})
    
}

const enquiryData = async (req,res)=>{
   try{
     const readData= await enquiryModel.find();
     console.log(readData)
    res.status(200).json({status:1,msg:'data shown Successfully:', data:readData})
   }catch (err){
        res.status(400).json({ status: 0, msg: 'Failed to fetch data', error: err.message });
    }
    
}


const deleteEnquiry=async (req,res)=>{
    const enquiry = await enquiryModel.findByIdAndDelete(req.params.id)
    res.send({status:1,enquiry})
}

const enquirySingleRow = async (req,res) => {
    const id=req.params.id;
    const enquiry = await enquiryModel.findOne({_id:id})
    res.send({status:1, enquiry})
}

const enquiryUpdate= async(req,res)=>{
    const updateId=req.params.id;
    const {name,password,email,address,city}=req.body;
    const updateObj={
        name,
        password,
        email,
        address,
        city
    }
    const enquiry = await enquiryModel.updateOne({_id:updateId},updateObj)
    res.send({status:1,enquiry})
}
module.exports={enquiryInsert,enquiryData,enquirySingleRow,deleteEnquiry,enquiryUpdate};