const staff_members_models = require('../models/staff_member_models').model
const department_model=require('../models/department_model').model
const faculty_model=require('../models/faculty_model').model
const course_model=require('../models/course_model').model
const slot_model=require('../models/slot_model').model
const dayoff_model=require('../models/dayOffRequest').model
const leaves_model=require('../models/leaves_model').model
const replacementRequest_model=require('../models/replacement_requests').model
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
    var done=false

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
 
                const courseArray=department.courses
                courseArray.forEach( async(c) => {

                    if(c == coursename){
                        done =true
                        const course= await course_model.findOne({courseName:coursename})

                        if(course){
                        if(instructor){
                            if(!instructor.course.includes(coursename)){
                                instructor.course.push(coursename)
                            }
                            if(!instructor.role.includes("courseInstructors")){
                                instructor.role.push("courseInstructors")                                
                            }
                            await instructor.save()

                            if(!course.instructors.includes(instructorid)){
                                course.instructors.push(instructorid)
                                await course.save()
                                res.send("instructor assigned successfully")
                            }
                            else{
                                res.send("instructor is already assigned to this course")
                            }
                            
                        
                        }
                        else{res.send("inst not found")}
                    }
                    else{res.send("course not found")}
                    return
                    }
                });
                if(!done)
                    res.send("course not in this department")
            }
            else{res.send("dept not found")} 
        }
        else{res.send("no such faculty")}
    }
    else{res.send("HOD not found")}

})

//working
router.route('/updateInstructor')
.post(async (req,res)=>{
    const coursename=req.body.courseName
    const oldinstructorid=req.body.oldInstructorId
    const newinstructorid=req.body.newInstructorId
    const staffId=req.user._id;
    var done=false

    const staff=await staff_members_models.findOne({ _id: staffId })
    const Oinstructor=await staff_members_models.findOne({memberID: oldinstructorid})
    const Ninstructor=await staff_members_models.findOne({memberID: newinstructorid})

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
               for(let i=0; i<courseArray.length; i++){
                   var c=courseArray[i]
                    if(c == coursename){
                        done =true
                        const course= await course_model.findOne({courseName:coursename})
                        if(course){
                            if(Oinstructor){
                                if(Ninstructor){

                                const instArray=course.instructors
                                instArray.forEach(inst => {
                                    if(inst == oldinstructorid)
                                    course.instructors.remove(inst)
                                    });
                                await course.save()
                                
                                if(!Ninstructor.role.includes("courseInstructors")){
                                    Ninstructor.role.push("courseInstructors")
                                }
                                if(!Ninstructor.course.includes(coursename)){
                                    Ninstructor.course.push(coursename)
                                }
                                course.instructors.push(newinstructorid)
                                await Ninstructor.save()
                                await course.save()

                                for(let i=0;i<Oinstructor.course.length;i++){
                                    var crs=Oinstructor.course[i]
                                    if(crs==coursename)
                                        Oinstructor.course.remove(crs)
                                }
                                await Oinstructor.save()
                                res.send("instructor updated successfully")
                                }
                                else{res.send("no new instructor with this id")}
                            }
                            else{res.send("no old instructor with this id")}
                    }else{res.send("no course with this id")}
                return
                }   
            } 
            if(!done)
                res.send("course not in this department")
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
    var done =false 
    var donedel=false

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
                        done =true
                        const course= await course_model.findOne({courseName:coursename})
                        if(course){
                        const instArray=course.instructors
                        instArray.forEach(async inst => {
                            if(inst == instructorid){
                                course.instructors.remove(inst)
                                await course.save()
                                donedel=true
                                return 
                            }
                            });
                        
                        const tmp = await staff_members_models.findOne({memberID:instructorid})
                        for(let i=0;i<tmp.course.length;i++){
                            var crs=tmp.course[i]
                            if(crs==coursename)
                            tmp.course.remove(crs)
                        }
                        await tmp.save()

                            res.send("instructor deleted successfully")   
   
                    }else{res.send("no course with this id")}
                    return
                }
                });
                if(!done)
                res.send("course not in this department")
            
        }
        else{res.send("dept not found")}
    }
    else{res.send("faculty not found")}
}
    else{res.send("HOD not found")}
})

//working 
router.route('/viewAllStaff')
.get(async(req,res)=>{
    const staffId=req.user._id;
    const staff=await staff_members_models.findOne({ _id: staffId })
    var staffArray =[]
    if(staff){
        const staffs=await staff_members_models.find({department:staff.department})

        staffs.forEach(s => {
            if(s.memberID != staff.memberID)
                staffArray+=helper(s)+"\n"
        });
        res.send(staffArray)

    }
    else{res.send("HOD not found")}
})

//working 
router.route('/viewStaffinCourse')
.get(async(req,res)=>{
    const coursename=req.body.courseName
    const staffId=req.user._id;

    var staffArray=[]
    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){

        const staffs=await staff_members_models.find({department:staff.department})

        staffs.forEach(s => {
            var courses= s.course
            courses.forEach(c => {
                if(c == coursename)
                    staffArray+=helper(s)+"\n"
            });
            
        });
        res.send(staffArray)

        
}
    else{res.send("HOD not found")}
})

