const staff_members_models = require('../models/staff_member_models').model
const staff_member_routes = require('./staff_member_routes')
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const location_model = require('../models/location_model').model

const course_model=require('../models/course_model').model
const workingSchedule_model=require('../models/workingSchedule_model').model
const tokens_model=require('../models/tokens_model').model



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
                    res.send('reset your password')
                }

                res.send("Success")
                // return res.redirect('/homePage')
            }
            return res.status(401).send('Invalid password')
        }


        return res.status(401).send('Invalid email')
    })


    //logout
    router.route('/logOut')
    .get(async (req, res) => {
        const token =req.headers.token;
        const t =new tokens_model({
          "blackList":token
        })
      await  t.save()
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



module.exports = router