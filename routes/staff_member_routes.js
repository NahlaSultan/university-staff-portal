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
var newMonth2=false
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
          
            month2=staff.attendance[staff.attendance.length-1].signInTime.getMonth()+1
            day2=staff.attendance[staff.attendance.length-1].signInTime.getDate()
        if(staff.attendance[staff.attendance.length-1].signOutTime!=null){
            await staff.attendance.push(currentTime)
                staff.markModified('attendance.'+staff.attendance.length-1);
                //await staff.save()
        }
      else res.send("you cannot sign in without signing out")
    }

    if(month1!=month2){
    newMonth=true
    //calcSalary(staff)
}
    missingDays(staff,day1,day2,month1,month2,year1,firstEntry)
   // staff.save()
    res.send("SIGNED IN")
}   
       //res.send('/homepage')
})

  //salary
  async function calcSalary(staff){
    const mDays= staff.missingDays[staff.missingDays.length-1]
    console.log((staff.salary/60)*mDays)
    staff.monthSalary=staff.salary-(staff.salary/60)*mDays
    const mHours=staff.missingHours[staff.missingHours.length-1]
    if(mHours>=3){
   const hours=Math.floor(mHours)
   staff.monthSalary=staff.monthSalary-(staff.salary/180)*hours
   const mins=Math.floor((mHours-hours)*60)
   staff.monthSalary=staff.monthSalary-(staff.salary/180*60)*mins
    }
   if (staff.monthSalary<0)
   staff.monthSalary=0
 }
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
    async function getDates (startDate, endDate) {
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

async function acceptedLeave(date,staff){
    const leaveArray=staff.leaves
    var f= false
    for(let i=0;i<leaveArray.length;i++){
        const leave =await leaves_model.findOne({_id:leaveArray[i]})
        if(leave){
        if(leave.start==date && leave.accepted==true && leave.end!=null){
            var array =getDates(leave.start,leave.end)
            for(let i=0;i<array.length;i++){
                leave.leaveDates.push(array[i])
            }
            leave.markModified("leaveDates")
            await leave.save()
            console.log("1")
            f= true
            
         }
         else if (leave.start=date && leave.accepted==true && leave.end==null){
            console.log("2")
             f= true

         }
         else if (leave.leaveDates.length!=0 && leave.leaveDates.includes(date)){
            console.log("3")
             f=true

         }
         else{
            console.log("4")
             f= false
    }
}
//console.log("ana tala3t" + f)
 
}
return f
}

async function missingDays(staff, day1, day2, month1, month2, year1, firstEntry) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var flag = false
    var out = false
    //console.log(newMonth)
    if ((month1 != month2 && day1 > 10))
        flag = true
    //add missing days from 11 to next day attended
    var number = 0
    if (checkMonth(month1, day1) == false && day1 - 1 != day2 && month1 == month2 && newMonth && day1 <= 10) {
        console.log("awel if")
        var missingDay = day2 + 1
        for (let j = missingDay; j < day1; j++) {
            var d = new Date(month1 + "/" + j + "/" + year1)
            if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                number = number + 1

        }
    }
    else if (firstEntry == true && day1 != 11) {
        console.log("talet if")
        for (let i = 11; i < day1; i++) {
            var d = new Date(month1 + "/" + i + "/" + year1)
            if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                number = number + 1
            // console.log(number)
        }

    }
    else if (checkMonth(month1, day1) == false && day1 - 1 != day2 && month1 == month2 && !newMonth) {
        console.log("awel if")
        var missingDay = day2 + 1
        for (let j = missingDay; j < day1; j++) {
            var d = new Date(month1 + "/" + j + "/" + year1)
            if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                number = number + 1

        }
    }
    else if (checkMonth(month1, day1) == false && day1 - 1 != day2 && month1 == month2 && newMonth && day1 > 10) {
        console.log("tany if")
        newMonth = false
        var missingDay = day2 + 1
        for (let j = missingDay; j < 11; j++) {
            var d = new Date(month1 + "/" + j + "/" + year1)
            if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                number = number + 1

        }
        staff.missingDays[staff.missingDays.length - 1] = staff.missingDays[staff.missingDays.length - 1] + number
        staff.markModified("missingDays")
        await staff.save()
        number = 0
        for (let j = 11; j < day1; j++) {
            var d = new Date(month1 + "/" + j + "/" + year1)
            if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                number = number + 1

        }
        calcSalary(staff)
        staff.missingDays.push(number)
        staff.markModified("missingDays")
        await staff.save()
        out = true
    }

    else if (day1 - 1 != day2 && month1 - 1 == month2) {
        if (checkMonth(month2, day2) == true) {
            console.log("rabe3 if a")
            for (let j = 1; j < day1; j++) {
                var d = new Date(month1 + "/" + j + "/" + year1)
                if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                    // staff.missingDays.push(d) 
                    number = number + 1
            }
        }
        else {
            if(day1>11){
            console.log("rabe3 if b")
            console.log(day2 + 1)
            console.log(checkMonth(1, 31))
            var missingDay = day2 + 1
            for (let j = missingDay; checkMonth(month2, j - 1) == false; j++) {
                // console.log(checkMonth(month2, j - 1) )
                // console.log(j)
                var d = new Date(month2 + "/" + j + "/" + year1)
                if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                    number = number + 1

            }
            console.log(number)

            for (let j = 1; j < 11; j++) {
                var d = new Date(month1 + "/" + j + "/" + year1)
                if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                    number = number + 1
            }
            console.log(number)

            staff.missingDays[staff.missingDays.length - 1] = staff.missingDays[staff.missingDays.length - 1] + number
            staff.markModified("missingDays")
            await staff.save()
            number = 0

            var d = new Date(month1 + "/" + 11 + "/" + year1)
            for (let j = 11; j < day1; j++) {
                var d = new Date(month1 + "/" + j + "/" + year1)
                if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                    number = number + 1
            }
            calcSalary(staff)
            staff.missingDays.push(number)
            staff.markModified("missingDays")
            await staff.save()
            out = true}
            else { 
                var missingDay = day2 + 1
                for (let j = missingDay; checkMonth(month2, j - 1) == false; j++) {
                    // console.log(checkMonth(month2, j - 1) )
                    // console.log(j)
                    var d = new Date(month2 + "/" + j + "/" + year1)
                    if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                        number = number + 1
    
                }
                console.log(number)
    
                for (let j = 1; j < day1; j++) {
                    var d = new Date(month1 + "/" + j + "/" + year1)
                    if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                        number = number + 1
                }
                console.log(number)
    
            }

        }
    }
    if (!out) {

        //console.log("enta lesa bet5osh wala eh ???" + number)
        if (firstEntry) {
            staff.missingDays.push(number)
        }
        else
            staff.missingDays[staff.missingDays.length - 1] = staff.missingDays[staff.missingDays.length - 1] + number

        staff.markModified("missingDays")
        staff.save()

    }

}
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
         var milliseconds = Math.abs(signOut.getTime() - signIn.getTime());
        var hours = milliseconds / 36e5;
        var flag=false
        var day1=currentTime2.signInTime.getDate()
        var month1=currentTime2.signInTime.getMonth()+1
        var month2=0
        var day2=0
        if(staff.attendance.length>=2){ 

         month2=staff.attendance[staff.attendance.length-2].signInTime.getMonth()+1
         day2=staff.attendance[staff.attendance.length-2].signInTime.getDate()}
         //console.log((month1!=month2&&day1>10)+"1st")
         //console.log(staff.attendance.length==0+"1st")
         if(month1!=month2)
          newMonth2=true
        if((newMonth2&&day1>10)|| staff.attendance.length==0){

           flag=true
    }
    if(hours > 8.24 &&( staff.missingHours[staff.missingHours.length-1]==0||newMonth2==false)){
        extraHours(staff,hours,flag,day1)
   
}

    else{
        missingHours(staff,hours,flag,day1)
    
    
}  
        
        res.send("SIGNED OUT")
    }
    
        else res.send("you cannot sign out without signing in")
    }
    else

    res.send("staff member with this id doesnt exist")
    
})
//missing hours
//missing hours
function missingHours(staff,hours,flag,day1,day2){
    if(flag){
        console.log("da5alt")
    staff.missingHours.push(8.4-hours)
    staff.extraHours.push(0)
    newMonth2=false
    
}
    else{
     if(day1!=day2){
     var x=staff.missingHours[staff.missingHours.length-1]+(8.4-hours)
     if(x<0){
     extraHours(staff,math.abs(x)+8.4,flag,day1,day2)
     x=0}}
     else{

     var x = staff.missingHours[staff.missingHours.length-1]-hours
     if(x<0){
     extraHours(staff,math.abs(x)+8.4,flag,day1,day2)
     x=0}
    }
   // console.log("hhhh "+x)
     staff.missingHours[staff.missingHours.length-1]=x

}
   staff.markModified("missingHours")
    staff.save()
}
//extra hours
function extraHours(staff,hours,flag,day1,day2){
    if(flag){
    staff.extraHours.push(hours-8.4)
    staff.missingHours.push(0)
    newMonth2=false
    
}
    else{
     if(day1!=day2)
     var x=staff.extraHours[staff.missingHours.length-1]+(hours-8.4)
     else{
     var x =hours- staff.extraHours[staff.extraHours.length-1]
    }
     staff.extraHours[staff.extraHours.length-1]=x

}
staff.markModified("ExtraHours")
staff.save()
}
//////////////

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
    res.send(staff.extraHours)
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
    res.send([staff])
    //console.log([staff])
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

//update profile
router.route('/updateProfile')
.post(async (req, res) => {
    console.log("updating staff")
    const staff = await staff_members_models.findOne({ _id: req.user._id})
     
    if (staff) {

        
        if(req.body.email!=null){

            const found = await staff_members_models.findOne({ email: req.body.email })
            if(found){
                res.send("email taken, try with another email")
            }
            staff.email = req.body.email

        }
        if(req.body.password!=null){
            const salt = await bcrypt.genSalt(10)
            const newPassword = await bcrypt.hash(req.body.password, salt)
            staff.password = newPassword
        }
        if(req.body.gender!=null){

            staff.gender = req.body.gender
        }
       
    
      

        
        try {
            
            await staff.save()
        }
        catch (Err) {
            console.log(Err)
            res.send("error saving staff member")
        }
        return res.send("Updated")    
    }

        res.send('staff member with id '+ req.body.id+' doesnt exist')


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
// //updatprofile
// router.route('/updateProfile')
// .post(async(req,res)=>{
//     const staffId=req.user._id;
//     const staff = await staff_members_models.findOne({ _id: staffId })
//     if(staff){ 
//         if(staff.staffType==academic){

//         }
//         else{

//         }
//         }
// })


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


module.exports = router