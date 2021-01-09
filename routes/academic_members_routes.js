const staff_members_models = require('../models/staff_member_models').model
const staff_member_routes = require('./staff_member_routes')
const newReplacement = require('../models/replacement_requests').model
const newSlotlinking = require('../models/slotLinking_request').model
const newWorkingSchedule = require('../models/workingSchedule_model').model
const slot_model = require('../models/slot_model').model
const dayOffRequest_model = require('../models/dayOffRequest').model
const department_model = require('../models/department_model').model
const newLeave_model = require('../models/leaves_model').model
const faculty_model = require('../models/faculty_model').model
const replacement_model = require('../models/replacement_requests').model
const notification_model = require('../models/notifications').model
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
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            //mafrood redirect
            const slotsArray = staff.slotsAssigned
            var Sunday = []
            var Monday = []
            var Tuesday = []
            var Wednesday = []
            var Thursday = []
            var Saturday = []
            for (let i = 0; i < 5; i++) {
                Saturday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
                Sunday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
                Monday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
                Tuesday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
                Wednesday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
                Thursday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
            }
            var arr = []
            for (let i = 0; i < slotsArray.length; i++) {
                const slotArr = await slot_model.findOne({ numberID: slotsArray[i] })
                if (slotArr.day == "Saturday") {
                    if (slotArr.time == "First Slot") {
                        Saturday[0] = slotArr
                    }
                    if (slotArr.time == "Second Slot") {
                        Saturday[1] = slotArr
                    }
                    if (slotArr.time == "Third Slot") {
                        Saturday[2] = slotArr
                    }
                    if (slotArr.time == "Fourth Slot") {
                        Saturday[3] = slotArr
                    }
                    if (slotArr.time == "Fifth Slot") {
                        Saturday[4] = slotArr
                    }
                    // Saturday.push(slotArr)
                }
                if (slotArr.day == "Sunday") {
                    if (slotArr.time == "First Slot") {
                        Sunday[0] = slotArr
                    }
                    if (slotArr.time == "Second Slot") {
                        Sunday[1] = slotArr
                    }
                    if (slotArr.time == "Third Slot") {
                        Sunday[2] = slotArr
                    }
                    if (slotArr.time == "Fourth Slot") {
                        Sunday[3] = slotArr
                    }
                    if (slotArr.time == "Fifth Slot") {
                        Sunday[4] = slotArr
                    }
                    // Sunday.push(slotArr)
                }
                if (slotArr.day == "Monday") {
                    if (slotArr.time == "First Slot") {
                        Monday[0] = slotArr
                    }
                    if (slotArr.time == "Second Slot") {
                        Monday[1] = slotArr
                    }
                    if (slotArr.time == "Third Slot") {
                        Monday[2] = slotArr
                    }
                    if (slotArr.time == "Fourth Slot") {
                        Monday[3] = slotArr
                    }
                    if (slotArr.time == "Fifth Slot") {
                        Monday[4] = slotArr
                    }
                    // Monday.push(slotArr)
                }
                if (slotArr.day == "Tuesday") {

                    if (slotArr.time == "First Slot") {
                        Tuesday[0] = slotArr
                    }
                    if (slotArr.time == "Second Slot") {
                        Tuesday[1] = slotArr
                    }
                    if (slotArr.time == "Third Slot") {
                        Tuesday[2] = slotArr
                    }
                    if (slotArr.time == "Fourth Slot") {
                        Tuesday[3] = slotArr
                    }
                    if (slotArr.time == "Fifth Slot") {
                        Tuesday[4] = slotArr
                    }
                    // Tuesday.push(slotArr)
                }
                if (slotArr.day == "Wednesday") {

                    if (slotArr.time == "First Slot") {
                        Wednesday[0] = slotArr
                    }
                    if (slotArr.time == "Second Slot") {
                        Wednesday[1] = slotArr
                    }
                    if (slotArr.time == "Third Slot") {
                        Wednesday[2] = slotArr
                    }
                    if (slotArr.time == "Fourth Slot") {
                        Wednesday[3] = slotArr
                    }
                    if (slotArr.time == "Fifth Slot") {
                        Wednesday[4] = slotArr
                    }
                    // Wednesday.push(slotArr)
                }
                if (slotArr.day == "Thursday") {

                    if (slotArr.time == "First Slot") {
                        Thursday[0] = slotArr
                    }
                    if (slotArr.time == "Second Slot") {
                        Thursday[1] = slotArr
                    }
                    if (slotArr.time == "Third Slot") {
                        Thursday[2] = slotArr
                    }
                    if (slotArr.time == "Fourth Slot") {
                        Thursday[3] = slotArr
                    }
                    if (slotArr.time == "Fifth Slot") {
                        Thursday[4] = slotArr
                    }
                    // Thursday.push(slotArr)
                }

            }
            // while (Saturday.length < 5) {
            //     Saturday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
            // }
            // while (Sunday.length < 5) {
            //     Sunday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
            // }
            // while (Monday.length < 5) {
            //     Monday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
            // }
            // while (Tuesday.length < 5) {
            //     Tuesday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
            // }
            // while (Wednesday.length < 5) {
            //     Wednesday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
            // }
            // while (Thursday.length < 5) {
            //     Thursday.push({ type: "Free", location: "Home", time: "NoAlaram", courseTaught: "Relaxing" })
            // }
            arr.push(
                Saturday
            )
            arr.push(
                Sunday
            )
            arr.push(
                Monday
            )
            arr.push(
                Tuesday
            )
            arr.push(
                Wednesday
            )
            arr.push(
                Thursday
            )

            var slotReplac;
            var slotIDReplac;
            var dateToReplace;
            var slotRequest;
            var dateToPrint;
            //     var day;
            //     var month;
            //     var year;
            for (let index = 0; index < staff.slotsToReplace.length; index++) {
                console.log(staff.slotsToReplace)
                slotRequest = await newReplacement.findOne({ _id: staff.slotsToReplace[index] })
                dateToPrint = slotRequest.date
                slotIDReplac = slotRequest.slot;
                slotReplac = await slot_model.findOne({ numberID: slotIDReplac })
                arr.push(dateToPrint)
                arr.push([slotReplac])
            }
            if (staff.slotsToReplace == 0) {
                arr.push("")
                arr.push([])
            }
            //arr.push("Slots replaced for you:")
            for (let index = 0; index < staff.slotsReplaced.length; index++) {
                slotRequest = await newReplacement.findOne({ _id: staff.slotsReplaced[index] })
                console.log(slotRequest)
                if (slotRequest) {
                    //   array[lastIndex++] = "Replaced on date:"
                    dateToPrint = slotRequest.date
                    //  array[lastIndex] = dateToPrint
                    //  lastIndex++;
                    slotIDReplac = slotRequest.slot;
                    console.log(slotIDReplac)
                    slotReplac = await slot_model.findOne({ numberID: slotIDReplac })
                    //  array[lastIndex] = slotReplac
                    // lastIndex++;
                    arr.push(dateToPrint)
                    arr.push([slotReplac])
                }
            }
            if (staff.slotsReplaced == 0) {
                arr.push("")
                arr.push([])
            }

        }
        res.send(arr)

    })
