const staff_members_models = require('../models/staff_member_models').model
const location_model = require('../models/location_model').model
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const faculty_model = require('../models/faculty_model').model
const department_model = require('../models/department_model').model
const course_model = require('../models/course_model').model

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
        if(req.body.newName!=null){
            const usedName = await location_model.findOne({ name: req.body.newName })
            if(usedName)
                res.send('name ' + req.body.newName+'is already in use')

            location.name = req.body.newName
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

router.route('/addFaculty')
.post(async (req, res) => {
    console.log("adding fac")
    const faculty = await faculty_model.findOne({ facultyName: req.body.name })
     
    if (!faculty) {
        const newFaculty = new faculty_model({
        facultyName: req.body.name,
        })

        if(req.body.departments!=null){
            console.log("dep not null")
            array = req.body.departments
            array.forEach(element => {
                const dep = new department_model({
                name: element
                })
                newFaculty.departments.push(dep)
            });       
        } 
       

    
        try {
            
            await newFaculty.save()
        }
        catch (Err) {
            console.log(Err)
            res.send("error adding faculty")
        }
    res.send(newFaculty)    
    
    }
    res.send('faculty '+ req.body.name+' is already there')


})

router.route('/deleteFaculty')
.delete(async (req,res)=>{
    await faculty_model.remove({ facultyName:  req.body.name}, function(err, result) {
        if (err) {
          console.err(err);
        } else {
          res.json(result);
        }
      });
      
})


router.route('/updateFaculty')
.post(async (req, res) => {
    console.log("updating fac")
    const faculty = await faculty_model.findOne({ facultyName: req.body.name })
     
    if (faculty) {
        const name = req.body.name

        if(req.body.addDepartments!=null){
            array = req.body.addDepartments
            
            array.forEach(element => {
                var found = false
                for(var i=0; i<faculty.departments.length; i++){
                    currDep = faculty.departments[i]
                    if(element == currDep.name)
                        found = true
                }
                    if(!found){
                    faculty.departments.push(new department_model({
                        name: element
                        }))
                    }

            });
        }
        if(req.body.removeDepartments!=null){
            array = req.body.removeDepartments
            array.forEach(element => {
                for(var i=0; i<faculty.departments.length; i++){
                    currDep = faculty.departments[i]
                    if(element == currDep.name)
                        faculty.departments.splice(i, 1);


                }

            });        }
       
        if(req.body.newName!=null){
            const usedName = await location_model.findOne({ name: req.body.newName })
            if(usedName)
                res.send('name ' + req.body.newName+'is already in use')

            faculty.facultyName = req.body.newName
        }
        try {
            
            await faculty.save()
        }
        catch (Err) {
            console.log(Err)
            res.send("error saving faculty")
        }
        return res.send(faculty)    
    }

        res.send('faculty '+ req.body.name+' doesnt exist')


})



router.route('/addDepartment')
.post(async (req, res) => {
    console.log("adding dep")
    const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })
     
    if (faculty) {
        var found = false
        for(var i=0; i<faculty.departments.length; i++){
            currDep = faculty.departments[i]
            if(req.body.departmentName == currDep.name)
                found = true
        }
        if(found){
            res.send("this department is already in "+ req.body.facultyName)
        }
        const department = new department_model({
        name: req.body.departmentName,
        })

        if(req.body.headOfDepartment!=null){
            console.log("hod not null")
            const hod = await staff_members_models.findOne({ memberID: req.body.hod })
            if(hod){
                department.headOfDepartment = hod
            }
            else{
                res.send("the hod's id doesn't exist, add this staff member first")
            }
                  
        } 
        if(req.body.courses!=null){
            console.log("courses not null")
            array = req.body.courses
            array.forEach(element => {
                course = new course_model({
                courseName: element
                })
                console.log(course)
                department.courses.push(course)
            });       
        } 
        faculty.departments.push(department)

    
        try {
            await faculty.save()
        }
        catch (Err) {
            console.log(Err)
            res.send("error adding faculty")
        }
    res.send(department)    
    
    }
    res.send('faculty '+ req.body.facultyName+' isnt there')


})

router.route('/deleteDepartment')
.delete(async (req,res)=>{
    const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })
    if (faculty) {
            for(var i=0; i<faculty.departments.length; i++){
                currDep = faculty.departments[i]
                if(req.body.department == currDep.name)
                    faculty.departments.splice(i, 1);
            }
            try {
                await faculty.save()
            }
            catch (Err) {
                console.log(Err)
                res.send("error adding faculty")
            }
          res.send(faculty)    

    }
    
    res.send('faculty '+ req.body.facultyName+' isnt there')

      
})

// name: {
//     type: String,
//     required: true
// },
// headOfDepartment: {
//     type: staffSchema,
//     unique: true
// },
// courses:{
//     type:[],
//     default: []
// } 

router.route('/updateDepartment')
.post(async (req, res) => {
    console.log("updating dep")
    const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })
     
    if (faculty) {
        depName = req.body.departmentName
        var indexOfDep =-1
        var found = false
        for(var i=0; i<faculty.departments.length; i++){
            currDep = faculty.departments[i]
            if(depName == currDep.name){
                found = true
                indexOfDep =i

            }
        }

        if(!found){
            res.send("this department doesnt exist in "+ req.body.facultyName)
        }

        const dep = faculty.departments[indexOfDep]


       
        if(req.body.newName!=null){
            if (faculty.departments.includes(req.body.newName) )
                res.send('name ' + req.body.newName+'is already in use')

                dep.name = req.body.newName
        }
        if(req.body.hod!=null){
            const staff = await staff_members_models.findOne({ memberID: req.body.hod })
            if(!staff)
                res.send('this hod is not a staff member')
                dep.headOfDepartment = staff
        }
        try {
            faculty.departments[indexOfDep]= dep
            console.log('saving')
            faculty.markModified('departments.'+indexOfDep);

            await faculty.save()
            console.log('saved')
            console.log(faculty.departments[indexOfDep].name)

        }
        catch (Err) {
            console.log(Err)
            res.send("error saving faculty")
        }
        res.send(faculty)    
    }
    

        res.send('faculty '+ req.body.name+' doesnt exist')

})