//working
router.route('/viewDayOffAllStaff')
.get(async(req,res)=>{
    const staffId=req.user._id;
    var staffArray=[]
    const staff=await staff_members_models.findOne({ _id: staffId })

    if(staff){

        const staffs=await staff_members_models.find({department:staff.department})
        staffs.forEach(s => {
            if(s.memberID != staff.memberID && s.staffType!="hr")
                staffArray.push("name: "+ s.name + " day off: "+s.dayOff)
        });
        res.send(staffArray)

    }
    else{res.send("HOD not found")}
})

//working
router.route('/viewDayOffSingleStaff')
.get(async (req,res)=>{
    const staffmemberid=req.body.staffId
    const staffId=req.user._id;

    const staff=await staff_members_models.findOne({ _id: staffId })
    const staffMember=await staff_members_models.findOne({ memberID : staffmemberid, department:staff.department})
    if(staff){
        if(staffMember){
        res.send("name: "+ staffMember.name + " day off: "+staffMember.dayOff)
        }
        else{res.send("staff member not found")}
    }
    else{res.send("HOD not found")}
})

//working
router.route('/viewAllRequests')
.get(async(req,res)=>{
    const staffId=req.user._id;
    var staffRequests=[]
    const staff=await staff_members_models.findOne({ _id: staffId })

    if(staff){

        const dayoffRequests=staff.dayOffRequestsHOD

        for (let i = 0; i < dayoffRequests.length; i++) {
            var d= dayoffRequests[i]
            var s= await staff_members_models.findOne({memberID:d})
            if(s){
                var request= await dayoff_model.findOne({senderId: d})
               if(request){
                    staffRequests.push("Staff name: "+s.name+", change day off request: "+" pending:" + request.pending+", accepted: "+ request.accepted
                    +", reason: "+ request.reason)
               }
               }
        }

        const leaveRequests=staff.leaveRequestsHOD

        for (let i = 0; i < leaveRequests.length; i++) {
            var l = leaveRequests[i]
            var leaverequest= await leaves_model.findOne({_id:l})
            if(leaverequest){
                var s2= await staff_members_models.findOne({memberID: leaverequest.staffID})
                if(s2){                
                    staffRequests.push("Staff name: "+s2.name+", leave request: "+" type:"+ leaverequest.type+", pending:" + leaverequest.pending+", accepted: "+ leaverequest.accepted
                    +", reason: "+ leaverequest.reason)
                }   
            }
        }
        res.send( staffRequests)
    }
    else{res.send("HOD not found")}
   
})

//working
router.route('/viewChangeDayOffRequests')
.get(async(req,res)=>{
    const staffId=req.user._id;
    var staffRequests=[]
    const staff=await staff_members_models.findOne({ _id: staffId })

    if(staff){

        const dayoffRequests=staff.dayOffRequestsHOD

        for (let i = 0; i < dayoffRequests.length; i++) {
            var d= dayoffRequests[i]
            var s= await staff_members_models.findOne({memberID:d})
            if(s){
                var request= await dayoff_model.findOne({senderId: d})
               if(request){
                    staffRequests.push("Staff name: "+s.name+", change day off request: "+" pending:" + request.pending+", accepted: "+ request.accepted
                    +", reason: "+ request.reason)
               }
               }
        }

        res.send( staffRequests)
    }
    else{res.send("HOD not found")}
   
})

//working
router.route('/viewLeaveRequests')
.get(async(req,res)=>{
    const staffId=req.user._id;
    var staffRequests=[]
    const staff=await staff_members_models.findOne({ _id: staffId })

    if(staff){

        const leaveRequests=staff.leaveRequestsHOD

        for (let i = 0; i < leaveRequests.length; i++) {
            var l = leaveRequests[i]
            var leaverequest= await leaves_model.findOne({_id:l})
            if(leaverequest){
                var s2= await staff_members_models.findOne({memberID: leaverequest.staffID})
                if(s2){                
                    staffRequests.push("Staff name: "+s2.name+", leave request: "+" type:"+ leaverequest.type+", pending:" + leaverequest.pending+", accepted: "+ leaverequest.accepted
                    +", reason: "+ leaverequest.reason)
                }   
            }
        }
        res.send( staffRequests)
    }
    else{res.send("HOD not found")}
   
})


//working
router.route('/viewCourseCoverage')
.get(async (req,res)=>{
    const coursename=req.body.courseName
    const staffId=req.user._id;

    const staff=await staff_members_models.findOne({ _id: staffId })
    const tmp=await slot_model.find({courseTaught: coursename})
    const s=tmp.length
    var done=false

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
                    done=true
                    const course= await course_model.findOne({courseName:coursename})
                    if(course){
                        const coverage= (s/course.teachingSlotsNumber) * 100
                        res.send("Course Name: "+coursename+", Coverage: "+coverage+"%")
                        return
                    }
                    else{res.send("course not found")}
            }});
            if(!done)
                res.send("course is not in this department")

        }
        else{res.send("dept not found")}
    }
    }
    else{res.send("HOD not found")}
})

