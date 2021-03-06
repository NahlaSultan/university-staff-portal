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
const newAttendance = require('../models/attendance_record').model
const workingSchedule_model = require('../models/workingSchedule_model').model
const leaves_model = require('../models/leaves_model').model
var newMonth = false
var newMonth2 = false
async function defaultPassword() {
    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash("123456", salt)
    return newPassword
}
require('dotenv').config()

router.route('/addStaff')
    .post(async (req, res) => {
        const email = req.body.email
        const user = await staff_members_models.findOne({ email: email })
        console.log("finding mail")

        //doing anything in the database takes time so we should await and async
        if (!user) {
            console.log("if not user")
            newPassword = await defaultPassword()
            var staffType, memberID
            if (req.body.role == ("HR members")) {
                staffType = "hr"
            }
            else {
                staffType = "academic"
            }


            if (req.body.office == null || req.body.office == "")  {
                return res.send('must specify an office')
            }
            const office = await location_model.findOne({ name: req.body.office })
            if (!office || office.type != "office") {
                return res.send('this is not a valid office')
            }
            if (office.officeMembers < office.capacity) {
                office.officeMembers = office.officeMembers + 1
                try {
                    console.log('saving office')
                    await office.save()

                }
                catch (Err) {
                    console.log(Err)
                    return res.send("error saving office")
                }

            }
            else
                return res.send('this office is already full')


            const arr = []
            arr.push(req.body.role)

            const newUser = new staff_members_models({
                name: req.body.name,
                email: req.body.email,
                password: newPassword,
                role: arr,
                dayOff: req.body.dayOff,
                salary: req.body.salary,
                staffType: staffType,
                officeLocation: req.body.office,
                gender: req.body.gender
            })
            newUser.monthSalary = newUser.salary
            var faculty;
            var depIndex;

            if (staffType != "hr") {

                if ((req.body.faculty == null || req.body.faculty == "" )&& staffType == "academic") {
                    return res.send("must specify faculty name")
                }
                else {
                    faculty = await faculty_model.findOne({ facultyName: req.body.faculty })
                    if (faculty)
                        newUser.faculty = req.body.faculty
                    else {
                        return res.send("this is not a valid faculty, check faculty table and pick an existing one")
                    }
                }

                if ((req.body.department == null || req.body.department == "") && staffType == "academic") {
                    return res.send("must specify department name")
                }
                else {

                    var found = false
                    for (var i = 0; i < faculty.departments.length; i++) {
                        currDep = faculty.departments[i]
                        if (req.body.department == currDep.name) {
                            found = true
                            depIndex = i
                        }
                    }

                    if (found) {
                        newUser.department = req.body.department
                    }
                    else {
                        console.log("heree")

                        return res.send("this is not a valid department in" + req.body.faculty + " pick one of these departments or add a department first"
                        )
                        console.log("after save")
                    }
                }
            }
            if (staffType == "hr") {
                newUser.dayOff = "Saturday"
            }
            else if (req.body.dayOff != null) {
                newUser.dayOff = req.body.dayOff
            }


            if (req.body.annualLeavesBalance != null) {
                newUser.annualLeavesBalance = req.body.annualLeavesBalance
            }
            if (req.body.leaves != null) {
                newUser.leaves = req.body.leaves
            }
            if (req.body.workingSchedule != null) {
                newUser.workingSchedule = req.body.workingSchedule
            }


            try {
                console.log("saving user")
                console.log(newUser.id)
                await newUser.save()
                var str = ""
                if (staffType != "hr")
                    str = "ac"
                else
                    str = "hr"

                memberID = str + "-" + newUser.numberID
                newUser.memberID = memberID


                if (staffType != "hr") {

                    const schedule = new workingSchedule_model({
                        staffID: memberID
                    })
                    await schedule.save()


                }
                if (req.body.role == "headOfdepartments") {
                    console.log("role if")
                    faculty.departments[depIndex].headOfDepartment = memberID
                    faculty.markModified('departments.' + depIndex);

                    await faculty.save()


                }
                console.log("second save")
                await newUser.save()

            }
            catch (Err) {
                console.log(Err)
                res.send("Mongo error")
            }
            return res.send("success")
        }
        return res.send('Email already registered')
    })


router.route('/addLocation')
    .post(async (req, res) => {
        console.log("adding loc")
        const location = await location_model.findOne({ name: req.body.name })

        if (!location) {
            const newLocation = new location_model({
                type: req.body.type,
                name: req.body.name,
                capacity: req.body.capacity

            })

            if (req.body.type == "office") {
                newLocation.officeMembers = 0
            }
            try {

                await newLocation.save()
            }
            catch (Err) {
                console.log(Err)
                res.send("error adding location")
            }
            return res.send("success")
        }

        res.send('location ' + req.body.name + ' is already there')


    })

router.route('/viewLocations')
    .get(async (req, res) => {
        const locations = await location_model.find()
        res.send(locations)

    })


router.route('/viewOffices')
    .get(async (req, res) => {
        const locations = await location_model.find({ type: "office" })
        res.send(locations)

    })

router.route('/viewFaculties')
    .get(async (req, res) => {
        const faculties = await faculty_model.find()
        res.send(faculties)

    })

router.route('/viewDepartments')
    .post(async (req, res) => {
        const fac = await faculty_model.findOne({ facultyName: req.body.fac })
        res.send(fac.departments)


    })