router.route('/viewStatusDayOff')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const dayOffRequest = await dayOffRequest_model.findOne({ senderId: staff.dayOffRequestSent })
            if (dayOffRequest)
                resArr.push(
                    dayOffRequest
                )
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })
router.route('/viewStatusSlotLinking')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const slotLinkingRequests = staff.staffLinkingRequests
            var slotLinkingArr = []
            for (var i = 0; i < slotLinkingRequests.length; i++) {
                curRequest = await newSlotlinking.findOne({ _id: slotLinkingRequests[i] })
                if (curRequest) {
                    resArr.push(curRequest)
                }
            }
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })
router.route('/viewLeave')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const leaveRequests = staff.leaves
            for (var i = 0; i < leaveRequests.length; i++) {
                curRequest = await newLeave_model.findOne({ _id: leaveRequests[i] })
                if (curRequest) {
                    resArr.push(curRequest)
                }
            }
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })

router.route('/viewStatusOfRequests')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const dayOffRequest = await dayOffRequest_model.findOne({ senderId: staff.dayOffRequestSent })

            const slotLinkingRequests = staff.staffLinkingRequests
            console.log(slotLinkingRequests)
            const replacement_requests = staff.requestReplacementSent
            const leaveRequests = staff.leaves

            resArr.push(
                {
                    "dayOff Request": { "id": dayOffRequest.senderId, "pending": dayOffRequest.pending, "accepted": dayOffRequest.accepted }

                }
            )


            var curRequest;
            var replacementArr = []
            for (var i = 0; i < replacement_requests.length; i++) {
                curRequest = await newReplacement.findOne({ _id: replacement_requests[i] })
                if (curRequest) {
                    replacementArr.push({ "id": curRequest._id, "pending": curRequest.pending, "accepted": curRequest.accepted })
                }

            }

            resArr.push(
                {
                    "Replacement Requests": replacementArr

                }
            )

            var slotLinkingArr = []
            for (var i = 0; i < slotLinkingRequests.length; i++) {
                curRequest = await newSlotlinking.findOne({ _id: slotLinkingRequests[i] })
                if (curRequest) {
                    slotLinkingArr.push({ "id": curRequest._id, "pending": curRequest.pending, "accepted": curRequest.accepted })
                }
            }

            resArr.push(
                {
                    "Slot linking Requests": slotLinkingArr

                }
            )
            var leaveArr = []
            for (var i = 0; i < leaveRequests.length; i++) {
                curRequest = await newLeave_model.findOne({ _id: leaveRequests[i] })
                if (curRequest) {
                    leaveArr.push({ "id": curRequest._id, "pending": curRequest.pending, "accepted": curRequest.accepted })
                }
            }

            resArr.push(
                {
                    "leave requests": leaveArr

                }
            )
            res.send(resArr)
        }
        else {
            res.send("not staff")
        }
    })

router.route('/viewAcceptedReplacementRequestReceived')
    .get(async (req, res) => {
        var sentArray = [];
        var temp;
        var tempDate;
        var requstTemp;
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("In staff")
            var lastIndex = 0;
            var startIndex = 0
            for (let counter = 0; counter < staff.requestReplacmentReceived.length; counter++) {
                temp = staff.requestReplacmentReceived[counter]
                requstTemp = await newReplacement.findOne({ _id: temp._id })
                if (requstTemp.accepted == true) {
                    sentArray[lastIndex] = requstTemp
                    lastIndex++
                }
            }
            res.send(sentArray)

        }
        res.send("Invalid staff member")

    })
router.route('/viewAcceptedReplacementRequestSent')
    .get(async (req, res) => {
        var sentArray = [];
        var temp;
        var tempDate;
        var requstTemp;
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("In staff")
            var lastIndex = 0;
            var startIndex = 0
            for (let index = 0; index < staff.requestReplacementSent.length; index++) {
                console.log("I entered here")
                temp = staff.requestReplacementSent[index]
                requstTemp = await newReplacement.findOne({ _id: temp })
                if (requstTemp && requstTemp.accepted == true) {
                    sentArray[lastIndex] = requstTemp
                    lastIndex++
                }

            }

            res.send(sentArray)

        }
        res.send("Invalid staff member")

    })


