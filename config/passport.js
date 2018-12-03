const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//load usermodel
const User = mongoose.model('users');

module.exports = function(passport){
 passport.use(new LocalStrategy({usernameField:'email'},(email,password,done) =>{
     //match user
    User.findOne({
        email:email
    }) .then(user => {
        if(!user){
            return done(null,false,{message:'NO User Found'});
        }

        // Match password
 bcrypt.compare(password,user.password,(err,isMatch) =>{
     if(err)   throw err;
     if(isMatch){
         return done(null,user);
     }else {
        return done(null,false,{message:'Password incorrect'});
     }
      
 } )
    })
 }))  ;

  // sessions
 passport.serializeUser(function(user,done){
     done(null,user.id);
 });
 passport.deserializeUser(function(id,done){
     User.findById(id, function(err,user){
         done(err,user);
     });
 });

}