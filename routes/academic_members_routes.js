const staff_members_models = require('../models/staff_member_models').model
const staff_member_routes = require('./staff_member_routes')
const newReplacement = require('../models/replacement_requests').model
const newSlotlinking = require('../models/slotLinking_request').model
const newWorkingSchedule = require('../models/workingSchedule_model').model
const slot_model = require('../models/slot_model').model
const dayOffRequest_model = require('../models/dayOffRequest').model
const department_model = require('../models/department_model').model
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/viewSchedule')
    //do not forget to view the replacement slots(if it was accepted,sender will be notified that the slot on the specific date will be changed)and vice versa
    .get(async (req, res) => {
        var array = []
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            //mafrood redirect
            const schedule = await newWorkingSchedule.findOne({ staffID: staff.memberID })
            var lastIndex = 0;
            var currentSlot;
            array[lastIndex] = "You weekly schedule:"
            lastIndex++;
            var firstDay = schedule.Saturday
            array[lastIndex++] = "Saturday:"
            for (let i = 0; i < firstDay.length; i++) {
                currentSlot = await slot_model.findOne({ numberID: firstDay[i] })
                if (currentSlot) {
                    array[lastIndex++] = currentSlot
                }
            }
            firstDay = schedule.Sunday
            array[lastIndex++] = "Sunday:"
            for (let i = 0; i < firstDay.length; i++) {
                currentSlot = await slot_model.findOne({ numberID: firstDay[i] })
                if (currentSlot) {
                    array[lastIndex++] = currentSlot
                }
            }
            firstDay = schedule.Monday
            array[lastIndex++] = "Monday:"
            for (let i = 0; i < firstDay.length; i++) {
                currentSlot = await slot_model.findOne({ numberID: firstDay[i] })
                if (currentSlot) {
                    array[lastIndex++] = currentSlot
                }
            }
            firstDay = schedule.Tuesday
            array[lastIndex++] = "Tuesday:"
            for (let i = 0; i < firstDay.length; i++) {
                currentSlot = await slot_model.findOne({ numberID: firstDay[i] })
                if (currentSlot) {
                    array[lastIndex++] = currentSlot
                }
            }
            firstDay = schedule.Wednesday
            array[lastIndex++] = "Wednesday:"
            for (let i = 0; i < firstDay.length; i++) {
                currentSlot = await slot_model.findOne({ numberID: firstDay[i] })
                if (currentSlot) {
                    array[lastIndex++] = currentSlot
                }
            }
            firstDay = schedule.Thursday
            array[lastIndex++] = "Thursday:"
            for (let i = 0; i < firstDay.length; i++) {
                currentSlot = await slot_model.findOne({ numberID: firstDay[i] })
                if (currentSlot) {
                    array[lastIndex++] = currentSlot
                }
            }
            // array[lastIndex] = schedule
            // lastIndex++
            var slotReplac;
            var slotIDReplac;
            var dateToReplace;
            var slotRequest;
            array[lastIndex++] = "Slots to replace:"
            for (let index = 0; index < staff.slotsToReplace.length; index++) {
                slotRequest = await newReplacement.findOne({ _id: staff.slotToReplace[index] })
                dateToReplace = slotRequest.date
                array[lastIndex] = dateToReplace
                lastIndex++;
                slotIDReplac = staff.slotsToReplace[index].slot;
                slotReplac = await slot_model.findOne({ numberID: slotIDReplac })
                array[lastIndex] = slotReplac
                lastIndex++;
            }
            array[lastIndex++] = "Slots replaced for you:"
            for (let index = 0; index < staff.slotsReplaced.length; index++) {
                slotRequest = await newReplacement.findOne({ _id: staff.slotsReplaced[index] })
                console.log(slotRequest)
                if (slotRequest) {
                    dateToReplace = slotRequest.date
                    array[lastIndex] = dateToReplace
                    lastIndex++;
                    slotIDReplac = slotRequest.slot;
                    slotReplac = await slot_model.findOne({ numberID: slotIDReplac })
                    array[lastIndex] = slotReplac
                    lastIndex++;
                }
            }


        }
        res.send(array)
    })
