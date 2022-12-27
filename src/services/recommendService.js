const recommend = require("../models/recommend");



exports.sendIt = async(data)=>{
    try{
        let dataToSave = await recommend.create(data);
        if(dataToSave)
        return dataToSave;
    }
    catch(e){
        return e;
    }
}

exports.getIt = async()=>{
    try{
        let dataToShow = await recommend.find({});
        if(dataToShow)
        return dataToShow;
    }
    catch(e){
        return e;
    }
}