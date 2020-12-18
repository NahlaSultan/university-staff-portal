const staff_members_models = require('../models/staff_member_models')
const location_model = require('../models/location_model')
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const faculty_model = require('../models/faculty_model')
require('dotenv').config()

// HR can add a new staff member to the system. For all staff members,
// HR should add id, name, email, salary and office location.
// – Any extra personal information details is acceptable.
// – Emails should be unique.
// – Staff member ids are unique. The first academic staff member should have id “ac-1”, and the first hr member should have id “hr-1”. The system should automatically increment ids when adding a new staff member.
// – Once a staff member is added to the system, his/her password should be set to a default value: “123456”. The system must prompt new users to change their passwords on their first login to the system.
// – HR can’t assign an office location that already has full capacity.
// – HR does not assign a course to a new academic staff member.
// – All HR members have Saturday as their day off, and they can’t change it.
//$in: ["HR members", "teachingAssistants", "courseInstructors", "courseCoordinators", "headOfdepartments"]

//try to merge hr routes


function genID( role){
    switch(role){
        case "HR members":

        break;
        default:

        return ""
        
    }
}

router.route('/addStaff')
.post(async (req,res)=>{
    const email = req.body.email
    const user = await staff_members_models.findOne({email:email})

    if(!user){
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash("123456",salt)
        const id = genID(req.body.role)
        const dayOff=""
        if(req.body.role == "HR members"){
            dayOff="Saturday"
        }

        const newUser = new staff_members_models({
            name: req.body.name,
            id: id,
            email: email,
            salary: req.body.salary,
            role: req.body.role,
            dayOff: dayOff
        })

        try{
        await newUser.save()}
        catch(Err){
            console.log(Err)
        }
        return res.send(newUser)
    }
    res.send('Email already registered')
} )

router.route('/addLocation')
.post(async (req,res)=>{
    const newLocation = new location_model({
        type: req.body.type,
        capacity: req.body.capacity,
        name: req.body.name,
        
    })
    try{
        await newLocation.save()}
        catch(Err){
            console.log(Err)
        }
        return res.send(newLocation)
    

})

// type: {
//     type: String,
//     $in: ["hall", "room", "lab", "office"]
// },

// name: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase:true
// },

// capacity: {
//     type: int,
//     required: true
// },

// officeMembers: {
//     type: int,
// },

// router.route('/updateLocation')
// .post(async (req,res)=>{

//     const name = req.body.name
//     location_model.findOneAndUpdate(query,{ "attendance": {"signOutTime": new Date()}}, {upsert: true}, function(err, doc) {
//         if (err) return res.send(500, {error: err});
//         return res.send('Succesfully saved.');
//     const newLocation = new location_model({
//         type: req.body.type,
//         capacity: req.body.capacity,
//         name: req.body.name,
        
//     })
// }
// })

router.route('/deleteLocation')
.delete(async (req,res)=>{
    await location_model.remove({ name:  req.body.name.toLowerCase()}, function(err, result) {
        if (err) {
          console.err(err);
        } else {
          res.json(result);
        }
      });
      
})

router.route('/addFaculty')
.post(async (req,res)=>{
    const newFaculty = new faculty_model({
        type: req.body.type,
        capacity: req.body.capacity,
        name: req.body.name,
        
    })
    try{
        await newLocation.save()}
        catch(Err){
            console.log(Err)
        }
        return res.send(newLocation)
    

})

// router.route('/updateFacutly')
// .post(async (req,res)=>{
//     const newLocation = new location_model({
//         type: req.body.type,
//         capacity: req.body.capacity,
//         name: req.body.name,
        
//     })
// })

router.route('/deleteFaculty')
.delete(async (req,res)=>{
    await faculty_model.remove({ name:  req.body.name.toLowerCase()}, function(err, result) {
        if (err) {
          console.err(err);
        } else {
          res.json(result);
        }
      });
})


    module.exports = router