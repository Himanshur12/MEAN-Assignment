// CURD Operations On Products

var product_services = require('../controllers/product');
module.exports = function (router) {
  
//Create Product 
router.post('/product', function (req, res) {
product_services.create_product(req,res);
})

// Update Product
router.put('/product/:id', function (req, res) {
product_services.update_product(req,res);
})

// Delete Product
router.delete('/product/:id', function (req, res) {
product_services.delete_product(req,res);
})

// Read Product
router.get('/product/:id', function (req, res) {
  product_services.show_user_products(req,res);
})

}