router.route('/viewAcceptedDayOff')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const dayOffRequest = await dayOffRequest_model.findOne({ senderId: staff.dayOffRequestSent })
            if (dayOffRequest.accepted == true) {
                resArr.push(
                    dayOffRequest
                )
            }
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })
router.route('/viewAcceptedSlotLinking')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const slotLinkingRequests = staff.staffLinkingRequests
            for (var i = 0; i < slotLinkingRequests.length; i++) {
                curRequest = await newSlotlinking.findOne({ _id: slotLinkingRequests[i] })
                if (curRequest && curRequest.accepted == true) {
                    resArr.push(curRequest)
                }
            }
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })
router.route('/viewAcceptedLeave')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const leaveRequests = staff.leaves
            for (var i = 0; i < leaveRequests.length; i++) {
                curRequest = await newLeave_model.findOne({ _id: leaveRequests[i] })
                if (curRequest && curRequest.accepted == true) {
                    resArr.push(curRequest)
                }
            }
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })
router.route('/viewAcceptedRequests')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const dayOffRequest = await dayOffRequest_model.findOne({ senderId: staff.dayOffRequestSent })
            console.log(dayOffRequest)
            const slotLinkingRequests = staff.staffLinkingRequests
            console.log(slotLinkingRequests)
            const replacement_requests = staff.requestReplacementSent
            const leaveRequests = staff.leaves
            if (dayOffRequest.accepted == true) {
                resArr.push(
                    {
                        "dayOff Request": dayOffRequest

                    }
                )
            }
            else {
                resArr.push(
                    {
                        "dayOff Request": []
                    }
                )
            }


            var curRequest;
            var replacementArr = []
            for (var i = 0; i < replacement_requests.length; i++) {
                curRequest = await newReplacement.findOne({ _id: replacement_requests[i] })
                if (curRequest) {
                    if (curRequest.accepted == true) {
                        replacementArr.push(curRequest)
                    }
                }

            }

            resArr.push(
                {
                    "Replacement Requests": replacementArr

                }
            )

            var slotLinkingArr = []
            for (var i = 0; i < slotLinkingRequests.length; i++) {
                curRequest = await newSlotlinking.findOne({ _id: slotLinkingRequests[i] })
                if (curRequest) {
                    if (curRequest.accepted == true) {
                        slotLinkingArr.push(curRequest)
                    }
                }
            }

            resArr.push(
                {
                    "Slot linking Requests": slotLinkingArr

                }
            )
            var leaveArr = []
            for (var i = 0; i < leaveRequests.length; i++) {
                curRequest = await newLeave_model.findOne({ _id: leaveRequests[i] })
                if (curRequest) {
                    if (curRequest.accepted == true) {
                        leaveArr.push(curRequest)
                    }
                }
            }

            resArr.push(
                {
                    "leave requests": leaveArr

                }
            )
            res.send(resArr)
        }
        else {
            res.send("not staff")
        }
    })
router.route('/viewPendingReplacementRequestReceived')
    .get(async (req, res) => {
        var sentArray = [];
        var temp;
        var tempDate;
        var requstTemp;
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("In staff")
            var lastIndex = 0;
            var startIndex = 0
            for (let counter = 0; counter < staff.requestReplacmentReceived.length; counter++) {
                temp = staff.requestReplacmentReceived[counter]
                requstTemp = await newReplacement.findOne({ _id: temp._id })
                if (requstTemp.pending == true) {
                    sentArray[lastIndex] = requstTemp
                    lastIndex++
                }
            }
            res.send(sentArray)

        }
        res.send("Invalid staff member")

    })
router.route('/viewPendingdReplacementRequestSent')
    .get(async (req, res) => {
        var sentArray = [];
        var temp;
        var tempDate;
        var requstTemp;
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("In staff")
            var lastIndex = 0;
            var startIndex = 0
            for (let index = 0; index < staff.requestReplacementSent.length; index++) {
                console.log("I entered here")
                temp = staff.requestReplacementSent[index]
                requstTemp = await newReplacement.findOne({ _id: temp })
                if (requstTemp && requstTemp.pending == true) {
                    sentArray[lastIndex] = requstTemp
                    lastIndex++
                }

            }

            res.send(sentArray)

        }
        res.send("Invalid staff member")

    })


router.route('/viewPendingDayOff')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const dayOffRequest = await dayOffRequest_model.findOne({ senderId: staff.dayOffRequestSent })
            if (dayOffRequest.pending == true) {
                resArr.push(
                    dayOffRequest
                )
            }
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })
router.route('/viewPendingSlotLinking')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const slotLinkingRequests = staff.staffLinkingRequests
            for (var i = 0; i < slotLinkingRequests.length; i++) {
                curRequest = await newSlotlinking.findOne({ _id: slotLinkingRequests[i] })
                if (curRequest && curRequest.pending == true) {
                    resArr.push(curRequest)
                }
            }
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })
router.route('/viewPendingLeave')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const leaveRequests = staff.leaves
            for (var i = 0; i < leaveRequests.length; i++) {
                curRequest = await newLeave_model.findOne({ _id: leaveRequests[i] })
                if (curRequest && curRequest.pending == true) {
                    resArr.push(curRequest)
                }
            }
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })
router.route('/viewPendingRequests')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const dayOffRequest = await dayOffRequest_model.findOne({ senderId: staff.dayOffRequestSent })
            console.log(dayOffRequest)
            const slotLinkingRequests = staff.staffLinkingRequests
            console.log(slotLinkingRequests)
            const replacement_requests = staff.requestReplacementSent
            const leaveRequests = staff.leaves
            if (dayOffRequest.pending == true) {
                resArr.push(
                    {
                        "dayOff Request": dayOffRequest

                    }
                )
            }
            else {
                resArr.push(
                    {
                        "dayOff Request": []
                    }
                )
            }


            var curRequest;
            var replacementArr = []
            for (var i = 0; i < replacement_requests.length; i++) {
                curRequest = await newReplacement.findOne({ _id: replacement_requests[i] })
                if (curRequest) {
                    if (curRequest.pending == true) {
                        replacementArr.push(curRequest)
                    }
                }

            }

            resArr.push(
                {
                    "Replacement Requests": replacementArr

                }
            )

            var slotLinkingArr = []
            for (var i = 0; i < slotLinkingRequests.length; i++) {
                curRequest = await newSlotlinking.findOne({ _id: slotLinkingRequests[i] })
                if (curRequest) {
                    if (curRequest.pending == true) {
                        slotLinkingArr.push(curRequest)
                    }
                }
            }

            resArr.push(
                {
                    "Slot linking Requests": slotLinkingArr

                }
            )
            var leaveArr = []
            for (var i = 0; i < leaveRequests.length; i++) {
                curRequest = await newLeave_model.findOne({ _id: leaveRequests[i] })
                if (curRequest) {
                    if (curRequest.pending == true) {
                        leaveArr.push(curRequest)
                    }
                }
            }

            resArr.push(
                {
                    "leave requests": leaveArr

                }
            )
            res.send(resArr)
        }
        else {
            res.send("not staff")
        }
    })
