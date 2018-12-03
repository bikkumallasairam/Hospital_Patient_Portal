const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const methodoverride = require('method-override');
const flash =require('connect-flash');
const session = require('express-session');
const passport = require('passport'); 
const path = require('path');



const app = express();
//load helpers
const{ensureAuthenticated} = require('./helpers/auth');



//conect 
 mongoose.connect('mongodb://localhost/advance',{ })
 .then(() => console.log('Mongodb connected...'))
 .catch(err => console.log(err));

//doctor model loading
require('./model/Doctor');
const Doctor_cons = mongoose.model('doctor');
//donor model loading
require('./model/Donor');
const Donor_det = mongoose.model('donor');
// loading medicine
require('./model/Medicine');
const Medicine = mongoose.model('medicine');
// loading callback
require('./model/Callback');
const callback = mongoose.model('callback');


//middlewares
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

//body parser
app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())
app.use(methodoverride('_method'));
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true   
}));
app.use(passport.initialize());
app.use(passport.session());
//static folder
app.use(express.static(path.join(__dirname,'public')));

app.use(flash());
// Global variables
 app.use(function(req,res,next){
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error = req.flash('error');
     res.locals.user= req.user || null ;
     next();
 });
/*//middle ware
app.use(function(req,res,next){
  console.log(Date.now());
  req.name="sairam";
  next();
});*/
// Index Route
app.get('/',ensureAuthenticated,(req,res) =>{
   // console.log(req.name);
   const title ='welcome';
res.render('index',{ title: title});
});
//about
app.get ('/About',(req,res) =>{
    res.render('about');
});
app.get ('/bmi',ensureAuthenticated,(req,res) =>{
    res.render('bmi');
});
app.get ('/calorie',ensureAuthenticated,(req,res) =>{
    res.render('calorie');
});
app.get ('/diagnosis',ensureAuthenticated,(req,res) =>{
    res.render('diagnosis');
});
app.get ('/doctor_consultation',ensureAuthenticated,(req,res) =>{
    res.render('doctor_consultation');
});
app.get ('/heathcal',ensureAuthenticated,(req,res) =>{
    res.render('heathcal');
});
app.get ('/medicines',ensureAuthenticated,(req,res) =>{
    res.render('medicines');
});
app.get ('/donor',ensureAuthenticated,(req,res) =>{
    res.render('donor');
});
app.get ('/searchdonor',ensureAuthenticated,(req,res) =>{
    res.render('searchdonor');
});

app.get ('/home',(req,res) =>{
    res.render('home');
});

app.get ('/meds',(req,res) =>{
    res.render('meds');
});

app.get ('/callback',(req,res) =>{
    res.render('callback');
});


// inserting consultation
app.post ('/doctoradd',ensureAuthenticated,(req,res) =>{
    let errors = [];
    if(!req.body.nam){
        errors.push({text:'please enter name'})
    }
    if(!req.body.age){
        errors.push({text:'please enter age'})
    }
    if(!req.body.gender){
        errors.push({text:'please select gender'})
    }
    if(!req.body.avail){
        errors.push({text:'please select doctor'})
    }
    if(!req.body.timing){
        errors.push({text:'please enter timing'})
    }
    if(!req.body.problem_description){
        errors.push({text:'please enter problem description '})
    }
    if(!req.body.phone_number){
        errors.push({text:'please enter phone number'})
    }

    if (errors.length >0)
    {
        res.render( 'doctor_consultation',{errors: errors,
        nam:req.body.nam,
    age:req.body.age,
    gender:req.body.gender,

    problem_description:req.body.problem_description,

    phone_number:req.body.phone_number,


} );
    }
    else {
        const newuser ={
            nam:req.body.nam,
    age:req.body.age,
    gender:req.body.gender,
    avail:req.body.avail,
    timing:req.body.timing,
    problem_description:req.body.problem_description,
    phone_number:req.body.phone_number,
    user:req.user.id
        }
        new Doctor_cons (newuser)
    .save()
    .then(idea =>{
        req.flash('success_msg','Doctor Consultation Successfully Completed');
        res.redirect('doctor_consultation');
    })
    }
});

