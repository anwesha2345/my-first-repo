const User = require('../models').user;
var passport = require('passport');
var bcrypt = require('bcrypt');

var getValues = async function(req, res, error){
    try{
    	var user = await User.findAll({});
    	res.status(200).json({user: user});
    }catch(error){
    	res.status(400).json({'error':error});
    }
	
}

var createData = async function(req, res, error){
	try{
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var email = req.body.email;
		var password = req.body.password;
		var mobile_no = req.body.mobile_no;
		var saltRounds = 10;
		bcrypt.hash(password,saltRounds,async(err,hash)=>{
			req.body.password = hash;
			let user_details = 	await User.create({
				first_name: first_name,
				last_name: last_name,
				email: email,
				password:hash,
				mobile_no:mobile_no
			})
			res.status(200).json({"data":user_details})
		})

	}
	catch(error){
		res.status(400).json({'error':error});
	}
}

var updateData = async function(req,res,error){
	try{
		var user_id = req.query.user_id
		var first_name =req.body.first_name;
		var last_name = req.body.last_name;
		var email = req.body.email;
		var update_user = await User.update({
			first_name:first_name,
			last_name:last_name,
			email:email,
			mobile_no:req.body.mobile_no
			},
			{
				where:{
					id:user_id
				}
			});

		res.status(200).json({"data":update_user});
	}
	catch(error){
		res.status(500).json(error)
	}
}

var deleteData = async function(req,res,error){
	try{
		var delete_id = req.params['id'];
		var delete_user = await User.destroy({
			where:{
				id:delete_id
			}
		})

		res.status(200).json(delete_user);

	}
	catch(error){
		res.status(500).json(error);
	}
}

module.exports = {getValues:getValues, createData:createData, updateData:updateData,
					deleteData:deleteData}