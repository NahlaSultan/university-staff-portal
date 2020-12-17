const staff_members_models = require('../models/staff_member_models').model
const staff_member_routes=require('./staff_member_routes')
const newReplacement=require('../models/replacement_requests').model
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/viewSchedule')
.get(async(req, res) => {
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        //mafrood redirect
        res.send(staff.workingSchedule)
    }
})
router.route('/sendReplacementRequest')
.post(async(req,res)=>{
        //I am sending a request to someone ,i Will create a new request object and add it to the replacementRequest table of this user
        const senderId=req.user._id;
        const receiver=req.body.receiverId;
        const slotReplacement=req.body.slot;
        const staff=await staff_members_models.findOne({ _id: senderId }) 
        if(staff){
        var request=new newReplacement(
            {
            pending:true,
            accepted:false,
            slot:slotReplacement,
            receiverId:receiver
            }
        )
        try{
            await request.save()
            }
            catch(Err){
                console.log(Err)
            }
           await staff.requestReplacementSent.push(request)
           await staff.save()
            res.send("Successfully sent")
        }
      //add it to the table of requests in staff member
       
    }
)
module.exports = router