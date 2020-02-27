// CURD Operation on Review

var Review_services = require('../controllers/review');
module.exports = function (router) {
    
//Create Review 
router.post('/reviews', function (req, res) {
    Review_services.create_review(req,res);
})

// Update Review
router.put('/reviews/:p_id/:id', function (req, res) {
    Review_services.update_review(req,res);
})

// Read Review
router.get('/reviews/:p_id', function (req, res) {
    Review_services.show_product_reviews(req,res);
})

// Delete Review
router.delete('/reviews/:p_id/:id', function (req, res) {
    Review_services.delete_review(req,res);
})


}