router.route('/addCourse')
.post(async (req, res) => {
    console.log("adding course")
    const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })
     
    if (faculty) {
        var departmentFound = false
        var depIndex = -1
        for(var i=0; i<faculty.departments.length; i++){
            currDep = faculty.departments[i]
            if(req.body.departmentName == currDep.name){
                departmentFound = true
                depIndex = i
            }
        }
        if(!departmentFound){
            res.send("this department isn't in "+ req.body.facultyName)
        }
        const dep= faculty.departments[depIndex]
        var courseFound = false
        var courseIndex = -1
        for(var i=0; i<dep.courses.length; i++){
            currCourse = dep.courses[i]
            if(req.body.courseName == currCourse){
                courseFound = true
                courseIndex = i
            }
        }
            if(courseFound)
            res.send("this course is already in "+ req.body.departmentName)
        

        const course =    new course_model({
        courseName: req.body.courseName,
        teachingSlotsNumber: req.body.teachingSlotsNumber
    
        })
        // if(req.body.instructors!=null){
        //     console.log("instructors not null")
        //     //array form
        //     course.instructors = req.body.instructors         
        // } 
        // if(req.body.teachingAssistants!=null){
        //     console.log("teachingAssistants not null")
        //     //array form
        //     course.teachingAssistants = req.body.teachingAssistants         
        // } 
        // if(req.body.courseCoordinator!=null){
        //     console.log("courseCoordinator not null")
        //     //string form
        //     course.courseCoordinator = req.body.courseCoordinator         
        // }
        
        faculty.markModified('departments.'+depIndex+'.courses');
        faculty.departments[depIndex].courses.push(req.body.courseName)
    
        try {
            await course.save()
            await faculty.save()
        }
        catch (Err) {
            console.log(Err)
            res.send("error adding faculty")
        }
    res.send(faculty)    
    
    }
    res.send('faculty '+ req.body.facultyName+' isnt there')


})

router.route('/deleteCourse')
.delete(async (req, res) => {
    console.log("deleting course")
    const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })
   

    if (faculty) {
        var departmentFound = false
        var depIndex = -1
        for(var i=0; i<faculty.departments.length; i++){
            currDep = faculty.departments[i]
            if(req.body.departmentName == currDep.name){
                departmentFound = true
                depIndex = i
            }
        }
        if(!departmentFound){
            res.send("this department isn't in "+ req.body.facultyName)
        }
        const dep= faculty.departments[depIndex]
        var courseArray = faculty.departments[depIndex].courses
        
        for(var i=0; i<courseArray.length; i++){
            currCourse = courseArray[i]
            if(req.body.courseName == currCourse){
                courseArray.splice(i, 1)
            }
        }
          

        faculty.departments[depIndex].courses=courseArray

        faculty.markModified('departments.'+depIndex+'.courses');
    
        try {
            await faculty.save()
        }
        catch (Err) {
            console.log(Err)
            res.send("error adding faculty")
        }
        await course_model.remove({ courseName:  req.body.courseName}, function(err, result) {
            if (err) {
              console.err(err);
            } else {
              console.log(result);
            }
          });
    res.send(faculty)    
    
    }
    res.send('faculty '+ req.body.facultyName+' isnt there')


})

router.route('/updateCourse')
.post(async (req, res) => {
    console.log("updating course")
    const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })
    const course = await course_model.findOne({ courseName: req.body.courseName })

    if (faculty) {
        var departmentFound = false
        var depIndex = -1
        for(var i=0; i<faculty.departments.length; i++){
            currDep = faculty.departments[i]
            if(req.body.departmentName == currDep.name){
                departmentFound = true
                depIndex = i
            }
        }
        if(!departmentFound){
            res.send("this department isn't in "+ req.body.facultyName)
        }
        const dep= faculty.departments[depIndex]
        var courseFound = false
        var courseIndex = -1
        for(var i=0; i<dep.courses.length; i++){
            currCourse = dep.courses[i]
            if(req.body.courseName == currCourse){
                courseFound = true
                courseIndex = i
            }
        }
            if(!courseFound)
            res.send("this course is not in "+ req.body.departmentName)


       
        if(req.body.newName!=null){
            console.log("newName not null")
            //array form
            course.courseName = req.body.newName         
        } 
       
        if(req.body.teachingSlotsNumber!=null){
            console.log("teachingSlotsNumber not null")
            //string form
            course.teachingSlotsNumber = req.body.teachingSlotsNumber         
        }
        faculty.departments[depIndex].courses[courseIndex] = course    

        faculty.markModified('departments.'+depIndex+'.courses');
        try {
            await course.save()
            await faculty.save()
        }
        catch (Err) {
            console.log(Err)
            res.send("error adding faculty")
        }
    res.send(faculty)    
    
    }
    res.send('faculty '+ req.body.facultyName+' isnt there')


})




    module.exports = router