router.route('/viewCourse')
    .post(async (req, res) => {
        const course = await course_model.findOne({ courseName: req.body.courseName })
        res.send(course)


})



router.route('/viewStaffs')
    .get(async (req, res) => {
        const staffs = await staff_members_models.find()
        res.send(staffs)

    })
    

router.route('/viewHR')
    .get(async (req, res) => {
        const staffs = await staff_members_models.find({ staffType: "hr" })
        res.send(staffs)

    })

router.route('/viewAC')
    .get(async (req, res) => {
        const staffs = await staff_members_models.find({ staffType: "academic" })
        res.send(staffs)

    })

   // $in: ["HR members", "teachingAssistants", "courseInstructors", "courseCoordinators", "headOfdepartments"]


router.route('/viewTAs')
    .get(async (req, res) => {
        const staffs = await staff_members_models.find({ role: "teachingAssistants" })

        res.send(staffs)

    })

router.route('/viewCCs')
    .get(async (req, res) => {
        const staffs = await staff_members_models.find({ role: "courseCoordinators" })

        res.send(staffs)

    })

router.route('/viewHODs')
    .get(async (req, res) => {
        const staffs = await staff_members_models.find({ role: "headOfdepartments" })

        res.send(staffs)

    })

router.route('/viewCIs')
    .get(async (req, res) => {
        const staffs = await staff_members_models.find({ role: "courseInstructors" })

        res.send(staffs)

    })



router.route('/updateLocation')
    .post(async (req, res) => {
        console.log("adding loc")
        const location = await location_model.findOne({ name: req.body.name })

        if (location) {
            const name = req.body.name

            if (req.body.type != null && req.body.type != '') {

                location.type = req.body.type
            }
            if (req.body.capacity != null && req.body.capacity != '') {
                location.capacity = req.body.capacity
            }
            if (req.body.officeMembers != null && req.body.officeMembers != '') {
                location.officeMembers = req.body.officeMembers
            }
            if (req.body.newName != null && req.body.newName != '') {
                const usedName = await location_model.findOne({ name: req.body.newName })
                if (usedName)
                    res.send('name ' + req.body.newName + ' is already in use')

                if (location.type == "office") {

                    const staff = await staff_members_models.find({ officeLocation: location.name })
                    console.log(staff.length)
                    for (var k = 0; k < staff.length; k++) {
                        staff[k].officeLocation = req.body.newName

                        try {
                            await staff[k].save()
                        } catch (error) {
                            res.send("error saving staff")

                        }

                    }
                }

                location.name = req.body.newName
            }
            try {

                await location.save()
            }
            catch (Err) {
                console.log(Err)
                res.send("error saving location")
            }
            return res.send("success")
        }

        res.send('location ' + req.body.name + ' doesnt exist')


    })


router.route('/deleteLocation')
    .post(async (req, res) => {
        await location_model.remove({ name: req.body.name.toLowerCase() }, function (err, result) {
            if (err) {
                console.err(err);
            }
        });
        const staff = await staff_members_models.find({ officeLocation: req.body.name })
        console.log(staff.length)
        for (var k = 0; k < staff.length; k++) {
            staff[k].officeLocation = "unassigned"

            try {
                await staff[k].save()
            } catch (error) {
                res.send("error saving staff")

            }

        }

        res.send("deleted successfully");

    })

router.route('/addFaculty')
    .post(async (req, res) => {
        console.log("adding fac")
        const faculty = await faculty_model.findOne({ facultyName: req.body.name })

        if (!faculty) {
            const newFaculty = new faculty_model({
                facultyName: req.body.name,
            })

            if (req.body.departments != null) {
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
                return
            }
            res.send("success")

        }
        res.send('faculty ' + req.body.name + ' is already there')


    })

router.route('/deleteFaculty')
    .post(async (req, res) => {

        console.log("here")
        console.log(req.body.name)

        await faculty_model.deleteOne({ facultyName: req.body.name }, function (err, result) {
            if (err) {
                console.log(err)
                res.send("error while removing fac")
            }
        }
        );


        const staff = await staff_members_models.find({ faculty: req.body.name })
        console.log(staff.length)
        for (var k = 0; k < staff.length; k++) {
            staff[k].faculty = "unassigned"
            staff[k].department = "unassigned"

            try {
                await staff[k].save()
            } catch (error) {
                res.send("error saving staff")

            }

        }

        res.send("deleted successfully")





    })


router.route('/updateFaculty')
    .post(async (req, res) => {
        console.log("updating fac")
        const faculty = await faculty_model.findOne({ facultyName: req.body.name })

        if (faculty) {

            if (req.body.addDepartments != null) {
                array = req.body.addDepartments

                array.forEach(element => {
                    var found = false
                    for (var i = 0; i < faculty.departments.length; i++) {
                        currDep = faculty.departments[i]
                        if (element == currDep.name)
                            found = true
                    }
                    if (!found) {
                        faculty.departments.push(new department_model({
                            name: element
                        }))
                    }

                });
            }
            if (req.body.removeDepartments != null) {
                array = req.body.removeDepartments
                array.forEach(element => {
                    for (var i = 0; i < faculty.departments.length; i++) {
                        currDep = faculty.departments[i]
                        if (element == currDep.name)
                            faculty.departments.splice(i, 1);


                    }

                });
            }

            if (req.body.newName != null) {
                const usedName = await faculty_model.findOne({ facultyName: req.body.newName })
                if (usedName){
                    res.send('name ' + req.body.newName + ' is already in use')
                    return
                }

                const staff = await staff_members_models.find({ faculty: req.body.name })
                console.log(staff.length)
                for (var k = 0; k < staff.length; k++) {
                    staff[k].faculty = req.body.newName

                    try {
                        await staff[k].save()
                    } catch (error) {
                        res.send("error saving staff")
                        return


                    }
                }
                faculty.facultyName = req.body.newName
            }
            try {

                await faculty.save()
            }
            catch (Err) {
                console.log(Err)
                res.send("error saving faculty")
                return

            }
            return res.send("success")
        }

        res.send('faculty ' + req.body.name + ' doesnt exist')


    })



