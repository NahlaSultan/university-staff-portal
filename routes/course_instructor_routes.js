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
const slots_model = require('../models/slot_model').model


//viewcoverage
router.route('/viewCoverage')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    //const tmp=await slots_model.find({courseTaught: coursename})
    if(staff){ 
        var array=[]
       for(let i=0;i<staff.course.length;i++){
           const course= await course_model.findOne({courseName:staff.course[i]})

            var s=0
            for(let j=0;j<staff.slotsAssigned.length;j++){
                const slot =await slots_model.find({numberID:staff.slotsAssigned[j]})

                if(slot.courseTaught==staff.course.courseName)
                s=s+1
            }
                    const totalNo= await course.teachingSlotsNumber
                    const coverage= (s/totalNo) * 100
                    array.push(staff.course[i]+ "->"+"Coverage: "+coverage+"%")
            }
            // if(course){
               
            res.send(array)
            // else{res.send("course not found")}
        
       
    }
    
    else{res.send("Instructor not found")}
    //res.send(staff.courseCoverage+"")
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
    var array=[]
    if(staff){  
         for(let i=0;i<staff.course.length;i++){
        const result =  await staff_members_models.find({course:staff.course[i]})
        array.push(result)
       // res.send(result)
    }
    res.send(array)
    
}

})


//assign coordinator
router.route('/assignCourseCoordinator')
.post(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    const coordinator = await staff_members_models.findOne({ memberID: req.body.memberID })
    if(staff){  
        if(coordinator){
        const course = await course_model.findOne({ courseName: req.body.courseName })
        if(staff.course.includes(req.body.courseName)){
            if(coordinator.course.includes(req.body.courseName) ){
                course.courseCoordinator=coordinator.memberID
                //console.log(coordinator._id)
                coordinator.role.push("courseCoordinators")
                //coordinator.course.push(course.courseName)
                course.save()
                coordinator.save()
                res.send("successfully assigned")
        }
        else{
             res.send("this academic member is not assigned to this course")
        }
    }
        else{
            res.send("the course is not yours")
        }
    }   
}
res.send("this coordinator id is not valid")


})
//remove assigned course from an academic member
router.route('/removeAssignedCourse')
.post(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    const academicMember = await staff_members_models.findOne({ memberID: req.body.memberID })
    if(staff){  
        const course = await course_model.findOne({ courseName: req.body.courseName })
        if(academicMember.course.includes(req.body.courseName)){
            if(staff.course.includes(req.body.courseName)){
        for(let i=0;i<academicMember.course.length;i++){
            if(academicMember.course[i]==req.body.courseName)
            academicMember.course.splice(i,1)

        }
        var slot;
        for(let i=0;i<academicMember.slotsAssigned.length;i++){
            slot= await slots_model.findOne({numberID:academicMember.slotsAssigned[i]})
            if (slot.courseTaught==req.body.courseName){
                slot.assignedFlag=false
                academicMember.slotsAssigned.splice(i,1)
            }

        }
        slot.academicMember=null
        slot.save()
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
    const academicMember = await staff_members_models.findOne({ memberID: req.body.memberID })
    if(staff){  
        const course = await course_model.findOne({ courseName: req.body.courseName })
        const memberRole= academicMember.role
            if(staff.course.includes(req.body.courseName)){
                if(!academicMember.course.includes(req.body.courseName)){
                academicMember.course.push(req.body.courseName)
                if(memberRole=="teachingAssistants")
                course.teachingAssistants.push(academicMember.memberID)
                else if (memberRole=="courseInstructors")
                course.instructors.push(academicMember.memberID)
                else res.send("invalid member")
        academicMember.save()
        course.save()
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
        var array=[]
        for(let i=0;i<staff.slotsAssigned.length;i++){
            const result =  await slots_model.find({numberID:staff.slotsAssigned[i]})
            array.push(result)
           
        }
        res.send(array)
    }


})
//assign members to slots
router.route('/assignSlots')
.post(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    const academicMember = await staff_members_models.findOne({ memberID: req.body.memberID })
    const slot= await slot_model.findOne({ numberID: req.body.numberID})
    if(staff){ 
        //console.log(slot)
        if(slot.assignedFlag==false){
            if(academicMember.course.includes(slot.courseTaught)){
                console.log("heeyyyy")
              slot.assignedFlag=true
       //console.log(slot.assignedFlag)
       academicMember.slotsAssigned.push(slot.numberID)
       slot.academicMember=academicMember.memberID
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