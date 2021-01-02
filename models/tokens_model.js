
const mongoose = require('mongoose')
const tokenSchema = new mongoose.Schema({
  blackList: {
      type:String

  }

})
module.exports.model = mongoose.model('token', tokenSchema)