router.route('/addDepartment')
    .post(async (req, res) => {
        console.log("adding dep")
        const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })

        if (faculty) {
            var found = false
            for (var i = 0; i < faculty.departments.length; i++) {
                currDep = faculty.departments[i]
                if (req.body.departmentName == currDep.name)
                    found = true
            }
            if (found) {
                res.send("this department is already in " + req.body.facultyName)
                return
            }
            const department = new department_model({
                name: req.body.departmentName,
            })

            if (req.body.headOfDepartment != null && req.body.headOfDepartment!="") {
                console.log("hod not null")
                const hod = await staff_members_models.findOne({ memberID: req.body.headOfDepartment })
                if (hod) {
                    department.headOfDepartment = hod.memberID
                    hod.role.push("headOfdepartments")
                    hod.department = req.body.departmentName
                    hod.faculty = faculty.facultyName
                    try {
                        await hod.save()
                    }
                    catch (Err) {
                        console.log(Err)
                        res.send("error saving hod")
                        return
                    }
                }
                else {
                    res.send("the hod's id doesn't exist, add this staff member first "+ req.body.headOfDepartment)
                    return
                }

            }
            if (req.body.courses != null) {
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
                return
            }
            res.send("success")

        }
        res.send('faculty ' + req.body.facultyName + ' isnt there')


    })

router.route('/deleteDepartment')
    .post(async (req, res) => {
        const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })
        if (faculty) {
            for (var i = 0; i < faculty.departments.length; i++) {
                currDep = faculty.departments[i]
                if (req.body.department == currDep.name) {
                    const hodID = currDep.headOfDepartment

                    const hod = await staff_members_models.findOne({ memberID: hodID })
                    if (hod) {
                        const ind = hod.role.indexOf("headOfdepartments")
                        hod.role.splice(ind, 1)
                    }

                    faculty.departments.splice(i, 1);
                    faculty.markModified('departments.' + i)
                    break;
                }
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

        res.send('faculty ' + req.body.facultyName + ' isnt there')


    })


router.route('/updateDepartment')
    .post(async (req, res) => {
        console.log("updating dep")
        const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })

        if (faculty) {
            depName = req.body.departmentName
            var indexOfDep = -1
            var found = false
            for (var i = 0; i < faculty.departments.length; i++) {
                currDep = faculty.departments[i]
                if (depName == currDep.name) {
                    found = true
                    indexOfDep = i
                    break;

                }
            }

            if (!found) {
                res.send("this department doesnt exist in " + req.body.facultyName + " dep: "+ 
                req.body.departmentName + " here")
            }

            const dep = faculty.departments[indexOfDep]



            if (req.body.newName != null && req.body.newName!="" ) {

                var usedName = false
                for (var i = 0; i < faculty.departments.length; i++) {
                    currDep = faculty.departments[i]
                    if (req.body.newName == currDep.name) {
                        usedName = true

                        break;
    
                    }
                }
                if (usedName){
                    res.send('name ' + req.body.newName + ' is already in use')
                    return
                }

                dep.name = req.body.newName

                faculty.departments[indexOfDep] = dep
                faculty.markModified('departments.' + indexOfDep);


            }



            if (req.body.hod != null && req.body.hod!="") {


                const hod = await staff_members_models.findOne({ memberID: req.body.hod })
                console.log(hod)
                if (!hod)
                    res.send('this hod is not a staff member')

                hod.role.push("headOfdepartments")

                try {
                    await hod.save()
                }
                catch (Err) {
                    console.log(Err)
                    res.send("error saving hod")
                }
                const oldhodID = dep.headOfDepartment
                if (oldhodID) {
                    const oldhod = await staff_members_models.findOne({ memberID: oldhodID })
                    for (var i = 0; i < oldhod.role.length; i++) {
                        if (oldhod.role[i] == "headOfdepartments") {
                            oldhod.role.splice(i, 1)
                        }
                    }
                    try {
                        await oldhod.save()
                    }
                    catch (Err) {
                        console.log(Err)
                        res.send("error saving oldhod")
                    }

                }



                dep.headOfDepartment = hod.memberID
                faculty.departments[indexOfDep] = dep
                faculty.markModified('departments.' + indexOfDep);
            }

            if (req.body.newFaculty != null && req.body.newFaculty!="")  {
                console.log("new fac")
                const newFaculty = await faculty_model.findOne({ facultyName: req.body.newFaculty })

                if (newFaculty) {
                    newFaculty.departments.push(dep)
                    faculty.departments.splice(indexOfDep, 1)
                    faculty.markModified('departments.' + indexOfDep);
                    try {
                        await faculty.save()
                        await newFaculty.save()
                    }
                    catch (Err) {
                        console.log(Err)
                        res.send("error adding faculty")
                    }
                }
                else {
                    res.send("new faculty isn't valid")
                }
            }
            try {
                console.log('saving')

                await faculty.save()
                console.log('saved')

            }
            catch (Err) {
                console.log(Err)
                res.send("error saving faculty")
            }
            res.send("success")
        }


        res.send('faculty ' + req.body.name + ' doesnt exist')

    })


