const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const callbackSchema = new Schema({
  cnam:{
      type:String,
      required: true
  },
  mob:{
    type:String,
    required:true

},
reason:{
    type:String,
    required:true

},

  date: {
      type:Date,
      default:Date.now
    },
  
    
});
mongoose.model('callback',callbackSchema );