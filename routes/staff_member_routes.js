const staff_members_models = require('../models/staff_member_models').model
//const workingSchedule_models = require('../models/workingSchedule_model')

const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { workingScheduleSchema } = require('../models/workingSchedule_model')
require('dotenv').config()
const newAttendance=require ('../models/attendance_record').model


//signin
router.route('/signIn')
.get(async(req,res,)=>{
    
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
   
    if(staff){ 
        
        var currentTime=new newAttendance(
            {"signInTime": new Date()}
        )
        try{
            await currentTime.save()
        }
        catch(Err){
            console.log(Err)
        }
        if(staff.attendance.length==0)
        {
            await staff.attendance.push(currentTime)
            await staff.save()
        }else{
        if(staff.attendance[staff.attendance.length-1].signOutTime!=null){
            console.log("i entered herrrrre")
      await staff.attendance.push(currentTime)
      await staff.save()
      res.send()
    }
      else res.send("you cannot sign in without signing out")
    }}
    res.send('/homepage')
})
//signout
router.route('/signOut')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){ 
        if(staff.attendance[staff.attendance.length-1].signOutTime==null ){
        var currentTime2=new newAttendance(
            {"signInTime":staff.attendance[staff.attendance.length-1].signInTime,
            "signOutTime": new Date() }
        )
        try{
            await currentTime2.save()
        }
        catch(Err){
            console.log(Err)
        }

        const array = []
        for(let index=0;index<staff.attendance.length-1;index++){
         
         array.push(staff.attendance[index])
        }
        array.push(currentTime2)
        staff.attendance=array
        await staff.save()
        res.send('/login')}
        else res.send("you cannot sign out without signing in")
    }
    
})
//viewProfile
router.route('/viewProfile')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){ 
    // res.send(staff.name, staff.numberID, staff.email,staff.salary,staff.role,
    // staff.memberID,staff.dayOff,staff.annualLeavesBalance, staff.Leaves,staff.workingSchedule
    // ,staff.faculty,staff.department, staff.officeLocation )
    res.send(staff)
}
})
//view attendance
router.route('/viewAttendance')
.get(async(req,res)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){ 
        res.send(staff.attendance)
        }
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
          if(req.body.password=="123456")
          {
              res.send("invalid password")
          }else{
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
 
      }}
     
    })


module.exports = router