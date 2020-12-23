const staff_members_models = require('../models/staff_member_models').model
const department_model=require('../models/department_model').model
const faculty_model=require('../models/faculty_model').model
const course_model=require('../models/course_model').model
const slot_model=require('../models/slot_model').model
const dayoff_model=require('../models/dayOffRequest').model
const leaves_model=require('../models/leaves_model').model
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//working
router.route('/assignInstructor')
.post(async (req,res)=>{
    const coursename=req.body.courseName
    const instructorid=req.body.instructorId
    const staffId=req.user._id;

    const staff=await staff_members_models.findOne({ _id: staffId })
    const instructor=await staff_members_models.findOne({memberID: instructorid})
    if(staff){
        console.log(staff.department)
        console.log(staff.faculty)

        const faculty=await faculty_model.findOne({facultyName: staff.faculty})
        if(faculty){
            console.log("is fac")
            var department;
            const depArray=faculty.departments
            depArray.forEach(d => {
            if(d.name == staff.department)
                department= d
            });
            if(department){ 
                console.log("is dep")
  
                const courseArray=department.courses
                console.log(courseArray.length)
                courseArray.forEach( async(c) => {
                    console.log(c)

                    if(c == coursename){
                        console.log("is course")

                        const course= await course_model.findOne({courseName:coursename})
                        if(instructor){
                            console.log("is ins")
                            instructor.course.push(coursename)
                            if(!instructor.role.includes("courseInstructors")){
                                instructor.role.push("courseInstructors")
                            }
                            instArray=course.instructors
                        //    if(!instArray.findOne(instructorid)){
                                await instArray.push(instructorid)
                                try{
                                    await course_model.findOneAndUpdate({courseName:coursename},{instructors:instArray})
                                    await instructor.save()
                                    res.send("instructor assigned successfully")

                                }
                                catch(err){
                                    console.log(err)
                                    console.log(course)
                                }
                        //    }
                            // else{
                            //     res.send("instructor is already assigned ")
                            // }
                        }
                        else{res.send("inst not found")}
                    }
                });       
            }
            else{res.send("dept not found")} 
        }
        else{res.send("no such faculty")}
    }
    else{res.send("HOD not found")}
    
})
////not complete i dont know what attributes should the hod update
router.route('/updateInstructor')
.put(async (req,res)=>{
    const coursename=req.body.courseName
    const instructorid=req.body.instructorId
    const staffId=req.user._id;

    const staff=await staff_members_models.findOne({ _id: staffId })
    const instructor=await staff_members_models.findOne({memberID: instructorid})
    if(staff){
        const faculty=await faculty_model.findOne({facultyName: staff.faculty})
        if(faculty){
            var department;
            const depArray=faculty.departments
            depArray.forEach(d => {
            if(d.name == staff.department)
                department= d
            });
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
        else{res.send("dept not found")} 
    }
    else{res.send("no such faculty")}
}
else{res.send("HOD not found")}
})

//working
router.route('/deleteInstructor')
.post(async(req,res)=>{
    const coursename=req.body.courseName
    const instructorid=req.body.instructorId
    const staffId=req.user._id;

    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const faculty=await faculty_model.findOne({facultyName: staff.faculty})
        if(faculty){
            var department;
            const depArray=faculty.departments
            depArray.forEach(d => {
            if(d.name == staff.department)
                department= d
            });
            if(department){
                const courseArray=department.courses
                courseArray.forEach(async c => {
                    if(c == coursename){
                        const course= await course_model.findOne({courseName:coursename})
                        const instArray=course.instructors
                        instArray.forEach(inst => {
                            if(inst == instructorid)
                                instArray.remove(inst)
                            });
                            try{
                                await course_model.findOneAndUpdate({courseName:coursename},{instructors:instArray})
                                res.send("instructor deleted successfully")

                            }
                            catch(err){
                                console.log(err)
                                console.log(course)
                            }    
                    }
                });
            // if(course){
            // const instArray=course.instructors
            // instArray.forEach(inst => {
            //     if(inst == instructorid)
            //         instArray.remove(inst)
            //         return
            // });
            // }
            // else{res.send("course not found")}
        }
        else{res.send("dept not found")}
    }
    else{res.send("faculty not found")}
}
    else{res.send("HOD not found")}
})

