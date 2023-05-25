import mongoose from 'mongoose';
// Models Import
import RewardsPoint from '../../models/rewardspoint';
const FAQ = require('../../models/FAQ');
const faqCategories = require('../../models/faq-category/faq-category');
const Review = require('../../models/reviews');
const Team = require('../../models/teams');
const BoardofAdvisor = require('../../models/boardofadvisor');
const BoardofDirector = require('../../models/boardofdirector');
const InvestsAtCollegey = require('../../models/investsAtCollegey');
const CareersAtCollegey = require('../../models/careersAtCollegey');
const Newsletter = require('../../models/newsletters');
const programs = require('../../models/Programs');
const courses = require('../../models/courses');
const Waitlist = require('../../models/waitlist');
const AgreementPrivacyPolicy = require('../../models/agreement-terms/agreement-privacypolicy');
const AgreementTerms = require('../../models/agreement-terms/agreement-terms');
const CollegeLogo = require('../../models/collegelogo');
const Logo = require('../../models/logo');
const UniversityLogo = require('../../models/universitylogo');
// Factory Functions
const factory = require('../factoryFunctions/handlerFactory');

// utilies Import
const catchAsync = require('../../utils/catchAsync');

// Importing constants
const { sdg } = require('../../constants/sdg');

// Request Promise
const rp = require('request-promise');
const axios = require('axios');

// Get ALL
// exports.getAllFAQs = factory.getAllActiveList(FAQ);

export async function getAllFAQs(req, res, next) {

    try {
        let postData = req.body;

		let Allaggregate = [ 
            { $sort: { position: 1 } },
			{
				$lookup: {
				  from: "faqs",
				  let: { id: "$_id" },
				  pipeline: [
					{
					  $match: {
						$expr: {
						  $and: [
							{ $eq: ["$category", "$$id"] },
						  ],
						},
					  },
					},
					{ $sort: { createdAt: 1 } },
				  ],
				  as: "faqdata",
				},
			},
            {   
                $project: { 
                  _id:1,
                  name:1,
                  position:1,
                  faqdata: "$faqdata",
                } 
            },  
        ];

        var all_faqs = await faqCategories.aggregate(
            Allaggregate
        );

        let totalrecord = await FAQ.find().count();    
        res.status(200).json({   
            status: "success",
            message: "Got all faqs successfully",
            data: all_faqs,
            totalRecords: totalrecord,
        });

    } catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Faqs fetch failed',
		});
    }

}

export async function getAllCategory(req, res, next) {
    try {
        const allCategories = await faqCategories.find();

        res.status(200).json({
            status: 'success',
            message: 'Got all faq categories successfully',
            data: allCategories
        });
    } catch (error) {
        res.status(400).json({
			status: 'failed',
			message: 'Failed to get faq categories.',
		});
    }
}

exports.getAllReviews = factory.getAllActiveList(Review);
//exports.getAllTeams = factory.getAllActiveList(Team);

// Get All Team 
export async function getAllTeams(req,res,next){
    try {
        const allTeam = await Team.find();
        
        res.status(200).json({
            status: 'success',
            message: 'Got all team member successfully',
            data: {data:allTeam}
        });
    } catch (error) {
        res.status(400).json({
			status: 'failed',
			message: 'Failed to get team.',
		});
    }
}

exports.getAllCollegeLogo = factory.getAllActiveList(CollegeLogo);
exports.getAllUniversityLogo = factory.getAllActiveList(UniversityLogo);
exports.getAllLogo = factory.getAllActiveList(Logo);
exports.getAllAdvisors = factory.getAllActiveList(BoardofAdvisor);
exports.getAllDirectors = factory.getAllActiveList(BoardofDirector);
exports.getAllTerms = factory.getAll(AgreementTerms);
exports.getAllPrivacy = factory.getAll(AgreementPrivacyPolicy);
//exports.getAllPrivacy = factory.getAllisDeletedList(AgreementPrivacyPolicy);

// Create One
// {{url}}/x-api/v1/public/collegey/InvestAtCollegey
exports.createInvestsAtCollegey = factory.createOne(InvestsAtCollegey);

// {{url}}/x-api/v1/public/collegey/CareersAtCollegey
exports.createCareersAtCollegey = factory.createOne(CareersAtCollegey);

// {{url}}/x-api/v1/public/collegey/CareersAtCollegey
exports.createNewsletter = factory.createOne(Newsletter);

// programs

exports.getAllPrograms = factory.getAll(programs);

exports.getOneProgram = factory.getOne(programs);
exports.getAllProgramCounter = factory.getAllCounter(programs);

// courses

exports.getAllCourses = factory.getAll(courses);

exports.getOneCourse = factory.getOne(courses);
exports.getAllCourseCounter = factory.getAllCounter(courses);

//get User Review

