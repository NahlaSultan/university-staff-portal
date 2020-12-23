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
            staff.markModified('attendance');
           await staff.attendance.push(currentTime)
          //  res.send(staff)
        }else{
        var day1=staff.attendance[staff.attendance.length-2].signInTime.getDate()
        var day2=currentTime.signInTime.getDate()
        const month1=staff.attendance[staff.attendance.length-2].signInTime.getMonth()+1
        const month2=currentTime.signInTime.getMonth()+1
        if(staff.attendance[staff.attendance.length-1].signOutTime!=null){
          await staff.attendance.push(currentTime)
          var flag=false
        if((month1!=month2&&day1>10))
        flag=true
        missingDays(staff,day1,day2,month1,month2,flag)
        }
      else res.send("you cannot sign in without signing out")
    }
}   
    staff.markModified('attendance');

    try{ 
      await staff.save()
    }
    catch(err){
      res.send(err)
    }
     res.send(staff)
     

    // res.send('/homepage')
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
        var signIn=currentTime2.signInTime
        var signOut=currentTime2.signOutTime
        milliseconds = milliseconds+ Math.abs(signOut.getTime() - signIn.getTime());
        var hours = milliseconds / 36e5;
        var flag=false
        var day1=currentTime2.signInTime.getDate()
        const month1=currentTime2.signInTime.getMonth()+1
        const month2=staff.attendance[staff.attendance.length-2].signInTime.getMonth()+1
        if((month1!=month2&&day1>10))
        flag=true
        missingHours(staff,hours,flag)

        res.send('/login')}
        else res.send("you cannot sign out without signing in")
    }
    
})
//missing hours
function missingHours(staff,hours,flag){
    //staff.missingHours.fill(42)
    if(flag)
    staff.missingHours.push(42-hours)
    else{
     var x=staff.missingHours[staff.missingHours.length-1]-hours
     if (x>=0)
    staff.missingHours[staff.missingHours.length-1]=x
    else
    staff.missingHours[staff.missingHours.length-1]=0}
    staff.save()
}
router.route('/viewMissingHours')
.get(async(req,res,)=>{
    const staffId=req.user._id;
const staff = await staff_members_models.findOne({ _id: staffId })
    res.send(staff.missingHours)
})
// router.route('/viewMissingHours')
// .get(async(req,res,)=>{
//     const staffId=req.user._id;
//     const staff = await staff_members_models.findOne({ _id: staffId })
//     if(staff){ 
//         staff.missingHours=[]
//         var i=0
//         var milliseconds=0
//         //8x5=40 ,24x5=120/60=2 total 42 hours per month
//        while(i<staff.attendance.length){
//         var day1=staff.attendance[i].signInTime.getDate()
//         const month1=staff.attendance[i].signInTime.getMonth()+1
//         var month2=0
//         if( i!=staff.attendance.length-1){
//         var day2=staff.attendance[i+1].signInTime.getDate()
//          month2=staff.attendance[i+1].signInTime.getMonth()+1}
//         var signIn=staff.attendance[i].signInTime
//         var signOut=staff.attendance[i].signOutTime
//          milliseconds = milliseconds+ Math.abs(signOut.getTime() - signIn.getTime());
//          console.log(i)
//          console.log(staff.attendance.length-1)
//          //console.log((month1!=month2 && day2>10 ))
//            if(( i==staff.attendance.length-1)||(month1!=month2 && day2>10 )){
//                console.log("heyy")
//             var hours = milliseconds / 36e5;
//             if(hours<42)
//                staff.missingHours.push(42-hours)
//             else 
//             staff.missingHours.push(0)
//                milliseconds=0
//            }
            

//       i++
//     }
//     staff.save()
//     res.send(staff.missingHours)
// }
// })
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

//missing days
function missingDays(staff,day1,day2,month1,month2){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        //add missing days from 11 to next day attended
        var number=0
         if(checkMonth(month1,day1)==false && day1+1!=day2 && month1==month2 ){
         var missingDay=day1+1
         for(let j=missingDay;j<day2;j++){
         var d=new Date(month1+"/"+j+"/"+year1)
             if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday") 
            // staff.missingDays.push(d)
             number=number+1
         
        }
        }
        else if( day1+1!=day2 && month1==month2-1 && year1==year2 ){
            if(checkMonth(month1,day1)==true){
               
                    for(let j=1;j<day2;j++){
                    var d=new Date(month2+"/"+j+"/"+year1)
                    if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday") 
                   // staff.missingDays.push(d) 
                    number=number+1
                }
            }
            else{
            var missingDay=day1+1
            for(let j=missingDay;checkMonth(month1,j-1)==false;j++){
                var d=new Date(month1+"/"+j+"/"+year1)
                if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday") 
                number=number+1
            // staff.missingDays.push(d)
             }
            
           
           for(let j=1;j<day2;j++){
            var d=new Date(month2+"/"+j+"/"+year1)
            if(days[d.getDay()]!=staff.dayOff && days[d.getDay()]!="Friday") 
            //staff.missingDays.push(d)
            number=number+1
            }}
    
          }
          if(flag)
          staff.missingDays.push(number)
          else
          staff.missingDays[staff.missingDays.length-1]=staff.missingDays[staff.missingDays.length-1]+number
        
        
        
        res.send(staff.missingDays)
        staff.save()
        

}

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