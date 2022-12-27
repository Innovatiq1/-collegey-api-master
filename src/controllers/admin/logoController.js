import { logoPostServices, logoGetServices} from "../../services/logoServices";
const catchAsync = require('../../utils/catchAsync');

const factory = require('../../controllers/factoryFunctions/handlerFactory');
const { ObjectId } = require('bson');
const Logo = require('../../models/logo');
const Group = require('../../models/group');
// using default factory functions
/* Start Logo Functions */
exports.getAllLogos = factory.getAll(Logo);
exports.createLogos = factory.createOne(Logo);
exports.updateLogos = factory.updateOne(Logo); 

export async function index (req, res, next) {
    try{
        const Logos = await logoGetServices.getAll(req.query);
        //console.log("==================",Logos)
        res.status(200).json({
            status: "success",
            message: "logo retrieved successfully",
            data: Logos
        });
    }catch(e){
        next(e);
    }
}

// const _new = async function (req, res, next) {
//     try {
//         const Logos = await privacyPostServices.saveRequest(req.body)
//         res.status(200).json({
//             status: "success",
//             message: "privacy created successfully",
//             data: Logos
//         });
//     }
//     catch (e) {
//         next(e);
//     }
// };
// export { _new as new };
export async function edit (req, res, next) {
    if (req.file && req.file.key) {
        let body= {
            location:req.file.location,
            imageName:req.file.key


        }
        try{
            const Logo = await logoPostServices.updateLogo(body, req.params.id);
            if(Logo){
                res.status(200).json({
                    status: "success",
                    message: "logo updated successfully",
                    data: Logo
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
        const Logo = await logoPostServices.deleteLogo(req.params.id);
        if(Logo){
            res.status(200).json({
                status: "success",
                message: "logo deleted successfully",
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
        const Logo = await logoGetServices.getOne(req.params.id);
        if(Logo){
            res.status(200).json({
                status: "success",
                message: "logo details",
                data: Logo
            });
        }
    }catch(e){
        next(e);
    }
}





exports.uploadFile = catchAsync(async (req, res, next) => {
    let postData = req.body;
    //"==========",postData.text);
	//console.log("sssssss",req.file)
	if (req.file && req.file.key) {
        let body= {
            location:req.file.location,
            imageName:req.file.key


        }
        try {
            const Logos = await logoPostServices.saveRequest(body)
            res.status(200).json({
                status: "success",
                message: "Logo created successfully",
                data: Logos
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
exports.GroupCreate = catchAsync(async (req, res, next) => {
    let postData = req.body;
    //console.log("==========",JSON.stringify(postData));
	//console.log("sssssss",req.file)
	
        
     let body1 =   {
            description: postData.description,
            groupName: postData.groupName,
            groupType: postData.groupType,
            groupIcon: postData.groupIcon,
            userAdmin: postData.userAdmin,
            userList: {
                user: postData.userList.user,
                userType: postData.userList.userType
            }
        }
        try {
            const Logos = await Group.create(body1)
            if(Logos){
            res.status(200).json({
                status: "success",
                message: "Group created successfully",
                data: Logos
            });
        }else{
            res.status(400).json({
                status: "Failed",
                message: "Group created Failed",
                data: Logos
            });

        }
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
		// req.body.fileUrl = req.file.location;
		// req.body.owner = req.user._id;

		
	
});
exports.Grouplist = catchAsync(async (req, res, next) => {
    let postData = req.body;
    //console.log("==========",JSON.stringify(postData));
	//console.log("sssssss",req.file)
	
        
     let body1 =   {
            
            userAdmin: postData.userAdmin,
            active:true

            
        }
        try {
            const Logos = await Group.find(body1)
            if(Logos){
            res.status(200).json({
                status: "success",
                message: "Group retriew successfully",
                data: Logos
            });
        }else{
            res.status(400).json({
                status: "Failed",
                message: "Group retriew Failed",
                data: Logos
            });

        }
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
		// req.body.fileUrl = req.file.location;
		// req.body.owner = req.user._id;

		
	
});
exports.Groupdelete = catchAsync(async (req, res, next) => {
    let postData = req.body;
    //console.log("==========",JSON.stringify(postData));
	//console.log("sssssss",req.file)
	
        
     let body1 =   {
            
            userAdmin: postData.userAdmin,
            _id:req.params.id
            
        }
       // console.log("=========",body1)
        try {
            const Logos = await Group.findOneAndUpdate(body1,{active:false})
            if(Logos){
            res.status(200).json({
                status: "success",
                message: "Group Delete successfully",
                data: Logos
            });
        }else{
            res.status(400).json({
                status: "Failed",
                message: "Group Delete Failed",
                data: Logos
            });

        }
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
		// req.body.fileUrl = req.file.location;
		// req.body.owner = req.user._id;

		
	
});
exports.Groupview = catchAsync(async (req, res, next) => {
    let postData = req.body;
   // console.log("==========",JSON.stringify(postData));
	//console.log("sssssss",req.file)
	
        
     let body1 =   {
            
            userAdmin: postData.userAdmin,
            _id:req.params.id
            
        }
        //console.log("=========",body1)
        try {
            const Logos = await Group.find(body1)
            if(Logos){
            res.status(200).json({
                status: "success",
                message: "Group View successfully",
                data: Logos
            });
        }else{
            res.status(400).json({
                status: "Failed",
                message: "Group View Failed",
                data: Logos
            });

        }
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
		// req.body.fileUrl = req.file.location;
		// req.body.owner = req.user._id;

		
	
});
exports.Groupedit = catchAsync(async (req, res, next) => {
    let postData = req.body;
    //console.log("==========",JSON.stringify(postData));
	//console.log("sssssss",req.file)
	
        
     let body1 =   {
            
            userAdmin: postData.userAdmin,
            _id:req.params.id
            
        }
        let body2 =   {
            description: postData.description,
            groupName: postData.groupName,
            groupType: postData.groupType,
            groupIcon: postData.groupIcon,
            userAdmin: postData.userAdmin,
            userList: {
                user: postData.userList.user,
                userType: postData.userList.userType
            }
        }
     
       // console.log("=========",body1)
        try {
            const Logos = await Group.findOneAndUpdate(body1,body2, { new: true })
            //console.log("============",Logos)

            if(Logos){
            res.status(200).json({
                status: "success",
                message: "Group edit successfully",
                data: Logos
            });
        }else{
            res.status(400).json({
                status: "Failed",
                message: "Group Delete Failed",
                data: Logos
            });

        }
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
		// req.body.fileUrl = req.file.location;
		// req.body.owner = req.user._id;

		
	
});

exports.requestJoinMembers = catchAsync(async (req, res, next) => {

	const data = await Group.findOne({
		_id:req.params.id,
	});
	if(data){
		let group = await Group.findByIdAndUpdate(req.params.id,{ "$push": { "groupJoinRequest": req.body} },
		{ "new": true, "upsert": true });
		// Send Response
	res.status(200).json({
		status: 'success',
		group,
	});
	}
	

});
exports.acceptTojoin = catchAsync(async (req, res, next) => {
	// 0 Custom defining const to be used
		const groupId = req.params.id;
		const data = await Group.find({
			_id: groupId
		});
		if(data){
            let group = await Group.findByIdAndUpdate(req.params.id,{ "$pull": { "groupJoinRequest": req.body._id} },
            { "new": true, "upsert": true });
			if(group){
				const value = {user:req.body._id}
				let addMember = await Group.findByIdAndUpdate(req.params.id,{ "$push": { "userList": value} },
				{ "new": true, "upsert": true });
				res.status(200).json({
					status: 'success',
					addMember,
				});
			}
		}
	

});
exports.rejectTojoin = catchAsync(async (req, res, next) => {
	// 0 Custom defining const to be used
		const groupId = req.params.id;
		const data = await Group.find({
			_id: groupId
		});
		if(data){
            let group = await Group.findByIdAndUpdate(req.params.id,{ "$pull": { "groupJoinRequest": req.body._id} },
            { "new": true, "upsert": true });
			if(group){
				res.status(200).json({
					status: 'success',
					group,
				});
			}
		}
	

});


/* Start Upload Logo Activation Functions */

export async function updateUploadLogoStatus(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    let status = true;
    let textmessage = '';
    where["_id"] = cid; 
    if(req.body.status == 'active'){
        where["active"] = false;
        status = true;
        textmessage = "Logo activted successfully";
    }else{
        where["active"] = true;
        status = false;
        textmessage = "Logo de-activted successfully";
    }
   // console.log("Where :",where, " active :", status);
    try { 
        let result = await Logo.findOneAndUpdate(where, {
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
/* End Upload Logo Activation Functions */