router.route('/addCourse')
    .post(async (req, res) => {
        console.log("adding course")
        const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })

        if (faculty) {
            var departmentFound = false
            var depIndex = -1
            for (var i = 0; i < faculty.departments.length; i++) {
                currDep = faculty.departments[i]
                if (req.body.departmentName == currDep.name) {
                    departmentFound = true
                    depIndex = i
                }
            }
            if (!departmentFound) {
                res.send("this department isn't in " + req.body.facultyName)
                return
            }
            const dep = faculty.departments[depIndex]
            var courseFound = false
            var courseIndex = -1
            for (var i = 0; i < dep.courses.length; i++) {
                currCourse = dep.courses[i]
                if (req.body.courseName == currCourse) {
                    courseFound = true
                    courseIndex = i
                }
            }
            if (courseFound){
                res.send("this course is already in " + req.body.departmentName)
                return

            }


            const course = new course_model({
                courseName: req.body.courseName,
                teachingSlotsNumber: req.body.teachingSlotsNumber

            })
            if (req.body.teachingSlotsNumber == null || req.body.teachingSlotsNumber == "" )  {
                res.send("each course must have a number of teaching slots")
                return
            }
            // hr cannot assign course to academic member, so we dont add anything in the instructor/ta/coordinator arrays

            faculty.markModified('departments.' + depIndex + '.courses');
            await faculty.departments[depIndex].courses.push(req.body.courseName)

            try {
                await course.save()
            }
            catch (Err) {
                console.log(Err)
                res.send("error adding course")
                return
            }
            try {
                await faculty.save()
            }
            catch (Err) {
                console.log(Err)
                res.send("error saving course in faculty")
                return
            }

            res.send("success")

        }
        res.send('faculty ' + req.body.facultyName + ' isnt there')


    })

router.route('/deleteCourse')
    .post(async (req, res) => {
        console.log("deleting course")
        const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })


        if (faculty) {
            var departmentFound = false
            var depIndex = -1
            for (var i = 0; i < faculty.departments.length; i++) {
                currDep = faculty.departments[i]
                if (req.body.departmentName == currDep.name) {
                    departmentFound = true
                    depIndex = i
                }
            }
            if (!departmentFound) {
                res.send("this department isn't in " + req.body.facultyName)
            }
            const dep = faculty.departments[depIndex]
            var courseArray = faculty.departments[depIndex].courses

            for (var i = 0; i < courseArray.length; i++) {
                currCourse = courseArray[i]
                if (req.body.courseName == currCourse) {
                    courseArray.splice(i, 1)
                }
            }


            faculty.departments[depIndex].courses = courseArray

            faculty.markModified('departments.' + depIndex + '.courses');

            try {
                await faculty.save()
            }
            catch (Err) {
                console.log(Err)
                res.send("error adding faculty")
            }
            await course_model.remove({ courseName: req.body.courseName }, function (err, result) {
                if (err) {
                    console.err(err);
                } else {
                    console.log(result);
                }
            });
            res.send(faculty)

        }
        res.send('faculty ' + req.body.facultyName + ' isnt there')


    })

router.route('/updateCourse')
    .post(async (req, res) => {
        console.log("updating course")
        const faculty = await faculty_model.findOne({ facultyName: req.body.facultyName })
        const course = await course_model.findOne({ courseName: req.body.courseName })

        if (faculty) {
            var departmentFound = false
            var depIndex = -1
            for (var i = 0; i < faculty.departments.length; i++) {
                currDep = faculty.departments[i]
                if (req.body.departmentName == currDep.name) {
                    departmentFound = true
                    depIndex = i
                }
            }
            if (!departmentFound) {
                res.send("this department isn't in " + req.body.facultyName)
            }
            const dep = faculty.departments[depIndex]
            var courseFound = false
            var courseIndex = -1
            for (var i = 0; i < dep.courses.length; i++) {
                currCourse = dep.courses[i]
                if (req.body.courseName == currCourse) {
                    courseFound = true
                    courseIndex = i
                }
            }
            if (!courseFound)
                return res.send("this course is not in " + req.body.departmentName)



            if (req.body.newName != null && req.body.newName!="" ) {
                console.log("newName not null")
                //array form

                if(faculty.departments[depIndex].courses.includes(req.body.newName)){
                    return res.send("this course is already in "+ req.body.departmentName)
                }
                course.courseName = req.body.newName
                faculty.departments[depIndex].courses[courseIndex] = course.courseName
                faculty.markModified('departments.' + depIndex + '.courses');
                try {
                    await faculty.save()
                }
                catch (Err) {
                    console.log(Err)
                    res.send("error saving faculty")
                }

            }

            if (req.body.teachingSlotsNumber != null && req.body.teachingSlotsNumber !="") {
                console.log("teachingSlotsNumber not null")
                //string form
                course.teachingSlotsNumber = req.body.teachingSlotsNumber
            }

            if (req.body.newDepartment != null && req.body.newDepartment!="") {
                var newDepartmentFound = false
                var newDepIndex = -1
                for (var i = 0; i < faculty.departments.length; i++) {
                    currDep = faculty.departments[i]
                    if (req.body.newDepartment == currDep.name) {
                        newDepartmentFound = true
                        newDepIndex = i

                    }
                }
                if (!newDepartmentFound) {
                    return res.send("this department isn't in " + req.body.facultyName)
                }
                faculty.departments[newDepIndex].courses.push(course.courseName)
                faculty.departments[depIndex].courses.splice(courseIndex, 1)
                faculty.markModified('departments.' + newDepIndex);
                faculty.markModified('departments.' + depIndex);
                try {
                    await faculty.save()
                }
                catch (Err) {
                    console.log(Err)
                    res.send("error adding faculty")
                }

            }
            try {
                await course.save()
            }
            catch (Err) {
                console.log(Err)
                res.send("error adding faculty")
            }
            res.send("success")

        }
        res.send('faculty ' + req.body.facultyName + ' isnt there')


    })