router.route('/viewRejectedReplacementRequestReceived')
    .get(async (req, res) => {
        var sentArray = [];
        var temp;
        var tempDate;
        var requstTemp;
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("In staff")
            var lastIndex = 0;
            var startIndex = 0
            for (let counter = 0; counter < staff.requestReplacmentReceived.length; counter++) {
                temp = staff.requestReplacmentReceived[counter]
                requstTemp = await newReplacement.findOne({ _id: temp._id })
                if (requstTemp.accepted == false && requstTemp.pending == false) {
                    sentArray[lastIndex] = requstTemp
                    lastIndex++
                }
            }
            res.send(sentArray)

        }
        res.send("Invalid staff member")

    })
router.route('/viewRejectedReplacementRequestSent')
    .get(async (req, res) => {
        var sentArray = [];
        var temp;
        var tempDate;
        var requstTemp;
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("In staff")
            var lastIndex = 0;
            var startIndex = 0
            for (let index = 0; index < staff.requestReplacementSent.length; index++) {
                console.log("I entered here")
                temp = staff.requestReplacementSent[index]
                requstTemp = await newReplacement.findOne({ _id: temp })
                if (requstTemp.accepted == false && requstTemp.pending == false) {
                    sentArray[lastIndex] = requstTemp
                    lastIndex++
                }

            }

            res.send(sentArray)

        }
        res.send("Invalid staff member")

    })


router.route('/viewRejectedDayOff')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const dayOffRequest = await dayOffRequest_model.findOne({ senderId: staff.dayOffRequestSent })
            if (dayOffRequest.accepted == false && dayOffRequest.pending == false) {
                resArr.push(
                    dayOffRequest
                )
            }
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })
router.route('/viewRejectedSlotLinking')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const slotLinkingRequests = staff.staffLinkingRequests
            for (var i = 0; i < slotLinkingRequests.length; i++) {
                curRequest = await newSlotlinking.findOne({ _id: slotLinkingRequests[i] })
                if (curRequest && curRequest.accepted == false && curRequest.pending == false) {
                    resArr.push(curRequest)
                }
            }
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })
router.route('/viewRejectedLeave')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const leaveRequests = staff.leaves
            for (var i = 0; i < leaveRequests.length; i++) {
                curRequest = await newLeave_model.findOne({ _id: leaveRequests[i] })
                if (curRequest && curRequest.accepted == false && curRequest.pending == false) {
                    resArr.push(curRequest)
                }
            }
            return res.send(resArr)
        }
        else {
            res.send("not staff")
        }

    })
router.route('/viewRejectedRequests')
    .get(async (req, res) => {
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        var resArr = []
        if (staff) {
            const dayOffRequest = await dayOffRequest_model.findOne({ senderId: staff.dayOffRequestSent })
            console.log(dayOffRequest)
            const slotLinkingRequests = staff.staffLinkingRequests
            console.log(slotLinkingRequests)
            const replacement_requests = staff.requestReplacementSent
            const leaveRequests = staff.leaves
            if (dayOffRequest.accepted == false && dayOffRequest.pending == false) {
                resArr.push(
                    {
                        "dayOff Request": dayOffRequest

                    }
                )
            }
            else {
                resArr.push(
                    {
                        "dayOff Request": []
                    }
                )
            }


            var curRequest;
            var replacementArr = []
            for (var i = 0; i < replacement_requests.length; i++) {
                curRequest = await newReplacement.findOne({ _id: replacement_requests[i] })
                if (curRequest) {
                    if (curRequest.accepted == false && curRequest.pending == false) {
                        replacementArr.push(curRequest)
                    }
                }

            }

            resArr.push(
                {
                    "Replacement Requests": replacementArr

                }
            )

            var slotLinkingArr = []
            for (var i = 0; i < slotLinkingRequests.length; i++) {
                curRequest = await newSlotlinking.findOne({ _id: slotLinkingRequests[i] })
                if (curRequest) {
                    if (curRequest.accepted == false && curRequest.pending == false) {
                        slotLinkingArr.push(curRequest)
                    }
                }
            }

            resArr.push(
                {
                    "Slot linking Requests": slotLinkingArr

                }
            )
            var leaveArr = []
            for (var i = 0; i < leaveRequests.length; i++) {
                curRequest = await newLeave_model.findOne({ _id: leaveRequests[i] })
                if (curRequest) {
                    if (curRequest.accepted == false && curRequest.pending == false) {
                        leaveArr.push(curRequest)
                    }
                }
            }

            resArr.push(
                {
                    "leave requests": leaveArr

                }
            )
            res.send(resArr)
        }
        else {
            res.send("not staff")
        }
    })
router.route('/viewCollegues')
    .get(async (req, res) => {
        var arr = []
        const senderId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: senderId })
        if (staff) {
            const myrole = staff.role
            const mydepartment = staff.department
            const collegues = await staff_members_models.find({ department: mydepartment })
            if (collegues) {
                for (let index = 0; index < collegues.length; index++) {
                    var flag = false
                    if (staff.memberID != collegues[index].memberID) {
                        for (let i = 0; i < myrole.length; i++) {
                            if (collegues[index].role.includes(myrole[i]) && myrole[i] != "courseCoordinators" && flag == false) {
                                arr.push(collegues[index].memberID)
                                flag = true
                            }
                        }

                    }
                }
                res.send(arr)
            }
        }
        else {
            res.send([])
        }

    })
router.route('/viewSlotsAssigned')
    .get(async (req, res) => {
        var arr = []
        const senderId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: senderId })
        if (staff) {
            var currentSlot;
            const slot = staff.slotsAssigned
            for (let i = 0; i < slot.length; i++) {
                currentSlot = await slot_model.findOne({ numberID: slot[i] })
                arr.push(currentSlot)
            }
        }
        res.send(arr)

    })