//working but array is empty problem 
router.route('/viewAllStaff')
.get(async(req,res)=>{
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
    var staffArray =[];
    if(staff){
        const faculty=await faculty_model.findOne({facultyName: staff.faculty})
        if(faculty){
            var department;
            const depArray=faculty.departments
            depArray.forEach(d => {
            if(d.name == staff.department)
                department= d
            });
            if(department){
                const courseArray=department.courses
                await courseArray.forEach(async c=> {
                    if(c!=null){
                    //    console.log("entered")
                        var course =await course_model.findOne({courseName:c})
                        var instArray=course.instructors
                        var taArray=course.teachingAssistants
                    //    console.log(course)

                        await instArray.forEach(async inst => {
                            var instructor= await staff_members_models.findOne({memberID: inst})
                            await staffArray.push(helper(instructor))
                            await console.log("in instructors "+staffArray)
                        });
                        await console.log("after instructors "+staffArray)

                        await taArray.forEach(async ta => {
                            var teachingAssistant= await staff_members_models.findOne({memberID: ta})
                            await staffArray.push(helper(teachingAssistant))
                        });
                        await console.log("out "+staffArray)
                }});
                await res.send(staffArray)
                await console.log("bara el loop: "+staffArray)
            //    res.send(staffArray)
            }
            else{res.send("dept not found")}
    }
    }
    else{res.send("HOD not found")}
})

//working but array is empty problem
router.route('/viewStaffinCourse')
.get(async(req,res)=>{
    const coursename=req.body.courseName
    const staffId=req.user._id;

    var staffArray=[]
    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const faculty=await faculty_model.findOne({facultyName: staff.faculty})
        if(faculty){
            var department;
            const depArray=faculty.departments
            depArray.forEach(d => {
            if(d.name == staff.department)
                department= d
            });
        if(department){
            const courseArray=department.courses
            courseArray.forEach(async c => {
                if(c == coursename){
                    const course= await course_model.findOne({courseName:coursename})
                    const instArray=course.instructors
                const taArray=course.teachingAssistants

                await instArray.forEach(async inst => {
                    var instructor= await staff_members_models.findOne({memberID: inst})
                    staffArray.push(helper(instructor))
                //    res.send(instructor)
                });
                await taArray.forEach(async ta => {
                    var teachingAssistant= await staff_members_models.findOne({memberID: ta})
                    staffArray.push(helper(teachingAssistant))
                //     res.send(teachingAssistant)
                 });
            }});
            res.send(staffArray)

        }
        else{res.send("dept not found")}
    }
}
    else{res.send("HOD not found")}
})

//working but array is empty problem
router.route('/viewDayOffAllStaff')
.get(async(req,res)=>{
    const staffId=req.user._id;
    var staffArray=[]
    const staff=await staff_members_models.findOne({ _id: staffId })

    if(staff){
        const faculty=await faculty_model.findOne({facultyName: staff.faculty})
        if(faculty){
            var department;
            const depArray=faculty.departments
            depArray.forEach(d => {
            if(d.name == staff.department)
                department= d
            });
        if(department){
            const courseArray=department.courses
            await courseArray.forEach(async c => {
                if(c!=null){
                var course= await course_model.findOne({courseName:c})
                var instArray=course.instructors
                var taArray=course.teachingAssistants

                await instArray.forEach(async inst => {
                    var instructor= await staff_members_models.findOne({memberID: inst})
                    staffArray.push("name: "+ instructor.name + " day off: "+instructor.dayOff)
                    console.log(staffArray)
                });
                await taArray.forEach(async ta => {
                    var teachingAssistant= await staff_members_models.findOne({memberID: ta})
                     staffArray.push("name: "+ teachingAssistant.name + " day off: "+teachingAssistant.dayOff)
                 });
            }});
            res.send(staffArray)
        }
        else{res.send("dept not found")}
    }
    }
    else{res.send("HOD not found")}
})

//working
router.route('/viewDayOffSingleStaff')
.get(async (req,res)=>{
    const staffmemberid=req.body.staffId
    const staffId=req.user._id;

    const staff=await staff_members_models.findOne({ _id: staffId })
    const staffMember=await staff_members_models.findOne({ memberID : staffmemberid })
    if(staff){
       const faculty=await faculty_model.findOne({facultyName: staff.faculty})
        if(faculty){
            var department;
            const depArray=faculty.departments
            depArray.forEach(d => {
            if(d.name == staff.department)
                department= d
            });
        if(department){
            const courseArray=department.courses

            await courseArray.forEach(async c => {
                if(c!=null){
                    var course=await course_model.findOne({courseName:c})
                    var instArray=course.instructors
                    var taArray=course.teachingAssistants

                    await instArray.forEach(async inst => {
                        if(staffmemberid==inst){
                            var instructor= await staff_members_models.findOne({memberID: inst})
                            res.send("name: "+ instructor.name + " day off: "+instructor.dayOff)
                            return 
                        }
                    });
                    await taArray.forEach(async ta => {
                        if(staffmemberid==ta){
                            var teachingAssistant= await staff_members_models.findOne({memberID: ta})
                            res.send("name: "+ teachingAssistant.name + " day off: "+teachingAssistant.dayOff)
                            return
                        }
                    });
            }});
        }
        else{res.send("dept not found")}
    }
    }
    else{res.send("HOD not found")}
})