//inputs : slot(the slotID I want someone to replace),receiverId(the id of the staff member I want to send it to)
//,dateReplace:the day on which I need this replacement
router.route('/sendReplacementRequest')
    .post(async (req, res) => {
        //I am sending a request to someone ,i Will create a new request object and add it to the replacementRequest table of this user
        const senderId = req.user._id;
        const receiver = req.body.receiverId;
        const slotReplacement = req.body.slot;
        const slotDate = req.body.dateReplace;
        if (receiver == null || slotReplacement == null || slotDate == null) {
            return res.send("Incomplete inputs")
        }
        const staff = await staff_members_models.findOne({ _id: senderId })
        const receiverStaff = await staff_members_models.findOne({ memberID: receiver })
        console.log(receiverStaff)
        console.log(staff)
        var flag = "false"
        for (let index = 0; index < staff.slotsAssigned.length; index++) {
            if (staff.slotsAssigned[index] == req.body.slot)
                flag = "true"
        }
        if (flag == "false")
            return res.send("This slot is not assigned to you")
        else {
            if (staff && receiverStaff) {

                var request = new newReplacement(
                    {
                        pending: true,
                        accepted: false,
                        slot: slotReplacement,
                        receiverId: receiver,
                        senderId: staff.memberID,
                        date: slotDate
                    }
                )
                try {
                    await request.save()
                }
                catch (Err) {
                    console.log(Err)
                }
                await staff.requestReplacementSent.push(request._id)
                await staff.save()
                await receiverStaff.requestReplacmentReceived.push(request._id)
                await receiverStaff.save()
                return res.send("Successfully sent")


            }
            res.send("Invalid inputs")
            //add it to the table of requests in staff member

        }
    }
    )
//Inputs:slotId(slot I want to be assigned to)
router.route('/sendSlotLinkingRequest')
    .post(async (req, res) => {
        //I am sending a request to someone ,i Will create a new request object and add it to the replacementRequest table of this user
        const senderId = req.user._id;
        // const receiver = req.body.receiverId;
        const slotReplacement = req.body.slotId;
        const slot = await slot_model.findOne({ numberID: slotReplacement })
        if (slot) {
            const coordinatorID = slot.courseCoordinatorID
            const staff = await staff_members_models.findOne({ _id: senderId })
            const coordinator = await staff_members_models.findOne({ memberID: coordinatorID })

            if (staff && coordinator) {
                var request = new newSlotlinking(
                    {
                        pending: true,
                        accepted: false,
                        slotID: slotReplacement,
                        coordinatorId: coordinatorID,
                        senderId: staff.memberID
                    }
                )
                try {
                    await request.save()
                }
                catch (Err) {
                    console.log(Err)
                }
                staff.staffLinkingRequests.push(request._id)
                coordinator.coordinatorLinkingRequests.push(request._id)
                try {
                    await staff.save()
                    await coordinator.save()
                }
                catch (Err) {
                    return res.send("Mongoose Error")
                }
                res.send("Successfully sent to coordinator")

            }
        }
        res.send("Invalid inputs")
        //add it to the table of requests in staff member

    }
    )
router.route('/viewReplacementRequest')
    .get(async (req, res) => {
        var sentArray = [];
        var temp;
        var tempDate;
        var requstTemp;
        sentArray[0] = "Sent requests are:"
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("In staff")
            var lastIndex = 1;
            var startIndex = 0
            for (let index = 0; index < staff.requestReplacementSent.length; index++) {
                console.log("I entered here")
                temp = staff.requestReplacementSent[index]
                requstTemp = await newReplacement.findOne({ _id: temp })
                if (requstTemp) {
                    sentArray[lastIndex] = requstTemp
                }
                lastIndex++
            }
            sentArray[lastIndex] = "Received requests are:"
            lastIndex++
            for (let counter = 0; counter < staff.requestReplacmentReceived.length; counter++) {
                console.log("the received ones")
                temp = staff.requestReplacmentReceived[counter]
                requstTemp = await newReplacement.findOne({ _id: temp._id })
                sentArray[lastIndex] = requstTemp
                lastIndex++
            }
            res.send(sentArray)

        }
        res.send("Invalid staff member")

    })
