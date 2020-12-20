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
            if(coordinator.course.includes(req.body.courseName) ){
        course.courseCoordinator=coordinator._id
        console.log(coordinator._id)
        course.save()
        res.send("successfully assigned")}
        else{
             res.send("this academic member is not assigned to this course")
        }
    }
        else{
            res.send("the course is not yours")
        }
    
}

})
//remove assigned course from an academic member
router.route('/removeAssignedCourse')
.post(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    const academicMember = await staff_members_models.findOne({ email: req.body.email })
    if(staff){  
        const course = await course_model.findOne({ courseName: req.body.courseName })
        if(academicMember.course.includes(req.body.courseName)){
            if(staff.course.includes(req.body.courseName)){
        for(let i=0;i<academicMember.course.length;i++){
            if(academicMember.course[i]==req.body.courseName)
            academicMember.course.splice(i,1)

        }
        academicMember.save()
        res.send("successfully removed")}
        else{
            res.send("This course is not yours. You can't change in ")
        }
    }
        else{
            res.send("You are not assigned to this course")
        }
    
}

})

//updateassigned course from an academic member
router.route('/updateAssignedCourse')
.post(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    const academicMember = await staff_members_models.findOne({ email: req.body.email })
    if(staff){  
        const course = await course_model.findOne({ courseName: req.body.courseName })
            if(staff.course.includes(req.body.courseName)){
                if(!academicMember.course.includes(req.body.courseName)){
                academicMember.course.push(req.body.courseName)
        academicMember.save()
        res.send("successfully added")}
        else{
            res.send("this course is already assigned to this academic member")
        }
    }
        else{
            res.send("This course is not yours. You can't change in ")
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
//assign members to slots
router.route('/assignSlots')
.post(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    const academicMember = await staff_members_models.findOne({ email: req.body.email })
    const slot= await slot_model.findOne({ numberID: req.body.numberID})
    if(staff){ 
        console.log(slot)
        if(slot.assignedFlag==false){
            if(academicMember.course.includes(slot.courseTaught)){
                console.log("heeyyyy")
              slot.assignedFlag=true
       console.log(slot.assignedFlag)
       academicMember.slotsAssigned.push(slot.numberID)
       slot.save()
       academicMember.save()
       res.send("Successfully done")
    }
       else{
           res.send("You're trying to assign this academic member to a slot of a course that he is not assigned to")
       }

    }else{
        res.send("this slot is already assigned to someone")
    }
    }


})

module.exports = router