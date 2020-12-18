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

var bodyParser = require('body-parser');

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


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

app.use((req, res, next) => {
    try {
        console.log("\nWe entered")

        const token = req.headers.token;


        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
        if (!verified) {
            return res.status(401).json({ msg: "authorization failed" });
        }
        else if(verified.role =="HR members"){
            return res.status(401).json({ msg: "authorization failed" });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });

    }
})
app.use('',academic_members_routes )

module.exports.app = app