//inputs the slotID of the request he wished to accept(_id)
//change the accepted-->true and pending-->false of the slotID 
router.route('/acceptReplacementRequest')
    .post(async (req, res) => {
        console.log("I entered")
        const slotID = req.body.slotID
        const senderId = req.user._id;
        var requstTemp;
        const staff = await staff_members_models.findOne({ _id: senderId })
        if (staff) {
            console.log("in staff")
            for (let index = 0; index < staff.requestReplacmentReceived.length; index++) {
                if (staff.requestReplacmentReceived[index] == slotID) {
                    console.log("found the request")
                    requstTemp = await newReplacement.findOne({ _id: slotID })
                    if (requstTemp) {
                        if (requstTemp.pending == false && requstTemp.accepted == true) {
                            return res.send("already accepted")
                        }
                        else {
                            requstTemp.pending = false
                            requstTemp.accepted = true
                            try {
                                requstTemp.save()
                            }
                            catch (Err) {
                                return res.send("Mongoose error")
                            }
                            const sender = await staff_members_models.findOne({ memberID: requstTemp.senderId })
                            if (sender) {
                                sender.slotsReplaced.push(slotID)
                                staff.slotsToReplace.push(slotID)
                            }
                            try {
                                sender.save()
                                staff.save()
                            }
                            catch (Err) {
                                return res.send("Mongoose error")
                            }

                            // try {
                            //     staff.save()
                            // }
                            // catch (Err) {
                            //     return res.send("Mongoose error")
                            // }
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

    })
//inputs the slotID of the request he wished to accept(_id) 
router.route('/rejectReplacementRequest')
    .post(async (req, res) => {
        console.log("I entered")
        const slotID = req.body.slotID
        const senderId = req.user._id;
        var requstTemp;
        const staff = await staff_members_models.findOne({ _id: senderId })
        if (staff) {
            console.log("in staff")
            for (let index = 0; index < staff.requestReplacmentReceived.length; index++) {
                if (staff.requestReplacmentReceived[index] == slotID) {
                    console.log("found the request")
                    requstTemp = await newReplacement.findOne({ _id: slotID })
                    if (requstTemp) {
                        if (requstTemp.pending == false && requstTemp.accepted == false) {
                            return res.send("already rejected")
                        }
                        else {
                            requstTemp.pending = false
                            requstTemp.accepted = false
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
//enter the day they want to update to
//optionally enter a reason
router.route('/sendChangeDayOff')
    .post(async (req, res) => {
        if (req.body.day == null) {
            return res.send("Should input the day")
        }
        else {
            const senderId = req.user._id;
            const staff = await staff_members_models.findOne({ _id: senderId })
            if (staff) {
                var dayArray = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday"]
                const day = req.body.day
                if (!(dayArray.includes(day.toLowerCase()))) {
                    return res.send("Invalid input")
                }
                else {
                    console.log(staff.department)
                    var request;
                    const hod = await staff_members_models.findOne({ department: staff.department })
                    console.log(hod)
                    if (!hod) {
                        return res.send("This hod is not found")
                    }
                    else {
                        const hodID = hod.memberID
                        console.log("ID is" + hodID)
                        console.log("I entered here")
                        request = new dayOffRequest_model(
                            {
                                pending: true,
                                accepted: false,
                                day: day,
                                HODId: hodID,
                                senderId: staff.memberID
                            }
                        )
                        if (req.body.reason != null) {
                            request.comment = req.body.reason
                        }


                        try {
                            await request.save()
                        }
                        catch (Err) {
                            return res.send("Mongo error")
                        }

                        hod.dayOffRequestsHOD.push(staff.memberID)
                        staff.dayOffRequestSent = staff.memberID
                        try {
                            await hod.save()
                            await staff.save()
                        }
                        catch (Err) {
                            return res.send("Mongo error")
                        }

                    }
                }
                return res.send("Successfully sent")
            }

        }

    })

module.exports = router