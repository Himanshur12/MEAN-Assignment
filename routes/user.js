// CURD Operation on User

var Services = require('../controllers/user');
module.exports = function (router) {

//Alreardy Create User

//Get User 
router.get('/users/:user_id', function (req, res) {
    console.log(req.param);
    Services.get_user(req,res)
})

//Delete User
router.delete('/users/:user_id', function(req,res){
    Services.delete_user(req,res)
})

// Update User
router.put('/users/:user_id', function(req,res){
    Services.update_user(req,res)
})
}