// inserting medicine order

app.post ('/mediadd',ensureAuthenticated,(req,res) =>{
    let errors = [];
    if(!req.body.type){
        errors.push({text:'please select the type of medicine'})
    }
    if(!req.body.mg){
        errors.push({text:'please enter MG'})
    }
    if(!req.body.quantity){
        errors.push({text:'please enter quantity'})
    }
    if(!req.body.state){
        errors.push({text:'please enter state '})
    }
    if(!req.body.city){
        errors.push({text:'please enter timing'})
    }
    if(!req.body.address){
        errors.push({text:'please enter Address '})
    }
    if(!req.body.pincode){
        errors.push({text:'please enter pincode'})
    }
    if(!req.body.payment){
        errors.push({text:'please select  payment mode'})
    }

    if (errors.length >0)
    {
        res.render( 'medicines',{errors: errors,
        type:req.body.type,
    mg:req.body.mg,
    quantity:req.body.quantity,

    state:req.body.state,

    city:req.body.city,

    address:req.body.address,

    pincode:req.body.pincode,
    payment:req.body.payment,

} );
    }
    else {
        const newuser ={
            type:req.body.type,
    mg:req.body.mg,
    quantity:req.body.quantity,

    state:req.body.state,

    city:req.body.city,

    address:req.body.address,

    pincode:req.body.pincode,
    payment:req.body.payment,
    user:req.user.id
        }
        new Medicine (newuser)
    .save()
    .then(Idea =>{
        req.flash('success_msg','Order placed  Successfully ');
        res.redirect('medicines');
    })
    }
});


// inserting donor details order

app.post ('/donoradd',ensureAuthenticated,(req,res) =>{
    let errors = [];
    if(!req.body.dname){
        errors.push({text:'please enter your name'})
    }
    if(!req.body.bgroup){
        errors.push({text:'please enter your BloodGroup'})
    }
    if(!req.body.dgender){
        errors.push({text:'please enter your gender'})
    }
    if(!req.body.ddob){
        errors.push({text:'please enter dob '})
    }
    if(!req.body.dnumb){
        errors.push({text:'please enter your number'})
    }
    if(!req.body.slct1){
        errors.push({text:'please select your state '})
    }
    if(!req.body.slct2){
        errors.push({text:'please select your District'})
    }
    if(!req.body.daddress){
        errors.push({text:'please  enter you Address'})
    }

    if (errors.length >0)
    {
        res.render( 'donor',{errors: errors,
            dname:req.body.dname,
            bgroup:req.body.bgroup,
            dgender:req.body.dgender,

            ddob:req.body.ddob,

            dnumb:req.body.dnumb,

            dstate:req.body.slct1,

            ddistrict:req.body.slct2,
            daddress:req.body.daddress,

} );
    }
    else {
        const newuser ={
            dname:req.body.dname,
            bgroup:req.body.bgroup,
            dgender:req.body.dgender,

            ddob:req.body.ddob,

            dnumb:req.body.dnumb,

            dstate:req.body.slct1,

            ddistrict:req.body.slct2,
            daddress:req.body.daddress,
    user:req.user.id
        }
        new Donor_det (newuser)
    .save()
    .then(Idea =>{
        req.flash('success_msg',' Donor details added ');
        res.redirect('donor');
    })
    }
});



// inserting callback
app.post ('/callbackadd',(req,res) =>{
    let errors = [];
    if(!req.body.cnam){
        errors.push({text:'please enter name'})
    }
    
    if(!req.body.reason){
        errors.push({text:'please enter problem description '})
    }
    if(!req.body.mob){
        errors.push({text:'please enter phone number'})
    }

    if (errors.length >0)
    {
        res.render( 'callback',{errors: errors,
        nam:req.body.nam,
    reason:req.body.reason,

    mob:req.body.mob,


} );
    }
    else {
        const newuser ={
            cnam:req.body.cnam,
    
    reason:req.body.reason,
    mob:req.body.mob
        }
        new callback (newuser)
    .save()
    .then(idea =>{
        req.flash('success_msg','Information Successfully filled');
        res.redirect('home');
    })
    }
});


