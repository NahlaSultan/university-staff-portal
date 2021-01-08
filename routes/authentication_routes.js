const staff_members_models = require('../models/staff_member_models').model
const staff_member_routes = require('./staff_member_routes')
const slot_model = require('../models/slot_model').model
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const location_model = require('../models/location_model').model
const faculty_model = require('../models/faculty_model').model
const department_model = require('../models/department_model').model
const course_model = require('../models/course_model').model
const workingSchedule_model = require('../models/workingSchedule_model').model
const tokens_model = require('../models/tokens_model').model





router.route('/addSampleStaff')
    .post(async (req, res) => {
        const email = req.body.email
        const user = await staff_members_models.findOne({ email: email })
        console.log("finding mail")

        //doing anything in the database takes time so we should await and async
        if (!user) {
            console.log("if not user")
            newPassword = await defaultPassword()
            var staffType, memberID
            staffType = "hr"



            const officeName = req.body.office

            if (req.body.office == null) {
                res.send('must specify an office (try c2.110)')
            }
            const office = await location_model.findOne({ name: req.body.office })
            if (!office || office.type != "office") {
                res.send('this is not a valid office')
            }
            if (office.officeMembers < office.capacity) {
                office.officeMembers = office.officeMembers + 1
                try {
                    console.log('saving office')
                    await office.save()

                }
                catch (Err) {
                    console.log(Err)
                    res.send("error saving office")
                }

            }
            else
                res.send('this office is already full')


            const arr = []
            arr.push("HR members")

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




            if (req.body.dayOff != null) {
                newUser.dayOff = req.body.dayOff
            }
            newUser.dayOff = "Saturday"


            if (req.body.attendance != null) {
                newUser.attendance = req.body.attendance
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
                memberID = staffType + "-" + newUser.numberID
                newUser.memberID = memberID

                console.log("second save")
                await newUser.save()

            }
            catch (Err) {
                console.log(Err)
                res.send("Mongo error")
            }
            return res.send(newUser)
        }
        res.send('Email already registered')
    })

//var firstPass = "$2b$10$eT3Pex54hQL8IALM8MPl3O4oYnZqLjmzpltfTpc7xS8iyHErUrx3S"
async function defaultPassword() {
    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash("123456", salt)
    return newPassword
}

require('dotenv').config()

router.route('/login')
    .post(async (req, res) => {
        // const arr = JSON.parse(req.body)
        // console.log(arr)
        console.log(req.body.password == null)
        var firstLogin = false

        const staff = await staff_members_models.findOne({ email: req.body.email })
        if (staff) {
            const correctPassword = await bcrypt.compare(req.body.password, staff.password)

            console.log("correct password: ", staff.password)
            console.log("entered password: ", req.body.password)
            if (req.body.password == "123456") {
                firstLogin = true
            }

            if (correctPassword) {
                const token = jwt.sign({ _id: staff._id, role: staff.role }, process.env.TOKEN_SECRET)
                res.header('token', token)

                if (firstLogin) {
                    console.log("first login")
                    res.send(token)
                }

               // res.send(token)
                // return res.redirect('/homePage')
            }
            return res.send('Invalid password')
        }


        return res.send('Invalid email')
    })


router.route('/getRoleFromToken')
.post(async (req, res) => {
    const token = req.body.token;
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(verified.role)
    res.send(verified.role)
})

router.route('/getStaffFromToken')
.post(async (req, res) => {
    const token = req.body.token;
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("verified")

    console.log(verified)
     const id = verified. _id
    console.log(id)
    const staff = await staff_members_models.find({ _id: id})
    res.send(staff)
})

//logout
router.route('/logOut')
    .get(async (req, res) => {
        const token = req.headers.token;
        const t = new tokens_model({
            "blackList": token
        })
        await t.save()
        res.send("loggedOut")
    })



router.route('/addSampleOffice').post(async (req, res) => {

    const office = await location_model.findOne({ name: req.body.name })

    if (!office) {
        const newOffice = new location_model({
            type: "office",
            name: req.body.name,
            capacity: req.body.capacity,
            officeMembers: 0,

        })
        try {

            await newOffice.save()
        }
        catch (Err) {
            console.log(Err)
            res.send("error adding office")
        }
        return res.send(newOffice)
    }

    res.send('office ' + req.body.name + ' is already there')


})
router.route('/addCourse').post(async (req, res) => {
    const newCourse = new course_model({

        courseName: req.body.name
    })
    try {
        await newCourse.save()
    }
    catch (Err) {
        console.log(Err)
        res.send("error adding office")
    }
    res.send("Successfully added")

})
//views all locations avalilable
router.route('/viewLocations')
    .get(async (req, res) => {
        const locations = await location_model.find()
        res.send(locations)

    })
//views all locations avalilable
router.route('/viewSlot')
    .get(async (req, res) => {
        const slots = await slot_model.find()
        res.send(slots)

    })
//views the slot with this certain numberID
router.route('/viewCertainSlot')
    .post(async (req, res) => {
        var arr = []
        const slot = await slot_model.findOne({ numberID: req.body.numberID })
        if (slot) {
            arr.push(slot)
        }
        res.send(arr)
    })

module.exports = router