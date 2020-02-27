// Import Modules

var express = require('express');
var jwt_Decode = require('jwt-decode');
var jwt=require('jsonwebtoken');

// Import Routes
var db_user=require('../model/schemas/user');
var auth = require('../controllers/auth');
var config = require('../config/config.json');

var myKey = config.secret_token;
var router = express.Router();

// Register Route For Post Method
router.post('/auth/register', function(req,res){
    auth.register(req,res)
});

// Login Route For Post Method
router.post('/auth/login', function (req,res) {
    auth.login(req,res)
});


// Go To User Route
require('./user')(router);

// Token Verification

    const checkAuth = (req, res, next) => {
        var auth_head=req.headers['token'];
        if (typeof auth_head==='undefined') {
            return res.status(400).json({ error: 'No Token Sent!' });
        }else{
        var Decoder = jwt_Decode(auth_head);
            if (typeof auth_head!=='undefined') {
                jwt.verify(auth_head,myKey, (err,data) =>{
                if(err) {
                    console.log(err);
                    res.sendStatus(400);
                }
                else{
                    db_user.findOne({_id:Decoder.id}).exec()
                    .then(result => {
                        if(!result){
                            res.send("Invalid User!");
                        }else{
                            next();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return;
                    })
                }
                })
    }
        }
    }
router.use(checkAuth);

//Product Route
require('./product')(router);

//Product Route
require('./review')(router);

module.exports = router;
