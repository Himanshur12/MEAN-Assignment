//Import Modules 

const routes = require('./routes');
const bodyParaser = require('body-parser');

//Route Middleware

module.exports = function(app){
    app.use(bodyParaser.text());
    app.use('/api',routes);

//For Wrong Routes
    app.all('*',(req,res)=>{	 
        res.send('OOPs Wrong URL!');
    });
}

