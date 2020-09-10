const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const productSchema = new Schema({
    title : {
        type:String
    },
    
    date : {
       type: Date
    },
    
    category :{
        type:String
    },

    excerpt:{
        type:String
    },
    
    imgUrl: {
        type:String
    }
})

module.exports = mongoose.model('product', productSchema);