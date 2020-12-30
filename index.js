const {app} = require('./app.js')
const staff_member_routes=require('./routes/staff_member_routes')
const authentication_routes=require('./routes/authentication_routes')
const academic_members_routes=require('./routes/academic_members_routes')
const hr_routes=require('./routes/hr_routes')
const coordinator=require('./routes/coordinator_routes')
const hod_routes=require('./routes/hod_routes')

const mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env.DB_URL)

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true , useUnifiedTopology:true})
console.log("connected")

authentication_routes.route('')
staff_member_routes.route('')
academic_members_routes.route('')
hr_routes.route('')
coordinator.route('')
hod_routes.route('')



app.listen(process.env.PORT)