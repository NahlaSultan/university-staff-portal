const staff_members_models = require('../models/staff_member_models').model
const staff_member_routes = require('./staff_member_routes')
const express = require('express')
const { compareSync } = require('bcrypt')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

router.route('/login')
    .post(async (req, res) => {
        console.log("HII")
        const staff = await staff_members_models.findOne({ email: req.body.email })
        if (staff) {
            //const correctPassword=await bcrypt.compare(req.body.password,staff.password)

            console.log("correct password: ", staff.password)
            console.log("entered password: ", req.body.password)
            console.log(staff.password == req.body.password)
            const salt = await bcrypt.genSalt(10)
            const newPassword = await bcrypt.hash(req.body.password, salt)
            //if(correctPassword){
            if (bcrypt.compare(newPassword,staff.password)) {
                const token = jwt.sign({ _id: staff._id, role: staff.role }, process.env.TOKEN_SECRET)
                res.header('token', token)
                res.send("Success")
                // return res.redirect('/homePage')
            }
            return res.status(401).send('Invalid password')
        }
        return res.status(401).send('Invalid email')
    })
router.route('/addStaff')
    .post(async (req, res) => {
        const email = req.body.email
        const user = await staff_members_models.findOne({ email: email })
        //doing anything in the database takes time so we should await and async
        if (!user) {
            const salt = await bcrypt.genSalt(10)
            const newPassword = await bcrypt.hash(req.body.password, salt)
            const newUser = new staff_members_models({
                name: req.body.name,
                email: req.body.email,
                password: newPassword,
                role: req.body.role,
                ID: req.body.id,
                requestReplacementSent: req.body.requestReplacementSent,
                annualLeavesBalance:req.body.annualLeavesBalance,
                dayOff:req.body.dayOff,
                salary:req.body.salary
            })
            try {
                await newUser.save()
            }
            catch (Err) {
                console.log(Err)
            }
            return res.send(newUser)
        }
        res.send('Email already registered')
    })

module.exports = router