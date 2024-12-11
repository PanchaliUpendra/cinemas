const theaterdatabase = require("./theaters.mongo");


async function addTheaterModel(theaterData){
    try{
        const theaterRes = await theaterdatabase.create({
            theateruid:theaterData.theateruid,
            theatername:theaterData.theatername,
            theartershows:theaterData.theartershows,
            theateraddress:theaterData.theateraddress,
            theaterseats:theaterData.theaterseats
        });
        if(theaterRes){
            return {success:true, message:'successfully added the theater'};
        }else{
            return {success:false, message:'getting an error while adding the theater in model'};
        }
    }catch(err){
        console.log('getting an error while adding the theater in model ',err);
        return {success:false, message:'getting an error while adding the theater in model'};
    }
}

async function getAllTheatersModel(){
    try{
        const theaterRes = await theaterdatabase.find({});
        if(theaterRes){
            return {success:true, message:'successfully fetched',alltheaters:theaterRes}
        }else{
            return {success:false, message:'getting an error in model'};
        }
    }catch(err){
        console.log('getting an error while fetching the theaters in model',err);
        return {success:false,message:'getting an error while fetching the model '};
    }
}

module.exports ={
    addTheaterModel,
    getAllTheatersModel
}