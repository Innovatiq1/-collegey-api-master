import { collegelogoPostServices, collegelogoGetServices} from "../../services/collegelogoServices";
const catchAsync = require('../../utils/catchAsync');

const factory = require('../../controllers/factoryFunctions/handlerFactory');
const { ObjectId } = require('bson');
const CollegeLogo = require('../../models/collegelogo');
// using default factory functions
/* Start CollegeLogo Functions */
exports.getAllCollegeLogos = factory.getAll(CollegeLogo);
exports.createCollegeLogos = factory.createOne(CollegeLogo);
exports.updateCollegeLogos = factory.updateOne(CollegeLogo); 

export async function index (req, res, next) {
    try{
        const blogs = await collegelogoGetServices.getAll(req.query);
        //console.log("==================",blogs)
        res.status(200).json({
            status: "success",
            message: "College logo retrieved successfully",
            data: blogs
        });
    }catch(e){
        next(e);
    }
}

// const _new = async function (req, res, next) {
//     try {
//         const blogs = await privacyPostServices.saveRequest(req.body)
//         res.status(200).json({
//             status: "success",
//             message: "privacy created successfully",
//             data: blogs
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
            const blog = await collegelogoPostServices.updateBlog(body, req.params.id);
            if(blog){
                res.status(200).json({
                    status: "success",
                    message: "College logo updated successfully",
                    data: blog
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
        const blog = await collegelogoPostServices.deleteBlog(req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "College logo deleted successfully",
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
        const blog = await collegelogoGetServices.getOne(req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "College logo details",
                data: blog
            });
        }
    }catch(e){
        next(e);
    }
}





exports.uploadFile = catchAsync(async (req, res, next) => {
    let postData = req.body;
    //console.log("==========",postData.text);
	//console.log("sssssss",req.file)
	if (req.file && req.file.key) {
        let body= {
            location:req.file.location,
            imageName:req.file.key


        }
        try {
            const blogs = await collegelogoPostServices.saveRequest(body)
            res.status(200).json({
                status: "success",
                message: "College logo created successfully",
                data: blogs
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


/* Start Upload College Logo Activation Functions */

export async function updateUploadCollegeLogoStatus(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    let status = true;
    let textmessage = '';
    where["_id"] = cid; 
    if(req.body.status == 'active'){
        where["active"] = false;
        status = true;
        textmessage = "College logo activted successfully";
    }else{
        where["active"] = true;
        status = false;
        textmessage = "College logo de-activted successfully";
    }
    //console.log("Where :",where, " active :", status);
    try { 
        let result = await CollegeLogo.findOneAndUpdate(where, {
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
			message: 'College logo updatation failed',
		});
    }
}
/* End Upload College Logo Activation Functions */