const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport'); 
const router = express.Router();


//load model

require('../model/User');
const User = mongoose.model('users');
//userlogin
router.get ('/login',(req,res) =>{
    res.render('users/login');
});

//staff login 
router.get ('/login1',(req,res) =>{
    res.render('users/login1');
});

// pharam login
router.get ('/login2',(req,res) =>{
    res.render('users/login2');
});

//register
router.get ('/register',(req,res) =>{
    res.render('users/register');
});
//login form to post
router.post('/login',(req,res,next)=>{
 passport.authenticate('local',{
 successRedirect:'/',
 failureRedirect:'/users/login',
 failureFlash:true
     
 })(req,res,next);
});

// login form for staff


router.post('/login1',(req,res,next)=>{
    passport.authenticate('local',{
    successRedirect:'/staff',
    failureRedirect:'/users/login1',
    failureFlash:true
        
    })(req,res,next);
   });


   // login form for pharm


router.post('/login2',(req,res,next)=>{
    passport.authenticate('local',{
    successRedirect:'/meds',
    failureRedirect:'/users/login2',
    failureFlash:true
        
    })(req,res,next);
   });

//register form post
router.post('/register',(req,res)=> {
    let errors=[];
   if(req.body.password != req.body.password2){
       errors.push({text:'Password do not match'})
   }

   if(req.body.password.length <8){
       errors.push({text:'password must be atleast 8 characters'});
   }
   if(errors.length >0){
       res.render('users/register',{
       errors:errors,
       name: req.body.name,
       email:req.body.email,
       password:req.body.password,
       password2:req.body.password2
       });
   }
   else {
       User.findOne({email:req.body.email})
       .then(user => {
        if(user){
            res.render('users/register',{
                errors:errors,
                name: req.body.name,
                email:req.body.email,
                password:req.body.password,
                password2:req.body.password2
                });
            req.flash('error_msg','Email already registered');
            
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email:req.body.email,
                password:req.body.password,
               });
              bcrypt.genSalt(10,(err,salt) =>{
             bcrypt.hash(newUser.password,salt,(err,hash) => {
                 if(err) throw err;
                 newUser.password =hash;
               newUser.save()
               .then(user =>{
                    req.flash("success_msg","Registation sucessfully compleated");
                    res.redirect('/users/login');
        
               })
               .catch(err =>{
                   console,log(err);
                   return;
               });
        
             });
            
        
              });
            
        }   
       });
  
   
   }

}) ;

// logout page

router.get('/logout',(req,res) =>{
    
     req.logout();
   
    req.flash('success_msg','You are logged out');
     req.session = null;
     res.redirect('/home');

});
module.exports =router;