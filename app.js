const express = require('express')
//const users_routes=require('./routes/user_routes')
const app = express()
const jwt=require("jsonwebtoken")
require("dotenv").config()
//access body of request
//so that body of the request isn't undefined
app.use(express.json())
//lama ted5ol gowa roh 3ala /register
const staff_member_routes = require('./routes/staff_member_routes')
const authentication_routes = require('./routes/authentication_routes')
const academic_members_routes = require('./routes/academic_members_routes')
const coordinator=require('./routes/coordinator_routes')
const hr_routes = require('./routes/hr_routes')
const course_instructor_routes = require('./routes/course_instructor_routes')
var bodyParser = require('body-parser');

//app.use(bodyParser.json());
///app.use(bodyParser.urlencoded({ extended: false }));


app.use('',authentication_routes)

app.use((req, res, next) => {
    try {
        console.log("\nWe entered")

        const token = req.headers.token;


        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
        if (!verified) {
            return res.status(401).json({ msg: "authorization failed" });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });

    }
})
app.use('',staff_member_routes )





app.use('/hr',(req, res, next) => {
    try {
        console.log("\nWe entered")

        const token = req.headers.token;
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("hr")
       if(verified.role !="HR members"){
        console.log(" not hr")

            return res.status(401).json({ msg: "authorization failed, must be an HR member to perform this task" });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });

    }
})
app.use('/hr',hr_routes )

app.use('/ci',(req, res, next) => {
    try {
        console.log("\nWe entered")
        const token = req.headers.token;
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
        if (!verified) {
            return res.status(401).json({ msg: "authorization failed" });
        }
        else if(verified.role!="course Instructor"){
            return res.status(401).json({ msg: "authorization failed" });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });

    }
})
app.use('/ci',course_instructor_routes)
app.use('/academicMembers',(req, res, next) => {
    try {
        console.log("\nWe entered academic")

        const token = req.headers.token;


        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
       if(verified.role =="HR members"){
            return res.status(401).json({ msg: "authorization failed, must not be an HR member to perform this task" });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });

    }
})

app.use('/academicMembers',academic_members_routes )

app.use('/coordinator',(req, res, next) => {
    try {
        console.log("\nWe entered ")

        const token = req.headers.token;


        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
       if(verified.role !="courseCoordinators"){
            return res.status(401).json({ msg: "authorization failed, must be an HR member to perform this task" });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });

    }
})
app.use('/coordinator',coordinator)



module.exports.app = app