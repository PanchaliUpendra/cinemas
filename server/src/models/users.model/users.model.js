const usersdatabase = require("./users.mongo");

async function userRegisterModel(userData){
    try{
        const checkuser = await usersdatabase.findOne({useremail:userData.useremail});
        if(checkuser){
            return {success:false, message:'user already exists'};
        }
        const userRes = await usersdatabase.create({
            useruid:userData.useruid,
            useremail:userData.useremail,
            userphone:userData.userphone,
            username:userData.username,
            userpassword:userData.userpassword,
            userrole:userData.userrole
        });
        if(userRes){
            return {success:true,message:'successfully registered, please login now'};
        }else{
            return {success:false, message:'getting an error while user register'};
        }
    }catch(err){
        console.log('getting an error while user registered ',err);
        return {success:false, message:'getting an error while user register in model'};
    }
}

module.exports = {
    userRegisterModel,
}