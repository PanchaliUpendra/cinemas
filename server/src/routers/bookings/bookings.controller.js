const { addNewTicketModel, getEachUserBookingsModel , getAllBookingsModel} = require("../../models/bookings.model/bookings.model")

async function addNewTicketController(req,res){
    try{
        const result = await addNewTicketModel(req.body);
        if(result.success){
            return res.status(201).json(result);
        }else{
            return res.json(result);
        }
    }catch(err){
        console.log('getting an error while adding the movie tickets in controller ',err);
        return res.status(500).json({success:false, message:'getting an error while booking tickets in controller'});
    }
}

async function getEachUserBookingsController(req,res){
    try{
        const result = await getEachUserBookingsModel(req.params.userid);
        if(result.success){
            return res.status(201).json(result);
        }else{
            return res.json(result);
        }
    }catch(err){
        console.log('getting an error while fetching each usetr the movie tickets in controller ',err);
        return res.status(500).json({success:false, message:'getting an error while fetching each user tickets in controller'});
    }
}

async function getAllBookingsController(req,res){
    try{
        const result = await getAllBookingsModel();
        if(result.success){
            return res.status(201).json(result);
        }else{
            return res.json(result);
        }
    }catch(err){
        console.log('getting an error while fetching all the movie tickets in controller ',err);
        return res.status(500).json({success:false, message:'getting an error while fetching all tickets in controller'});
    }
}

module.exports ={
    addNewTicketController,
    getEachUserBookingsController,
    getAllBookingsController
}