router.route('/updateSalary')
    .post(async (req, res) => {
        console.log("updating salary")
        const staff = await staff_members_models.findOne({ memberID: req.body.id })

        if (staff) {
            if(req.body.salary!=null && req.body.salary!= "")
            staff.salary = req.body.salary

            if(req.body.monthSalary!=null && req.body.monthSalary!= ""){
                staff.monthSalary = req.body.monthSalary
                console.log("updating MM salary")


            }

            try {

                await staff.save()
            }
            catch (Err) {
                console.log(Err)
                res.send("error saving staff mem in update salary ")
            }
            return res.send(staff)
        }

        res.send('staff member with id ' + req.body.id + ' doesnt exist')


    })

router.route('/viewAttendance')
    .post(async (req, res) => {
        console.log("veiwing attendance")
        const staff = await staff_members_models.findOne({ memberID: req.body.id })

        if (staff) {


            return res.send(staff.attendance)
        }

        res.send('staff member with id ' + req.body.id + ' doesnt exist')


    })

router.route('/viewAttendanceRec')
    .post(async (req, res) => {
        console.log("veiwing attendance")
        const staff = await staff_members_models.findOne({ memberID: req.body.id })

        if (staff) {
            var arr = []
            arr.push(staff.attendance[staff.attendance.length - 1])

            return res.send(arr)
        }

        res.send('staff member with id ' + req.body.id + ' doesnt exist')


    })

async function deleteHOD(depName, facName) {

    const faculty = await faculty_model.findOne({ facultyName: facName })
    if (faculty) {
        var indexOfDep = -1
        var found = false
        for (var i = 0; i < faculty.departments.length; i++) {
            currDep = faculty.departments[i]
            if (depName == currDep.name) {
                found = true
                indexOfDep = i

            }
        }

        if (!found) {
            return false
        }

        const dep = faculty.departments[indexOfDep]
        dep.headOfDepartment = "unassigned"

        try {
            await faculty.save()
        }
        catch (Err) {
            console.log(Err)
            return false
        }
        return true
    }
    return false
}

async function deleteHOD(depName, facName) {

    const faculty = await faculty_model.findOne({ facultyName: facName })
    if (faculty) {
        var indexOfDep = -1
        var found = false
        for (var i = 0; i < faculty.departments.length; i++) {
            currDep = faculty.departments[i]
            if (depName == currDep.name) {
                found = true
                indexOfDep = i

            }
        }

        if (!found) {
            return false
        }

        const dep = faculty.departments[indexOfDep]
        dep.headOfDepartment = "unassigned"

        try {
            await faculty.save()
        }
        catch (Err) {
            console.log(Err)
            return false
        }
        return true
    }
    return false
}

async function deleteTeacher(memberID, courses) {


    for (var i = 0; i < courses.length; i++) {
        curCourse = courses[i]
        if (curCourse.instructors.includes(memberID)) {
            const course = await course_model.findOne({ courseName: curCourse })
            course.instructors.splice(curCourse.instructors.indexOf(memberID), 1)
            try {
                await course.save()
            } catch (error) {
                return false
            }

        }
        if (curCourse.teachingAssistants.includes(memberID)) {
            const course = await course_model.findOne({ courseName: curCourse })
            course.teachingAssistants.splice(curCourse.teachingAssistants.indexOf(memberID), 1)
            try {
                await course.save()
            } catch (Err) {
                console.log(Err)
                return false
            }
        }
    }

    return true
}
async function deleteCoordinator(memberID, courses) {


    for (var i = 0; i < courses.length; i++) {
        curCourse = courses[i]
        if (curCourse.courseCoordinator == memberID) {
            const course = await course_model.findOne({ courseName: curCourse })
            course.courseCoordinator = "unassigned"
            try {
                await course.save()
            } catch (error) {
                return false
            }

        }

    }

    return true
}

