var passport = require('passport');
var User = require('../models').user;
var bcrypt = require('bcrypt');
var sequelize = require('sequelize');
const LocalStrategy = require('passport-local').Strategy;


var verifyPassword = async function(password){
		password = req.body.password;
		var user = await User.findOne({
			where:{
				email:req.body.email
			}
		})

		if(!user){
			return res.status(500).json({'err':'wrong User'})
		}
		else{
			bcrypt.compare(password, user.password, async function(err, result){
			return res.status(200).json({'msg':'Login Successfull'})
			})
		}
}

var passportLogin = async function(req,res,error){

		passport.use(new LocalStrategy(
			{
		        usernameField: 'email',
		        passwordField: 'password'
    		},
		 async (username, password, done)=>{
			var user = await User.findOne({
				where:{
					email: email
				}
			})
			try{
				return done(null, user)
			}
			catch(error){
				return done(err, false)
			}

			// if(error){
			// 	return done(error);
			// }
			// if(!user){
			// 	return done(err, false)
			// }
			// if(!user.verifyPassword(password)){
			// 	return done(null, false)
			// }
			

		    //res.status(200).json({user:user})
		}
	))

}

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

module.exports = {passportLogin: passportLogin, passportJwtLogin:passportJwtLogin}