//need to test
router.route('/viewAllRequests')
.get(async(req,res)=>{
    const staffId=req.user._id;
    var staffRequests=[]
    const staff=await staff_members_models.findOne({ _id: staffId })

    if(staff){
        const faculty=await faculty_model.findOne({facultyName: staff.faculty})

        const dayoffRequests=staff.dayOffRequestsHOD
        await dayoffRequests.forEach(async d => {
            var s= await staff_members_models.findOne({memberID:d})
            if(s){
                var request= await dayoff_model.findOne({senderId: d})
                if(request){
                    staffRequests.push(s.name+" change day off request: "+" pending:" + request.pending+" accepted: "+ request.accepted
                    +" reason: "+ request.reason)
                }
                }
        });

        const leaveRequests=staff.leaveRequestsHOD
        await leaveRequests.forEach(async l => {
            var leaverequest= await leaves_model.findOne({_id:l._id})
            if(leaverequest){
                var s= await staff_members_models.findOne({memberID: leaverequest.staffID})
                if(s){
                    staffRequests.push(s.name+" leave request: "+" pending:" + leaverequest.pending+" accepted: "+ leaverequest.accepted
                    +" reason: "+ leaverequest.reason)
                }
            }
        });
        res.send(staffRequests)
    }
    else{res.send("HOD not found")}
})

//working
router.route('/viewCourseCoverage')
.get(async (req,res)=>{
    const coursename=req.body.courseName
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
//    const s=count( await slot_model.find({courseTaught: coursename}))
    const tmp=await slot_model.find({courseTaught: coursename})
    const s=tmp.length

    if(staff){
        const faculty=await faculty_model.findOne({facultyName: staff.faculty})
        if(faculty){
            var department;
            const depArray=faculty.departments
            depArray.forEach(d => {
            if(d.name == staff.department)
                department= d
            });
        if(department){
            const courseArray=department.courses
            await courseArray.forEach(async c => {
                if(c == coursename){
                    const course= await course_model.findOne({courseName:coursename})
                    const coverage= (s/course.teachingSlotsNumber) * 100
                    res.send("Course Name: "+coursename+", Coverage: "+coverage+"%")
            }});
            // if(course){
               
            // }
            // else{res.send("course not found")}
        }
        else{res.send("dept not found")}
    }
    }
    else{res.send("HOD not found")}
})

//working but array is empty problem
router.route('/ViewTeachingAssignments')
.get(async(req,res)=>{
    const coursename=req.body.courseName
    const staffId=req.user._id;
    var teachingArray=["Course Name: "+coursename]

    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const faculty=await faculty_model.findOne({facultyName: staff.faculty})
        if(faculty){
            var department;
            const depArray=faculty.departments
            depArray.forEach(d => {
            if(d.name == staff.department)
                department= d
            });
            if(department){
                const courseArray=department.courses
                courseArray.forEach(async c => {
                    if(c == coursename){
                        course= await course_model.findOne({courseName:coursename})
                        const instArray=course.instructors
                        const taArray=course.teachingAssistants

                        await instArray.forEach(async inst => {
                        var instructor= await staff_members_models.findOne({memberID: inst})
                        const slot =await slot_model.findOne({academicMember: inst})
                        if(slot){
                        //    console.log(slot)
                            teachingArray.push("Instructor name: "+instructor.name+ " slot type: "+ slot.type+" slot time: "+slot.time)
                        //    console.log(teachingArray)
                        }
                        console.log("in instr: "+teachingArray )
                        });
                        
                        console.log("in between: "+teachingArray )

                        await taArray.forEach(async ta => {
                        var teachingAssistant= await staff_members_models.findOne({memberID: ta})
                        var slot =await slot_model.findOne({academicMember: ta})
                        if(slot){
                            teachingArray.push("TA name: "+teachingAssistant.name+ " slot type: "+ slot.type+" slot time: "+slot.time)
                        }
                        console.log("in ta: "+teachingArray )
                        });
                        console.log("after: "+teachingArray )
                }});
                res.send(teachingArray)
            }  
            else{res.send("dept not found")}
    }
    }
    else{res.send("HOD not found")}
})

