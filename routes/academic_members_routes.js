const staff_members_models = require('../models/staff_member_models').model
const staff_member_routes = require('./staff_member_routes')
const newReplacement = require('../models/replacement_requests').model
const newSlotlinking = require('../models/slotLinking_request').model
const newWorkingSchedule = require('../models/workingSchedule_model').model
const slot_model = require('../models/slot_model').model
const dayOffRequest_model = require('../models/dayOffRequest').model
const department_model = require('../models/department_model').model
const newLeave_model = require('../models/leaves_model').model
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


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
            var dateToPrint;
            var day;
            var month;
            var year;
            array[lastIndex++] = "Slots to replace:"
            for (let index = 0; index < staff.slotsToReplace.length; index++) {
                slotRequest = await newReplacement.findOne({ _id: staff.slotToReplace[index] })
                array[lastIndex++] = "Replaced on date:"
                dateToReplace = slotRequest.date
                day = dateToReplace.getDay();
                month = dateToReplace.getMonth() + 1;
                year = dateToReplace.getFullYear();
                dateToPrint = day + "," + month + "," + year
                array[lastIndex] = dateToPrint
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
                    array[lastIndex++] = "Replaced on date:"
                    dateToReplace = slotRequest.date
                    day = dateToReplace.getDay();
                    month = dateToReplace.getMonth() + 1;
                    year = dateToReplace.getFullYear();
                    dateToPrint = day + "," + month + "," + year
                    array[lastIndex] = dateToPrint
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
        const slotDate = new Date(req.body.dateReplace);
        slotDate.setHours(0, 0, 0, 0)
        if (receiver == null || slotReplacement == null || slotDate == null) {
            return res.send("Incomplete inputs")
        }
        const staff = await staff_members_models.findOne({ _id: senderId })
        const receiverStaff = await staff_members_models.findOne({ memberID: receiver })
        const staffDepartment = staff.department
        const recevierDepartment = staff.department
        if (staffDepartment != recevierDepartment) {
            return res.send("Must choose someone of the same department to replace you")
        }
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
                            // const sender = await staff_members_models.findOne({ memberID: requstTemp.senderId })
                            // if (sender) {
                            //     sender.slotsReplaced.push(slotID)
                            //     staff.slotsToReplace.push(slotID)
                            // }
                            // try {
                            //     sender.save()
                            //     staff.save()
                            // }
                            // catch (Err) {
                            //     return res.send("Mongoose error")
                            // }

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
//inputs the id of the request he wants to cancel
router.route('/cancelReplacementRequest')
    .post(async (req, res) => {
        const senderId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: senderId })
        if (staff) {
            if (req.body.requestID == null) {
                return res.send("You should enter an id")
            }
            else {
                //check it is pending or its date is yet to come
                const request = await newReplacement.findOne({ _id: req.body.requestID })
                today = new Date();
                // moment(today).isAfter(request.date, 'day');
                if (request.pending == true || moment(today).isAfter(request.date, 'day')) {
                    console.log("Can remove it")
                    //remove it from the array of sent requests
                    for (let i = 0; i < staff.requestReplacementSent.length; i++) {
                        if (staff.requestReplacementSent[i] == req.body.requestID) {
                            staff.requestReplacementSent.splice(i, 1)
                            break
                        }
                    }
                    //remove it from the array of slot replaced in case it was accepted
                    for (let j = 0; j < staff.slotsReplaced.length; j++) {
                        if (staff.slotsReplaced[i] == req.body.requestID) {
                            staff.slotsReplaced.splice(i, 1)
                            break
                        }
                        try {
                            await staff.save()
                        }
                        catch (Err) {
                            return res.send("Mongo error")
                        }
                    }
                    //get the receiver to delete the request from its corresponding array
                    const receiverID = request.receiverId
                    const receiver = await staff_members_models.findOne({ memberID: receiverID })
                    if (receiver) {
                        //delete from requests received
                        for (let i = 0; i < receiver.requestReplacementReceived.length; i++) {
                            if (receiver.requestReplacementReceived[i] == req.body.requestID) {
                                receiver.requestReplacementReceived.splice(i, 1)
                                break
                            }
                        }
                        //delete from slots to replace
                        for (let j = 0; j < receiver.slotsToReplace.length; j++) {
                            if (receiver.slotsToReplace[i] == req.body.requestID) {
                                receiver.slotsToReplace.splice(i, 1)
                                break
                            }
                        }
                        try {
                            await receiver.save()
                        }
                        catch (Err) {
                            return res.send("Mongo error")
                        }
                        //delete the request
                        try {
                            request.delete()
                        }
                        catch (Err) {
                            return res.send("Mongo error")
                        }

                    }
                }
                else {
                    return res.send("The request has already been accepted and replaced by someone else")
                }
            }

        }
    })