// view  the doctor appointment
app.get('/few',ensureAuthenticated,(req,res) =>{ 
    Doctor_cons.find({user:req.user.id})
    .sort({date:'desc'})
    .then(ideas => { 
        res.render('few',{ ideas:ideas});

    })

 } );

 // view the appoinments for staff

 
app.get('/staff',(req,res) =>{ 
    Doctor_cons.find()
    .sort({date:'desc'})
    .then(ideas => { 
        res.render('staff',{ ideas:ideas});

    })

 } );

 // view  the Orders of medicines
app.get('/orders',ensureAuthenticated,(req,res) =>{ 
    Medicine.find({user:req.user.id})
    .sort({date:'desc'})
    .then(ideas => { 
        res.render('orders',{ ideas:ideas});

    })

 } );

  // view  the donors in staff data
app.get('/sdonors',ensureAuthenticated,(req,res) =>{ 
    Donor_det.find()
    .sort({date:'desc'})
    .then(ideas => { 
        res.render('sdonors',{ ideas:ideas});

    })

 } );

 // view the meds 

app.get('/meds',ensureAuthenticated,(req,res) =>{ 
    Medicine.find()
    .sort({date:'desc'})
    .then(ideas => { 
        res.render('meds',{ ideas:ideas});

    })

 } );

  // view the meds 

app.get('/call',(req,res) =>{ 
    callback.find()
    .sort({date:'desc'})
    .then(ideas => { 
        res.render('call',{ ideas:ideas});

    })

 } );


 // view  the donorsearch 
 app.post('/donorsearch',(req,res) =>{  console.log(req.body.slct1);
    console.log(req.body.slct2);
    console.log(req.body.group);
    Donor_det.find({dstate:req.body.slct1,
        ddistrict:req.body.slct2,
        bgroup:req.body.group })
    .sort({date:'desc'})
    .then(ideas => { 
        res.render('donors',{ ideas:ideas});

    })
 
 } );

 
 //edit Doctor appointment

 app.get('/edit/:id',ensureAuthenticated,(req,res) =>{
    
           Doctor_cons.findOne({
               _id: req.params.id
           })
           .then(idea => {
            if(idea.user != req.user.id) {
                req.flash('error_msg','Not Authorized') ;
            res.redirect('/ideas');
        }
               else {
               res.render('edit',{
                   idea:idea
               })
            }
           })
    
 });

// edit doctor appointment for update 

app.put('/:id',ensureAuthenticated,(req,res) =>{
    Doctor_cons.findOne({
        _id:req.params.id
    })
    .then(idea => {
       idea.nam=req.body.nam,
        idea.age=req.body.age,
        idea.gender=req.body.gender,
        idea.avail=req.body.avail,
        idea.timing=req.body.timing,
        idea.problem_description=req.body.problem_description,
        idea.phone_number=req.body.phone_number,

         idea.save()
         .then(idea => {
           req.flash('success_msg','Appointment  Updated');
             res.redirect('/few');
         })
    });
   
   });
   //delete for appointment

   app.delete('/:id',ensureAuthenticated,(req,res) =>{
    Doctor_cons.remove({_id:req.params.id})
    .then(()=>{
        req.flash('success_msg','Appointment Deleted');
        res.redirect('few');
        });

});

//delete for orders
 
app.delete('/orders/:id',ensureAuthenticated,(req,res) =>{
    Medicine.remove({_id:req.params.id})
    .then(()=>{
        req.flash('success_msg','Orders Deleted');
        
        });
        res.redirect('orders');
});
//load routes


const users = require('./routes/users');

require('./config/passport')(passport);


app.use('/users',users);


const port = 5000;
app.listen(port,() =>{
    console.log(`Server started on port ${port}`);



});