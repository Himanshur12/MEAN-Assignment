// Import Review And Product Route

var db_review = require('../model/schemas/review');
var db_product = require('../model/schemas/product');

//Create Review

exports.create_review = (req,res)=>{
    var content = JSON.parse(req.body.toString())
    db_product.findOne({_id: content.p_id},function(err,docs){
        if(docs!== null){
            var obj = new db_review({
                r_msg: content.r_msg,
                p_id: content.p_id
            })
            obj.save((err,data)=>{
                if(!err){res.send('review added')}
                else{res.send('review does not added')}
            })
        }
        else{
        res.send('product not exist')
        }
    })
}

//Update Review
 
exports.update_review = (req,res)=>{
    var content = JSON.parse(req.body.toString()); 
    db_review.findOneAndUpdate({_id:req.params.id,p_id: req.params.p_id},content,{new: true},function (err, doc) {
        if (doc === null) {
        res.send("product review or review id not exist");
        }else {
        res.send("review updated");
        }
    })
}

// Delete Review

exports.delete_review = (req,res)=>{
    db_review.deleteOne({_id:req.params.id,p_id: req.params.p_id},function (err, docs) {
        if (docs.deletedCount === 0){
        res.send("product review or review id not exist");
        } else {
        res.send("review deleted");
        }
    })
}

//Show Product Review 

exports.show_product_reviews = (req,res)=>{
    var p_id = req.params.p_id
    db_review.find({p_id : p_id},function(err,docs){
        var msg=docs[0].r_msg;
        var p_id=docs[0].p_id;
        var date=docs[0].r_date;
       if(docs.length){
           res.json({
               success: true,
               data:{
                    msg:msg,
                    p_id:p_id,
                    date:date
        }
    })
       }       
       else{
           res.send('no review for this user product')
       }
    })
}