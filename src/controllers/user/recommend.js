const recommendService = require('../../services/recommendService');


exports.send = async(req,res)=>{
    try{
        let r = await recommendService.sendIt(req.body);
        res.status(200).send(r);
    }
    catch(e){
       // console.log("Error is : " + e);
        res.status(400).send(e);
    }
}

exports.getRecommend = async(req,res)=>{
    try{
        let r = await recommendService.getIt();
        res.status(200).send(r);
    }
    catch(e){
       // console.log("Error is : " + e);
        res.status(400).send(e);
    }
}