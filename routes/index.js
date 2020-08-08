var express = require('express');
var router = express.Router();
var User = require('../models').user;
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

const jwt = require('jsonwebtoken');

// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// var jwtOptions = {}

// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); 
// jwtOptions.secretOrKey = 'AnweshaChakraborty@#$%^&';

// jwtOptions.issuer = 'accounts.examplesoft.com';
// jwtOptions.audience = 'yoursite.net';
//const passport = require('./config/passport')




router.post('/login3', function(req, res, next) {
    passport.authenticate('local', {session: false}, function(err, user, info) {
        
        if (err) { return next(err); }

        if ( ! user) {
            return res.status(500).json('info.message')
        }

        const payload = {
            username: user.email,
            //email: user.email
        }

      //let token = jwt.sign(payload, jwtOptions.secretOrKey);
        const options = {
            subject: `${user.id}`,
            expiresIn: 3600
        }
        const token = jwt.sign(payload, 'AnweshaChakraborty@#$%^&', options);
        
        res.json({token});

    })(req, res, next);
})

//passport.authenticate('local', {failureFlash: true })
router.post('/login2',  async (req, res, next)=> { 
  var email = req.body.email
  var password = req.body.password
  if (email && password) {
   
    let user = await User.findOne({
            where:{
                email:email
            }
    })
    if (!user) {
      res.status(401).json({ msg: 'No such user found', user });
    }
   if (user.password === password) {
      
      let payload = { user:user };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: 'ok', token: token });
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
});


// router.post("/sign-in",passport.authenticate('local-signin'),{session: false}, function(err,user,info){
//     if(err){
//         return next(err)
//     }

//     if(!user) {
//         return res.status(500).json(info)
//     }

//     const payload = {
//         username: user.first_name,
//         userlastname: user.last_name,
//         email: user.email,
//         mobile: user.mobile_no,
//         sub: `${user.id}`,
//         }

//     let token = jwt.sign(payload, jwtOptions.secretOrKey);
//       res.json({ msg: 'ok', token: token });
// })


router.post("/sign-up", async(req,res,next)=>{

  const password = req.body.password;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async(err,hash)=>{
      req.body.password = hash;
      let user_details = await User.create({
        first_name:req.body.first_name,
        last_name: req.body.last_name,
        email:req.body.email,
        mobile_no:req.body.mobile_no,
        password: hash
      })
  })

  res.json({
    success: true,
    code:200
  })

})




router.post("/sign-in", async function(req, res) {
  if(req.body.email && req.body.password){
    var email = req.body.email;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = await User.findOne({
      where:{
        email:req.body.email
      }
  })
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }

  // if(user.password === req.body.password) {
  //   // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
  //   var payload = {id: user.id};
  //   var token = jwt.sign(payload, jwtOptions.secretOrKey);
  //   res.json({message: "ok", token: token});
  // } else {
  //   res.status(401).json({message:"passwords did not match"});
  // }


  bcrypt.compare(password, user.password, async function(err, result){
            if(!result){
              res.status(401).json({message:"passwords did not match"});
            }

            else{
              var payload = {id: user.id};
              var token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({message: "ok", token: token});
            }
       })
});


router.post('/login', function(req, res, next) {
    passport.authenticate('local', {session: false}, function(err, user, info) {
        
        if (err) { return next(err); }

        if ( ! user) {
            return res.status(500).json(info.message)
        }

        const payload = {
            username: user.username,
            email: user.email
        }
        const options = {
            subject: `${user.id}`,
            expiresIn: 3600
        }
        const token = jwt.sign(payload, 'secret123', options);
        
        res.json({token});

    })(req, res, next);
})





router.post('/login-in', function(req, res, next) {
    passport.authenticate('local', {session: false}, function(err, user, info) {
        
        if (err) { return next(err); }

        if ( ! user) {
            return res.status(500).json(info.message)
        }

        const payload = {
            username: user.username,
            email: user.email
        }
        const options = {
            subject: user.id,
            expiresIn: 3600
        }
        const token = jwt.sign(payload, 'secret123', options);
        
        res.json({token});

    })(req, res, next);
})


router.get('/check-check', passport.authenticate('jwt', { session: false }), async(req, res)=> {
    var request = req.user
    res.json({
      success: true,
      code:200,
      request
    });
});



module.exports = router;