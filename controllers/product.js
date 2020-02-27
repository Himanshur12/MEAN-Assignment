// Import Routes And Modules
var user = require('../model/schemas/user');
var product = require('../model/schemas/product');
var jwt_Decode = require('jwt-decode');

// Create Product
exports.create_product = (req,res)=>{
    var first_name;
    var last_name;
    var email;
    var auth_head=req.headers['token'];
    console.log(auth_head);
        var decoder = jwt_Decode(auth_head);
        var user_id = decoder.id;
    var content = JSON.parse(req.body.toString())
            user.findOne({_id: user_id}, (req,docs)=>{
                if (docs!==null && docs!==undefined) {
                    if (docs.length) {
                        var obj = new product({
                            p_name: content.p_name,
                            p_desc: content.p_desc,
                            p_image: content.p_image,
                            obj_id: user_id,
                            reviews: []
                        })
                        obj.save((err,data)=>{
                            if (!err) {
                                res.send('product added')
                            }else{
                                res.send(err);
                            }
                        })
                    }else{
                        var obj = new product({
                            p_id: content.p_id,
                            p_name: content.p_name,
                            p_desc: content.p_desc,
                            p_image: content.p_image,
                            obj_id: user_id
                        })
                        obj.save((err,data)=>{
                            if (!err) {
                                user.findOne({_id:user_id},(err,docs)=>{
                                    if (err) res.send(err);
                                    first_name=docs.first_name;
                                    last_name=docs.last_name;
                                    email=docs.email;
                                        res.json({
                                            success:true,
                                            message: 'product added successfully',
                                            data:{
                                                _id:content.p_id,
                                                title:content.p_name,
                                                description:content.p_desc,
                                                img_url:content.p_image,
                                                user:{
                                                first_name:first_name,
                                                last_name:last_name,
                                                email:email
                                                }
                                            }
                                        })
                                })
                            }else{
                                res.send(err);
                            }
                        })
                    }
                }else{
                    res.send('user does not exist');
                }
            })
}

// Delete Product
exports.delete_product = (req,res)=>{
    var _id = req.params.id;
    product.deleteOne({_id: _id},function (err, doc) {
        if (doc.deletedCount === 0) {
            res.send("product does not exist");
        }else{
       res.send("product deleted");
        }
    })
}

// Update Product
exports.update_product = (req,res)=>{
    var p_id = req.params.id;
    var content = JSON.parse(req.body.toString())
    product.findOneAndUpdate({_id: p_id },content,{new: true},function (err, docs) {
        if (docs === null) {
            res.send("product does not exist");
        }else {
            res.send("product updated");
        }
    })
}

// Details Of User Product
exports.show_user_products = (req,res)=>{
    var p_id = req.params.id;
    product.findOne({_id:p_id})
    .populate('obj_id')
    .exec()
    .then(result=>{
            res.json({
            _id:result._id,
            p_name:result.p_name,
            p_desc:result.p_desc,
            p_image:result.p_image
        })
    })
}