const {app} = require('./app.js')
const staff_member_routes=require('./routes/staff_member_routes')
const authentication_routes=require('./routes/authentication_routes')
const academic_members_routes=require('./routes/academic_members_routes')
const mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env.DB_URL)

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true , useUnifiedTopology:true})

authentication_routes.route('')
staff_member_routes.route('')
academic_members_routes.route('')


app.listen(process.env.PORT)