const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../models').user;
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;


const passportJWT  = require('passport-jwt');



var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = 'secret123'; 




passport.use(new LocalStrategy(
 
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async function(email, password, done) {
 
       var user = await User.findOne({
	       	where:{
	       		email:email
	       	}
       })

       if(user){
       	return done(null,user)
       }
       else{
       	return done(null, false,{message: 'Incorrect username.'})
       }

       bcrypt.compare(password, user.password, function(err, result){
       			if(!result){
       				return done(null, false, {message:'Incorrect Password'});
       			}

       			else{
       				return done(null, user)
       			}
       })

       // if(password == user.password){
       // 		return done(null, false, {message:'Incorrect Password'});
       // }

       // else{
       // 		return done(null, user)
       // }
 
 
    }
 
));


passport.use(new JwtStrategy(options, function(jwtPayload, done) {

     User.findOne({
            where: {
                id:jwtPayload.sub
            }
        }).then(user => {
                  if (user) {
                    return done(null, user);
                  }
                  return done(null, false);
                })
                .catch(err => console.log(err));


}))








//passport.use(strategy);




module.exports = router;
