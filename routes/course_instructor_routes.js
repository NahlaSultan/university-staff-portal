const staff_members_models = require('../models/staff_member_models').model
const course_model = require('../models/course_model').model
const staff_member_routes=require('./staff_member_routes')
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ReplSet } = require('mongodb')
require('dotenv').config()
const slot_model = require('../models/slot_model').model


//viewcoverage
router.route('/viewCoverage')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){ 
    res.send(staff.courseCoverage+"")
}

})
//view staff in same department
router.route('/viewDepartmentStaff')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){  
        
        const result =  await staff_members_models.find({department:staff.department})
        console.log(result)
        res.send(result)
    
}

})
//view staff who gives same course
router.route('/viewCourseStaff')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){  
         for(let i=0;i<staff.course.length;i++){
        const result =  await staff_members_models.find({course:staff.course[i]})
        res.send(result)}
    
}

})
//assign coordinator
router.route('/assignCourseCoordinator')
.post(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    const coordinator = await staff_members_models.findOne({ email: req.body.email })
    if(staff){  
        const course = await course_model.findOne({ courseName: req.body.courseName })
        if(staff.course.includes(req.body.courseName)){
        course.courseCoordinator=coordinator
        course.save()
        res.send("successfully assigned")}
        else{
            res.send("the course is not yours")
        }
    
}

})
//remove assigned coordinator
router.route('/removeAssignedCoordinator')
.post(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    const coordinator = await staff_members_models.findOne({ email: req.body.email })
    if(staff){  
        const course = await course_model.findOne({ courseName: req.body.courseName })
        if(staff.course.includes(req.body.courseName)){
        course.courseCoordinator=null
        course.save()
        res.send("successfully assigned")}
        else{
            res.send("the course is not yours")
        }
    
}

})
// view assigned slots
router.route('/viewSlots')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){ 
        for(let i=0;i<staff.slotsAssigned.length;i++){
            const result =  await slots_model.find({_id:staff.slotsAssigned[i]})
            res.send(result)
        }
    }


})

module.exports = router