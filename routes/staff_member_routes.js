const staff_members_models = require('../models/staff_member_models').model
//const workingSchedule_models = require('../models/workingSchedule_model')

const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { workingScheduleSchema } = require('../models/workingSchedule_model')
require('dotenv').config()


//signin
router.route('/signIn')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){ 
    var query = {'_id': staffId}; 
    staff_members_models.findOneAndUpdate(query,{ "attendance": {"signInTime": new Date()}}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
  });
    }
    res.send('/homepage')
})
//signout
router.route('/signOut')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){ 
    var query = {'_id': staffId}; 
    staff_members_models.findOneAndUpdate(query,{ "attendance": {"signOutTime": new Date()}}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
  });
    }
    res.send('/login')
})
//view attendance
router.route('/viewAttendance')
.get(async(req,res)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
 
})


router.route('/homePage')
    .get((req, res) => {
        res.send('/login')
    })
//resetpassword
router.route('/resetPassword')
    .post( async (req, res) => {
       // console.log(req.user)
        const staffId=req.user._id;
        //console.log("/n in req")
        const staff = await staff_members_models.findOne({ _id: staffId })
      if(staff){
      const salt= await bcrypt.genSalt(10)
     const newpass=await bcrypt.hash(req.body.password,salt) 
     const document={
         $set:{
             password:newpass,
         },
     };
   
    var query = {'_id': staffId}; 
    staff_members_models.findOneAndUpdate(query,document, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
    
      return res.send('Succesfully saved.');
  });
      }
     
    })

module.exports = router