const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  nam:{
      type:String,
      required: true
  },
  age:{
      type:String,
      required:true

  },
   gender:{
       type:String,
       required:true

  },
  avail:{
    type:String,
    required:true

},
timing:{
    type:String,
    required:true

},
problem_description:{
    type:String,
    required:true

},
phone_number:{
    type:String,
    required:true

},
  date: {
      type:Date,
      default:Date.now
    },
  
    user:{
        type:String,
        required:true
 
   },
});
mongoose.model('doctor',doctorSchema );