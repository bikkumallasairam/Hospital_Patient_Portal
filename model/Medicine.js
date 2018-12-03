const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  type:{
      type:String,
      required: true
  },
  mg:{
      type:String,
      required:true

  },
   quantity:{
       type:String,
       required:true

  },
  state:{
    type:String,
    required:true

},
city:{
    type:String,
    required:true

},
address:{
    type:String,
    required:true

},
pincode:{
    type:String,
    required:true

},
  
    payment:{
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
 
   }
    
});
mongoose.model('medicine',medicineSchema );