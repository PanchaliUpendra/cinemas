const moviedatabase = require("./movies.mongo");

async function addMovieModel(movieData){
    try{
        const movieRes = await moviedatabase.create({
            moviename:movieData.moviename,
            movieuid:movieData.movieuid,
            movieimgurl:movieData.movieimgurl,
            moviedes:movieData.moviedes,
            movietype:movieData.movietype,
            moviedur:movieData.moviedur,
            movietktcost:movieData.movietktcost
        });
        if(movieRes){
            return {success:true, message:'successfully added the movie'};
        }else{
            return {success:false, message:'getting an error while added the movie'};
        }
    }catch(err){
        console.log('getting an error while adding the movoie in model ',err);
        return {success:false, message:'getting an error while adding the movie in model ',err};
    }
}

async function getMovieModel(){
    try{
        const movies = await moviedatabase.find({});
        if(movies){
            return {success:true, message:'successfully fetched ',movies:movies};
        }else{
            return {success:false, messgae:'gettiong an eror whhile fetching movies'};
        }
    }catch(err){
        console.log('getting an error while fetching the movies ',err);
        return {success:false, message:'getting an error while fetching the movies'};
    }
}

async function getEachmovieModel(movieid){
    try{
        const movieresponse = await moviedatabase.findOne({movieuid:movieid});
        if(movieresponse){
            return {success:true, message:'successfully fetched', movie:movieresponse};
        }else{
            return {success:false, message:'getting an error while fetching'};
        }
    }catch(err){
        console.log('getting an error while fetching the movie data ',err);
        return {success:false, message:'getting an error while fetching movie data'};
    }
}

module.exports ={
    addMovieModel,
    getMovieModel,
    getEachmovieModel
}