const { addTheaterModel, getAllTheatersModel } = require("../../models/theaters.model/theaters.model")

async function addTheaterController(req,res){
    try{
        const result = await addTheaterModel(req.body);
        if(result.success){
            return res.status(201).json(result);
        }else{
            return res.json(result);
        }
    }catch(err){
        console.log('getting an error while add the theaters in controller ',err);
        return res.status(500).json({success:false,message:'getting an error while adding the theater in controller '});
    }
}

async function getAllTheatersController(req,res){
    try{
        const  result = await getAllTheatersModel();
        if(result.success){
            return res.status(201).json(result);
        }else{
            return res.json(result);
        }
    }catch(err){
        console.log('getting an error while fetching all theaters',err);
        return res.status(500).json({success:false,message:'getting an error while fetching the theaters in controller '});
    }
}

module.exports = {
    addTheaterController,
    getAllTheatersController
}