//need to test
router.route('/acceptChangeDayOffRequest')
.post(async(req,res)=>{
    const staffId=req.user._id;
    const staffmemberid= req.body.staffId;

    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const requestsArray=staff.dayOffRequestsHOD
        requestsArray.forEach(async sId => {
            if(sId==staffmemberid){
                var request= await dayoff_model.findOne({senderId: sId})
                if(request){
                    if(request.pending && !request.accepted){
                        request.accepted=true
                        request.pending=false
                        res.send("request accepted successfully")
                    }
                }
                else{
                    res.send("No request with this sender id")}
                }
            else{res.send("No request with this sender id")}
        });
    }
    else{res.send("HOD not found")}
})

//need to test
router.route('/rejectChangeDayOffRequest')
.post(async(req,res)=>{
    const staffId=req.user._id;
    const staffmemberid= req.body.staffId;
    const comment= req.body.comment

    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const requestsArray=staff.dayOffRequestsHOD
        requestsArray.forEach(async sId => {
            if(sId==staffmemberid){
                var request= await dayoff_model.findOne({senderId: sId})
                if(request){
                    if(request.pending){
                        request.accepted=false
                        request.pending=false
                        if(comment!=null){
                            request.comment=comment
                        }
                        res.send("request rejected")
                    }
                }
                else{
                    res.send("No request with this sender id")}
            }
            else{res.send("No request with this sender id")}
        });
    }
    else{res.send("HOD not found")}
})

//not finished lesa part el replacement
//momken law type annual ne3mel attribute esmo replacement found if true i will accept el request
//if false i will reject
//need to test
router.route('/acceptLeaveRequest')
.post(async(req,res)=>{
    const staffId=req.user._id;
//    const staffmemberid= req.body.staffId;
    const reqId= req.body.requestId;

    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const leavesArray=staff.leaveRequestsHOD
        leavesArray.forEach(async l => {
            if(l==reqId){
                 const request = await leaves_model.findOne({_id:l})
                if(request){
                    if(request.pending && !request.accepted){
                        request.accepted=true
                        request.pending=false
                        res.send("request accepted successfully")
                    }
                    if(request.type=="Annual"){
                        const id=request.replacementRequest
                        const replacement=await replacementRequest_model.findOne({_id:id})
                        const sender=await staff_members_models.findOne({memberID: replacement.senderId})
                        const receiver=await staff_members_models.findOne({memberID:replacement.receiverId})
                        const slot = replacement.slot

                        const receiverSlots= receiver.slotsToReplace
                        receiverSlots.push(slot)
                        try{
                        await staff_members_models.findOneAndUpdate({memberID:receiver},{slotsToReplace:receiverSlots})
                        }
                        catch(err){
                        console.log(err)
                        console.log(course)
                        }

                        const senderSlots=sender.slotsReplaced
                        senderSlots.push(slot)
                        try{
                        await staff_members_models.findOneAndUpdate({memberID:sender},{slotsReplaced:senderSlots})
                        }
                        catch(err){
                        console.log(err)
                        console.log(course)
                        }
    
                        }
                    }
                }
            });
        
    }
    else{res.send("HOD not found")}
})

//need to test
router.route('/rejectLeaveRequest')
.post(async(req,res)=>{
    const staffId=req.user._id;
//    const staffmemberid= req.body.staffId;
    const reqId= req.body.requestId;
    const comment=req.body.comment

    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){

        const leavesArray=staff.leaveRequestsHOD
        leavesArray.forEach(async l => {
        if(l==reqId){
            const request = await leaves_model.findOne({id:l})
            if(request){
                if(request.pending){
                    request.accepted=false
                    request.pending=false
                    if(comment!=null){
                          request.comment=comment
                    }
                    res.send("request rejected")
                    }
            }
        }
    });

    }
    else{res.send("HOD not found")}
})

function helper(staff){
    var s="Staff name: "+staff.name
    s+="\nID: "+staff.memberID
    s+="\nemail: "+staff.email
    s+="\nRole: "+staff.role
    s+="\nDay off: "+staff.dayOff
    s+="\nOffice location: "+staff.officeLocation
    s+="\nAttendance: "+staff.attendance
    s+="\nAnnual leaves balance: "+staff.annualLeavesBalance
    s+="\nLeaves: "+staff.leaves
    s+="\nRequest replacement sent: "+staff.requestReplacementSent
    s+="\nRequest replacement received: "+staff.requestReplacmentReceived
    s+="\nCoordinator linking requests: "+staff.coordinatorLinkingRequests
    s+="\nCourses: "+staff.course
    s+="\nSlots assigned: "+staff.slotsAssigned
    s+="\nSlots replaced: "+staff.slotsReplaced
    s+="\nSlots to replace: "+staff.slotsToReplace
    s+="\nDay off request sent: "+staff.dayOffRequestSent +"\n"

    return s
}

module.exports = router