router.route('/deleteStaffMember')
    .post(async (req, res) => {
        const staff = await staff_members_models.findOne({ memberID: req.body.id })
        if (staff) {

            for (var i = 0; i < staff.role.length; i++) {
                var courses = staff.course
                var del = false
                var role = staff.role[i]
                switch (role) {
                    case "headOfdepartments":
                        del = deleteHOD(staff.department, staff.faculty)
                        if (!del) {
                            res.send("error deleting hod")
                        }

                        break;

                    case "teachingAssistants", "courseInstructors":
                        del = deleteTeacher(staff.memberID, courses)
                        if (!del) {
                            res.send("error deleting ci or ta")
                        }

                        break;
                    case "courseCoordinators":
                        del = deleteCoordinator(staff.memberID, courses)
                        if (!del) {
                            res.send("error deleting hod")
                        }

                        break;
                }



            }



            await staff_members_models.remove({ memberID: req.body.id }, function (err, result) {
                if (err) {
                    console.err(err);
                } else {
                    res.send("deleted Successfully");
                }
            });

        }

        res.send("no staff member with this id")









    })

router.route('/updateStaff')
    .post(async (req, res) => {
        console.log("updating staff")
        const staff = await staff_members_models.findOne({ memberID: req.body.id })
        if (staff) {

            if (req.body.name) {
                staff.name = req.body.name
            }
            if (req.body.gender && req.body.gender != "") {
                staff.gender = req.body.gender
            }
            if (req.body.email && req.body.email!="") {
                console.log("email")
                console.log(req.body.email)
                const found = await staff_members_models.findOne({ email: req.body.email })
                if (found) {
                    res.send("email taken, try with another email")
                }
                staff.email = req.body.email

            }
            if (req.body.password && req.body.password!="") {
                const salt = await bcrypt.genSalt(10)
                const newPassword = await bcrypt.hash(req.body.password, salt)
                staff.password = newPassword
            }
            if (req.body.dayOff && req.body.dayOff!="") {
                if (staff.staffType == "hr") {
                }
                staff.dayOff = req.body.dayOff
            }
            if (req.body.annualLeavesBalance && req.body.annualLeavesBalance!="") {
                console.log("annualLeavesBalance")
                console.log(req.body.annualLeavesBalance)

                staff.annualLeavesBalance = req.body.annualLeavesBalance
            }


            if (req.body.faculty != null && req.body.faculty != "" && staff.staffType == "academic") {

                const fac = await faculty_model.findOne({ facultyName: req.body.faculty })
                console.log(fac)
                if (fac) {
                    staff.faculty = fac.facultyName
                    console.log(fac)
                }
                else {
                    res.send("this is not a valid faculty, check faculty table and pick an existing one")
                }
            }

            if (req.body.department != null && req.body.department != "") {
                const fac = await faculty_model.findOne({ facultyName: staff.faculty })

                var found = false
                var currDep;
                console.log(fac.departments)
                for (var i = 0; i < fac.departments.length; i++) {
                    currDep = fac.departments[i]
                    if (req.body.department == currDep.name) {
                        found = true
                        break;
                    }
                }

                if (!found) {
                    res.send("department not found in this faculty")
                }
                staff.department = req.body.department
            }
            if (req.body.office != null && req.body.office != "") {
                console.log(staff.officeLocation)
                const oldoffice = await location_model.findOne({ name: staff.officeLocation })
                console.log(oldoffice)
                const newoffice = await location_model.findOne({ name: req.body.office })

                if (!newoffice || newoffice.type != "office") {
                    res.send('this is not a valid office')
                }
                if (newoffice.capacity <= newoffice.officeMembers) {
                    res.send('this office is already full')
                }
                if (staff.officeLocation != "unassigned") {
                    oldoffice.officeMembers = oldoffice.officeMembers - 1
                }
                newoffice.officeMembers = newoffice.officeMembers + 1

                try {
                    console.log('saving office')
                    await newoffice.save()
                    await oldoffice.save()


                } catch (Err) {
                    console.log(Err)
                    res.send("error saving office")
                }

                staff.officeLocation = req.body.office
            }

            try {

                await staff.save()
            }
            catch (Err) {
                console.log(Err)
                res.send("error saving staff member")
            }
            res.send("success")
        }

        res.send('staff member with id ' + req.body.id + ' doesnt exist')


    })


