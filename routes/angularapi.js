var express = require('express');
var router = express.Router();
const Customer = require('../models').Customer;
const Order = require('../models').Order;
const Item = require("../models").Item;
const OrderItem = require("../models").OrderItems;
const jwt  = require('jsonwebtoken');

const passport = require('passport');
const crypto = require('crypto');
const session = require('express-session');
const Sequelize = require('sequelize');
const passportLocal = require('passport-local');
var State =  require('../models').state;
var City =  require('../models').city;
var Subject = require('../models').subject;
var StudentDetails = require('../models').studentDetails;
var studentSubject = require('../models').studentSubject;
var studentHoby = require('../models').studentHoby;
var Hoby = require('../models').hoby;



/* GET users listing. */

if(typeof localStorage === 'undefined' || localStorage === null){
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./scratch')  
	//console.log(localStorage)
}


function checkLogin(req,res,next) {
	const token = localStorage.getItem('token')
	try{
		jwt.verify(token,'anweshachakraborty');
	}	catch(err){
		res.send('You need To Login')
	}

	next();

}

router.get('/',async(req,res)=>{
	res.send("you need to login")
})
router.get('/protectedCheck', passport.authenticate('jwt', { session: false }), async(req, res, next)=> {
    res.json({name: 'Watch'});
});


//router.get("/protected", passport.authentication())
router.get('/login',checkLogin,async(req,res)=>{
	const token = jwt.sign({foo:'bar'},'anweshachakraborty')
	localStorage.setItem('token',token)
	res.send("login successfull")
})

router.get('/logout',async(req,res)=>{
	//jwt.sign({foo:'bar'},'anweshachakraborty')
	res.send("logout successfull")
})






router.get("/test-your-api", async(req,res)=>{
	var message = 'my name is anwesha'
	res.json({
		success: true,
		code:200,
		message
	})
})


router.get("/create-all-customer-details", async(req,res)=>{
	var names = ['anwesha','saheli','suporna','sharmila','subrata','avijit','arpan','rahul'
	,'moumita','somenath']
	var addresses = ['bengaluru','pune','maharastra','kerala','kanyakumari',
	'digha','puri','odisha','shyamnagar','dakhsineswar']
	for(let i = 0; i<names.length; i++){
		var cust_details = await Customer.create({
		name:names[i],
		address:addresses[i]
		})
	}
	
	res.json({
		success: true,
		code:200,
		cust_details
	})
})

router.get("/create-all-item-details", async(req,res)=>{
	var names = ['chili-chicken','chili-mutton','chowmin','momo','kabab','fish-fry','fish-kobiraji','polao'
	,'eggroll','chickenroll']
	var addresses = ['150.50','142.30','190.25','200','180',
	'190','220','225','150','190']
	for(let i = 0; i<names.length; i++){
		var cust_details = await Item.create({
		name:names[i],
		price:addresses[i]
		})
	}
	
	res.json({
		success: true,
		code:200,
		cust_details
	})
})

router.get("/view-all-customer-details", async(req,res)=>{
	var customer_details = await Customer.findAll({
		order:[['id','ASC']]
	})
	res.json({
		code:200,
		success: true,
		customer_details
	})
})
router.get("/view-all-item-details", async(req,res)=>{
	var item_details = await Item.findAll({
		order:[['id','ASC']]
	})
	res.json({
		code:200,
		success: true,
		item_details
	})
})




///Anwesha Chakraborty schol details API

router.get('/create-subject', async(req,res)=>{
	var subjects = ['computer science','mathematics','physics','chemistry',
			'biology','bengali','english',
			'sociology','archeology','biomechanics','electronics and comminication',
			'information technology',
			'history','geography'
				]
	for(let i=0; i<subjects.length; i++){
			var create_subjects = await Subject.create({
										name:subjects[i]
							})
	}	

	res.json({
		code:200
	})
	
})

router.get("/find-all-subject", async(req,res)=>{
	var subjects = await Subject.findAll({
		attributes:['id','name']	
	});
	res.json({
		success:true,
		code:200,
		subjects
	})
})
router.get("/find-all-state", async(req,res)=>{
	var states =  await State.findAll({
		attributes:['id','name']
	})
	res.json({
		success:true,
		code:200,
		states
	})
})

