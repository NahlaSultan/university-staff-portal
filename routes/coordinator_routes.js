const staff_members_models = require('../models/staff_member_models').model
const staff_member_routes = require('./staff_member_routes')
const slot_model = require('../models/slot_model').model
const course_model = require('../models/course_model').model
const newSlotLinking = require('../models/slotLinking_request').model
const newWorkingSchedule = require('../models/workingSchedule_model').model
const newDayModel = require('../models/day_model').model
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { request } = require('express')
const { Query } = require('mongoose')
const { staffSchema } = require('../models/staff_member_models')
const e = require('express')
const location_model = require('../models/location_model').model
//inputs are type,time,courseTaught,location and date and it is obligatory to enter them all
router.route('/viewCourseCoordinators')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        res.send(staff.coordinatorCourse)

    })
router.route('/addSlot')
    .post(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        const course = await course_model.findOne({ courseName: req.body.courseTaught })
        if (staff && course) {
            // if (staff.role != "courseCoordinators") {
            //     res.send("Must be a coordinator to add a slot")
            // }
            if (course.teachingSlots.length == course.teachingSlotsNumber) {
                return res.send("Maximum number of slots added to this course,cannot add a new one")
            }
            else {
                var isfound = "false"
                for (let index = 0; index < staff.coordinatorCourse.length; index++) {
                    if (staff.coordinatorCourse[index] == req.body.courseTaught) {
                        isfound = "true"
                    }
                }
                if (isfound == "false") {
                    console.log("wrong course")
                    return res.send("You are not the coordinator of this course")
                }
                else {
                    if (req.body.type == null || req.body.time == null || req.body.courseTaught == null || req.body.location == null || req.body.day == null) {
                        return res.send("missing inputs")
                    }
                    else {
                        const office = await location_model.findOne({ name: req.body.location })

                        if (!office) {
                            return res.send("Invalid location")
                        }
                        else {
                            const dayName = req.body.day
                            if (dayName.toLowerCase() != "saturday" && dayName.toLowerCase() != "sunday" && dayName.toLowerCase() != "monday" && dayName.toLowerCase() != "tuesday" && dayName.toLowerCase() != "wednesday" && dayName.toLowerCase() != "thursday") {
                                return res.send("not a valid day name")
                            }
                            else {
                                const timing = req.body.time
                                if ((timing.toLowerCase()).trim() != "first slot" && (timing.toLowerCase()).trim() != "second slot" && (timing.toLowerCase()).trim() != "third slot" && (timing.toLowerCase()).trim() != "fourth slot" && (timing.toLowerCase()).trim() != "fifth slot") {
                                    return res.send("not a valid timing")
                                }
                                else {
                                    var DayToAdd;
                                    var timeToAdd;
                                    if (dayName.toLowerCase() == "saturday") {
                                        DayToAdd = "Saturday"
                                    }
                                    if (dayName.toLowerCase() == "sunday") {
                                        DayToAdd = "Sunday"
                                    }
                                    if (dayName.toLowerCase() == "monday") {
                                        DayToAdd = "Monday"
                                    }
                                    if (dayName.toLowerCase() == "tuesday") {
                                        DayToAdd = "Tuesday"
                                    }
                                    if (dayName.toLowerCase() == "wednesday") {
                                        DayToAdd = "Wednesday"
                                    }
                                    if (dayName.toLowerCase() == "thursday") {
                                        DayToAdd = "Thursday"
                                    }
                                    if ((timing.toLowerCase()).trim() == "first slot")
                                        timeToAdd = "First Slot"

                                    if ((timing.toLowerCase()).trim() == "second slot")
                                        timeToAdd = "Second Slot"

                                    if ((timing.toLowerCase()).trim() == "third slot")
                                        timeToAdd = "Third Slot"

                                    if ((timing.toLowerCase()).trim() == "fourth slot")
                                        timeToAdd = "Fourth Slot"

                                    if ((timing.toLowerCase()).trim() == "fifth slot")
                                        timeToAdd = "Fifth Slot"
                                    const findTimeOverlap = await slot_model.findOne({ time: timeToAdd, location: req.body.location, day: DayToAdd })
                                    console.log("To check for overlapping" + findTimeOverlap)
                                    if (findTimeOverlap) {
                                        return res.send("Overlapping slots")
                                    }
                                    else {
                                        console.log("started adding new values")
                                        var slot = new slot_model(
                                            {
                                                type: req.body.type,
                                                time: timeToAdd,
                                                courseTaught: req.body.courseTaught,
                                                location: req.body.location,
                                                courseCoordinatorID: staff.memberID,
                                                day: DayToAdd
                                            }
                                        )

                                        try {
                                            // await slot.save()
                                            // const slotId="-" + slot.numberID
                                            // staff.slotID=slotID
                                            await slot.save()

                                        }

                                        catch (Err) {
                                            console.log(Err)
                                            res.send("Mongo error")
                                        }
                                        const course = await course_model.findOne({ courseName: req.body.courseTaught })
                                        if (course) {
                                            await course.teachingSlots.push(slot.numberID)
                                            try {
                                                await course.save()
                                            }
                                            catch (Err) {
                                                return res.send("Mongo error")
                                            }
                                        }
                                        return res.send("Added successfully")


                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            return res.send("Something went wrong")
        }
    })
router.route('/viewCourseCoordinator')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            const courseNames = staff.coordinatorCourse
            res.send(courseNames)
        }
        else

            res.send("Something wrong happened")

    }
    )

router.route('/deleteSlot')
    .post(async (req, res) => {
        console.log("Deleting....")
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        console.log("The coordinator is" + staff)
        if (staff) {
            const bodyinput = req.body.numberID
            console.log("bodyInput is" + bodyinput)
            const slotToDelete = await slot_model.findOne({ numberID: bodyinput })

            if (slotToDelete) {
                console.log("Slot to delete is" + slotToDelete)
                var isfound = "false"
                for (let index = 0; index < staff.coordinatorCourse.length; index++) {
                    if (staff.coordinatorCourse[index] == slotToDelete.courseTaught) {
                        isfound = "true"
                    }
                }
                if (isfound == "false") {
                    res.send("You are not a coordinator on this course")
                }
                else {
                    const coursemodify = await course_model.findOne({ courseName: slotToDelete.courseTaught })
                    const SlotArray = await coursemodify.teachingSlots
                    for (let index = 0; index < coursemodify.teachingSlots.length; index++) {
                        if (coursemodify.teachingSlots[index] == req.body.numberID) {
                            coursemodify.teachingSlots.splice(index, 1)
                            console.log("I entered")
                        }
                    }
                    try {
                        coursemodify.save()
                    }
                    catch (Err) {
                        console, log(Err)
                        res.send("Mongo error")
                    }
                    const staffID = slotToDelete.academicMember
                    const staffTeahcing = await staff_members_models.findOne({ memberID: staffID })
                    if (staffTeahcing) {
                        console.log("Staff teaching this slot is:" + staffTeahcing)
                        for (let i = 0; i < staffTeahcing.slotsAssigned.length; i++) {
                            if (staffTeahcing.slotsAssigned[i] == slotToDelete.numberID) {
                                console.log("I entered here when the slot was " + staffTeahcing.slotAssigned[i])
                                staffTeahcing.slotsAssigned.splice(i, 1)
                                break
                            }
                        }
                    }
                    try {
                        if (staffTeahcing) {
                            staffTeahcing.save()
                        }
                        slotToDelete.delete()
                    }
                    catch (Err) {
                        return res.send("Mongo error")
                    }
                    return res.send("Successfully deleted")
                }
            }
            return res.send("Slot does not exist")
        }
        return res.send("Something went wrong")
    })
//input that should be present is the slotID that needs to be updated
router.route('/updateSlot')
    .post(async (req, res) => {

        if (req.body.slotID == null) {
            res.send("You should enter the slot ID you wish to update")
        }
        else {

            const bodyinput = req.body.slotID
            const slotToUpdate = await slot_model.findOne({ numberID: bodyinput })

            if (slotToUpdate) {
                if (req.body.location != null && req.body.location != "") {
                    console.log("OOPS")
                    const newLocation = req.body.location
                    const office = await location_model.findOne({ name: newLocation })
                    if (!office) {
                        return res.send("Invalid location")
                    }
                    slotToUpdate.location = newLocation

                }
                if (req.body.type != null && req.body.type != "") {
                    const newType = req.body.type
                    if (newType != "lab" && newType != "tutorial" && newType != "lecture") {
                        return res.send("Invalid type;should be a lab,lecture or tutorial")
                    }
                    slotToUpdate.type = newType

                }
                if (req.body.time != null && req.body.time != "") {
                    const newTime = req.body.time
                    slotToUpdate.time = newTime

                }
                if (req.body.day != null && req.body.day != "") {
                    const dayName = req.body.day
                    if (dayName.toLowerCase() != "saturday" && dayName.toLowerCase() != "sunday" && dayName.toLowerCase() != "monday" && dayName.toLowerCase() != "tuesday" && dayName.toLowerCase() != "wednesday" && dayName.toLowerCase() != "thursday") {
                        return res.send("not a valid day name")
                    }
                    else {
                        slotToUpdate.day = dayName

                    }
                }
                if (req.body.courseTaught != null && req.body.courseTaught != "") {

                    const newcourseTaught = req.body.courseTaught
                    slotToUpdate.courseTaught = newcourseTaught

                }
                try {
                    slotToUpdate.save()
                }
                catch (Err) {
                    console.log(Err)
                    res.send("Mongoose problem while updating location")
                }
                res.send("Successfully updated")

            }
            else {
                res.send('Problem')
            }
        }

    })
router.route('/viewSlotLinkingRequest')
    .get(async (req, res) => {
        var sentArray = [];
        var temp;
        var tempDate;
        var requstTemp;
        // sentArray[0] = "Slot linking requests are:"
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("In staff")
            var lastIndex = 0;
            var startIndex = 0
            for (let index = 0; index < staff.coordinatorLinkingRequests.length; index++) {
                console.log("I entered here")
                temp = staff.coordinatorLinkingRequests[index]
                requstTemp = await newSlotLinking.findOne({ _id: temp })
                if (requstTemp) {
                    sentArray[lastIndex] = requstTemp
                    lastIndex++
                }

            }

            res.send(sentArray)

        }
        res.send("Invalid staff member")

    })
//inputs the requestID that he wishes to reject
router.route('/rejectSlotLinkingRequest')
    .post(async (req, res) => {
        console.log("I entered")
        const slotID = req.body.requestID
        const senderId = req.user._id;
        var requstTemp;
        const staff = await staff_members_models.findOne({ _id: senderId })
        if (staff) {
            console.log("in staff")
            for (let index = 0; index < staff.coordinatorLinkingRequests.length; index++) {
                if (staff.coordinatorLinkingRequests[index] == slotID) {
                    console.log("found the request")
                    requstTemp = await newSlotLinking.findOne({ _id: slotID })
                    if (requstTemp) {
                        if (requstTemp.pending == false && requstTemp.accepted == false) {
                            return res.send("already rejected")
                        }
                        else {
                            requstTemp.pending = false
                            requstTemp.accepted = false
                            requstTemp.notified = true
                            try {
                                requstTemp.save()
                            }
                            catch (Err) {
                                return res.send("Mongoose error")
                            }

                            return res.send("Successfully rejected")
                        }
                    }
                    else {
                        return res.send("This request is not found")
                    }
                }
            }
        }
        else {
            return res.send("Something wrong has occured")
        }

    })
//inputs the requestID that he wishes to accept
router.route('/acceptSlotLinkingRequest')
    .post(async (req, res) => {
        console.log("I entered")
        const slotID = req.body.requestID
        const senderId = req.user._id;
        var requstTemp;
        const staff = await staff_members_models.findOne({ _id: senderId })
        if (staff) {
            console.log("in staff")
            for (let index = 0; index < staff.coordinatorLinkingRequests.length; index++) {
                if (staff.coordinatorLinkingRequests[index] == slotID) {
                    console.log("found the request")
                    requstTemp = await newSlotLinking.findOne({ _id: slotID })
                    if (requstTemp) {
                        if (requstTemp.pending == false && requstTemp.accepted == true) {
                            return res.send("already accepted")
                        }
                        else {
                            const slot = await slot_model.findOne({ numberID: requstTemp.slotID })
                            console.log(slot)
                            requstTemp.pending = false
                            requstTemp.accepted = true
                            requstTemp.notified = true
                            try {
                                requstTemp.save()
                            }
                            catch (Err) {
                                return res.send("Mongoose error")
                            }

                            const senderStaff = await staff_members_models.findOne({ memberID: requstTemp.senderId })
                            const slotNumberId = requstTemp.slotID
                            const slotCurrent = await slot_model.findOne({ numberID: requstTemp.slotID })
                            slotCurrent.assignedFlag = true
                            slotCurrent.academicMember = senderStaff.memberID

                            // slotCurrent.requstTemp.senderId
                            try {
                                slotCurrent.save()
                            }
                            catch (Err) {
                                return res.send("Mongoose error")
                            }

                            console.log("current slotId", slotCurrent)
                            const courseName = slotCurrent.courseTaught
                            const course = await course_model.findOne({ courseName: courseName })
                            if (senderStaff.role.includes("teachingAssistants")) {
                                console.log("I entered here")
                                if ((!course.teachingAssistants.includes(senderStaff.memberID))) {
                                    course.teachingAssistants.push(senderStaff.memberID)
                                }
                            }
                            if (senderStaff.role.includes("courseInstructors")) {
                                if ((!course.instructors.includes(senderStaff.memberID))) {
                                    course.instructors.push(senderStaff.memberID)
                                }
                            }

                            var flag = "false"
                            for (let index = 0; index < senderStaff.course.length; index++) {
                                if (senderStaff.course[index] == courseName)
                                    flag = "true"
                            }
                            if (flag == "false") {
                                senderStaff.course.push(courseName)
                            }
                            senderStaff.slotsAssigned.push(slotNumberId)

                            try {
                                senderStaff.save()
                                course.save()
                            }
                            catch (Err) {
                                return res.send("Mongoose error")
                            }




                            return res.send("Successfully accepted")
                        }

                    }
                    else {
                        return res.send("This request is not found")
                    }
                }
            }
        }
        else {
            return res.send("Something wrong has occured")
        }
        //                     res.send("hi")
        //                 }
        //             }
        //         }
        //     }
        // }
    })

router.route('/viewSlots')
    .get(async (req, res) => {
        var arr = []
        const senderId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: senderId })
        if (staff) {
            let course;
            let slot;
            const courses = staff.coordinatorCourse

            for (let i = 0; i < courses.length; i++) {

                course = await course_model.findOne({ courseName: courses[i] })

                for (let j = 0; j < course.teachingSlots.length; j++) {
                    slot = await slot_model.findOne({ numberID: course.teachingSlots[j] })
                    arr.push(slot)

                }

            }
            res.send(arr)
        }
        else {
            res.send("Something wrong happened")
        }
    })




module.exports = router