//inputs : slot(the slotID I want someone to replace),receiverId(the id of the staff member I want to send it to)
//,dateReplace:the day on which I need this replacement
router.route('/sendReplacementRequest')
    .post(async (req, res) => {
        console.log("I entered here")
        //I am sending a request to someone ,i Will create a new request object and add it to the replacementRequest table of this user
        const senderId = req.user._id;
        const receiver = req.body.receiverId;
        const slotReplacement = req.body.slot;
        //   const slotDateinitial = new Date(req.body.dateReplace);
        // console.log(slotDateinitial)
        // var day = slotDateinitial.getUTCDate() + 2; 
        // console.log(day)
        // var month = slotDateinitial.getUTCMonth() + 1;
        // var year = slotDateinitial.getUTCFullYear();
        const slotDate = new Date(req.body.dateReplace)
        slotDate.setDate(slotDate.getDate() + 1)
        slotDate.setHours(0, 0, 0, 0)
        // const slotDate = new Date(year + "/" + month + "/" + day)
        // slotDate.setHours(1)
        if (receiver == null || slotReplacement == null || slotDate == null) {
            return res.send("Incomplete inputs")
        }
        const staff = await staff_members_models.findOne({ _id: senderId })
        const receiverStaff = await staff_members_models.findOne({ memberID: receiver })
        const staffDepartment = staff.department
        const recevierDepartment = staff.department
        if (staffDepartment != recevierDepartment) {
            return res.send("Must choose someone of the same department to replace you")
        } else {
            var flag = 0
            for (let i = 0; i < staff.role.length; i++) {
                if (receiverStaff.role.includes(staff.role[i])) {
                    console.log("I entered here")
                    flag = 1
                    console.log(flag)
                }
            }
            if (flag == 0) {
                return res.send("Must be of the same role")
            }
            else {
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
        }
    }
    )
router.route('/dayOff')
    .get(async (req, res) => {
        const senderId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: senderId })
        if (staff) {
            console.log("I entered here")
            res.send(staff.dayOff)
        }
        else {
            res.send("Something Went wrong")
        }
    })

