const express = require("express");
const { enquiryInsert, enquiryData, deleteEnquiry, enquirySingleRow ,enquiryUpdate} = require("../../Controller/web/userEnquiryContoller");
const enquiryRoutes = express.Router()

enquiryRoutes.post('/insert_data',enquiryInsert)
enquiryRoutes.get('/enquiry_data',enquiryData)
enquiryRoutes.delete('/enquiry_delete/:id',deleteEnquiry)
enquiryRoutes.get('/enquiry_singlerow/:id',enquirySingleRow)
enquiryRoutes.put('/enquiry_update/:id',enquiryUpdate)
module.exports=enquiryRoutes;