exports.getUserReward = async (req, res) => {
	let postData = req.body;
	try {
		const rewardsResult = await RewardsPoint.find({ user_id: new mongoose.Types.ObjectId(postData.user_id) });
		res.status(200).json({
			status: 'success',
			message: "User Review Retrieved Successfully",
			data: rewardsResult
		});
	}
	catch (e) {
		res.status(400).json({
			status: 'error',
			message: 'User Review Rsult Faild',
		});
	}
}



// waitlist

exports.createOneWaitlist = factory.createOne(Waitlist);

// {{url}}/x-api/v1/public/getSdgList
exports.getSdgList = catchAsync(async (req, res, next) => {
	const data = sdg;
	// SEND RESPONSE
	res.status(200).json({
		status: 'success',
		data,
	});
});
// {{url}}/x-api/v1/public/uploadfile
exports.uploadFile = catchAsync(async (req, res, next) => {
	if (req.file && req.file.key) {
		res.status(200).json({
			status: 'success',
			fileLocation: req.file.key,
			url: req.file.location,
		});
	} else {
		res.status(400).json({
			status: 'error',
			problem: 'file missing',
		});
	}
});

// {{url}}/x-api/v1/public/uploadCustAdminFile
exports.uploadCustAdminFile = catchAsync(async (req, res, next) => {
	if (req.file && req.file.key) {
		res.status(200).json({
			status: 'success',
			fileLocation: req.file.key,
			url: req.file.location,
		});
	} else {
		res.status(400).json({
			status: 'error',
			problem: 'file missing',
		});
	}
});

//add new Team Member

export async function addTeamMember(req, res, next) {
	let postData = req.body;
	postData['image']=req.body.selectFile.fileLocation;

	const memberData = new Team({
		name: postData?.name,
        designation: postData?.designation,
        description: postData?.description,
        lindkin: postData?.lindkin,
        image: postData?.image,
        position: postData?.position,
        active: postData?.active,
	});

	try
    {     
        const teamMemberData = await memberData.save();
        res.status(200).json({
			status: 'Success',
			message: 'Member add successfully',
		});
    }
    catch(error)
    {
		console.log(error)
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Member failed',
		});
    } 
}

export async function getTeamAdmin(req, res, next) {

	try
    {     
        const teamMemberData = await Team.find({}).sort({_id:1});

        res.status(200).json({
			status: 'Success',
			message: 'Fetched Members successfully',
			data: teamMemberData
		});
    }
    catch(error)
    {
		console.log(error)
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Fetched Members failed',
		});
    } 
}

export async function listAllsequelEvents(req, res, next) {
	try
    {
		// Genrate the token
		
		const tokenRequest = await axios.post(
			"https://api.introvoke.com/api/oauth/token",
			{
				"client_id": "2df5b7bd-d748-43ec-8575-91cbb044850d",
				"client_secret": "W0aysVYmwn$s3Ri^eN9z3uPAzCCKtNC!@U-I2tIzka9T5cdxW&X-NiIL8z6L",
				"audience": "https://www.introvoke.com/api",
				"grant_type": "client_credentials"
			},
		);
		let accesToken = tokenRequest.data.access_token;
		if(accesToken == '')
		{
			return res.status(400).json({
				status: 'error',
				message: 'Token genrate failed',
			});
		}
		
		// Fetch the events

		const configApi = {
            method: 'get',
            url: 'https://api.introvoke.com/api/v1/company/2df5b7bd-d748-43ec-8575-91cbb044850d/events',
            headers: { 
                'Authorization': 'Bearer '+accesToken
            }
        };
        const responseEventlist = await axios(configApi);
		
		if(responseEventlist.data == '')
		{
			return res.status(400).json({
				status: 'error',
				message: 'event faild to fetch',
			});
		}

		return res.status(200).json({
			status: 'Success',
			message: 'Fetched event successfully',
			data: responseEventlist.data
		});

	}
	catch(error)
	{
		res.status(400).json({
			status: 'error',
			message: 'Invalid Payload',
		});
	}
}

export async function updateTeamMember(req, res, next) {
	let postData = req.body;
	if(req.body.selectFile.fileLocation){
		postData['image']=req.body.selectFile.fileLocation;
	}
	else{
		postData = req.body;
	}
	
	try
    {     
        const motTitleData = await Team.findOneAndUpdate({_id:req.params.id},postData);

        res.status(200).json({
			status: 'Success',
			message: 'Member Updated successfully',
		});
    }
    catch(error)
    {
		console.log(error)
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Update Member failed',
		});
    } 
}

export async function deleteTeamMember(req, res, next) {
	let postData = req.params.id;
	
	try
    {     
        const motTitleData = await Team.deleteOne({_id:postData});

        res.status(200).json({
			status: 'Success',
			message: 'Member Deleted successfully',
		});
    }
    catch(error)
    {
		console.log(error)
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Delete Member failed',
		});
    } 
}

