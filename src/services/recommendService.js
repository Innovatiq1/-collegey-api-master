const recommend = require("../models/recommend");
import { emailType, sendEmail } from '../utilities/emailHelper';


exports.sendIt = async(data)=>{
    try{
        let dataToSave = await recommend.create(data);
        console.log('dataToSave',dataToSave);
        sendEmail(emailType.NEW_RECOMMENDATION,dataToSave);  
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