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
const leaves_model=require ('../models/leaves_model').model
var newMonth=false
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
        var firstEntry=false
        var day1=currentTime.signInTime.getDate()
        var month1=currentTime.signInTime.getMonth()+1
        const year1=currentTime.signInTime.getFullYear()
        if(staff.attendance.length==0)
        {
            var month2=0
            var day2=11
            await staff.attendance.push(currentTime)
            firstEntry=true
            console.log("heloooo")
            try{
                
                staff.markModified('attendance.'+staff.attendance.length-1);
                await staff.save()
            }
            catch(Err){
                res.send("error saving sign in")
                console.log(Err)
            }
          
        }else{
            var month2=0
          var day2=11
            if(staff.attendance.length>=2)
            { month1=staff.attendance[staff.attendance.length-2].signInTime.getMonth()+1
              day1=staff.attendance[staff.attendance.length-2].signInTime.getDate()
            }
          
            month2=staff.attendance[staff.attendance.length-1].signInTime.getMonth()+1
            day2=staff.attendance[staff.attendance.length-1].signInTime.getDate()
        if(staff.attendance[staff.attendance.length-1].signOutTime!=null){
            await staff.attendance.push(currentTime)
                staff.markModified('attendance.'+staff.attendance.length-1);
                //await staff.save()
        }
      else res.send("you cannot sign in without signing out")
    }

    if(month1!=month2)
    newMonth=true
    missingDays(staff,day1,day2,month1,month2,year1,firstEntry)
   // staff.save()
    res.send(staff.attendance)
}   
       //res.send('/homepage')
})

//helper for missing days
function checkMonth(month,day){
    switch(month) {
        case 1,3,5,7,8,10,12:
          if (day==31)
          return true
          else 
          return false
          break;
        case 2:
          if (day==29)
          return true
          else 
          return false
          break;
        case 4,6,9,11:
          if (day==30)
          return true
          else 
          return false
          break;
          default:
          return false
      }
    }
    function getDates (startDate, endDate) {
        var dates = [],
            currentDate = startDate,
            addDays = function(days) {
              var date = new Date(this.valueOf());
              date.setDate(date.getDate() + days);
              return date;
            };
        while (currentDate <= endDate) {
          dates.push(currentDate);
          currentDate = addDays.call(currentDate, 1);
        }
        return dates;
      };

function acceptedLeave(date,staff){
    const leave =leaves_model.findOne({staffID:staff.memberID})
         if(leave.start==date && leave.accepted==true && leave.end!=null){
            
            var array =getDates(leave.start,leave.end)
            for(let i=0;i<array.length;i++){
                leave.leavesDates.push(array[i])
            }
            leave.markModified("leaveDates")
            leave.save()
            return true
         }
         else if (leave.start=date && leave.accepted==true && leave.end==null){
             return true
         }
         else if (leave.leavesDates.includes(date)){
             return true

         }
         else{
             return false
         }

}