//Inputs:slotId(slot I want to be assigned to)
router.route('/sendSlotLinkingRequest')
    .post(async (req, res) => {
        //I am sending a request to someone ,i Will create a new request object and add it to the replacementRequest table of this user
        const senderId = req.user._id;
        // const receiver = req.body.receiverId;
        const slotReplacement = req.body.slotId;
        const slot = await slot_model.findOne({ numberID: slotReplacement })
        if (slot) {
            if (slot.assignedFlag == true) {
                return res.send("This slot is already assigned ")
            }
            else {
                const staff = await staff_members_models.findOne({ _id: senderId })
                //same coordinator course and role is coordinator
                const coordinator = await staff_members_models.findOne({ role: { $all: ["courseCoordinators"] }, coordinatorCourse: { $all: [slot.courseTaught] } })
                if (staff && coordinator) {
                    const coordinatorID = coordinator.memberID
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
router.route('/viewReplacementRequestSent')
    .get(async (req, res) => {
        var sentArray = [];
        var temp;
        var tempDate;
        var requstTemp;
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("In staff")
            var lastIndex = 0;
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

            res.send(sentArray)

        }
        res.send("Invalid staff member")

    })
router.route('/viewReplacementRequestReceived')
    .get(async (req, res) => {
        var sentArray = [];
        var temp;
        var tempDate;
        var requstTemp;
        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            console.log("In staff")
            var lastIndex = 0;
            var startIndex = 0
            for (let counter = 0; counter < staff.requestReplacmentReceived.length; counter++) {
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
                console.log(staff)
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
                            requstTemp.notify = true
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

            return res.send("Could not find this request")

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
                            requstTemp.notify = true
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
                const requests = await dayOffRequest_model.findOne({ senderId: staff.memberID })
                if (requests) {
                    res.send("You should cancel the request you have already sent and then send another one")
                }
                else {
                    var dayArray = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday"]
                    const day = req.body.day
                    if (!(dayArray.includes(day.toLowerCase()))) {
                        return res.send("Invalid input")
                    }
                    else {
                        console.log(staff.department)
                        var request;
                        const department = staff.department
                        const hod = await staff_members_models.findOne({ department: department, role: { $all: ["headOfdepartments"] } })
                        const hodID = hod.memberID
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
                            if (req.body.reason != null && req.body.reason != "") {
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

        }

    })
//cancel the request (no need to enter anything as he only has one request)
router.route('/cancelDayoffRequest')
    .post(async (req, res) => {
        const senderId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: senderId })
        if (staff) {
            if (staff.dayOffRequestSent == "") {
                return res.send("There is no request to cancel")
            }
            else {
                const request = await dayOffRequest_model.findOne({ senderId: staff.memberID })
                if (request) {
                    if (request.pending == true) {
                        //remove from staff
                        staff.dayOffRequestSent = ""
                        //find hod and remove the request
                        const department = staff.department
                        const hod = await staff_members_models.findOne({ department: department, role: { $all: ["headOfdepartments"] } })
                        for (let index = 0; index < hod.dayOffRequestsHOD.length; index++) {
                            if (hod.dayOffRequestsHOD[index] == staff.memberID) {
                                hod.dayOffRequestsHOD.splice(index, 1)
                                break
                            }

                        }
                        try {
                            await staff.save()
                            await hod.save()
                            await request.delete()
                        }
                        catch (Err) {
                            return res.send("Mongo error")
                        }
                        return res.send("Canceled successfuly")
                    }
                    else {
                        return res.send("Cannot cancel an already accepted/rejected dsyOff request,you can send another dayOffchange request to return it to the previous dayOff")
                    }

                }

            }
        }
        else {
            return res.send("Something went wrong")
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
                const today = new Date();
                today.setDate(today.getDate())
                // moment(today).isAfter(request.date, 'day');
                console.log(today)
                console.log(request.date)
                console.log(today.getDate() - request.date.getDate() + 1)
                if (request.pending == true || (today.getDate() - request.date.getDate() + 1) < 0) {
                    console.log("Can remove it")
                    //remove it from the array of sent requests
                    for (let i = 0; i < staff.requestReplacementSent.length; i++) {
                        if (staff.requestReplacementSent[i] == req.body.requestID) {
                            console.log("I entered here")
                            staff.requestReplacementSent.splice(i, 1)
                            break
                        }
                    }
                    //remove it from the array of slot replaced in case it was accepted
                    for (let j = 0; j < staff.slotsReplaced.length; j++) {
                        if (staff.slotsReplaced[j] == req.body.requestID) {
                            staff.slotsReplaced.splice(j, 1)
                            break
                        }
                    }
                    try {
                        await staff.save()
                    }
                    catch (Err) {
                        return res.send("Mongo error")
                    }

                    //get the receiver to delete the request from its corresponding array
                    const receiverID = request.receiverId
                    const receiver = await staff_members_models.findOne({ memberID: receiverID })
                    if (receiver) {
                        //delete from requests received
                        for (let i = 0; i < receiver.requestReplacmentReceived.length; i++) {
                            if (receiver.requestReplacmentReceived[i] == req.body.requestID) {
                                receiver.requestReplacmentReceived.splice(i, 1)
                                break
                            }
                        }
                        //delete from slots to replace
                        for (let j = 0; j < receiver.slotsToReplace.length; j++) {
                            if (receiver.slotsToReplace[j] == req.body.requestID) {
                                receiver.slotsToReplace.splice(j, 1)
                                break
                            }
                        }
                        try {
                            await receiver.save()
                        }
                        catch (Err) {
                            return res.send("Mongo error")
                        }
                        //remove the attribute from the leave request
                        const leaveRequest = request.leaveRequestAssigned
                        const theLeaveRequest = await newLeave_model.findOne({ _id: leaveRequest })
                        if (theLeaveRequest) {
                            theLeaveRequest.replacementRequest = ""
                            try {
                                theLeaveRequest.save()
                            }
                            catch (Err) {
                                return res.send("Mongo error")
                            }
                        }

                        //delete the request
                        try {
                            request.delete()
                        }
                        catch (Err) {
                            return res.send("Mongo error")
                        }


                    }
                    return res.send("Cancelled successfully")
                }
                else {
                    return res.send("Cannot cancel")
                }
            }

        }
    })
router.route('/cancelSlotLinkingRequest')
    .post(async (req, res) => {
        const senderId = req.user._id;
        if (req.body.requestId == null) {
            return res.send("You should enter the _id of the request you wish to cancel")
        }
        else {
            const staff = await staff_members_models.findOne({ _id: senderId })
            console.log(staff)
            const request = await newSlotlinking.findOne({ _id: req.body.requestId })
            console.log(request)
            if (staff && request) {
                if (request.pending == false) {
                    return res.send("Already sccepted cannot cancel it")
                }
                else {
                    //remove from stafflinking request
                    for (let i = 0; i < staff.staffLinkingRequests.length; i++) {
                        if (staff.staffLinkingRequests[i] == req.body.requestId) {
                            console.log("I entered here")
                            staff.staffLinkingRequests.splice(i, 1)
                            break
                        }
                    }
                    //remove from the coordinator linking request
                    const coordinatorID = request.coordinatorId
                    const coordinator = await staff_members_models.findOne({ memberID: coordinatorID })
                    for (let j = 0; j < coordinator.coordinatorLinkingRequests.length; j++) {
                        if (coordinator.coordinatorLinkingRequests[j] == req.body.requestId) {
                            console.log("I entered here too")
                            coordinator.coordinatorLinkingRequests.splice(j, 1)
                            break
                        }
                    }

                    try {
                        staff.save()
                        coordinator.save()
                        request.delete()
                    }
                    catch (Err) {
                        return res.send("Mongoose error")
                    }
                    return res.send("Cancelled successfully")
                }
            }

            else {
                return res.send("Problem cancelling slot linking request")
            }
        }
    })

router.route('/viewCertainReplacement')
    .post(async (req, res) => {
        const id = req.body.replacementID
        const request = await replacement_model.findOne({ _id: id })
        res.send(request)
    })
//enter the _id of the leave request you wish to delete
router.route('/cancelLeaveRequest')
    .post(async (req, res) => {
        if (req.body.requestId == null) {
            return res.send("You should enter the request id you wish to delete")
        }
        else {
            const senderId = req.user._id;
            const staff = await staff_members_models.findOne({ _id: senderId })
            if (staff) {
                const leaveRequest = await newLeave_model.findOne({ _id: req.body.requestId })
                if (leaveRequest) {
                    if (leaveRequest.pending == false) {
                        return res.send("Cannot cancel an already accepted/rejected requestF")
                    }
                    else {
                        const type = leaveRequest.type
                        switch (type) {
                            case "Annual":
                                const today = new Date();
                                today.setDate(today.getDate())
                                // moment(today).isAfter(request.date, 'day');
                                console.log(today.getDate() - leaveRequest.start.getDate() + 1)
                                if (leaveRequest.pending == true || (today.getDate() - request.start.getDate() + 1) < 0) {
                                    //if there is a replacement request,cancel it
                                    if (leaveRequest.replacementRequest != "") {
                                        console.log("Time to cancel the replacement request")
                                        // cancelReplacementRequest(senderId, leaveRequest.replacementRequest)
                                        const requestID = leaveRequest.replacementRequest
                                        for (let i = 0; i < staff.requestReplacementSent.length; i++) {
                                            if (staff.requestReplacementSent[i] == requestID) {
                                                staff.requestReplacementSent.splice(i, 1)
                                            }
                                        }
                                        //remove it from the array of slot replaced in case it was accepted
                                        for (let j = 0; j < staff.slotsReplaced.length; j++) {
                                            if (staff.slotsReplaced[j] == requestID) {
                                                staff.slotsReplaced.splice(j, 1)
                                                break
                                            }
                                        }


                                        const request = await newReplacement.findOne({ _id: leaveRequest.replacementRequest })
                                        const receiverID = request.receiverId
                                        const receiver = await staff_members_models.findOne({ memberID: receiverID })
                                        if (receiver) {
                                            //delete from requests received
                                            for (let i = 0; i < receiver.requestReplacmentReceived.length; i++) {
                                                if (receiver.requestReplacmentReceived[i] == requestID) {
                                                    receiver.requestReplacmentReceived.splice(i, 1)
                                                    break
                                                }
                                            }
                                            for (let j = 0; j < receiver.slotsToReplace.length; j++) {
                                                if (receiver.slotsToReplace[j] == requestID) {
                                                    receiver.slotsToReplace.splice(j, 1)
                                                    break
                                                }
                                            }

                                            try {
                                                await staff.save()
                                                await receiver.save()
                                                await request.delete()
                                            }
                                            catch (Err) {
                                                return res.send(Err)
                                            }

                                        }
                                    }


                                }
                                else {
                                    return res.send("Request is either accepted/rejectd or its day has passed")
                                }

                                break;
                        }
                        const department = staff.department
                        const hod = await staff_members_models.findOne({ department: department, role: { $all: ["headOfdepartments"] } })
                        const hodID = hod.memberID
                        //remove from leaves array of staff
                        for (let index = 0; index < staff.leaves.length; index++) {
                            if (staff.leaves[index] == req.body.requestId) {
                                staff.leaves.splice(index, 1)
                                break
                            }
                        }
                        //remove from leaveRequestsHOD array of hod
                        for (let index = 0; index < hod.leaveRequestsHOD.length; index++) {
                            if (hod.leaveRequestsHOD[index] == req.body.requestId) {
                                hod.leaveRequestsHOD.splice(index, 1)
                                break
                            }
                        }
                        //save to database

                        try {
                            hod.save()
                            staff.save()
                            leaveRequest.delete()
                        }
                        catch (Err) {
                            return res.send("Mongoose error")
                        }
                    }
                    return res.send("Canceled successfully")



                }
                else {
                    return res.send("Request not found")
                }

            }
            else {
                return res.send("Somthung went wrong")
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
                const hod = await staff_members_models.findOne({ department: department, role: { $all: ["headOfdepartments"] } })
                const hodID = hod.memberID
                console.log(hod)
                switch (req.body.type) {
                    case "Annual":
                        //one day at a time
                        console.log("Here")
                        if (staff.annualLeavesBalance < 1) {
                            return res.send("Your annual balance does not allow you to take a day off")
                        }
                        else {
                            let now = new Date()
                            now.setDate(now.getDate() + 1)
                            var leave = new newLeave_model({
                                staffID: staff.memberID,
                                hodID: hodID,
                                type: "Annual",
                                submission: now.setHours(0, 0, 0, 0),
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
                                replacementDate.setDate(replacementDate.getDate() + 1)
                                console.log(replacementDate)
                                // replacementDate.setDate(replacementDate.getDate())
                                console.log("New date" + replacementDate)
                                if (now - replacementDate > 0) {
                                    return res.send("leaves should be submitted before the targeted day.")
                                }
                                else {
                                    leave.start = replacementDate.setHours(0, 0, 0, 0)
                                    leave.end = replacementDate.setHours(0, 0, 0, 0)
                                    if (req.body.replacementRequestID != null && req.body.replacementRequestID != "") {
                                        leave.replacementRequest = req.body.replacementRequestID
                                        console.log(req.body.replacementRequestID)
                                        const replacementRequest = await newReplacement.findOne({ _id: req.body.replacementRequestID })
                                        console.log(replacementRequest)
                                        if (replacementRequest) {
                                            if (replacementRequest.accepted == false) {
                                                return res.send("You have entered a replacement request that is not accepted yet")
                                            }
                                            else {
                                                if (replacementRequest.senderId != staff.memberID) {
                                                    console.log(replacementRequest.senderId)
                                                    console.log(staff.memberID)
                                                    return res.send("You haven't sent this request")
                                                }
                                                else {
                                                    if (replacementRequest.date - replacementDate != 0) {

                                                        console.log(replacementDate)

                                                        console.log(replacementRequest.date)

                                                        // console.log(replacementDate)
                                                        return res.send("The replacement request should be on the same day as the leave")
                                                    }
                                                    else {
                                                        replacementRequest.leaveRequestAssigned = leave._id
                                                        try {
                                                            await replacementRequest.save()
                                                        }
                                                        catch (Err) {
                                                            return res.send("Mongo error")
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            return res.send("This request is not found")
                                        }
                                    }
                                    if (req.body.description != null) {
                                        leave.commentWhySent = req.body.description
                                    }
                                    try {
                                        await leave.save()
                                    }
                                    catch (Err) {
                                        return res.send("Mongo error")
                                    }
                                    hod.leaveRequestsHOD.push(leave._id)
                                    staff.leaves.push(leave._id)
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
                        console.log("i ENTERED HERE")
                        if (req.body.start == null) {
                            return res.send("Must enter the start and end dates of your leave")
                        }
                        else {
                            const now = new Date()
                            now.setDate(now.getDate() + 1)
                            const startDateUpdate = new Date(req.body.start)
                            startDateUpdate.setDate(startDateUpdate.getDate() + 1)
                            var leave = new newLeave_model({
                                staffID: staff.memberID,
                                hodID: hodID,
                                type: "Accidental",
                                submission: now.setHours(0, 0, 0, 0),
                                pending: true,
                                accepted: false,
                                start: startDateUpdate.setHours(0, 0, 0, 0),
                                end: startDateUpdate.setHours(0, 0, 0, 0)
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
                                    //  staff.totalAccidentalLeave = staff.totalAccidentalLeave + 1
                                    if (req.body.description != null)
                                        leave.commentWhySent = req.body.description
                                    hod.leaveRequestsHOD.push(leave._id)
                                    staff.leaves.push(leave._id)
                                    const leaveBalance = staff.annualLeavesBalance
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
                        if (req.body.start == null || req.body.end == null) {
                            return res.send("Must enter the start and end dates of your leave")
                        }
                        else {
                            const now = new Date()
                            now.setDate(now.getDate() + 1)
                            const startDateUpdate = new Date(req.body.start)
                            startDateUpdate.setDate(startDateUpdate.getDate() + 1)
                            const endDate = new Date(req.body.end)
                            endDate.setDate(endDate.getDate() + 1)
                            console.log("End date is" + endDate)
                            var leave = new newLeave_model({
                                staffID: staff.memberID,
                                hodID: hodID,
                                type: "Sick",
                                submission: now.setHours(0, 0, 0, 0),
                                pending: true,
                                accepted: false,
                                start: startDateUpdate.setHours(0, 0, 0, 0),
                                end: endDate.setHours(0, 0, 0, 0)
                            })
                            const endStart = dateDiffInDays(startDateUpdate, endDate);

                            if (endStart < 0) {
                                return res.send("You must have chosen uncorrectly.End date should be after the start date")
                            }
                            else {
                                // leave.leaveDates.push(now)
                                const difference = dateDiffInDays(startDateUpdate, leave.submission);
                                //  const test = Math.abs(difference);
                                console.log(difference + "Difference is")
                                if (difference < 3) {
                                    console.log("I entered here")
                                    return res.send("Must be submitted by maximum three days after the sick day.")
                                }
                                else {
                                    if (req.body.documentLinks == null) {
                                        return res.send("Must submit the documents")
                                    }
                                    else {
                                        leave.documentLinks = req.body.documentLinks

                                        if (req.body.description != null)
                                            leave.commentWhySent = req.body.description
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
                        }
                        break;
                    case "Maternity":
                        if (staff.gender != "Female") {
                            return res.send("Must be a female")
                        }
                        else {
                            if (req.body.documentLinks == null) {
                                return res.send("Must submit documents")
                            }
                            else {
                                if (req.body.start == null || req.body.end == null) {
                                    return res.send("Must enter the start and end dates of your leave")
                                }
                                else {
                                    const startDateUpdate = new Date(req.body.start)
                                    startDateUpdate.setDate(startDateUpdate.getDate() + 1)
                                    const endDate = new Date(req.body.end)
                                    endDate.setDate(endDate.getDate() + 1)
                                    let now = new Date()
                                    now.setDate(now.getDate() + 1)
                                    var leave = new newLeave_model({
                                        staffID: staff.memberID,
                                        hodID: hodID,
                                        type: "Maternity",
                                        submission: now.setHours(0, 0, 0, 0),
                                        pending: true,
                                        accepted: false,
                                        start: startDateUpdate.setHours(0, 0, 0, 0),
                                        end: endDate.setHours(0, 0, 0, 0),
                                        documentLinks: req.body.documentLinks
                                    })
                                    const endStart = dateDiffInDays(startDateUpdate, endDate);

                                    if (endStart < 0) {
                                        return res.send("You must have chosen uncorrectly.End date should be after the start date")
                                    }
                                    else {
                                        if (req.body.description != null)
                                            leave.commentWhySent = req.body.description
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
                        }
                        break;
                    case "Compensation":
                        if (req.body.description == null) {
                            return res.send("You should enter a reason")
                        }
                        else {
                            if (req.body.compensation == null) {
                                return res.send("You should enter the day you wish to attend instead")
                            }
                            else {
                                if (req.body.start == null) {
                                    return res.send("You should enter the day on which you were absent")
                                }
                                else {
                                    const startDateUpdate = new Date(req.body.start)
                                    startDateUpdate.setDate(startDateUpdate.getDate() + 1)
                                    // startDateUpdate
                                    //  console.log(startDateUpdate).setDate(startDateUpdate.getDate() + 1)
                                    const compensationDay = new Date(req.body.compensation)
                                    console.log("initial compensationdayis" + compensationDay)
                                    compensationDay.setDate(compensationDay.getDate() + 1)
                                    compensationDay.setHours(0, 0, 0, 0);
                                    startDateUpdate.setHours(0, 0, 0, 0);
                                    const difference = dateDiffInDays(startDateUpdate, compensationDay);
                                    console.log(difference + "That's the difference")
                                    if (difference > 30) {
                                        return res.send("The compensation should be in the same month")
                                    }
                                    else {
                                        var days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
                                        const slotDay = days[(compensationDay.getUTCDay()) + 1]
                                        console.log(compensationDay)
                                        console.log(slotDay)
                                        //  console.log("The compensation day is" + slotDay)
                                        if (slotDay != staff.dayOff) {
                                            return res.send("You should compensate on a day off")
                                        }
                                        let now = new Date()
                                        now.setDate(now.getDate() + 1)
                                        console.log("today's date is" + now)
                                        var leave = new newLeave_model({
                                            staffID: staff.memberID,
                                            hodID: hodID,
                                            type: "Compensation",
                                            submission: now.setHours(0, 0, 0, 0),
                                            pending: true,
                                            accepted: false,
                                            start: startDateUpdate,
                                            end: startDateUpdate,
                                            compensatingDay: compensationDay,
                                            commentWhySent: req.body.description
                                        })
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
                        }
                        break;
                    default:
                        return res.send("Not a valid type")

                }
                return res.send("Successfully submitted")
            }
            else {
                return res.send("A problem has occured")
            }

        }
    })
router.route('/notified')
    .get(async (req, res) => {
        const senderId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: senderId })
        var result = []
        //first index(dayoff)
        var dayOff = []
        //second index(replacement)
        var replacementArr = []
        //third index(slotlinking)
        var slotLinkingArr = []
        //fourth index(leave requests)
        var leaveArr = []
        const dayoffRequests = await dayOffRequest_model.findOne({ senderId: staff.memberID, notified: true })
        if (dayoffRequests) {
            if (dayoffRequests.notified == true) {
                dayOff.push(dayoffRequests)
                dayoffRequests.notified = false
                try {
                    dayoffRequests.save()
                }
                catch (e) {
                    console.log(e)
                }
            }
        }
        const replacement = await replacement_model.find({ senderId: staff.memberID, notify: true })
        for (let i = 0; i < replacement.length; i++) {
            replacementArr.push(replacement[i])
            replacement[i].notify = false
            replacement[i].save()
        }

        const slotLinking = await newSlotlinking.find({ senderId: staff.memberID, notified: true })
        for (let i = 0; i < slotLinking.length; i++) {
            slotLinkingArr.push(slotLinking[i])
            slotLinking[i].notified = false
            slotLinking[i].save()
        }

        const leave = await newLeave_model.find({ staffID: staff.memberID, notified: true })
        for (let i = 0; i < leave.length; i++) {
            leaveArr.push(leave[i])
            leave[i].notified = false
            leave[i].save()
        }
        if (dayOff.length != 0)
            result.push(dayOff)
        if (replacementArr.length != 0)
            result.push(replacementArr)
        if (slotLinkingArr.length != 0)
            result.push(slotLinkingArr)
        if (leaveArr.length != 0)
            result.push(leaveArr)
        var notification = new notification_model({
            staff: staff.memberID,
            dayOff: dayOff,
            replacement: replacementArr,
            slotLinking: slotLinkingArr,
            leave: leaveArr
        })
        notification.save()
        res.send(result)
    })
router.route('/viewNotificaitonsAccepted')
    .get(async (req, res) => {
        const senderId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: senderId })
        const notfications = await notification_model.find({ staff: staff.memberID })
        var arr = []
        console.log(notfications[0])
        arr.push(notfications[0].staff)
        arr.push(notfications[0].dayOff)
        arr.push(notfications[0].replacement)
        arr.push(notfications[0].slotLinking)
        arr.push(notfications[0].leave)

        //  console.log(arr)
        return res.send(arr)
    })
module.exports = router