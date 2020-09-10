var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema =  mongoose.Schema;
var crypto = require('crypto');

const UserSchema = new Schema({
    email : {
        type: String,
        unique:true,
        lowercase:true
    },

    fullname : {
        type:String,
        lowercase:true
    },

    password:{
        type:String
    }
})


//this is where you hash the password you want to use 


// UserSchema.pre('save', (next)=>{
//     var user = this;
//     if(!user.isModified('password'))return next();

//     bcrypt.genSalt(10,(err,salt)=>{
//         if(err) return next(err);
//         bcrypt.hash(user.password, salt,null,function(err,hash){
//             if(err) return next(err);
//             user.password = hash
//             next();
//         })
//     })

// } )



//you need to compare the password you want to use ;

// UserSchema.methods.comparedPassword = function(password){
//     return bcrypt.compareSync(password, this.password);
// }



UserSchema.pre('save' , function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt,null, function(err, hash){
            if(err) return next(err);
            user.password=hash;
            next();
         })
    })
});


//compare the password
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
UserSchema.methods.gravatar = function(size){
    if(!this.size ) size = 200;
    if(!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?=s' + size + '&d=retro';
}


module.exports = mongoose.model('User', UserSchema);