//submit a leave request
//Enter a type
//Enter a replacement request in case of annual leave(_id of this request that has been already sent to someone and can be accepted by then)
//start and end of the leave
router.route('/submitLeave')
    .post(async (req, res) => {
        const senderId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: senderId })
        if (req.body.type == null) {
            return res.send("Incomplete input")
        }
        // || req.body.end == null || req.body.start == null
        else {

            if (staff) {
                const department = staff.department
                const deModel = await department_model.findOne({ name: department })
                const hodID = deModel.headOfDepartment
                const hod = await staff_members_models.findOne({ memberID: hodID })
                switch (req.body.type) {
                    case "Annual":
                        //one day at a time
                        if (staff.annualLeavesBalance < 1) {
                            return res.send("Your annual balance does not allow you to take a day off")
                        }
                        else {
                            var leave = new newLeave_model({
                                staffID: staff.memberID,
                                hodID: hodID,
                                type: "Annual",
                                submission: Date().setHours(0, 0, 0, 0),
                                pending: true,
                                accepted: false
                            })

                            //check the date of the request is yet to come
                            if (req.body.start == null) {
                                return res.send("Incomplete inputs")

                            }
                            else {

                                let now = Date()
                                const replacementDate = new Date(req.body.start)
                                if (now - replacementDate > 0) {
                                    return res.send("leaves should be submitted before the targeted day.")
                                }
                                else {
                                    leave.start = replacementDate.setHours(0, 0, 0, 0)
                                    if (req.body.replacementRequestID != null) {
                                        leave.replacementRequest = req.body.replacementRequestID
                                    }
                                    if (req.body.description != null) {
                                        leave.description = req.body.description
                                    }
                                    try {
                                        await leave.save()
                                    }
                                    catch (Err) {
                                        return res.send("Mongo error")
                                    }
                                    hod.leaveRequestsHOD.push(leave._id)
                                    staff.leaves.push(leave._id)
                                    staff.annualLeavesBalance = annualLeavesBalance - 1
                                    try {
                                        await staff.save()
                                        await hod.save()
                                    }
                                    catch (Err) {
                                        return res.send("Mongo error")
                                    }
                                }
                            }
                        }
                        break;
                    case "Accidental":
                        //one day at a time
                        if (req.body.start == null) {
                            return res.send("Must enter the start and end dates of your leave")
                        }
                        else {
                            var leave = new newLeave_model({
                                staffID: staff.memberID,
                                hodID: hodID,
                                type: "Accidental",
                                submission: Date().setHours(0, 0, 0, 0),
                                pending: true,
                                accepted: false,
                                start: req.body.start
                            })
                            //check the difference between start and end is not greater than 6
                            // const difference = dateDiffInDays(req.body.start, req.body.end);
                            //const test = Math.abs(difference);

                            if (staff.annualLeavesBalance < 1) {
                                return res.send("Your annual balance does not allow you to submit this leave")
                            }
                            else {
                                if (staff.totalAccidentalLeave + 1 > 6) {
                                    return res.send("Rejected,you have used up all your allowed number of days for accidental leaves")
                                }
                                else {
                                    staff.totalAccidentalLeave = staff.totalAccidentalLeave + 1

                                    if (req.body.description != null)
                                        leave.description = req.body.description
                                    hod.leaveRequestsHOD.push(leave._id)
                                    staff.leaves.push(leave._id)
                                    staff.annualLeavesBalance = annualLeavesBalance - 1
                                    try {
                                        await leave.save()
                                        await staff.save()
                                        await hod.save()
                                    }
                                    catch (Err) {
                                        return res.send("Mongo error")
                                    }
                                }


                            }
                        }
                        break;
                    case "Sick":
                        if (req.body.start == null) {
                            return res.send("Must enter the start and end dates of your leave")
                        }
                        else {
                            var leave = new newLeave_model({
                                staffID: staff.memberID,
                                hodID: hodID,
                                type: "Sick",
                                submission: Date().setHours(0, 0, 0, 0),
                                pending: true,
                                accepted: false,
                                start: req.body.start,
                                end: req.body.end
                            })
                            const difference = dateDiffInDays(leave.submission, req.body.start);
                            const test = Math.abs(difference);
                            if (leave.submission - req.body.start > 0 && test > 3) {
                                return res.send("Must be submitted by maximum three days after the sick day.")
                            }
                            else {
                                if (req.body.documentLinks == null) {
                                    return res.send("Must submit the documents")
                                }
                                else {
                                    leave.documentLinks = req.body.documentLinks

                                    if (req.body.description != null)
                                        leave.description = req.body.description
                                    hod.leaveRequestsHOD.push(leave._id)
                                    staff.leaves.push(leave._id)
                                    try {
                                        await leave.save()
                                        await staff.save()
                                        await hod.save()
                                    }
                                    catch (Err) {
                                        return res.send("Mongo error")
                                    }
                                }
                            }
                        }
                        break;
                    case "":

                        break;

                }
            }
        }
    })
module.exports = router