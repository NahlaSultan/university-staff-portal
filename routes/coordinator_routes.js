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
router.route('/addSlot')
    .post(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            // if (staff.role != "courseCoordinators") {
            //     res.send("Must be a coordinator to add a slot")
            // }
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
                if (req.body.type == null || req.body.time == null || req.body.courseTaught == null || req.body.location == null || req.body.day == null)
                    res.send("missing inputs")
                const findTime = await slot_model.findOne({ time: req.body.time })
                const findLocation = await slot_model.findOne({ location: req.body.location })
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
                            if (findTime && findLocation) {
                                res.send("overlapping slots")
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
                                    const course = await course_model.findOne({ courseName: req.body.courseTaught })
                                    if (course) {
                                        await course.teachingSlots.push(slot.numberID)
                                        await course.save()
                                        res.send("Successfully added")
                                    }
                                }
                                catch (Err) {
                                    console.log(Err)
                                    res.send("Mongo error")
                                }


                            }
                        }
                    }
                }
            }
            res.send("This course does not exist")
        }
    })


router.route('/deleteSlot')
    .post(async (req, res) => {
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
                    await slot_model.remove(slotToDelete, function (err, result) {
                        if (err) {
                            console.err(err);
                        }
                    });
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
                    return res.send("Successfully deleted")
                }
            }
            return res.send("Slot does not exist")
        }
    })
//input that should be present is the slotID that needs to be updated
router.route('/updateSlot')
    .post(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        console.log("The coordinator is" + staff)
        if (staff) {
            if (req.body.slotID == null) {
                res.send("You should enter the slot ID you wish to update")
            }
            else {

                const bodyinput = req.body.slotID
                console.log("bodyInput is" + bodyinput)
                const slotToUpdate = await slot_model.findOne({ numberID: bodyinput })

                if (slotToUpdate) {
                    console.log("Slot to update is" + slotToUpdate)
                    var flag = "false"
                    for (let index = 0; index < staff.coordinatorCourse.length; index++) {
                        if (staff.coordinatorCourse[index] == slotToUpdate.courseTaught) {
                            flag = "true"
                        }
                    }
                    if (flag == "false") {
                        res.send("You are not a coordinator on this course")
                    }
                    else {
                        if (req.body.location != null) {
                            const newLocation = req.body.location
                            const office = await location_model.findOne({ name: newLocation })
                            if (!office) {
                                return res.send("Invalid location")
                            }
                            slotToUpdate.location = newLocation
                            try {
                                slotToUpdate.save()
                            }
                            catch (Err) {
                                console.log(Err)
                                res.send("Mongoose problem while updating location")
                            }
                        }
                        if (req.body.type != null) {
                            const newType = req.body.type
                            if (newType != "lab" && newType != "tutorial" && newType != "lecture") {
                                return res.send("Invalid type;should be a lab,lecture or tutorial")
                            }
                            slotToUpdate.type = newType
                            try {
                                slotToUpdate.save()
                            }
                            catch (Err) {
                                console.log(Err)
                                res.send("Mongoose problem while updating type")
                            }
                        }
                        if (req.body.time != null) {
                            const newTime = req.body.time
                            slotToUpdate.time = newTime
                            try {
                                slotToUpdate.save()
                            }
                            catch (Err) {
                                console.log(Err)
                                res.send("Mongoose problem while updating time")
                            }
                        }
                        if (req.body.day != null) {
                            const dayName = req.body.day
                            if (dayName.toLowerCase() != "saturday" && dayName.toLowerCase() != "sunday" && dayName.toLowerCase() != "monday" && dayName.toLowerCase() != "tuesday" && dayName.toLowerCase() != "wednesday" && dayName.toLowerCase() != "thursday") {
                                return res.send("not a valid day name")
                            }
                            else {
                                slotToUpdate.day = dayName
                                try {
                                    slotToUpdate.save()
                                }
                                catch (Err) {
                                    console.log(Err)
                                    res.send("Mongoose problem while updating time")
                                }
                            }
                        }
                        if (req.body.courseTaught != null) {

                            const newcourseTaught = req.body.courseTaught
                            slotToUpdate.courseTaught = newcourseTaught
                            try {
                                slotToUpdate.save()
                            }
                            catch (Err) {
                                console.log(Err)
                                res.send("Mongoose problem while updating course taught")
                            }
                        }
                        res.send("Successfully updated")
                    }
                }
            }
        }
    })
router.route('/viewSlotLinkingRequest')
    .get(async (req, res) => {
        var sentArray = [];
        var temp;
        var tempDate;
        var requstTemp;
        sentArray[0] = "Slot linking requests are:"
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("In staff")
            var lastIndex = 1;
            var startIndex = 0
            for (let index = 0; index < staff.coordinatorLinkingRequests.length; index++) {
                console.log("I entered here")
                temp = staff.coordinatorLinkingRequests[index]
                requstTemp = await newSlotLinking.findOne({ _id: temp })
                if (requstTemp) {
                    sentArray[lastIndex] = requstTemp
                }
                lastIndex++
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
                            return res.send("already acceoted")
                        }
                        else {
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
                            slotCurrent.requstTemp.senderId
                            try {
                                slotCurrent.save()
                            }
                            catch (Err) {
                                return res.send("Mongoose error")
                            }
                            console.log("current slotId", slotCurrent)
                            const courseName = slotCurrent.courseTaught
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
                            }
                            catch (Err) {
                                return res.send("Mongoose error")
                            }
                            const dayName = slotCurrent.day
                            const senderSchedule = await newWorkingSchedule.findOne({ staffID: requstTemp.senderId })
                            if (dayName.toLowerCase() == "saturday") {
                                senderSchedule.Saturday.push(slotNumberId)
                            }
                            if (dayName.toLowerCase() == "sunday") {
                                senderSchedule.Sunday.push(slotNumberId)
                            }
                            if (dayName.toLowerCase() == "monday") {
                                senderSchedule.Monday.push(slotNumberId)
                            }
                            if (dayName.toLowerCase() == "tuesday") {
                                senderSchedule.Tuesday.push(slotNumberId)
                            }
                            if (dayName.toLowerCase() == "wednesday") {
                                senderSchedule.Wednesday.push(slotNumberId)
                            }
                            if (dayName.toLowerCase() == "thursday") {
                                senderSchedule.Thursday.push(slotNumberId)
                            }
                            try {
                                senderSchedule.save()
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
module.exports = router