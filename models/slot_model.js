const mongoose = require('mongoose')

const AutoIncrementFactory = require('mongoose-sequence');
const connection = mongoose.createConnection(process.env.DB_URL);
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
    courseCoordinatorID:{
        type:String,
    } ,
    numberID:
    {
<<<<<<< HEAD
        type:Number
    },
    assignedFlag:{
         type:Boolean,
         default:false
=======
        type:Number,
        unique:true
    },
    assignedFlag:{
        type:Boolean,
        default:false
>>>>>>> ed1bfcb24a2e271af2d31e9ae6367facaf04f4a7
    }
    // ,
    // academicMember: {
    //     type: staffSchema
    // }
    
   
})
slotSchema.plugin(AutoIncrement, { id: 'slotid_seq', inc_field: 'numberID'});
module.exports.model = mongoose.model('slot', slotSchema)
module.exports.slotSchema = slotSchema