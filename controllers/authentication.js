var passport = require('passport');
const  express = require('express');

var User = require('../models').user;
var bcrypt = require('bcrypt');
var sequelize = require('sequelize');
const LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;


const passportJWT  = require('passport-jwt');
var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = 'secret123'; 



var verifyPassword = async function(password){
		password = req.body.password;
		var user = await User.findOne({
			where:{
				email:req.body.email
			}
		})

		if(!user){
				return res.status(500).json({'err':'Wrong User'})
		}
		else{
			bcrypt.compare(password, user.password, async function(err, result){
				return res.status(200).json({'msg':'Login Successfull'})
			})
		}
	}

	// passport.use('local-login',
	// 	new LocalStrategy(
	// 		{
	// 	        usernameField: 'email',
	// 	        passwordField: 'password'
    // 		},
	// 	async (username, password, done)=>{
	// 		var user = await User.findOne({
	// 			where:{
	// 				email: email
	// 			}
	// 		})
	// 		try{
	// 			return done(null, user)
	// 		}
	// 		catch(error){
	// 			return done(err, false)
	// 		}
	// 		bcrypt.compare(password, user.password, function(err, result){
    //    			if(!result){
    //    				return done(null, false, {message:'Incorrect Password'});
    //    			}

    //    			else{
    //    				return done(null, user)
    //    			}
    //    		})
	// 	}
	// ))

var passportJwtLogin = async function(req,res,next){
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
		}
module.exports = router;
