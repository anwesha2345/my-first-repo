const express = require('passport');
var passport = require('passport');
var sequelize = require('sequelize');
var LocalStorage = require('local-storage');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var User = require('../models').user;
var bcrypt = require('bcrypt');
var router = express.Router();



module.exports = router;