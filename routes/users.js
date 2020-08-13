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

var blogImage  = require('../models').blogImages;
var BlogTagList = require('../models').blogTagList;
var blogImage  = require('../models').blogRelatedIsssues;
var ClassRank  = require('../models').classRank;

var chatUser = require("../models").chatUser;

var ClassIssues = require('../models').classRelatedIssues;
var Issues = require('../models').issues;
const socket = require('socket.io');
var Teacher = require('../models').teacher;
var ClassNames = require('../models').classesName;

var Jimp = require('jimp');
var fs = require('fs');
const path = require("path");

const jwt = require('jsonwebtoken');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); 
jwtOptions.secretOrKey = 'AnweshaChakraborty@#$%^&';

jwtOptions.issuer = 'accounts.examplesoft.com';
jwtOptions.audience = 'yoursite.net';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get("/get-all-student", async(req,res)=>{
  var student_details = await User.findAll({
    attributes:['first_name','id','last_name']
  })
  res.render('facebook/news_feed',{
    title:'News Feeds Details',
    student_details
  })
})

router.get("/view-all-teacher-details", async(req,res)=>{
	var view_class = await ClassNames.findAll({
		attributes:['id','name']
	})
	res.render('teacher/index',{
		title:'View All Teacher Details',
		view_class
	})
})

router.get("/create-class", async(req,res)=>{
	var class_name = ['LITTLE ANGEL','PRE KG','KG','I','II','III','IV',,'V','VI','VII','VIII','IX','X','XI','XII']
	
	for(let i =0; i<class_name.length; i++){
		var create_class = await ClassNames.create({
		name:class_name[i]
		})	
	}
	res.json({
		success: true,
		code:200
	})
})




router.post("/create-teacher-details", async(req,res)=>{
	 console.log(req.body)
	 for(let i=0 ; i<req.body.name.length; i++){
	 		var class_ids = JSON.stringify(req.body.class_id[i])
		 	var create_details = await Teacher.create({
		 	name:req.body.name[i],
		 	email:req.body.email[i],
		 	password:req.body.address[i],
		 	class_ids:class_ids
	 	})	
	 }
	 
	 res.json({
	 	success:true,
	 	code:200
	 })
})



router.get("/create-chat", async(req,res)=>{
	var chat_details = await chatUser.findAll({
		attributes:['id','handler_name','message','socket_id']
	})
	res.render('chat',{
		title:'My First Chat App',
		chat_details
	})
})


router.post("/create-chat-details", async(req,res)=>{
	console.log(req.body);
	var create_chat = await chatUser.create({
				handler_name:req.body.handle,
				message:req.body.message
	})
	res.json({
		success: true,
		code:200
	})
})

module.exports = router;
