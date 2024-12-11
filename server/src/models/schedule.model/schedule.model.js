const scheduledatabase = require("./schedule.mongo");

async function addNewScheduleModel(scheduleData){
    try{
        const scheduleres = await scheduledatabase.create({
            scheduleuid:scheduleData.scheduleuid,
            moviename:scheduleData.moviename,
            movieuid:scheduleData.movieuid,
            scheduletheater:scheduleData.scheduletheater,
            theateruid:scheduleData.theateruid,
            showtime:scheduleData.showtime,
            showdate:scheduleData.showdate,
            ticketcost:scheduleData.ticketcost,
            totaltickets:scheduleData.totaltickets,
        });
        if(scheduleres){
            return {success:true, message:'successfully added'};
        }else{
            return {success:false, message:'getting an error in schedule model while adding'};
        }
    }catch(err){
        console.log('getting an error while uploading the schedule data',err);
        return {success:false, message:'getting an error while scheduling the data'};
    }
}

async function getMovieScheduleData(movieuid){
    try{
        const movieScheduleRes = await scheduledatabase.find({movieuid:movieuid});
        if(movieScheduleRes){
            return {success:true, message:'successfully fetched movie schedule data', moiveschedule:movieScheduleRes};
        }else{
            return {success:false, message:'getting an error while fetching movie data'};
        }
    }catch(err){
        console.log('getting an error while fetching movie schedule data ',err);
        return {success:false, message:'getting an error while fetching the movie data in model'};
    }
}

module.exports={
    getMovieScheduleData,
    addNewScheduleModel,
}