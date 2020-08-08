const  express = require('express');
var router = express.Router();
var UsersAuth = require('../controllers/userController');
var AuthController = require('../controllers/authentication');

router.get('/news-feeds-view', async(req,res)=>{
	res.json({
		title:'Anwesha News Feeds'
	})
})


router.get("/users/view-user-details", UsersAuth.getValues)
router.post("/users/create-user", UsersAuth.createData)
router.post("/users/update-user", UsersAuth.updateData)
router.get("/users/delete-user/:id", UsersAuth.deleteData)
router.post("/user-login-api", AuthController.passportLogin)


module.exports = router;