router.post("/find-all-city", async(req,res)=>{
	var state_id = req.body.params
	var cities = await City.findAll({
		where:{
			state_id: state_id
		}
	})
	res.json({
		success:true,
		code:200,
		cities
	})
})

router.get('/create-hobby-details', async(req,res)=>{
	var hobbies = ['dancing','singing','mimicry','painting','popsinging','guiter playing'
					,'fluit','gernalism','mounting','rock climbing']
	for(let i =0; i<hobbies.length ; i++){
		var create_hoby = await Hoby.create({
			name: hobbies[i]
		})
	}
	res.json({
		success: true,
		code:200,
		create_hoby
	})
})

router.get("/get-all-hoby-details", async(req,res)=>{
	var hoby_details = await Hoby.findAll({
		attributes:['id','name']
	})
	res.json({
		success: true,
		code:200,
		hoby_details
	})
})


router.post("/create-student-details", async(req,res)=>{
	var subjectArr = req.body.subject;
	var hobbiesArr = req.body.hobies;

	var create_student_details = await StudentDetails.create({
		name: req.body.name,
		city_id: req.body.city,
		state_id: req.body.state,
		gender: req.body.gender
	})

	var student_id = create_student_details.id;

	for(let i=0; i<subjectArr.length; i++){
		var subject_create = await studentSubject.create({
				student_id:student_id,
				subject_id:subjectArr[i]
		})
	}

	for(let i=0; i<hobbiesArr.length; i++){
		var hobby_create = await studentHoby.create({
				student_id:student_id,
				hoby_id:hobbiesArr[i]
		}) 
	}


	res.json({
		success: true,
		code:200,
		'message':'Student Details Added Successfully'
	})
})



router.post('/view-individual-student-details',async(req,res)=>{
	console.log(req.body)
	var student_id = req.body.student_id
	//var student_id = req.params['student_id']
	StudentDetails.belongsTo(City,{
		foreignKey:'city_id'
	})
	StudentDetails.belongsTo(State,{
		foreignKey:'state_id'
	})

	studentHoby.belongsTo(Hoby,{
		foreignKey:'hoby_id'
	})
	studentSubject.belongsTo(Subject,{
		foreignKey:'subject_id'
	})
	var student_details = await StudentDetails.findOne({
		where:{
			id:student_id
		},
		include: [{
			model:State,
			attributes:['id','name']
		},{
			model:City,
			attributes:['id','name']
		}]
	})

	var subject_details = await studentSubject.findAll({
		where:{
			student_id: student_id
		},
		include:[{
			model: Subject,
			attributes:['id','name']
		}]
	})
	var subject_list = []
	for(let i=0; i<subject_details.length; i++){
		subject_list.push(subject_details[i].subject)
	}	
	var all_subject_list = []
	for(let j=0; j<subject_list.length; j++){
		all_subject_list.push({
			
		})
	}
	var hoby_details = await studentHoby.findAll({
		where:{
			student_id: student_id
		},
		include:[{
			model: Hoby,
			attributes:['id','name']
		}]
	})

	var hoby_list = []
	for(let i =0; i<hoby_details.length; i++){
		hoby_list.push(hoby_details[i].hoby)
	}
	res.json({
		success: true,
		code:200,
		student_details,
		hoby_list,
		subject_list
	})
})


router.get('/view-all-student-details', async(req,res)=>{
	StudentDetails.belongsTo(City,{
		foreignKey:'city_id'
	})
	StudentDetails.belongsTo(State,{
		foreignKey:'state_id'
	})

	var student_details = await StudentDetails.findAll({
		include: [{
			model:State,
			attributes:['id','name']
		},{
			model:City,
			attributes:['id','name']
		}]
	})	

	res.json({
		success: true,
		code:200,
		student_details
	})
})



router.post("/echo", function(req, res) {
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";
  
  var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: speech
            }
          }
        ]
      }
    }
  };
  
  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});



////Start Of node authentication with passport and jwt


router.get("/user-login",async(req,res)=>{

	res.render('login',{
		title:'Login page'
	})
})

router.get("/user-dashboard",async(req,res)=>{
	const form = `Welcome to DashBoard`
	res.send(form)
})

module.exports = router;