//working
router.route('/viewTeachingAssignments')
.get(async(req,res)=>{
    const coursename=req.body.courseName
    const staffId=req.user._id;
    var teachingArray=[]

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
                for(let i=0; i<courseArray.length; i++){

                    var c=courseArray[i]

                    if(c == coursename){
                        const course= await course_model.findOne({courseName:coursename})
                        if(course){

                            var slots=course.teachingSlots
                            for(let i=0; i<slots.length; i++){
                                var slotId = slots[i]
                                var slot =await slot_model.findOne({numberID: slotId})

                                if(slot){
                                    var s=await staff_members_models.findOne({memberID: slot.academicMember})
                                    if(s){
                                        teachingArray.push("Staff name: "+s.name+ ", course taught: "+coursename+
                                        ", slot type: "+ slot.type+", day: "+slot.day +", time: "+slot.time+
                                        ", location: "+slot.location)
                                    }
                                }
                            }
                        }                                       
                    }
                }
            res.send(teachingArray)
            }  
            else{res.send("dept not found")}
    }
    }
    else{res.send("HOD not found")}
})

//working
router.route('/acceptChangeDayOffRequest')
.post(async(req,res)=>{
    const staffId=req.user._id;
    const staffmemberid= req.body.staffId;
    var o=""
    var done=false

    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const requestsArray=staff.dayOffRequestsHOD

        for(let i=0;i<requestsArray.length;i++) {
            var sId=requestsArray[i]

            if(sId==staffmemberid){
                done=true
                var request= await dayoff_model.findOne({senderId: sId})
                if(request){
                    if(request.pending && !request.accepted){
                        request.accepted=true
                        request.pending=false

                        await request.save()

                        const s=await staff_members_models.findOne({memberID: staffmemberid})
                        s.dayOff=request.day
                        await s.save()

                        o="request accepted successfully"

                        
                    }
                    else 
                        o="request is already accepted"
                }
                else
                    o="No request with this sender id"
                }
        }
        if(!done)
            o="this staff member has no change day off request"
        res.send(o)
    }
    else{res.send("HOD not found")}
})

//working
router.route('/rejectChangeDayOffRequest')
.post(async(req,res)=>{
    const staffId=req.user._id;
    const staffmemberid= req.body.staffId;
    const comment= req.body.comment
    var o=""

    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){
        const requestsArray=staff.dayOffRequestsHOD
       for(let i=0; i<requestsArray.length; i++){
            var sId=requestsArray[i]

            if(sId==staffmemberid){
                var request= await dayoff_model.findOne({senderId: sId})

                if(request){
                    if(request.pending){
                        request.accepted=false
                        request.pending=false
                        if(comment!=null){
                            request.comment=comment
                        }
                        await request.save()
                        o="request rejected"
                    }
                }
                else{
                    o="No request with this sender id"}
            }
        }
        res.send(o)
    }
    else{res.send("HOD not found")}
})

//working
router.route('/acceptLeaveRequest')
.post(async(req,res)=>{
    const staffId=req.user._id;
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
                        await request.save()
                        
                    }

                    const type=request.type

                    if(type=="Annual"){
                        
                        const s =await staff_members_models.findOne({memberID:request.staffID})
                        s.annualLeavesBalance=s.annualLeavesBalance-1
                        await s.save()

                        const id=request.replacementRequest
                        const replacement=await replacementRequest_model.findOne({_id:id})

                        if(replacement){
                            const sender=await staff_members_models.findOne({memberID: replacement.senderId})
                            const receiver=await staff_members_models.findOne({memberID:replacement.receiverId})

                            receiver.slotsToReplace.push(id)
                            sender.slotsReplaced.push(id)

                            await receiver.save()
                            await sender.save()

                            console.log("end of annual")
                        }      
                    }
                    else if(type=="Accidental")  {

                        const s = await staff_members_models.findOne({memberID:request.staffID})
                        s.annualLeavesBalance=s.annualLeavesBalance-1
                        s.totalAccidentalLeave=s.totalAccidentalLeave+1
                        await s.save()
                    }
                    else if(type=="Compensation") {

                        const s = await staff_members_models.findOne({memberID:request.staffID}) 
                        s.compensationDay= request.compensatingDay
                        s.compensationSession=true
                        await s.save()
                    }
                    res.send("request accepted successfully") 
                    }
                }
            });
        
    }
    else{res.send("HOD not found")}
})

//working
router.route('/rejectLeaveRequest')
.post(async(req,res)=>{
    const staffId=req.user._id;
    const reqId= req.body.requestId;
    const comment=req.body.comment

    const staff=await staff_members_models.findOne({ _id: staffId })
    if(staff){

        const leavesArray=staff.leaveRequestsHOD
        leavesArray.forEach(async l => {
        if(l==reqId){
            const request = await leaves_model.findOne({_id:l})
            if(request){
                if(request.pending){
                    request.accepted=false
                    request.pending=false
                    if(comment!=null){
                          request.comment=comment
                    }
                    await request.save()
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