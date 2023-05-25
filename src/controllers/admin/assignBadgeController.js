
const { ObjectId } = require('bson'); 
const AssignBadge = require('../../models/assign-badge'); 
const factory = require('../../controllers/factoryFunctions/handlerFactory');
// using default factory functions

/* Start badge Functions */
exports.getAllAssignBadge = factory.getAll(AssignBadge);
exports.createAssignedBadge = factory.createOne(AssignBadge);
exports.updateAssignBadge = factory.updateOne(AssignBadge);
exports.getActivateAssignBadge = factory.getAllActiveList(AssignBadge);

/* Start getAll Assigned Badge Functions */
export async function index (req, res, next) {
    try{
        const Badges = await AssignBadge.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "Assign badge details retrieved successfully",
            data: Badges
        });
    }catch(e){
        next(e);
    }
}
/* End getAll Assigned Badge Functions */

/* Start delete Assigned Badge Functions */

const _delete = async function (req, res, next) {
    try {
        const Badge = await AssignBadge.findByIdAndDelete(req.params.id);
        if(Badge){
            res.status(200).json({
                status: "success",
                message: "Assign badge details deleted successfully",
            });
        }
    }
    catch (e) {
        next(e);
    }
};
export { _delete as delete };
/* End delete Assigned Badge Functions */
 
/* Start  Assigned Badge Activation Functions */

export async function updateAssignBadgeStatus(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    let status = true;
    let textmessage = '';
    where["_id"] = cid; 
    if(req.body.status == 'active'){
        where["active"] = false;
        status = true;
        textmessage = "Assign badge activted successfully";
    }else{
        where["active"] = true;
        status = false;
        textmessage = "Assign badge de-activted successfully";
    }
    //console.log("Where :",where, " active :", status);
    try { 
        let result = await AssignBadge.findOneAndUpdate(where, {
            active: status,
        });    
        //console.log("result :",result); 
        res.status(200).json({  
            status: "success",
            message: textmessage,
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Assign Badge updatation failed',
		});
    }
}
/* End Assigned Badge Activation Functions */ 



/* Start  Assigned Badge Activation Functions */

exports.getAssignedBadgeList = async (req, res, next) => {
	let postData = req.body;
   // console.log("Where :",postData);
    let cid   = ObjectId(req.body.id);
    let where = {}; 
    let status = true;
    let textmessage = 'Assigne badge list records';
    where["assignUserId"] = cid;  
   // console.log("Where :",where);
    try { 
        let result = await AssignBadge.find(where, {
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
			message: 'Assign badge no records found',
		});
    }
}
/* End Assigned Badge Activation Functions */ 