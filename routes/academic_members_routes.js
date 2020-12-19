const staff_members_models = require('../models/staff_member_models').model
const staff_member_routes = require('./staff_member_routes')
const newReplacement = require('../models/replacement_requests').model
const newSlotlinking = require('../models/slotLinking_request').model
const slot_model = require('../models/slot_model').model
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/viewSchedule')
    //do not forget to view the replacement slots(if it was accepted,sender will be notified that the slot on the specific date will be changed)and vice versa
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            //mafrood redirect
            res.send(staff.workingSchedule)
        }
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
    )
//Inputs:slotId
//(nnot tested yet)
router.route('/sendSlotLinkingRequest')
    .post(async (req, res) => {
        //I am sending a request to someone ,i Will create a new request object and add it to the replacementRequest table of this user
        const senderId = req.user._id;
        // const receiver = req.body.receiverId;
        const slotReplacement = req.body.slot;
        const slot = await slot_model.findeOne({ id: slotReplacement })
        if (slot) {
            const coordinatorID = slot.courseCoordinatorID
            const staff = await staff_members_models.findOne({ _id: senderId })

            if (staff) {
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
                staff.staffLinkingRequests = request
                await staff.save()
                res.send("Successfully sent")

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
                        }
                        try {
                            sender.save()
                        }
                        catch (Err) {
                            return res.send("Mongoose error")
                        }
                        staff.slotsToReplace.push(slotID)
                        try {
                            staff.save()
                        }
                        catch (Err) {
                            return res.send("Mongoose error")
                        }
                        return res.send("Successfully accepted")
                    }
                }
                else{
                    return res.send("This request is not found")
                }
            }
        }
        else {
            return res.send("Something wrong has occured")
        }
    })
module.exports = router