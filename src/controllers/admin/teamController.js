const Team = require('../../models/teams');
const BoardofAdvisor = require('../../models/boardofadvisor');
const BoardofDirector = require('../../models/boardofdirector');
const { ObjectId } = require('bson');
const factory = require('../../controllers/factoryFunctions/handlerFactory');

// using default factory functions
/* Start Team Members Functions */
exports.getAllTeams = factory.getAll(Team);
exports.getAllTeamCounter = factory.getAllCounter(Team);
exports.getTeam = factory.getOne(Team);
exports.createTeam = factory.createOne(Team);
exports.updateTeam = factory.updateOne(Team);
exports.deleteTeam = factory.deleteOne(Team);

export async function updateTeamMemberStatus(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    let status = true;
    let textmessage = '';
    where["_id"] = cid; 
    if(req.body.status == 'active'){
      //  where["active"] = false;
        status = true;
        textmessage = "Team member activted successfully";
    }else{
      //  where["active"] = true;
        status = false;
        textmessage = "Team member de-activted successfully";
    }
    //console.log("Where :",where, " active :", status);
    try { 
        let result = await Team.findOneAndUpdate(where, {
            active: status,
        });    
       // console.log("result :",result); 
        res.status(200).json({  
            status: "success",
            message: textmessage,
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Team member updatation failed',
		});
    }
}
/* End Team Members Functions */


/* Start Board of Directors Functions */
exports.getAllBoardofDirectors = factory.getAll(BoardofDirector);
exports.getAllBoardofDirectorCounter = factory.getAllCounter(BoardofDirector);
exports.getBoardofDirector = factory.getOne(BoardofDirector);
exports.createBoardofDirector = factory.createOne(BoardofDirector);
exports.updateBoardofDirector = factory.updateOne(BoardofDirector);
exports.deleteBoardofDirector = factory.deleteOne(BoardofDirector);

export async function updateBoardofDirectorsStatus(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    let status = true;
    let textmessage = '';
    where["_id"] = cid; 
    if(req.body.status == 'active'){
        where["active"] = false;
        status = true;
        textmessage = "BoardofDirector member activted successfully";
    }else{
        where["active"] = true;
        status = false;
        textmessage = "BoardofDirector member de-activted successfully";
    }
   // console.log("Where :",where, " active :", status);
    try { 
        let result = await BoardofDirector.findOneAndUpdate(where, {
            active: status,
        });    
       // console.log("result :",result); 
        res.status(200).json({  
            status: "success",
            message: textmessage,
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'BoardofDirector member updatation failed',
		});
    }
}

/* End Board of Directors Functions */


/* Start Board of Advisors Functions */
exports.getAllBoardofAdvisors = factory.getAll(BoardofAdvisor);
exports.getAllBoardofAdvisorCounter = factory.getAllCounter(BoardofAdvisor);
exports.getBoardofAdvisor = factory.getOne(BoardofAdvisor);
exports.createBoardofAdvisor = factory.createOne(BoardofAdvisor);
exports.updateBoardofAdvisor = factory.updateOne(BoardofAdvisor);
exports.deleteBoardofAdvisor = factory.deleteOne(BoardofAdvisor);

export async function updateBoardofAdvisorsStatus(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    let status = true;
    let textmessage = '';
    where["_id"] = cid; 
    if(req.body.status == 'active'){
        where["active"] = false;
        status = true;
        textmessage = "BoardofAdvisor member activted successfully";
    }else{
        where["active"] = true;
        status = false;
        textmessage = "BoardofAdvisor member de-activted successfully";
    }
    //console.log("Where :",where, " active :", status);
    try { 
        let result = await BoardofAdvisor.findOneAndUpdate(where, {
            active: status,
        });    
       // console.log("result :",result); 
        res.status(200).json({  
            status: "success",
            message: textmessage,
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'BoardofAdvisor member updatation failed',
		});
    }
}

/* End Board of Advisors Functions */

