import { badgePostServices, badgeGetServices} from "../../services/badgeService";
const { ObjectId } = require('bson');
const badge = require('../../models/badge-master'); 
const catchAsync = require('../../utils/catchAsync');
const factory = require('../../controllers/factoryFunctions/handlerFactory');
// using default factory functions

/* Start badge Functions */
exports.getAllbadges = factory.getAll(badge);
exports.createbadges = factory.createOne(badge);
exports.updatebadges = factory.updateOne(badge); 
exports.getActivateBadge = factory.getAllActiveList(badge);
 
export async function index (req, res, next) {
    try{
        const Badges = await badgeGetServices.getAll(req.query);
        //console.log("==================",Badges)
        res.status(200).json({
            status: "success",
            message: "Badge details retrieved successfully",
            data: Badges
        });
    }catch(e){
        next(e);
    }
}

export async function edit (req, res, next) {
    if (req.file && req.file.key) {
        let body= {
            location:req.file.location,
            imageName:req.file.key


        }
        try{
            const Badge = await badgePostServices.updateBadge(body, req.params.id);
            if(Badge){
                res.status(200).json({
                    status: "success",
                    message: "Badge details updated successfully",
                    data: Badge
                });
            }
        }catch(e){
            next(e);
        }
		// respose of file name and url
		// res.status(200).json({
		// 	status: 'success',
		// 	owner: req.user._id,
		// 	fileUrl: req.file.location,
		// });

		//  file url and user id to request body
		req.body.fileUrl = req.file.location;
		req.body.owner = req.user._id;

		
	} else {
		res.status(400).json({
			status: 'error',
			problem: 'file missing',
		});
	}
   
}
const _delete = async function (req, res, next) {
    try {
        const Badge = await badgePostServices.deleteBadge(req.params.id);
        if(Badge){
            res.status(200).json({
                status: "success",
                message: "Badge details deleted successfully",
            });
        }
    }
    catch (e) {
        next(e);
    }
};
export { _delete as delete };

export async function view (req, res, next) {
    try{
        const Badge = await badgeGetServices.getOne(req.params.id);
        if(Badge){
            res.status(200).json({
                status: "success",
                message: "Badge details",
                data: Badge
            });
        }
    }catch(e){
        next(e);
    }
}





exports.uploadFile = catchAsync(async (req, res, next) => {
    let postData = req.body;
	if (req.file && req.file.key) {
        let body= {
            location:req.file.location,
            imageName:req.file.key
        }
        try {
            const Badges = await badgePostServices.saveRequest(body)
            res.status(200).json({
                status: "success",
                message: "Badge created successfully",
                data: Badges
            });
        }
        catch (e) {
            next(e);
        }
		// respose of file name and url
		// res.status(200).json({
		// 	status: 'success',
		// 	owner: req.user._id,
		// 	fileUrl: req.file.location,
		// });

		//  file url and user id to request body
		req.body.fileUrl = req.file.location;
		req.body.owner = req.user._id;

		
	} else {
		res.status(400).json({
			status: 'error',
			problem: 'file missing',
		});
	}
});


/* Start Upload Badge Logo Activation Functions */

export async function updateUploadbadgeStatus(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    let status = true;
    let textmessage = '';
    where["_id"] = cid; 
    if(req.body.status == 'active'){
        where["active"] = false;
        status = true;
        textmessage = "Badge activted successfully";
    }else{
        where["active"] = true;
        status = false;
        textmessage = "Badge de-activted successfully";
    }
    //console.log("Where :",where, " active :", status);
    try { 
        let result = await badge.findOneAndUpdate(where, {
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
			message: 'Badge updatation failed',
		});
    }
}
/* End Upload Badge Logo Activation Functions */
