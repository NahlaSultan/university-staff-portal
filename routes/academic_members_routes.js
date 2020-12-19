const staff_members_models = require('../models/staff_member_models').model
const staff_member_routes = require('./staff_member_routes')
const newReplacement = require('../models/replacement_requests').model
const newSlotlinking=require('../models/slotLinking_request').model
const slot_model=require('../models/slot_model').model
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/viewSchedule')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            //mafrood redirect
            res.send(staff.workingSchedule)
        }
    })
router.route('/sendReplacementRequest')
    .post(async (req, res) => {
        //I am sending a request to someone ,i Will create a new request object and add it to the replacementRequest table of this user
        const senderId = req.user._id;
        const receiver = req.body.receiverId;
        const slotReplacement = req.body.slot;
        const staff = await staff_members_models.findOne({ _id: senderId })
        const receiverStaff = await staff_members_models.findOne({ memberID: receiver })
        console.log(receiverStaff)
        console.log(staff)
        if (staff && receiverStaff) {
            var request = new newReplacement(
                {
                    pending: true,
                    accepted: false,
                    slot: slotReplacement,
                    receiverId: receiver,
                    senderId: staff.memberID
                }
            )
            try {
                await request.save()
            }
            catch (Err) {
                console.log(Err)
            }
            await staff.requestReplacementSent.push(request)
            await staff.save()
            await receiverStaff.requestReplacmentReceived.push(request)
            await receiverStaff.save()
            res.send("Successfully sent")


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
        const slot=await slot_model.findeOne({id:slotReplacement})
        if(slot){
        const coordinatorID=slot.courseCoordinatorID
        const staff = await staff_members_models.findOne({ _id: senderId })
    
        if (staff) {   
            var request = new newSlotlinking(
                {
                    pending: true,
                    accepted: false,
                    slotID: slotReplacement,
                    coordinatorId : coordinatorID,
                    senderId: staff.memberID
                }
            )
            try {
                await request.save()
            }
            catch (Err) {
                console.log(Err)
            }
            staff.staffLinkingRequests=request
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
        const te = ""
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("I entered")
            console.log(staff.name)
            await console.log(staff.requestReplacementSent.length)
            //     const temp=staff.requestReplacementSent
            //     console.log(temp)
            //     for(const i=0;i<temp.length;i++){
            //         console.log("in loop")
            //         var obj1=temp[i]
            //         te+="/n"+"pending:"+obj1.pending+", accepted:"+obj1.accepted+", slot:"+obj1.slot+", receiverID:",obj1.receiverId
            //     }
            //     res.send(te)

            // }
            // res.send("Invalid input")
            res.send()
        }

    })
module.exports = router