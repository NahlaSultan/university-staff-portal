const mongoose = require('mongoose')
const { staffSchema } = require('./staff_member_models')

const AutoIncrementFactory = require('mongoose-sequence');
const connection =  mongoose.createConnection(process.env.DB_URL);
const AutoIncrement = AutoIncrementFactory(connection);

const slotSchema = new mongoose.Schema({
   
    type: {
        type: String,
        required: true,
        $in: ["lecture", "tutorial", "lab"]
    },
    time: {
        type: Date,
        required: true
    },
    courseTaught: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    id:{
        type:Number,
        unique:true,
        //required:true
    }
    // ,
    // academicMember: {
    //     type: staffSchema
    // }
    
   
})
slotSchema.plugin(AutoIncrement, {inc_field: 'id'});

// const Model = mongoose.model('slof', slotSchema)
// Model.counterReset('id_seq', function(err) {
// });    
module.exports.model = mongoose.model('slot', slotSchema)
module.exports.slotSchema = slotSchema