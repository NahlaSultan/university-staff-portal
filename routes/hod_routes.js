const staff_members_models = require('../models/staff_member_models').model
const department_model=require('../models/department_model').model
const course_model=require('../models/course_model').model
const slot_model=require('../models/slot_model').model
const staff_member_routes=require('./staff_member_routes')
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/assignInstructor')
.post(async (req,res)=>{
    console.log("hellooo i entered assign inst")
    const coursename=req.body.courseName
    const instructorname=req.body.instructor
    const staffId=req.user._id;

    const staff=await staff_members_models.findOne({ _id: staffId })
    const instructor=await staff_members_models.findOne({name: instructorname})
    if(staff){
        const department=await department_model.findOne({name: staff.department})
        if(department){
            //not sure
            const course = await department.courses.findOne({courseName: coursename})
            if(course){
                if(instructor){
                    //push mesh betzhar fel recommendations
                    await course.instructors.push(instructor)
                }
                else{res.send("inst not found")}
            }
            else{res.send("course not found")}          
        }
        else{res.send("dept not found")} 
    }
    else{res.send("HOD not found")}
    
})

router.route('/updateInstructor')
.put(async (req,res)=>{

    const coursename=req.body.courseName
    const instructor=req.body.instructor
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const department=await department_model.findOne({name: staff.department})
        if(department){
            //not sure
            //mesh 3arfa el mafrod ye update attributes ehh
            try{
                 const course = await department.courses.findOne({courseName: coursename}, {instructor:instructor})
            //   const course = await course_model.findOneAndUpdate({courseName: coursename}, {instructor:instructor})
                res.send(course)
        }catch(err){
                console.log(err)
           
            }

        }
    }
})

router.route('/deleteInstructor')
.delete(async(req,res)=>{
    const coursename=req.body.courseName
    const instructorname=req.body.instructor
    const staffId=req.user._id;

    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const department=await department_model.findOne({name: staff.department})
        if(department){
            const course = await department.courses.findOne({courseName: coursename})
            await course.instructors.remove({name:instructor},function(err, result) {
                if (err) {
                  console.err(err);
                } else {
                  res.json(result);
                }
              })
        }
        else{res.send("dept not found")}
}
    else{res.send("HOD not found")}
})

router.route('/viewAllStaff')
.get(async(req,res)=>{
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const department=await department_model.findOne({name: staff.department})
        if(department){
            await departement.courses.forEach(async course => {
                await course.instructors.forEach(inst => {
                    res.send(inst)
                });
                await course.teachingAssistants.forEach(ta => {
                     res.send(ta)
                 });
            });
        }
        else{res.send("dept not found")}
    }
    else{res.send("HOD not found")}
})

router.route('/viewStaffinCourse')
.get(async(req,res)=>{
    const coursename=req.body.courseName
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const department=await department_model.findOne({name: staff.department})
        if(department){
            const course = await department.courses.findOne({courseName: coursename})
            await course.instructors.forEach(inst => {
                res.send(inst)
            });
            await course.teachingAssistants.forEach(ta => {
                res.send(ta)
            });
        }
        else{res.send("dept not found")}
    }
    else{res.send("HOD not found")}
})

router.route('/viewDayOffAllStaff')
.get(async(req,res)=>{
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const department=await department_model.findOne({name: staff.department})
        if(department){
            await departement.courses.forEach(async course => {
                await course.instructors.forEach(inst => {
                    res.send(inst.name + " day off: "+ inst.dayOff)
                });
                await course.teachingAssistants.forEach(ta => {
                    res.send(ta.name + "day off: "+ ta.dayOff)
                });
            });
        }
        else{res.send("dept not found")}
    }
    else{res.send("HOD not found")}
})

router.route('/viewDayOffSingleStaff')
.get(async (req,res)=>{
    const staffname=req.body.staffName
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const department=await department_model.findOne({name: staff.department})
        if(department){
            await departement.courses.forEach(async course => {
                const inst =await course.instructors.findOne({name: staffname})
                const ta =await course.teachingAssistants.findOne({name: staffname})
                if(inst){
                     res.send(inst.dayOff)
                     return;
                //    break; 
                }
                else if(ta){
                    res.send(ta.dayOff)
                    return;
                }
            });
        }
        else{res.send("dept not found")}
    }
    else{res.send("HOD not found")}
})

//change day off/leave
//need to add attribute change dayoff in staff model
router.route('/viewAllRequests')
.get(async(req,res)=>{
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const department=await department_model.findOne({name: staff.department})
        if(department){
            await departement.courses.forEach(async course => {
                await course.instructors.forEach(inst => {
                    res.send(inst.name + " change day off request: "+ inst.changeDayOff 
                    + " leave requests: "+ inst.leaves)
                });
                await course.teachingAssistants.forEach(ta => {
                    res.send(ta.name + " change day off request: "+ ta.changeDayOff 
                    + " leave requests: "+ ta.leaves)
                });
            });
        }
        else{res.send("dept not found")}
    }
    else{res.send("HOD not found")}
})

router.route('/viewCourseCoverage')
.get(async (req,res)=>{
    const coursename=req.body.courseName
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
    var s=count( await slot_model.find({courseTaught: coursename}))


    if(staff){
        const department=await department_model.findOne({name: staff.department})
        if(department){
            const course = await department.courses.findOne({courseName: coursename})
            if(course){
               var coverage= (s/course.teachingSlotsNumber) * 100
               res.send("Coverage: "+coverage)
            }
            else{res.send("course not found")}
        }
        else{res.send("dept not found")}
    }
    else{res.send("HOD not found")}
})

router.route('/ViewTeachingAssignments')
.get(async(req,res)=>{
    const coursename=req.body.courseName
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const department=await department_model.findOne({name: staff.department})
        if(department){
            const course = await department.courses.findOne({courseName: coursename})

            await course.instructors.forEach(async inst => {
                const slot =await slot_model.find({academicMemberName: inst.name})
                if(slot){
                    res.send("name: "+inst.name+ " slot type: "+ slot.type+" slot time: "+slot.time)
                }
            });

            await course.teachingAssistants.forEach(async ta => {
                const slot =await slot_model.find({academicMemberName: ta.name})
                if(slot){
                    res.send("name: "+ta.name+ " slot type: "+ slot.type+" slot time: "+slot.time)
                }
            });
        }
        else{res.send("dept not found")}
    }
    else{res.send("HOD not found")}
})

router.route('/RespondtoRequest')
.post(async(req,res)=>{

})


module.exports = router