async function missingDays(staff, day1, day2, month1, month2, year1, firstEntry) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var flag = false
    var out = false
    console.log(newMonth)
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
        console.log("tany if")
        for (let i = 11; i < day1; i++) {
            var d = new Date(month1 + "/" + i + "/" + year1)
            if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                number = number + 1
            // console.log(number)
        }

    }
    else if (checkMonth(month1, day1) == false && day1 - 1 != day2 && month1 == month2 && !newMonth) {
        console.log("talet if")
        var missingDay = day2 + 1
        for (let j = missingDay; j < day1; j++) {
            var d = new Date(month1 + "/" + j + "/" + year1)
            if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                number = number + 1

        }
    }
    else if (checkMonth(month1, day1) == false && day1 - 1 != day2 && month1 == month2 && newMonth && day1 > 10) {
        console.log("rabe3 if")
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
            console.log("5ames if a")
            for (let j = 1; j < day1; j++) {
                var d = new Date(month1 + "/" + j + "/" + year1)
                if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                    // staff.missingDays.push(d) 
                    number = number + 1
            }
        }
        else {
            if(day1>11){
            console.log("5ames if b")
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
                console.log("5ames if c") 
                var missingDay = day2 + 1
                for (let j = missingDay; checkMonth(month2, j - 1) == false; j++) {
                    // console.log(checkMonth(month2, j - 1) )
                    // console.log(j)
                    var d = new Date(month2 + "/" + j + "/" + year1)
                    if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                        number = number + 1
    
                }
                //console.log(number)
    
                for (let j = 1; j < day1; j++) {
                    var d = new Date(month1 + "/" + j + "/" + year1)
                    if (days[d.getDay()] != staff.dayOff && days[d.getDay()] != "Friday" && await acceptedLeave(d, staff) == false)
                        number = number + 1
                }
                //console.log(number)
    
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




router.route('/addSignIn')
    .post(async (req, res) => {
        const hrID = req.user._id;
        const staff = await staff_members_models.findOne({ memberID: req.body.id })
        if (staff) {
            if (hrID == staff._id) {
                res.send("cannot add sign in for yourself")
            }

            const manualTime = new Date('August 19, 1975 23:15:00');
            manualTime.setMonth(req.body.month - 1)
            manualTime.setDate(req.body.day)
            manualTime.setFullYear(req.body.year)
            manualTime.setHours(req.body.hour + 2)
            manualTime.setMinutes(req.body.minute)

            var currentTime = new newAttendance(
                { "signInTime": manualTime }
            )
            try {
                await currentTime.save()
            }
            catch (Err) {
                console.log(Err)
            }
            var firstEntry = false

            var day1 = currentTime.signInTime.getDate()
            console.log(day1)
            var month1 = currentTime.signInTime.getMonth() + 1
            console.log(month1)

            const year1 = currentTime.signInTime.getFullYear()
            if (staff.attendance.length == 0) {
                var month2 = 0
                var day2 = 11
                await staff.attendance.push(currentTime)
                firstEntry = true
               // console.log("heloooo")
                try {

                    staff.markModified('attendance.' + staff.attendance.length - 1);
                    await staff.save()
                }
                catch (Err) {
                    res.send("error saving sign in")
                    console.log(Err)
                }
            } else {
                month2 = staff.attendance[staff.attendance.length - 1].signInTime.getMonth() + 1
                day2 = staff.attendance[staff.attendance.length - 1].signInTime.getDate()
                if (staff.attendance[staff.attendance.length - 1].signOutTime != null) {
                    await staff.attendance.push(currentTime)
                    staff.markModified('attendance.' + staff.attendance.length - 1);
                    await staff.save()
                    //res.send(staff)
                }
                else res.send("you cannot sign in without signing out first")
            }
            //const m=staff.attendance.findOne({signInTime.getMonth:2})
            if (month1 != month2){
                newMonth = true
              
            }
           // if(day1!=day2)
            missingDays(staff, day1, day2, month1, month2, year1, firstEntry)
            // staff.save()
            res.send("success")
        }

    })
    //salary
   async function calcSalary(staff){
       //console.log("hii")
        const mDays= staff.missingDays[staff.missingDays.length-1]
       // console.log(staff.salary-(staff.salary/60)*mDays)
        staff.monthSalary=staff.salary-(staff.salary/60)*mDays
        const mHours=staff.missingHours[staff.missingHours.length-1]
        if(mHours>=3){
       const hours=Math.floor(mHours)
       //console.log("hhh"+hours)
       //console.log("1"+staff.monthSalary)
      // console.log("hours"+staff.monthSalary-(staff.salary/180)*hours)
       staff.monthSalary=staff.monthSalary-(staff.salary/180)*hours
       //console.log("2"+staff.monthSalary)
       const mins=Math.floor((mHours-hours)*60)
       //console.log("mmm"+mins)
       //console.log("min"+staff.monthSalary-(staff.salary/180*60)*mins)
       staff.monthSalary=staff.monthSalary-(staff.salary/10800)*mins
       //console.log("3"+staff.monthSalary)
        }
       if (staff.monthSalary<0)
       staff.monthSalary=0
     }
//helper for missing days
function checkMonth(month, day) {
    switch (month) {
        case 1:
            if (day == 31)
                return true
            else
                return false
            break;
        case 3:
            if (day == 31)
                return true
            else
                return false
            break;
        case 5:
            if (day == 31)
                return true
            else
                return false
            break;
        case 7:
            if (day == 31)
                return true
            else
                return false
            break;
        case 8:
            if (day == 31)
                return true
            else
                return false
            break;
        case 10:
            if (day == 31)
                return true
            else
                return false
            break;
        case 12:
            if (day == 31)
                return true
            else
                return false
            break;
        case 2:
            if (day == 29)
                return true
            else
                return false
            break;
        case 4:
            if (day == 30)
                return true
            else
                return false
            break;
        case 6:
            if (day == 30)
                return true
            else
                return false
            break;
        case 9:
            if (day == 30)
                return true
            else
                return false
            break;
        case 11:
            if (day == 30)
                return true
            else
                return false
            break;
        default:
            return false
    }
}

async function getDates(startDate, endDate) {
    var dates = [],
        currentDate = startDate,
        addDays = function (days) {
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

async function acceptedLeave(date, staff) {
    const leaveArray = staff.leaves
    var f = false
    for (let i = 0; i < leaveArray.length; i++) {
        const leave = await leaves_model.findOne({ _id: leaveArray[i] })
        if (leave) {
            if (leave.start == date && leave.accepted == true && leave.end != null) {
                var array = getDates(leave.start, leave.end)
                for (let i = 0; i < array.length; i++) {
                    leave.leaveDates.push(array[i])
                }
                leave.markModified("leaveDates")
                await leave.save()
                console.log("1")
                f = true

            }
            else if (leave.start = date && leave.accepted == true && leave.end == null) {
                console.log("2")
                f = true

            }
            else if (leave.leaveDates.length != 0 && leave.leaveDates.includes(date)) {
                console.log("3")
                f = true

            }
            else {
                console.log("4")
                f = false
            }
        }
        //console.log("ana tala3t" + f)

    }
    return f
}



router.route('/addSignOut')
    .post(async (req, res,) => {
        const hrID = req.user._id;
        const staff = await staff_members_models.findOne({ memberID: req.body.id })
        if (staff) {
            if (hrID == staff._id) {
                res.send("cannot add sign out record for yourself")
            }
            if (staff.attendance[staff.attendance.length - 1].signOutTime == null) {

                const manualTime = new Date('August 19, 1975 23:15:00');
                manualTime.setMonth(req.body.month - 1)
                manualTime.setDate(req.body.day)
                manualTime.setFullYear(req.body.year)
                manualTime.setHours(req.body.hour + 2)
                manualTime.setMinutes(req.body.minute)

                if (staff.attendance[staff.attendance.length - 1].signOutTime == null) {
                    var currentTime2 = new newAttendance(
                        {
                            "signInTime": staff.attendance[staff.attendance.length - 1].signInTime,
                            "signOutTime": manualTime
                        }
                    )
                    try {
                        await currentTime2.save()
                    }
                    catch (Err) {
                        console.log(Err)
                    }

                    const index = staff.attendance.length - 1
                    staff.attendance.splice(index, 1)
                    staff.attendance.push(currentTime2)

                    try {
                        staff.markModified('attendance.' + index);
                        await staff.save()
                    }
                    catch (Err) {
                        console.log(Err)
                        res.send("error saving attendance record")
                    }

                    var signIn = currentTime2.signInTime
                    var signOut = currentTime2.signOutTime
                    var milliseconds = Math.abs(signOut.getTime() - signIn.getTime());
                    var hours = milliseconds / 36e5;
                    var flag = false
                    var day1 = currentTime2.signInTime.getDate()
                    var month1 = currentTime2.signInTime.getMonth() + 1
                    var month2 = 0
                    var day2 = 0
                    if (staff.attendance.length >= 2) {

                        month2 = staff.attendance[staff.attendance.length - 2].signInTime.getMonth() + 1
                        day2 = staff.attendance[staff.attendance.length - 2].signInTime.getDate()
                    }
                    if (month1 != month2)
                        newMonth2 = true
                    if ((newMonth2 && day1 > 10) || staff.attendance.length == 0) {

                        flag = true
                    }
                    if (hours > 8.24 && ( staff.missingHours[staff.missingHours.length-1]==0||newMonth2==false)) {
                        //console.log("heloo")
                        extraHours(staff, hours, flag, day1,day2)
                        

                    }
                    else {

                        missingHours(staff, hours, flag, day1,day2)

                    }

                    res.send("success")
                }
            }
            else res.send("you cannot sign out without signing in first")
        }
        else

            res.send("staff member with this id doesnt exist")
    })

//missing hours
function missingHours(staff, hours, flag, day1, day2) {
    if (flag) {
        staff.missingHours.push(8.4 - hours)
        staff.extraHours.push(0)
        newMonth2 = false

    }
    else {
        if (day1 != day2) {
            var x = staff.missingHours[staff.missingHours.length - 1] + (8.4 - hours)
            if (x < 0) {
                extraHours(staff, math.abs(x) + 8.4, flag, day1, day2)
                x = 0
            }
        }
        else {

            var x = staff.missingHours[staff.missingHours.length - 1] - hours
            if (x < 0) {
                extraHours(staff, math.abs(x) + 8.4, flag, day1, day2)
                x = 0
            }
        }
        // console.log("hhhh "+x)
        staff.missingHours[staff.missingHours.length - 1] = x

    }
    staff.markModified("missingHours")
    staff.save()
}
//extra hours
function extraHours(staff, hours, flag, day1, day2) {
    if (flag) {
        staff.extraHours.push(hours - 8.4)
        staff.missingHours.push(0)
        newMonth2 = false

    }
    else {
        if (day1 != day2)
            var x = staff.extraHours[staff.extraHours.length - 1] + (hours - 8.4)
        else {
            var x = hours - staff.extraHours[staff.extraHours.length - 1]
        }
        staff.extraHours[staff.extraHours.length - 1] = x

    }
    staff.markModified("ExtraHours")
    staff.save()
}


router.route('/viewMissingDays')
    .get(async (req, res) => {
        const staff = await staff_members_models.find()
        var arr;
        var resArr = []

        for (var k = 0; k < staff.length; k++) {

            arr = staff[k].missingDays
            if (arr.length != 0 && arr[arr.length - 1] != 0) {
                //var memID = staff[k].memberID
                resArr.push({ "staffMemberID": staff[k].memberID , "missingDays": arr[arr.length - 1] })
            }
        }

        console.log("here")

        res.send(resArr)

    })

router.route('/viewMissingHours')
    .get(async (req, res) => {
        const staff = await staff_members_models.find()
        var arr;
        var resArr = []

        for (var k = 0; k < staff.length; k++) {

            arr = staff[k].missingHours
            if (arr.length != 0 && arr[arr.length - 1] != 0) {
                //var memID = staff[k].memberID
                resArr.push({ "staffMemberID": staff[k].memberID ,  "missingHours": arr[arr.length - 1]  })
            }
        }

        console.log("here")

        res.send(resArr)

    })
//////////////



module.exports = router