const passport = require('passport');
const bCrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').user;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto  = require('crypto');
const validPassword = require('../lib/passwordUtils').validPassword;

//require('./config/passport')

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};

const verifyCallback = (username, password, done) => {

    User.findOne({ username: username })
        .then((user) => {

            if (!user) { return done(null, false) }
            
            const isValidPassword = function(userpass, password){
            	return bCrypt.compareSync(password, userpass);
            }
            
            if (isValidPassword) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});