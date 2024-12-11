const bookingsdatabase = require("./bookings.mongo");


async function addNewTicketModel(tktData){
    try{
        const tktres = await bookingsdatabase.create({
            userid:tktData.userid,
            bookinguid:tktData.bookinguid,
            moviename:tktData.moviename,
            theatername:tktData.theatername,
            theateruid:tktData.theateruid,
            movieimgurl:tktData.movieimgurl,
            movieuid:tktData.movieuid,
            ticketcost:tktData.ticketcost,
            totaltickets:tktData.totaltickets,
            date:tktData.date,
            starttime:tktData.starttime,
            endtime:tktData.endtime,
            moviedes:tktData.moviedes,
            moviedur:tktData.moviedur,
            movietype:tktData.movietype,
            useremail:tktData.useremail,
            username:tktData.username
        });
        if(tktres){
            return {success:true, message:'The movie tickets have been successfully booked'};
        }else{
            return {success:false, message:'getting an error while booking tickets'};
        }
    }catch(err){
        console.log('getting an error while booking the ticket',err);
        return {success:false, message:'getting an error while booking the tickets'};
    }
}

async function getEachUserBookingsModel(userid){
    try{
        const tickets = await bookingsdatabase.find({userid:userid});
        if(tickets){
            return {success:true, message:'successfully fetched', tickets:tickets};
        }else{
            return {success:false, message:'getting error while fetching'};
        }
    }catch(err){
        console.log('getting an error while fetching the users tickets',err);
        return {success:false, message:'getting an error while fetching the users tickets in model'};
    }
}

async function getAllBookingsModel(){
    try{
        const alltickets = await bookingsdatabase.find({});
        if(alltickets){
            return {success:true,message:'successfully fetched',alltickets:alltickets};
        }else{
            return {success:false,message:'error while fetching'};
        }
    }catch(err){
        console.log('getting an erorr while fetching all tickets in model ',err);
        return {success:false, message:'getting an error while fetching all tickets'};
    }
}

module.exports ={
    addNewTicketModel,
    getEachUserBookingsModel,
    getAllBookingsModel
}