//missing days
async function missingDays(staff,day1,day2,month1,month2,year1,firstEntry){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var flag=false
    var out=false
    console.log(newMonth)
    if((month1!=month2&&day1>10))
    flag=true
        //add missing days from 11 to next day attended
        var number=0
         if(checkMonth(month1,day1)==false && day1-1!=day2 && month1==month2 && newMonth && day1<=10){
             console.log("awel if")
         var missingDay=day2+1
         for(let j=missingDay;j<day1;j++){
         var d=new Date(month1+"/"+j+"/"+year1)
             if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday" && !acceptedLeave(d,staff)) 
             number=number+1
         
        }
        }
        else if(checkMonth(month1,day1)==false && day1-1!=day2 && month1==month2 && !newMonth ){
            console.log("awel if")
        var missingDay=day2+1
        for(let j=missingDay;j<day1;j++){
        var d=new Date(month1+"/"+j+"/"+year1)
            if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday"&& !acceptedLeave(d,staff)) 
            number=number+1
        
       }
       }
        else if (checkMonth(month1,day1)==false && day1-1!=day2 && month1==month2 && newMonth && day1>10){
            console.log("tany if")
           newMonth=false
           var missingDay=day2+1
         for(let j=missingDay;j<11;j++){
         var d=new Date(month1+"/"+j+"/"+year1)
             if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday"&& !acceptedLeave(d,staff)) 
             number=number+1
         
        }
        staff.missingDays[staff.missingDays.length-1]=staff.missingDays[staff.missingDays.length-1]+number
            staff.markModified("missingDays")
            await staff.save()
            number=0
        for(let j=11;j<day1;j++){
            var d=new Date(month1+"/"+j+"/"+year1)
                if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday" && !acceptedLeave(d,staff)) 
                number=number+1
            
           }
           staff.missingDays.push(number)
                staff.markModified("missingDays")
               await  staff.save()
                out=true
        }
        else if(firstEntry==true && day1!=11){
            console.log("talet if")
            for(let i=11;i<day1;i++){
            var d=new Date(month1+"/"+i+"/"+year1)
            if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday"&& !acceptedLeave(d,staff)) 
            number=number+1
            console.log(number+" ya rab")
        }
         
        }
        else if( day1-1!=day2 && month1-1==month2 ){
            if(checkMonth(month2,day2)==true){
                console.log("rabe3 if a")
                    for(let j=1;j<day1;j++){
                   var d=new Date(month1+"/"+j+"/"+year1)
                    if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday" && !acceptedLeave(d,staff)) 
                   // staff.missingDays.push(d) 
                    number=number+1
                }
            }
            else{
                console.log("rabe3 if b")
            var missingDay=day2+1
            for(let j=missingDay;checkMonth(month2,j-1)==false;j++){
                var d=new Date(month2+"/"+j+"/"+year1)
                if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday" && !acceptedLeave(d,staff)) 
                number=number+1
            
             }
            
           for(let j=1;j<11;j++){
            var d=new Date(month1+"/"+j+"/"+year1)
            if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday"&& !acceptedLeave(d,staff)) 
            number=number+1
            }
            
            staff.missingDays[staff.missingDays.length-1]=staff.missingDays[staff.missingDays.length-1]+number
            staff.markModified("missingDays")
            await staff.save()
            number=0

            var d=new Date(month1+"/"+11+"/"+year1)
            for(let j=11;j<day1;j++){
                var d=new Date(month1+"/"+j+"/"+year1)
                if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday" && !acceptedLeave(d,staff)) 
                number=number+1
                }
                staff.missingDays.push(number)
                staff.markModified("missingDays")
               await  staff.save()
                out=true

        }}
        if(!out){
          
            console.log("enta lesa bet5osh wala eh ???" + number)
          if(firstEntry){
          staff.missingDays.push(number)
        }
          else
          staff.missingDays[staff.missingDays.length-1]=staff.missingDays[staff.missingDays.length-1]+number
        
        staff.markModified("missingDays")
        staff.save()
        
    }

}
//extra hours
function extraHours(staff,hours,flag,day1,day2){
    if(flag){
    staff.extraHours.push(hours-8.24)
    
}
    else{
     if(day1!=day2)
     var x=staff.extraHours[staff.missingHours.length-1]+(hours-8.24)
     else{
     var x =hours- staff.extraHours[staff.extraHours.length-1]
    }
     staff.extraHours[staff.extraHours.length-1]=x

}
    staff.save()
}
router.route('/viewMissingHours')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    res.send(staff.missingHours)
})
router.route('/viewExtraHours')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    res.send(staff.ExtraHours)
})
router.route('/viewMissingDays')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    res.send(staff.missingDays)
})

//viewProfile
router.route('/viewProfile')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){ 
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
//view month attendance
router.route('/viewMonthAttendance')
.post(async(req,res)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){ 
        console.log(staff.attendance[0].signInTime.getMonth())
        const arr=[]
        for(let index=0;index<staff.attendance.length;index++){
          if(req.body.month-1==staff.attendance[index].signInTime.getMonth()){
             arr.push(staff.attendance[index])
          }
          
        }
        res.send(arr)
        }
})
//updatprofile
router.route('/updateProfile')
.post(async(req,res)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){ 
        if(staff.staffType==academic){

        }
        else{

        }
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


//extra hours
router.route('/viewExtraHours')
.get(async(req,res,)=>{
    const staffId=req.user._id;
    const staff = await staff_members_models.findOne({ _id: staffId })
    if(staff){ 
        staff.missingHours=[]
        var i=0
        var milliseconds=0
        //8x5=40 ,24x5=120/60=2 total 42 hours per month
       while(i<staff.attendance.length){
        var day1=staff.attendance[i].signInTime.getDate()
        const month1=staff.attendance[i].signInTime.getMonth()+1
        var month2=0
        if( i!=staff.attendance.length-1){
        var day2=staff.attendance[i+1].signInTime.getDate()
         month2=staff.attendance[i+1].signInTime.getMonth()+1}
        var signIn=staff.attendance[i].signInTime
        var signOut=staff.attendance[i].signOutTime
         milliseconds = milliseconds+ Math.abs(signOut.getTime() - signIn.getTime());
           if(( i==staff.attendance.length-1)||(month1!=month2 && day2>10 )){
            var hours = milliseconds / 36e5;
            if(hours>42)
               staff.extraHours.push(hours-42)
            else 
            staff.extraHours.push(0)
               milliseconds=0
           }
            

      i++
    }
    staff.save()
    res.send(staff.extraHours)
}
})

module.exports = router