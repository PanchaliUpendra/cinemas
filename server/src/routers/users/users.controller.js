const { userRegisterModel } = require("../../models/users.model/users.model");
const jwt = require('jsonwebtoken');
const usersdatabase = require("../../models/users.model/users.mongo");

const generateToken = (user) =>{
    return jwt.sign(
        {userrole:user.userrole,username:user.username,useremail:user.useremail,useruid:user.useruid,userphone:user.userphone},
        process.env.JWT_TOKEN,//here the secrate key must store in the environment 
        {expiresIn:'5h'}//token expiration time
    );
};

async function userLoginController(req,res){ //user login controller
    const {useremail , userpassword} = req.body;
    try{
        const user = await usersdatabase.findOne({useremail});
        if(!user){
            return res.status(400).json({success:false,message:'Invalid Credentials'});
        }

        const isMatch = user.userpassword===userpassword;
        if(!isMatch){
            return res.status(400).json({success:false,message:'Invalid Credentials'});
        }

        const token = generateToken(user);
        // console.log('generating token ',token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Set to true in production with HTTPS
            maxAge: 5*3600000, // 1 hour
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' // Allows cookies to be sent cross-origin
        });
        res.json({success:true,message:'login successful',user:user});
        
    }catch(err){
        console.log('getting error in users controller',err);
        res.status(500).json({success:false, message:'getting error in users controller'});
    }

}

async function userRegisterController(req,res){
    try{
        const result = await userRegisterModel(req.body);
        if(result.success){
            return res.status(201).json(result);
        }else{
            return res.json(result);
        }
    }catch(err){
        console.log('getting an error while user registers in controller ',err);
        return res.status(500).json({success:false, message:'getting an error while user registers '});
    }
}

async function checkAuthController(req,res){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success:false,message:'token not found or expired'});
    }
    try{
        const decoded =  jwt.verify(token,process.env.JWT_TOKEN);
        return res.json({success:true,message:'successfully verified',user:decoded});
    }catch(err){
        return res.status(403).json({success:false,message:'token not valid'});
    }
}


async function userLogoutController(req,res){
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Set to true in production with HTTPS
            // maxAge: cookiesMaxAge, // 1 hour
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' // Allows cookies to be sent cross-origin
        });
        res.json({success:true,message:'Logged Out Successfully'});
    }
    catch(err){
        consolelog('getting an error while logout',err);
        res.json({success:false,message:'error while logout'});
    }
}

module.exports = {
    userRegisterController,
    userLoginController,
    checkAuthController,
    userLogoutController
}