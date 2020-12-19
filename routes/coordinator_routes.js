const staff_members_models = require('../models/staff_member_models').model
const staff_member_routes = require('./staff_member_routes')
const slot_model = require('../models/slot_model').model
const course_model = require('../models/course_model').model
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const location_model = require('../models/location_model').model

router.route('/addSlot')
    .post(async (req, res) => {

        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })
        if (staff) {
            const courseID = staff.course
            if (req.body.type == null || req.body.time == null || courseTaught == null || location == null)
                res.send("missing inputs")
            else {
                var slot = new slot_model(
                    {
                        type: req.body.type,
                        time: req.body.time,
                        courseTaught: req.body.courseTaught,
                        location: req.body.location,
                        slotID: "-" + staff.numberID
                    }
                )
                try {
                    await slot.save()
                }
                catch (Err) {
                    console.log(Err)
                }
                const course = await course_model.findOne({ courseName: courseID })
                if (course) {
                    await course.teachingSlots.push(slot)
                    await course.save()
                    res.send("Successfully added")
                }
                res.send("Invalid course coordinator")

            }
        }


    })


router.route('/deleteSlot')
    .post(async (req, res) => {

        const staffId = req.user._id;
        const staff = await staff_members_models.findOne({ _id: staffId })

        if (staff) {
            const courseID = staff.course
            await slot_model.remove({ slotID: req.body.ID }, function (err, result) {
                if (err) {
                    console.err(err);
                } else {
                    res.json(result);
                }
            });
            const coursemodify = await course_model.findOne({ courseName: courseID })
            
        }
    })

module.exports = router