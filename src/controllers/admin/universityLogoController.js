import { universitylogoPostServices, universitylogoGetServices} from "../../services/universitylogoServices";
const catchAsync = require('../../utils/catchAsync');

const factory = require('../../controllers/factoryFunctions/handlerFactory');
const { ObjectId } = require('bson');
const UniversityLogo = require('../../models/universitylogo');
const User = require('../../models/User');
const excelJS = require("exceljs");
// using default factory functions
/* Start UniversityLogo Functions */
exports.getAllUniversityLogos = factory.getAll(UniversityLogo);
exports.createUniversityLogos = factory.createOne(UniversityLogo);
exports.updateUniversityLogos = factory.updateOne(UniversityLogo); 
import { getFields } from '../../utilities/helpers';
export async function index (req, res, next) {
    try{
        const blogs = await universitylogoGetServices.getAll(req.query);
        //console.log("==================",blogs)
        res.status(200).json({
            status: "success",
            message: "University logo retrieved successfully",
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
export async function fileDownload (req, res, next) {
    try {
        let postData   = req.body;
		let where 	   = {type:postData.type};
		User.aggregate(
			[
				{  
					$match: where,
				},
				{
					$lookup:{
						from: 'cities',
						localField: 'student_profile.geography.city', 
						foreignField: 'id',
						as: 'Citydata'
					}
				},
				{
					$unwind: { path: "$Citydata", preserveNullAndEmptyArrays: true }
				},
				{
					$lookup:{
						from: 'states',
						localField: 'student_profile.geography.state', 
						foreignField: 'id',
						as: 'Statedata'
					}
				},
				{
					$unwind: { path: "$Statedata", preserveNullAndEmptyArrays: true }
				},
				{
					$lookup:{
						from: 'countries',
						localField: 'student_profile.geography.country', 
						foreignField: 'id',
						as: 'Countrydata'
					}
				},
				{
					$unwind: { path: "$Countrydata", preserveNullAndEmptyArrays: true }
				},
				{
					$project : {
						_id:1,
                        AllbannerImage:1,
                        gender:1,
                        type:1,
                        name:1,
						last_name:1,
						email:1,
                        studentType:1,
						qualification:1,
						avatar:1,
						"countryObj": "$Countrydata.name", 
						"stateObj": "$Statedata.name",
						"cityObj": "$Citydata.name",
						profile_completion:1,
                        student_profile:1,
					}
				},  
			], function (err, profile) {
				if (err) {
					return res.send({
                        status: "error",
                        message: "Something went wrong",
                      });
				} else {
					return res.status(200).json({
						status: 'success',
						message: 'success',
						data: profile
					});
				}
		});
	} catch (e) {
		next(e);
	}
}

export async function fileDownloadMentor (req, res, next) {
    try {
        let postData   = req.body;
		let where 	   = {type:postData.type};
		User.aggregate(
			[
				{  
					$match: where,
				},
				{
                    $lookup:{
                        from: 'cities',
                        localField: 'city', 
                        foreignField: 'id',
                        as: 'Citydata'
                    }
                },
                {
                    $unwind: { path: "$Citydata", preserveNullAndEmptyArrays: true }
                },
                {
                    $lookup:{
                        from: 'states',
                        localField: 'state', 
                        foreignField: 'id',
                        as: 'Statedata'
                    }
                },
                {
                    $unwind: { path: "$Statedata", preserveNullAndEmptyArrays: true }
                },
                {
                    $lookup:{
                        from: 'countries',
                        localField: 'country', 
                        foreignField: 'id',
                        as: 'Countrydata'
                    }
                },
                {
                    $unwind: { path: "$Countrydata", preserveNullAndEmptyArrays: true }
                },
				{
					$project : {
						_id:1,
                        name:1,
                        last_name:1,
                        email:1,
                        studentType:1,
                        type:1,
                        AllbannerImage:1,
                        bannerImage:1,
                        mentor_profile:1,
                        avatar:1,
                        qualification:1,
                        phone_number:1,
						"cityname": "$Citydata.name",
                        "statename": "$Statedata.name",
                        "countryname": "$Countrydata.name",
					}
				},  
			], function (err, profile) {
				if (err) {
					return res.send({
                        status: "error",
                        message: "Something went wrong",
                      });
				} else {
					return res.status(200).json({
						status: 'success',
						message: 'success',
						data: profile
					});
				}
		});
	} catch (e) {
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
            const blog = await universitylogoPostServices.updateBlog(body, req.params.id);
            if(blog){
                res.status(200).json({
                    status: "success",
                    message: "UniversityLogo updated successfully",
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
        const blog = await universitylogoPostServices.deleteBlog(req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "University logo deleted successfully",
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
        const blog = await universitylogoGetServices.getOne(req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "University logo details",
                data: blog
            });
        }
    }catch(e){
        next(e);
    }
}





exports.uploadFile = catchAsync(async (req, res, next) => {
    let postData = req.body;
   // console.log("==========",postData.text);
	//console.log("sssssss",req.file)
	if (req.file && req.file.key) {
        let body= {
            location:req.file.location,
            imageName:req.file.key


        }
        try {
            const blogs = await universitylogoPostServices.saveRequest(body)
            res.status(200).json({
                status: "success",
                message: "University logo created successfully",
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


/* Start Upload University Logo Activation Functions */

export async function updateUploadUniversityLogoStatus(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    let status = true;
    let textmessage = '';
    where["_id"] = cid; 
    if(req.body.status == 'active'){
        where["active"] = false;
        status = true;
        textmessage = "University logo activted successfully";
    }else{
        where["active"] = true;
        status = false;
        textmessage = "University logo de-activted successfully";
    }
   // console.log("Where :",where, " active :", status);
    try { 
        let result = await UniversityLogo.findOneAndUpdate(where, {
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
			message: 'University logo updatation failed',
		});
    }
}
/* End Upload University Logo Activation Functions */