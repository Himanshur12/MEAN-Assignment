// Importing Routes And Modules

var config = require('../config/config.json');
var db_user = require('../model/schemas/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//User Login
exports.login = (req,res)=>{
    console.log(req.body);
    var jsonParse = JSON.parse(req.body);
    const email = jsonParse.email;
    const password = jsonParse.password;
                db_user.findOne({email:email}).exec()
                .then(result => {
                    var user_id=result._id;
                    console.log(user_id);
                    if(!result)
                        res.send("Invalid User.!");
                    if(result){
                        if(result.email != email)
                        {
                            console.log("User not found!");
                        }
                        bcrypt.compare(password,result.password,(err,isMatch) =>{
                            if(err) throw err;
                            if(isMatch){
                            var token = jwt.sign({id:user_id,email:email,password:password},config.secret_token,{expiresIn: 60 * 60});
                            res.json({
                                success :true,
                                message : 'Token Generated Successfully!',
                                token : token
                            });
                            }
                            else
                            res.json({
                                success: false,
                                message:'Incorrect Password!'
                            });
                        });    
                    }
                })
                .catch(err => {
                    console.log(err);
                    return;
                })
}

// User Register

exports.register = (req,res)=>{
    var content = JSON.parse(req.body.toString());
    
    var obj = new db_user({
        first_name: content.first_name,
        last_name: content.last_name,
        email: content.email,
        password: bcrypt.hashSync(content.password,10)
    })
    obj.save((err,data)=>{
        if(!err){
            res.json({
            success:true,
            message: 'User registered successfully',
            data :{
            first_name: obj.first_name,
            last_name:obj.last_name,
            email: obj.email
            }
            })
        }
        else{res.status(404).send('invalid data formate')}
    });
}

