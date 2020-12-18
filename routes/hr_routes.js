const staff_members_models = require('../models/staff_member_models').model
const location_model = require('../models/location_model').model
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const faculty_model = require('../models/faculty_model').model
require('dotenv').config()


router.route('/addLocation')
.post(async (req, res) => {
    console.log("adding loc")
    const location = await location_model.findOne({ name: req.body.name })
     
        if (!location) {
    const newLocation = new location_model({
        type: req.body.type,
        name: req.body.name,
        capacity: req.body.capacity,

    })

    if(req.body.type=="office"){
        newLocation.officeMembers=0
    }
    try {
        
        await newLocation.save()
    }
    catch (Err) {
        console.log(Err)
        res.send("error adding location")
    }
    return res.send(newLocation)    
        }

        res.send('location '+ req.body.name+' is already there')


})

router.route('/updateLocation')
.post(async (req, res) => {
    console.log("adding loc")
    const location = await location_model.findOne({ name: req.body.name })
     
    if (location) {
        const name = req.body.name

        if(req.body.type!=null){
            location.type = req.body.type
        }
        if(req.body.capacity!=null){
                location.capacity = req.body.capacity
        }
        if(req.body.officeMembers!=null){
            location.officeMembers = req.body.officeMembers
        }
        try {
            
            await location.save()
        }
        catch (Err) {
            console.log(Err)
            res.send("error saving location")
        }
        return res.send(location)    
    }

        res.send('location '+ req.body.name+' doesnt exist')


})


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

// router.route('/addFaculty')
// .post(async (req, res) => {
//     console.log("adding fac")
//     const faculty = await faculty_model.findOne({ facultyName: req.body.name })
     
//         if (!faculty) {
//     const newFaculty = new faculty_model({
//         type: req.body.type,
//         name: req.body.name,
//         capacity: req.body.capacity,

//     })

//     if(req.body.type=="office"){
//         newLocation.officeMembers=0
//     }
//     try {
        
//         await newLocation.save()
//     }
//     catch (Err) {
//         console.log(Err)
//         res.send("error adding location")
//     }
//     return res.send(newLocation)    
//         }

//         res.send('location '+ req.body.name+' is already there')


// })

// const facultySchema = new mongoose.Schema({
//     facultyName: {
//         type: String,
//         required: true
//     },
//     departments: {
//       //  type: departmentSchema
//         type: [],
//         default: []
//     }
// })

// router.route('/deleteFaculty')
// .delete(async (req,res)=>{
//     await faculty_model.remove({ name:  req.body.name.toLowerCase()}, function(err, result) {
//         if (err) {
//           console.err(err);
//         } else {
//           res.json(result);
//         }
//       });
// })


    module.exports = router