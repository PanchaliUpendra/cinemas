const { addNewScheduleModel, getMovieScheduleData } = require("../../models/schedule.model/schedule.model");

async function addNewScheduleController(req,res){
    try{
        const result = await addNewScheduleModel(req.body);
        if(result.success){
            return res.status(201).json(result);
        }else{
            return res.json(result);
        }
    }catch(err){
        console.log('getting an error while adding the schedule in controller ' ,err);
        return res.status(500).json({success:false, message:'getting an error while adding the schedule in controller'});
    }
}

async function getMovieScheduleController(req,res){
    try{
        const result = await  getMovieScheduleData(req.params.movieid);
        if(result.success){
            return res.status(201).json(result);
        }else{
            return res.json(result);
        }
    }catch(err){
        console.log('getting an error while fetching the movie schedule in controller',err);
        return res.status(500).json({success:false, message:'getting an error while fetching the movie schedule in controller'});
    }
}

module.exports={
    addNewScheduleController, getMovieScheduleController

}