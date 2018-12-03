const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donorSchema = new Schema({
  dname:{
      type:String,
      required: true
  },
  bgroup:{
      type:String,
      required:true

  },
   dgender:{
       type:String,
       required:true

  },
  ddob:{
    type:String,
    required:true

},
 dnumb:{
      type:String,
      required:true
 

},
dstate:{
    type:String,
    required:true

},
ddistrict:{
    type:String,
    required:true

},

daddress:{
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
mongoose.model('donor',donorSchema );