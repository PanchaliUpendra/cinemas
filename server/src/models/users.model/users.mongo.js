const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    useruid:String,
    useremail:{
        type:String,
        require:true,
        unique:true
    },
    userphone:Number,
    username:String,
    userpassword:String,
    userrole:String
});

const usersdatabase = mongoose.model('users',usersSchema);

module.exports  = usersdatabase;