// Import Routes and Modules
const database  = require('../database'); 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Product Schema For Database

var productSchema = database.Schema({
  p_id: {
    type:String,
    require:true,
    trim:true
  },
  p_name: {
    type:String,
    require:true,
    trim:true
  },
  p_desc: {
    type:String,
    require:true,
    trim:true
  },
  p_img:{
    type:String,
    require:true
  },
  user: { 
    type: Schema.Types.ObjectId,
    ref: 'register' 
    },
 
  reviews:{
    type:Array,
    require:true,
    trim:true
    },
    
});

module.exports = database.model('products', productSchema);
