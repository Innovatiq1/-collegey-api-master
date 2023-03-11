import { userPostServices, userGetServices } from '../../services/userServices';

import { membershipPostServices, membershipGetServices } from '../../services/membershipService';
import {
	userProjectPostServices, 
	userProjectGetServices,
} from '../../services/userProjectServices';
import {
	projectIdeaPostServices,
	projectIdeGetServices,
} from '../../services/studentProjectIdeaServices';
import { projectGetServices } from '../../services/projectServices';
import {
	questionnairePostServices,
	questionnaireGetServices,
} from '../../services/questionnaireServices';
import { getFields } from '../../utilities/helpers';
import { statusTypes } from '../../utilities/constant_variables';
import { studentsQuestions } from '../../utilities/constants';
var objectPath = require('object-path');
import { emailType, sendEmail } from '../../utilities/emailHelper';

// Load Model
import homePageModel from '../../models/home-page-content/home-page-content';
import UserModel from '../../models/User';
import futureSelfModel from '../../models/futureSelf';
import UserProjectsWatchlist from '../../models/userProjectWatchlist';
import ProjectsModel from '../../models/Projects';
import ProgramModel from '../../models/Programs';
import membership from '../../models/membership';
import MentorResource from '../../models/mentor-resource/mentor-resource';
import MentorArticle  from '../../models/mentor-article/mentor-article';
import CuratedResources  from '../../models/curated-resources/curated-resources';
import MentorFile  from '../../models/mentor-file/mentor-file';
import MentorPerks  from '../../models/mentor-perks/mentor-perks';
import MentorTestimonial  from '../../models/mentor-testimonial/mentor-testimonial';
import MentorEvent  from '../../models/Event';
import CollegeyOpportunities  from '../../models/mentor-perks/collegey-opportunities';
import AgreementTerms  from '../../models/agreement-terms/agreement-terms';
import BannerImageModel from '../../models/bannerImages/bannerImage';
import RewardsPoint from '../../models/rewardspoint';
import userProjectModel from '../../models/userProjects';
import userProgramesModel from '../../models/userPrograms';
import paymentProgram from '../../models/transactions/programsPaymentHistory'
import ResourceTitle  from '../../models/resource-title/resource-title';


const { ObjectId }   = require('bson');
const moment = require('moment');
const moment_timezone = require('moment-timezone');

export async function getHomeContentData(req,res,next){
    let postData = req.body;
    try { 
        let result = await homePageModel.findOne({isDeleted:false});
        res.status(200).json({  
            status: "success",
            message: "Data List successfully",
            data: result
        });
    }catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Data fetch failed',
		});
    }
}

exports.view = async function(req, res, next) {
	try {
		const userId = req.user._id;
		const profile = await userGetServices.getOne(
			userId,
			getFields(req.user.type, req.user.user_type).profile
		);
		if (profile) {
			res.status(200).json({
				status: 'success',
				message: 'profile info',
				data: profile,
			});
		}
	} catch (e) {
		next(e);
	}
};

exports.edit = async function(req, res, next) {
	try {
		const userId = req.user._id;
		const profile = await userPostServices.updateProfile(
			req.body,
			userId,
			getFields(req.user.type, req.user.user_type).profile
		);
		if (profile) {
			res.status(200).json({
				status: 'success',
				message: 'profile updated',
				data: profile,
			});
		}
	} catch (e) {
		next(e);
	}
};

exports.editMentor = async function(req, res, next) {
	try {
		const userId = req.user._id;
		const profile = await userPostServices.updateMentorProfile(
			req.body,
			userId,
			getFields(req.user.type, req.user.user_type).profile
		);
		if (profile) {
			res.status(200).json({
				status: 'success',
				message: 'profile updated',
				data: profile,
			});
		}
	} catch (e) {
		next(e);
	}
};

exports.updateMentorProfileStep01 = async function(req, res, next) {
	let postData = req.body;
	const userData = await UserModel.findOne({_id: ObjectId(postData.user)});
	let mentorVidepintro = postData.mentorVideointro;
	// if(postData.mentorVideointro == null)
	// {
	// 	mentorVidepintro = userData.mentor_profile.profile.videoIntroduction;
	// }
	// else
	// {
	// 	mentorVidepintro = postData.mentorVideointro;
	// }

	let obj = { 
        fullLegalName : postData.fullLegalName,
		country : postData.country,
		state : postData.state,
		city : postData.city,
		timezone : postData.timezone,
		professionalTitle : postData.professionalTitle,
		website : postData.website,
		experience : postData.experience,
		lastEducationalInstitutionAttended : postData.lastEducationalInstitutionAttended,
		lastCollegeDegree : postData.lastCollegeDegree,
		industry : postData.industry,
		other_industry: postData.other_industry,

		expertise : postData.expertise,
		other_expertise: postData.other_expertise,
		
		interest : postData.interest,
		other_interest: postData.other_interest,

		can_help : postData.can_help,
		favBooks : postData.favBooks,
		linkedIn : postData.linkedIn,
		aboutYou : postData.aboutYou,
		adviceToYoungPeople : postData.adviceToYoungPeople,
		shouldAgree: true,
		videoIntroduction: mentorVidepintro,
		is_completed: true,
    }
	try {
		let result = await UserModel.findOneAndUpdate( 
            {_id: ObjectId(postData.user) },
            {"mentor_profile.profile":obj,"city":postData.city,"state":postData.state,"country":postData.country,"name":postData.fullLegalName}
        ); 
		if (result) {
			res.status(200).json({
				status: 'success',
				message: 'profile updated',
				data: result,
			});
		}
	} catch (e) {
		next(e);
	}
};

exports.updateMentorProfileStep02 = async function(req, res, next) {
	let postData = req.body;
	try {
		let result = await UserModel.findOneAndUpdate(
            {_id: ObjectId(postData.user) },
            {"mentor_profile.officeHours":postData.officeHours,"mentor_profile.officeTimezone.timezoneName":postData.timezone,"mentor_profile.officeTimezone.is_completed":true}
        );
		if (result) {
			res.status(200).json({
				status: 'success',
				message: 'office hour updated',
				data: result,
			});
		}
	} catch (e) {
		next(e);
	}
};

exports.updateMentorProfileStep03 = async function(req, res, next) {
	let postData = req.body;
	let projectSlug   = postData.projectTitle.replace(/[^A-Z0-9]/ig,"-").toLowerCase();

	const userData = await UserModel.findOne({_id: ObjectId(postData.user_id)});
	const projectlins = new ProjectsModel({
		title: postData.projectTitle, 
		slug: projectSlug,
		image: postData.project_img,
		projectStatus: 'new',
		keyword: postData.keyword,
		start_date: postData.startDate,
		end_date: postData.lastDate,
		students_count: postData.maxNumberOfStudentsAllowed,
		remainingSlot: postData.maxNumberOfStudentsAllowed,
		sdg: postData.projectUNSDG,
		projectOwner: postData.user_id,
		mentor: postData.user_id,
		description: postData.aboutProject,
		projectType: 'mentors',
		projectfees: postData.projectIsPayable,
		"projectPrice.amount": postData.projectfess, 
		"projectPlan.projectDuration": postData.projectDuration,
		"projectPlan.week1Duration": postData.week1Duration,
		"projectPlan.week2Duration": postData.week2Duration,
		"projectPlan.week3Duration": postData.week3Duration,
		"projectPlan.week4Duration": postData.week4Duration,
		"projectPlan.week5Duration": postData.week5Duration,
		"projectPlan.week6Duration": postData.week6Duration,
		"projectPlan.monthDuration": postData.monthDuration,
		
		// "projectPlan.month3Duration": postData.month3Duration,
		// "projectPlan.month4Duration": postData.month4Duration,
		// "projectPlan.month5Duration": postData.month5Duration,
		// "projectPlan.month6Duration": postData.month6Duration,
		// "projectPlan.month7Duration": postData.month7Duration,
		// "projectPlan.month8Duration": postData.month8Duration,
		// "projectPlan.month9Duration": postData.month9Duration,

		"contact_person.name" : postData.username,
		"contact_person.email" : postData.useremail,
		"contact_person.linkedin_url" : userData.mentor_profile.profile.linkedIn,
	});
	try
    {    
        const projectData = await projectlins.save();
		let project_mailObj = {
			project_name : postData.projectTitle,
			email: postData.useremail,
		};
		sendEmail(emailType.NEW_PROJECT_ADD_EMAIL,project_mailObj);
        res.status(200).json({
			status: 'Success',
			message: 'Congrats! Your project is submitted for Collegey’s approval!',
		});
    }
    catch(error)
    {
		//console.log(error);
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Project faild',
		});
    } 
};

exports.updateReviewproject = async function(req, res, next) {
	let postData = req.body;

	var projectReview = [];
	var upObj = {
		reviewtext: postData.reviewtext,
		rating: postData.rating2,
		reviewByname: postData.name,
		reviewByimage: postData.user_image,
		reviewBy: postData.user,
		createdAt: Date.now(),
	};
	projectReview.push(upObj);
	try {
		let result = await ProjectsModel.findOneAndUpdate(
			{ _id: postData.project },
			{ $push: { "projectReview": { $each: projectReview, $position: 0 } } }
		);
		if (result) {
			res.status(200).json({
				status: 'success',
				message: 'add review success',
				data: result,
			});
		}
	} catch (e) {
		next(e);
	}
};
exports.updateReviewprogram = async function(req, res, next) {
	let postData = req.body;

	var programReview = [];
	var upObj = {
		reviewtext: postData.reviewtext,
		rating: postData.rating2,
		reviewByname: postData.name,
		reviewByimage: postData.user_image,
		reviewBy: postData.user,
		createdAt: Date.now(),
	};
	programReview.push(upObj);
	try {
		let result = await ProgramModel.findOneAndUpdate(
			{ _id: postData.program },
			{ $push: { "programReview": { $each: programReview, $position: 0 } } }
		);
		if (result) {
			res.status(200).json({
				status: 'success',
				message: 'add review success',
				data: result,
			});
		}
	} catch (e) {
		next(e);
	}
};


exports.updateProjectfieldData = async function(req, res, next) {
	let postData = req.body;
	try {
		
		let result = await ProjectsModel.findOneAndUpdate(
			{_id: postData.project},
			{start_date: postData.startDate,end_date: postData.lastDate,requestMentor: postData.requestMentor,acceptMentorInvitation:null}
		);
		
		let fetchUserData = await UserModel.findOne({_id: ObjectId(postData.requestMentor) },);

		if(postData.requestMentor != null)
		{
			let msg_mailObj = {
				project_name  : postData.projectName,
				student: postData.student,
				email: fetchUserData.email,
			}; 
			sendEmail(emailType.MENTOR_PROJECT_INVITE,msg_mailObj);	
		}
		if (result) {
			res.status(200).json({
				status: 'success',
				message: 'update project success',
				data: result,
			});
		}

	} catch (e) {
		next(e);
	}
};

exports.updateInvitationProjectData = async function(req, res, next) {
	let postData = req.body;
	try {
		// Fetch Project Data.
		let projectResult = await ProjectsModel.findOne({_id: ObjectId(postData.projectId)});
		let fetchProjectOwner = await UserModel.findOne({_id: ObjectId(projectResult.projectOwner.id) },);
		
		let acceptMentorInvitation;
		let requestMentor;
		let mailMsg;
		let addMentor;
		if(postData.inviteAction == 'accept')
		{
			acceptMentorInvitation = true;
			requestMentor = postData.userid;
			mailMsg = 'Mentor is Accept Your Project';
			addMentor = postData.userid;

			const projectlins = new userProjectModel({
				project_id: postData.projectId,
				user_id: postData.userid,
				status: 1,
			});
			await projectlins.save();
		}
		else
		{
			acceptMentorInvitation = false;
			requestMentor = null;
			mailMsg = 'Mentor is Decline Your Project';
			addMentor = projectResult.projectOwner.id
		}

		let result = await ProjectsModel.findOneAndUpdate(
			{_id: postData.projectId},
			{requestMentor: requestMentor,acceptMentorInvitation:acceptMentorInvitation,mentor:addMentor}
		);
		
		let msg_mailObj = {
			project_name  : projectResult.title,
			projectOwner  : fetchProjectOwner.name,
			mailMsg: mailMsg,
			email: fetchProjectOwner.email,
		}; 
		sendEmail(emailType.MENTOR_ACCEPT_PROJECT_INVITE_STATUS,msg_mailObj);	
		if (result) {
			res.status(200).json({
				status: 'success',
				message: 'update project success',
				data: result,
			});
		}

	} catch (e) {
		next(e);
	}
};

exports.updatePdfInUser = async function(req, res, next) {
	let postData = req.body;
	try {
		let result = await userProjectModel.findOneAndUpdate(
			{project_id: postData.projectId,user_id: postData.userId},
			{certificateUrl: postData.pdfurl}
		);
		res.status(200).json({
			status: 'success', 
			message: 'all certificate success',
		});
	} catch (e) {
		next(e);
	}
};
exports.updatePdfProgramInUser = async function(req, res, next) {
	let postData = req.body;
	/* const projectlins = new userProgramesModel({
		program_id: postData.programId,
		user_id: postData.userId,
		status: 1,
	});
	await projectlins.save(); */
	try {
		let result = await userProgramesModel.findOneAndUpdate(
			{program_id: postData.programId,user_id: postData.userId},
			{certificateUrl: postData.pdfurl}
		);
		//let userId = postData.user_id;
	let where = ObjectId(postData.userId) 
	let program1 = ObjectId(postData.programId)
	
	const program = await paymentProgram.findOneAndUpdate({
		user:where,Programs:program1,status:"sucess"},{programStatus:"completed"});
	

		res.status(200).json({
			status: 'success', 
			message: 'all certificate success',
		});
	} catch (e) {
		next(e);
	}
};

exports.updateMenprojectStatus = async function(req, res, next) {
	let postData = req.body;
	const projectData = await ProjectsModel.findOne({_id: ObjectId(postData.project_id)});

	if(projectData.projectOwner._id != postData.user_id)
	{
		return res.status(200).json({
			status: 'Success',
			message: 'Not allow to update project status',
		});
	}

	try
    {    
   		let result = await ProjectsModel.findOneAndUpdate(
			{_id: ObjectId(postData.project_id)},
			{projectStatus:postData.status_value}
		);
		if(projectData.projectMembers.length > 0)
		{
			for (let i = 0; i < projectData.projectMembers.length; i++)
			{
				let msg_mailObj = {
					project_name  : projectData.title,
					email: projectData.projectMembers[i].email,
				}; 
				sendEmail(emailType.COMPLETED_PROJECT_MAIL,msg_mailObj);
			}			
		}
		
		let rewardData ={
			active: true,
			user_id : postData.user_id,
			rewardName : "ProjectPartB",
			rewardCreditPoint :"300",
			uniqueId:postData.project_id,
		}
		// let result_user = await RewardsPoint.save(rewardData);			
		
	    res.status(200).json({
			status: 'Success',
			message: 'Update Project Status successfully',
		});
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Update Project Status faild',
		});
    } 

}

exports.updateMenprogramStatus = async function(req, res, next) {
	let postData = req.body;
	//const projectData = await paymentProgram.findOne({_id: ObjectId(postData.program_id)});
	try
    {    
   		let result = await userProgramesModel.findOneAndUpdate(
			{program_id: ObjectId(postData.program_id),user_id:ObjectId(postData.user_id),},
			{programStatus:postData.status_value}
		);
		if(result){
		
	    res.status(200).json({
			status: 'Success',
			message: 'Update Program Status successfully',
		});
	}
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Update Project Status faild',
		});
    } 

}


exports.add_mentortestimonial = async (req, res) => {
	let postData = req.body;
	const testimonilins = new MentorTestimonial({
		user: postData.user, 
		description: postData.testimonal,
		status: 'deactive',
	});
	try
    {    
        const testimonialData = await testimonilins.save();
	    res.status(200).json({
			status: 'Success',
			message: 'Add testimonial successfully',
		});
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add testimonial faild',
		});
    } 
}

exports.add_ContactCollegey = async (req, res) => {
	let postData = req.body;
	const userData = await UserModel.findOne({_id: ObjectId(postData.user)});
	try
    {    
        let msg_mailObj = {
			mentor_name  : userData.name,
			mentor_email : userData.email,
			contact_msg  : postData.message,
		};
		sendEmail(emailType.NEW_MENTOR_CONTACT_COLLEGY,msg_mailObj);
	    res.status(200).json({
			status: 'Success',
			message: 'send contact successfully',
		});
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'send contact faild',
		});
    } 
}

exports.add_NewHostEvent = async (req, res) => { 
	let postData = req.body;
	const eventlins = new MentorEvent({
		organizer: postData.user, 
		logo: postData.event_image, 
		eventName: postData.eventName,
		timezone: postData.timezone, 
		event_status: postData.event_status,
		online_link: postData.online_link,
		avenue_address: postData.avenue_address,
		startDate: postData.startDate,
		startTime: postData.startTime,
		endDate: postData.endDate,
		endTime: postData.endTime,
		description: postData.description,
		eventFrequency: postData.eventFrequency,
		eventVisibility: postData.event_schedule
	});
	try
    {    
        const eventData = await eventlins.save();
	    res.status(200).json({
			data: eventData,
			status: 'Success',
			message: 'Add event successfully',
		});
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add event faild',
		});
    } 
}

exports.update_NewHostEvent = async (req, res) => { 
	let postData = req.body;
	let result_event = await MentorEvent.findOne({_id: ObjectId(postData.event_id)});
	let event_image  = postData.event_image; 
	// if(postData.event_image == '')
	// {
	// 	event_image = result_event.logo;
	// }
	// else
	// {
	// 	event_image = postData.event_image;
	// }
	
	let obj = {
		organizer: postData.user, 
		logo: event_image, 
		eventName: postData.eventName,
		timezone: postData.timezone, 
		event_status: postData.event_status,
		online_link: postData.online_link,
		avenue_address: postData.avenue_address,
		startDate: postData.startDate,
		startTime: postData.startTime,
		endDate: postData.endDate,
		endTime: postData.endTime,
		description: postData.description,
		eventFrequency: postData.eventFrequency,
		eventVisibility: postData.event_schedule
	};
	try
    {    
   		let result = await MentorEvent.findOneAndUpdate(
			{_id: postData.event_id},
			obj
		);
	    res.status(200).json({
			status: 'Success',
			message: 'update event successfully',
		});
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'update event faild',
		});
    } 
}

exports.addtoFavroriteperk = async (req, res) => {
	let postData  	  = req.body;
	var favoriteindex = postData.favorite_index;
	const perkData 	  = await MentorPerks.findOne({_id: postData.perkId});
	if(postData.like_action == 'addfavorite' && postData.user != null)
	{
	  perkData.favorite.push(postData.user);
	  let result = await MentorPerks.findOneAndUpdate(
		{_id: postData.perkId},
		perkData
	  );
	  res.status(200).json({
		status: 'Success',
		message: 'Favorite successfully',
	  }); 	
	}
	else if(postData.like_action == 'removefavorite')
	{  
		var index_like = perkData.favorite.indexOf(postData.user);
		if (index_like !== -1) {
			perkData.favorite.splice(index_like, 1);
		}
		let result = await MentorPerks.findOneAndUpdate(
			{_id: postData.perkId},
			perkData
		);

		res.status(200).json({
			status: 'Success',
			message: 'Unfavorite Successfully',
		});
	}
	else
	{
		res.status(400).json({
			status: 'error',
			message: 'Post like faild',
		});
	}
}

exports.addToFavoriteOpportunities = async (req, res) => {
	let postData  	  = req.body;
	var favoriteindex = postData.favorite_index;
	const perkData 	  = await CollegeyOpportunities.findOne({_id: postData.perkId});
	if(postData.like_action == 'addfavorite' && postData.user != null)
	{
	  perkData.favorite.push(postData.user);
	  let result = await CollegeyOpportunities.findOneAndUpdate(
		{_id: postData.perkId},
		perkData
	  );
	  res.status(200).json({
		status: 'Success',
		message: 'Favorite successfully',
	  }); 	
	}
	else if(postData.like_action == 'removefavorite')
	{  
		var index_like = perkData.favorite.indexOf(postData.user);
		if (index_like !== -1) {
			perkData.favorite.splice(index_like, 1);
		}
		let result = await CollegeyOpportunities.findOneAndUpdate(
			{_id: postData.perkId},
			perkData
		);

		res.status(200).json({
			status: 'Success',
			message: 'Unfavorite Successfully',
		});
	}
	else
	{
		res.status(400).json({
			status: 'error',
			message: 'Post like faild',
		});
	}
}

exports.getCurrentUserData = async function(req, res, next) {
	let postData = req.body;

	let where = {_id: ObjectId(postData.userid)};
	let Alluseraggregate = [ 
		{  
			$match: where,
		},
		{
			$project : {
				_id:1,
				name:1,
				last_name:1,
				email:1,
				AllbannerImage:1,
				bannerImage:1,
				student_profile:1,
			}
		}, 
	];

	var result_user = await UserModel.aggregate(
		Alluseraggregate
	);
	
	try
    {    
   		res.status(200).json({  
            status: "success",
            message: "User fetch successfully",
            data: result_user[0],
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Mentor host event fetch faild',
		});
    } 
}

exports.fetchSidebarQuetion = async function(req, res, next) {
	let postData = req.body;
	
	let where = {UserId: ObjectId(postData.userid)};
	let AllQuetionaggregate = [ 
		{  
			$match: where,
		},
		{
			$project : {
				_id:1,
				answerArray:1,
				createdAt:1,
			}
		}, 
		{ $sort : { createdAt : -1 } }
	];

	var result = await futureSelfModel.aggregate(
		AllQuetionaggregate
	).limit(1);
	
	try
    {    
   		res.status(200).json({  
            status: "success",
            message: "Data fetch successfully",
            data: result,
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Data fetch faild',
		});
    } 
}

exports.getResourceTitle = async function(req, res, next) {

	try{
        const resourceData = await ResourceTitle.find();
        res.status(200).json({  
            status: "success",
            message: "Mentor article retrieved successfully",
            data: resourceData
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Article fetch failed',
		});
    }
}

exports.updateBannerImage = async function(req, res, next) {
	let postData = req.body;
	try
    {    
		let baneer_update = await UserModel.findOneAndUpdate(
            {_id: ObjectId(postData.userid) },
            {"bannerImage":postData.bannerImage}
        );

		res.status(200).json({  
            status: "success",
            message: "Banner update successfully",
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Banner update faild',
		});
    } 
}

exports.getCurrentUserDataFetch = async function(req, res, next) {
	let postData = req.body;

	let where = {_id: ObjectId(postData.userid)};
	let Alluseraggregate = [ 
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
			$lookup: {
				from: "assignbadges",
				let: { 
					  assignUserId1: "$_id",	
					 },
				pipeline: [
					{
						$match: {
							$expr: { $eq: ["$assignUserId", "$$assignUserId1"] },
							active: true
						},
					}
				],
				as: "assignbadgesdata",
			},
		},
		
		{
			$lookup:{
				from: 'badgemasters',
				localField: 'assignbadgesdata.badgeId', 
				foreignField: '_id',
				as: 'badgemastersdata'
			}
		},
		{
			$project : {
				_id:1,
				name:1,
				last_name:1,
				email:1,
				type:1,
				AllbannerImage:1,
				bannerImage:1,
				student_profile:1,
				avatar:1,
				qualification:1,
				phone_number:1,
				"cityname": "$Citydata.name",
				"statename": "$Statedata.name",
				"countryname": "$Countrydata.name",
				"assignbadgesdata": "$assignbadgesdata",
				"badgemastersdata": "$badgemastersdata"
			}
		}, 
	];

	var result_user = await UserModel.aggregate(
		Alluseraggregate
	);
	
	try
    {    
   		res.status(200).json({  
            status: "success",
            message: "User fetch successfully",
            data: result_user[0],
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Mentor host event fetch faild',
		});
    } 
}

exports.checkloginpassword = async function(req, res, next) {
	try
    {     
		let postData = req.body;
		const filters = { email: postData.email };
		const user = await UserModel.findOne(filters);
		res.status(200).json({  
            status: "success",
            message: "User fetch successfully",
            data: user,
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'User not found',
		});
    } 
};

exports.getMentorUserDataFetch = async function(req, res, next) {
	let postData = req.body;

	let where = {_id: ObjectId(postData.userid)};
	let Alluseraggregate = [ 
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
			$lookup: {
				from: "assignbadges",
				let: { 
					  assignUserId1: "$_id",	
					 },
				pipeline: [
					{
						$match: {
							$expr: { $eq: ["$assignUserId", "$$assignUserId1"] },
							active: true
						},
					}
				],
				as: "assignbadgesdata",
			},
		},
		
		{
			$lookup:{
				from: 'badgemasters',
				localField: 'assignbadgesdata.badgeId', 
				foreignField: '_id',
				as: 'badgemastersdata'
			}
		},
		{
			$project : {
				_id:1,
				name:1,
				last_name:1,
				email:1,
				AllbannerImage:1,
				bannerImage:1,
				mentor_profile:1,
				avatar:1,
				qualification:1,
				phone_number:1,
				"cityname": "$Citydata.name",
				"statename": "$Statedata.name",
				"countryname": "$Countrydata.name",
				"assignbadgesdata": "$assignbadgesdata",
				"badgemastersdata": "$badgemastersdata"
			}
		}, 
	];

	var result_user = await UserModel.aggregate(
		Alluseraggregate
	);
	
	//getProjectsByMentorId

	let getProjectsByMentorIdAggregate = [
		{
			$match: { projectOwner: ObjectId(postData.userid) },
		},
		{ $sort: { createdAt: -1 } },
		{
			$lookup:{
				from: 'users',
				localField: 'mentor',
				foreignField: '_id',
				as: 'mentor'
			}
		},
		{$unwind: '$mentor'},
		{
			$lookup:{
				from: 'users',
				localField: 'projectOwner',
				foreignField: '_id',
				as: 'projectOwner'
			}
		},
		{$unwind: '$projectOwner'},
	]
	
	var projectByMentor = await ProjectsModel.aggregate(
		getProjectsByMentorIdAggregate
	);

	try
    {     
   		res.status(200).json({  
            status: "success",
            message: "User fetch successfully",
            data: result_user[0],
			mentorProject: projectByMentor 
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'data fetch faild',
		});
    } 
}

exports.getAllMentorUserData = async function(req, res, next) {
	let postData = req.body;
	let where 	 = {type: 'mentor',Active:true};
	let Alluseraggregate = [ 
		{  
			$match: where,
		},
		{
			$project : {
				_id:1,
				name:1,
				last_name:1,
				email:1,
				AllbannerImage:1,
				avatar:1,
				bannerImage:1,
				mentor_profile:1,
			}
		}, 
	];

	var result_user = await UserModel.aggregate(
		Alluseraggregate
	);
	try
    {    
   		res.status(200).json({  
            status: "success",
            message: "User fetch successfully",
            data: result_user,
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Mentor host event fetch faild',
		});
    } 
}

exports.choiceUserBannerImage = async function(req, res, next) {
	let postData = req.body;
	console.log("postData===>", postData)
	let result_user = await UserModel.findOne({_id: ObjectId(postData.userid)});
	try
    {    
    	let result_update = await UserModel.updateMany(
            {_id: ObjectId(postData.userid) },
          	{ $set: { "AllbannerImage.$[].active" : false } },
	    );
			
		if(postData.choiceBanner == 'default')
		{
	
			let result_defaultBanner = await BannerImageModel.findOne({_id: ObjectId(postData.defaultBannerId),"isActivated": true});
	
			let whereExistCheck =
			{
				$and:
					[
						{ "AllbannerImage": {$elemMatch: {image:result_defaultBanner.imagePath}} },
						{
							"_id":ObjectId(postData.userid)
						},
					]
			}
				
			let existing_banner = await UserModel.findOne(whereExistCheck);

			var filesObj = [];
			let upObj = {
				image: result_defaultBanner.imagePath,
				active: true,
			}
			filesObj.push(upObj);
			let result = await UserModel.findOneAndUpdate(
				{_id: postData.userid},
				{ $push: { "AllbannerImage":{$each: filesObj,$position:0} } }
			);
			let new_updateBanner = await UserModel.findOneAndUpdate(
				{_id: ObjectId(postData.userid) },
				{"bannerImage": result_defaultBanner.imagePath}
			);
				
		}
		else if(postData.choiceBanner == 'userbanner')
		{
			let result_new = await UserModel.findOne({_id: ObjectId(postData.userid)});
			result_new.AllbannerImage[postData.bannerIndex].active = true;
			result_new.bannerImage = result_new.AllbannerImage[postData.bannerIndex].image;  

			let new_update = await UserModel.findOneAndUpdate(
				{_id: ObjectId(postData.userid) },
				result_new
			);
		}

		res.status(200).json({  
            status: "success",
            message: "Banner update successfully",
            data: result_user,
        });
    }
    catch(error)
    {
		console.log("error",error);
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Banner update faild',
		});
    } 
}


exports.getMentorResourceInfo = async function(req, res, next) {
	let postData = req.body;
	const page   = postData.page* 1 || 1;
	const limit  = postData.limit * 1 || 5;
	const skip   = (page - 1) * limit;
	let where    = {isDeleted: false};
	try
    {      
     	 let result_resource = await MentorResource.find(where).sort( { createdAt : -1} ).skip(skip).limit(limit);
		 res.status(200).json({  
            status: "success",
            message: "Mentor resource retrieved successfully",
            data: result_resource,
			page: page,
            limit: limit,
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Resource fetch faild',
		});
    } 
};

exports.getAgreegateInfo = async function(req, res, next) {
	let postData = req.body;
	let where    = {isDeleted: false,type_policy:postData.type_policy};
	try
    {      
     	 let result_agreegate = await AgreementTerms.findOne(where);
		 res.status(200).json({  
            status: "success", 
            message: "Agreegate retrieved successfully",
            data: result_agreegate,
	    });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Agreegate fetch faild',
		});
    } 
};

exports.getMentoreventInfo = async function(req, res, next) {
	let postData = req.body;
	let where;
	console.log("postData===>", postData)

	if (postData.filter_hostEvent == 'all_event') {
		where = {_id : {
			$ne: null
		}}
	} else if(postData.filter_hostEvent == 'my_event'){
		where = {organizer: ObjectId(postData.user)};
	}
	

	let Allaggregate = [ 
		{  
			$match: where,
		},
		{ $sort: { _id: -1 } },
		{
			$lookup:{
					from: 'users',
					localField: 'attendingEvents',
					foreignField: '_id',
					as: 'userdata'
			}
		},
		{   
			$project: { 
			  _id:1,
			  description:1,
			  logo:1,
			  eventName:1,
			  timezone:1,
			  startDate:1,
			  startTime:1,
			  endDate:1,
			  endTime:1,
			  organizer:1,
			  event_status:1,
			  online_link: 1,
			  avenue_address: 1,
			  eventVisibility: 1,
			  eventFrequency: 1,
			  userdata: "$userdata"
			} 
		},  
	];
	var all_event = await MentorEvent.aggregate(
		Allaggregate
	);

	try
    {    
    	 res.status(200).json({  
            status: "success",
            message: "Mentor event retrieved successfully",
            data: all_event
         });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'event fetch faild',
		});
    } 
};

exports.getMentoreventInfoWithid = async function(req, res, next) {
	let postData = req.body;
	try
    {    
    	let result_event = await MentorEvent.findOne({_id: ObjectId(postData.event_id)});
		res.status(200).json({  
            status: "success",
            message: "Mentor host event successfully",
            data: result_event,
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Mentor host event fetch faild',
		});
    } 
}

exports.deleteMentoreventInfoWithid = async function(req, res, next) {
	let postData = req.body;
	try
    {    
    	await MentorEvent.findByIdAndDelete({_id: ObjectId(postData.event_id)});
		res.status(200).json({  
            status: "success",
            message: "Mentor host event deleted successfully",
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Mentor host event deletion failed',
		});
    } 
}

exports.getMentorArticleInfo = async function(req, res, next) {
	let postData = req.body;
	const page   = postData.page* 1 || 1;
	const limit  = postData.limit * 1 || 5;
	const skip   = (page - 1) * limit;
	let where    = {isDeleted: false};
	try
    {    
     	let result_resource = await MentorArticle.find(where).sort( { createdAt : -1} ).skip(skip).limit(limit);
		res.status(200).json({  
            status: "success",
            message: "Mentor article retrieved successfully",
            data: result_resource,
			page: page,
            limit: limit,
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Article fetch faild',
		});
    } 
};

exports.getMentorCuratedInfo = async function(req, res, next) {
	let postData = req.body;
	const page   = postData.page* 1 || 1;
	const limit  = postData.limit * 1 || 5;
	const skip   = (page - 1) * limit;
	let where    = {isDeleted: false};
	try
    {    
     	let result_resource = await CuratedResources.find(where).sort( { createdAt : -1} ).skip(skip).limit(limit);
		res.status(200).json({  
            status: "success",
            message: "Mentor curated retrieved successfully",
            data: result_resource,
			page: page,
            limit: limit,
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'curated fetch faild',
		});
    } 
};

exports.getMentorFileInfo = async function(req, res, next) {
	let postData = req.body;
	const page   = postData.page* 1 || 1;
	const limit  = postData.limit * 1 || 4;
	const skip   = (page - 1) * limit;
	let where    = {isDeleted: false};
	try
    {    
     	 let result_resource = await MentorFile.find(where).sort( { createdAt : -1} ).skip(skip).limit(limit);
		 res.status(200).json({  
            status: "success",
            message: "Mentor file retrieved successfully",
            data: result_resource,
			page: page,
            limit: limit,
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Mentor file fetch faild',
		});
    } 
};

exports.addEducation = async function(req, res, next) {
	const updateKey = 'student_profile.history_updated.education';
	let updateData = userGetServices.getProfileSectionData(req.body.education, updateKey, {
		userId: req.user._id,
		edit: false,
	});
	let profile = await userPostServices.addCommonStudentProfileSection(updateData, req.user._id);
	const response = objectPath.get(profile.toObject(), updateKey);
	res.status(200).json({
		status: 'success',
		message: 'Education details added',
		data: response[response.length - 1],
	});
};
exports.addEducationPlans = async function(req, res, next) {
	//console.log("this is req",req.body);
	const updateKey = 'student_profile.headed.test_info';
	let updateData = userGetServices.getProfileSectionData(req.body.test_info, updateKey, {
		userId: req.user._id,
		edit: false,
	});
	let profile1 = await userPostServices.addCommonStudentProfileSection(updateData, req.user._id);
	const response = objectPath.get(profile1.toObject(), updateKey);
	let postData = req.body;
	try {  
			 
		let result = await UserModel.findOneAndUpdate(
            {_id: ObjectId(req.user._id) },
            {"student_profile.headed":postData}
        ); 

		if (result) { 
			res.status(200).json({
				status: 'success',
				message: 'Education plan Details updated',
				data: result,
			});
		}
	} catch (e) { 
		next(e);
	}
};

/*	const updateKey1= 'student_profile.headed.wish_to_study';
	let updateData1 = userGetServices.getProfileSectionData(req.body.wish_to_study, updateKey1, {
		userId: req.user._id,
		edit: false,
	});
	let profile = await userPostServices.addCommonStudentProfileSection(updateData1, req.user._id);
	const response1 = objectPath.get(profile.toObject(), updateKey1);
	
	const updateKey2= 'student_profile.headed.preferred_countries';
	let updateData2 = userGetServices.getProfileSectionData(req.body.preferred_countries, updateKey2, {
		userId: req.user._id,
		edit: false,
	});
	let profile2 = await userPostServices.addCommonStudentProfileSection(updateData2, req.user._id);
	const response2 = objectPath.get(profile2.toObject(), updateKey2);
	
	res.status(200).json({
		status: 'success',
		message: 'Education Plan details added',
		data: response[response.length - 1],
	});
};
*/
exports.editEducation = async function(req, res, next) {
	console.log("req.body===>", req.body)
	req.body.education._id = req.params.id;
	let updateData = userGetServices.getProfileSectionData(
		req.body.education,
		'student_profile.history_updated.education',
		{ userId: req.user._id, edit: true }
	);
	const profile = await userPostServices.editCommonStudentProfileSection(
		req.body.education,
		updateData,
		req.user._id,
		req.params.id
	);
	res.status(200).json({
		status: 'success',
		message: 'profile updated',
		data: profile,
	});
};

exports.RemoveStudentEducation = async (req, res) => {
	let postData   = req.body;
	var postindex  = postData.index;
	var userid	   = postData.userId;
	const userData = await UserModel.findOne({ _id: userid });
	userData.student_profile.history_updated.education.splice(postindex, 1);

	if(userData.student_profile.history_updated.education.length <= 0)
	{
		userData.student_profile.history_updated.is_completed = false;
	} 
	let result = await UserModel.findOneAndUpdate(
		{ _id: userid },
		userData
	); 
	res.status(200).json({
		status: 'Success',
		message: 'Education remove successfully',
	});
}

exports.deleteEducation = async function(req, res, next) {
	const removeDataKey = 'student_profile.history.education';
	console.log("req.user._id",req.user._id);
	
	// let removeData = userGetServices.getProfileSectionData(req.params, removeDataKey, {
	// 	userId: req.user._id,
	// 	delete: true,
	// });
	// const profile = await userPostServices.deleteCommonStudentProfileSection(
	// 	removeData,
	// 	req.user._id,
	// 	req.params.id
	// );
	res.status(200).json({
		status: 'success',
		message: 'Education Details removed',
		data: profile,
	});
};

exports.studentDashboard = async function(req, res, next) {
	try {
		const userId  = req.user._id;
		let where     = {user_id: ObjectId(userId)};
		
		const profile = await userGetServices.getStudentProfileById(userId);

		UserProjectsWatchlist.aggregate(
			[
				{  
					$match: where,
				}, 
				{ $sort: { _id: -1 } },
				{
					$lookup: {
						from: "projects",
						let: { project_id: "$project_id" },
						pipeline: [
						  {
							$match: {
							  $expr: { $eq: ["$_id", "$$project_id"] },
							},
						  },
						  {
							$lookup:{
								from: 'users',
								localField: 'projectMembers',
								foreignField: '_id',
								as: 'projectMembers'
							}
						},
						{
							$lookup:{
								from: 'users',
								localField: 'mentor',
								foreignField: '_id',
								as: 'mentor'
							}
						},
						{$unwind: '$mentor'},
						{
							$lookup:{
								from: 'users',
								localField: 'projectOwner',
								foreignField: '_id',
								as: 'projectOwner'
							}
						},
						{$unwind: '$projectOwner'},
						  {
							$project: {
							  Milestones:1,
							  projectMembers:1,
							  mentor:1,
							  projectOwner:1,
							  active:1,
							  ask_questions:1,
							  contact_person:1,
							  can_be_done:1,
							  createdAt:1,
							  description:1,
							  documents:1,
							  end_date:1,
							  hash_tags:1,
							  id:1,
							  ifPartnerProjectTrue:1,
							  image:1,
							  impact:1,
							  keyword:1,
							  location:1,
							  mentor:1,
							  partner:1,
							  projectComments:1,
							  projectCommentsDummy:1,
							  projectEvent:1,
							  projectMembers:1,
							  projectOwner:1,
							  projectPaymentUser:1,
							  projectPlan:1,
							  projectPost:1,
							  projectPrice:1,
							  projectStatus:1,
							  projectType:1,
							  projectfees:1,
							  questions:1,
							  remainingSlot:1,
							  sdg:1,
							  skills:1,
							  slug:1,
							  start_date:1,
							  status:1,
							  studentMilestones:1,
							  students_count:1,
							  title:1,
							  updatedAt:1,
							  willing_to_consider:1,
							  status:1,
							  status:1,
							  status:1,
							  
							},
						  },
						],
						as: "projectdata",
					  },
				},
				{
					$unwind: { path: "$projectdata", preserveNullAndEmptyArrays: true }
				},
				{    
					$project: { 
					  _id:1,
					  project_id:1,
					  project: "$projectdata",
					} 
				},  
			], function (err, watchlistProjects) {
				if (err) {
					next(err);
				} else {
					return res.status(200).json({
						status: 'success',
						message: 'Dashboard info',
						data: {
							watchlistProjects,
							profile
						},
					});
				}
		});
	} catch (e) {
		next(e);
	}
};

exports.studentMainDashboard = async function(req, res, next) {
	try {
		const userId = req.user._id;
		const watchlistProjects = await userProjectGetServices.getProjectsWatchlistByStudent(
			userId
		);
		const profile = await userGetServices.getStudentProfileById(userId);
		//const questionnaire = await questionnaireGetServices.getByStudent(req.user._id);
		if (profile) {
			res.status(200).json({
				status: 'success',
				message: 'Dashboard info',
				data: {
					watchlistProjects,
					profile,
				},
			});
		}
	} catch (e) {
		next(e);
	}
};

exports.studentDashboardHeader = async function(req, res, next) {
	try {
		const userId = req.user._id;
		let where 	 = {_id: ObjectId(userId)};
		UserModel.aggregate(
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
						name:1,
						last_name:1,
						email:1,
						type:1,
						qualification:1,
						avatar:1,
						"countryObj": "$Citydata.name",
						"stateObj": "$Statedata.name",
						"cityObj": "$Countrydata.name",
						profile_completion:1
					}
				},  
			], function (err, profile) {
				if (err) {
					next(err);
				} else {
					return res.status(200).json({
						status: 'success',
						message: 'Dashboard info',
						data: {
							profile,
						},
					});
				}
		});
	} catch (e) {
		next(e);
	}
};

module.exports.getstudentProfile = async function(req, res, next) {
	try {
		const profile = await userGetServices.getStudentProfile(req.params.url_slug);
		res.status(200).json({
			status: 'success',
			message: 'student profile',
			data: profile,
		});
	} catch (e) {
		next(e);
	}
};
exports.getstudentProfileTypeData = async function(req, res, next) {
	try {
		const feedId = req.params.type;
		const profile = await userGetServices.getStudentProfileType(feedId);
		res.status(200).json({
			status: 'success',
			message: 'student profile',
			data: profile,
		});
	} catch (e) {
		next(e);
	}
};

exports.editQuestionnaire = async function(req, res, next) {
	const questionnaire = await questionnairePostServices.updateQuestionnaire(
		req.body,
		req.user._id
	);
	res.status(200).json({
		status: 'success',
		message: 'Questionnaire updated',
		data: questionnaire,
	});
};

exports.addProfileProject = async function(req, res, next) {
	const updateKey = 'student_profile.projects.describe_any_project';
	let updateData = userGetServices.getProfileSectionData(
		req.body.describe_any_project,
		updateKey,
		{ userId: req.user._id, edit: false }
	);
	let profile = await userPostServices.addCommonStudentProfileSection(updateData, req.user._id);
	const response = objectPath.get(profile.toObject(), updateKey);
	res.status(200).json({
		status: 'success',
		message: 'Project details added',
		data: response[response.length - 1],
	});
};

exports.editProfileProject = async function(req, res, next) {
	req.body.describe_any_project._id = req.params.id;
	let updateData = userGetServices.getProfileSectionData(
		req.body.describe_any_project,
		'student_profile.projects.describe_any_project',
		{ userId: req.user._id, edit: true }
	);
	const profile = await userPostServices.editCommonStudentProfileSection(
		req.body.describe_any_project,
		updateData,
		req.user._id,
		req.params.id
	);
	res.status(200).json({
		status: 'success',
		message: 'Project details updated',
		data: profile,
	});
};

exports.deleteProfileProject = async function(req, res, next) {
	const removeDataKey = 'student_profile.projects.describe_any_project';
	let removeData = userGetServices.getProfileSectionData(req.params, removeDataKey, {
		userId: req.user._id,
		delete: true,
	});
	const profile = await userPostServices.deleteCommonStudentProfileSection(
		removeData,
		req.user._id,
		req.params.id
	);
	res.status(200).json({
		status: 'success',
		message: 'Project Details removed',
		data: profile,
	});
};

exports.addProfileAward = async function(req, res, next) {
	const updateKey = 'student_profile.projects.award';
	let updateData = userGetServices.getProfileSectionData(req.body.award, updateKey, {
		userId: req.user._id,
		edit: false,
	});
	let profile = await userPostServices.addCommonStudentProfileSection(updateData, req.user._id);
	const response = objectPath.get(profile.toObject(), updateKey);
	res.status(200).json({
		status: 'success',
		message: 'Award details added',
		data: response[response.length - 1],
	});
};

exports.editProfileAward = async function(req, res, next) {
	req.body.award._id = req.params.id;
	let updateData = userGetServices.getProfileSectionData(
		req.body.award,
		'student_profile.projects.award',
		{ userId: req.user._id, edit: true }
	);
	const profile = await userPostServices.editCommonStudentProfileSection(
		req.body.award,
		updateData,
		req.user._id,
		req.params.id
	);
	res.status(200).json({
		status: 'success',
		message: 'Award details updated',
		data: profile,
	});
};

exports.deleteProfileAward = async function(req, res, next) {
	const removeDataKey = 'student_profile.projects.award';
	let removeData = userGetServices.getProfileSectionData(req.params, removeDataKey, {
		userId: req.user._id,
		delete: true,
	});
	const profile = await userPostServices.deleteCommonStudentProfileSection(
		removeData,
		req.user._id,
		req.params.id
	);
	res.status(200).json({
		status: 'success',
		message: 'Award Details removed',
		data: profile,
	});
};

exports.addProfileRecommendation = async function(req, res, next) {
	const updateKey = 'student_profile.projects.someone_said_something_or_recommendation';
	let updateData = userGetServices.getProfileSectionData(
		req.body.someone_said_something_or_recommendation,
		updateKey,
		{ userId: req.user._id, edit: false }
	);
	let profile = await userPostServices.addCommonStudentProfileSection(updateData, req.user._id);
	const response = objectPath.get(profile.toObject(), updateKey);
	res.status(200).json({
		status: 'success',
		message: 'Recommendation details added',
		data: response[response.length - 1],
	});
};

exports.editProfileRecommendation = async function(req, res, next) {
	req.body.someone_said_something_or_recommendation._id = req.params.id;
	let updateData = userGetServices.getProfileSectionData(
		req.body.someone_said_something_or_recommendation,
		'student_profile.projects.someone_said_something_or_recommendation',
		{ userId: req.user._id, edit: true }
	);
	const profile = await userPostServices.editCommonStudentProfileSection(
		req.body.someone_said_something_or_recommendation,
		updateData,
		req.user._id,
		req.params.id
	);
	res.status(200).json({
		status: 'success',
		message: 'Recommendation details updated',
		data: profile,
	});
};

exports.deleteProfileRecommendation = async function(req, res, next) {
	const removeDataKey = 'student_profile.projects.someone_said_something_or_recommendation';
	let removeData = userGetServices.getProfileSectionData(req.params, removeDataKey, {
		userId: req.user._id,
		delete: true,
	});
	const profile = await userPostServices.deleteCommonStudentProfileSection(
		removeData,
		req.user._id,
		req.params.id
	);
	res.status(200).json({
		status: 'success',
		message: 'Recomendation Details removed',
		data: profile,
	});
};

exports.addProfileWritingSample = async function(req, res, next) {
	const updateKey = 'student_profile.projects.writing_sample';
	let updateData = userGetServices.getProfileSectionData(req.body.writing_sample, updateKey, {
		userId: req.user._id,
		edit: false,
	});
	let profile = await userPostServices.addCommonStudentProfileSection(updateData, req.user._id);
	const response = objectPath.get(profile.toObject(), updateKey);
	res.status(200).json({
		status: 'success',
		message: 'Writing Sample details added',
		data: response[response.length - 1],
	});
};

exports.editProfileWritingSample = async function(req, res, next) {
	req.body.writing_sample._id = req.params.id;
	let updateData = userGetServices.getProfileSectionData(
		req.body.writing_sample,
		'student_profile.projects.writing_sample',
		{ userId: req.user._id, edit: true }
	);
	const profile = await userPostServices.editCommonStudentProfileSection(
		req.body.writing_sample,
		updateData,
		req.user._id,
		req.params.id
	);
	res.status(200).json({
		status: 'success',
		message: 'Writing Sample details updated',
		data: profile,
	});
};

exports.deleteProfileWritingSample = async function(req, res, next) {
	const removeDataKey = 'student_profile.projects.writing_sample';
	let removeData = userGetServices.getProfileSectionData(req.params, removeDataKey, {
		userId: req.user._id,
		delete: true,
	});
	const profile = await userPostServices.deleteCommonStudentProfileSection(
		removeData,
		req.user._id,
		req.params.id
	);
	res.status(200).json({
		status: 'success',
		message: 'Writing Sample Details removed',
		data: profile,
	});
};

exports.studentProjectSignup = async function(req, res, next) {
	const requestData = { project_id: req.body.project_id, user_id: req.user._id };
	const signedupProject = await userProjectPostServices.saveRequest(requestData);
	sendEmail(emailType.PROJECT_SIGNUP_EMAIL, req.user, signedupProject);
	res.status(200).json({
		status: 'success',
		message: 'Signed up in project successfully',
		data: { signedupProject },
	});
};

exports.addProjectIdea = async function(req, res, next) {
	const requestData = { ...req.body, student: req.user._id };
	const project = await projectIdeaPostServices.saveRequest(requestData);
	sendEmail(emailType.STUDENT_PROJECT_IDEA_EMAIL, req.user, project);
	res.status(200).json({
		status: 'success',
		message: 'Project idea submitted successfully!',
		data: project,
	});
};

exports.getProjectIdeaList = async function(req, res, next) {
	const projects = await projectIdeGetServices.getProjectByStudent(req.user._id);
	res.status(200).json({
		status: 'success',
		message: 'Project idea list retrieved successfully',
		data: projects,
	});
};

exports.mentorDashboardNew = async function (req, res, next) {
	try {
		const mentorId = req.user._id;

		let inviteProjectsWhere =
		{
			'$and':
			[
				{ requestMentor: mentorId,acceptMentorInvitation: null}
			]
		}
		
		let inviteProjectAggregate = [
			{
				$match: inviteProjectsWhere,
			},
			{ $sort: { createdAt: -1 } },
			{
				$lookup:{
					from: 'users',
					localField: 'mentor',
					foreignField: '_id',
					as: 'mentor'
				}
			},
			{ $unwind: { path: "$mentor",  preserveNullAndEmptyArrays: true }  },
			{
				$lookup:{
					from: 'users',
					localField: 'projectOwner',
					foreignField: '_id',
					as: 'projectOwner'
				}
			},
			{$unwind: '$projectOwner'},
			{
				$lookup: {
					from: 'users',
					localField: 'projectMembers',
					foreignField: '_id',
					as: 'projectMembers'
				}
			},
		]

		var inviteProjects = await ProjectsModel.aggregate(
			inviteProjectAggregate
		);

		let liveProjectsWhere =
		{
			'$and':
			[
				{
					'$or':
					[
						{ projectOwner: mentorId },
					]
				},
				{ projectStatus:'pending' }
			]

		}

		let liveProjectsAggregate = [
			{
				$match: liveProjectsWhere,
			},
			{ $sort: { createdAt: -1 } },
			{
				$lookup:{
					from: 'users',
					localField: 'mentor',
					foreignField: '_id',
					as: 'mentor'
				}
			},
			{$unwind: '$mentor'},
			{
				$lookup:{
					from: 'users',
					localField: 'projectOwner',
					foreignField: '_id',
					as: 'projectOwner'
				}
			},
			{$unwind: '$projectOwner'},
			{
				$lookup: {
					from: 'users',
					localField: 'projectMembers',
					foreignField: '_id',
					as: 'projectMembers'
				}
			},
		]

		var liveProjects = await ProjectsModel.aggregate(
			liveProjectsAggregate
		);

		//pendingProjects

		let pendingProjectsWhere =
		{
			'$and':
			[
				{
					'$or':
					[
						{ projectOwner: mentorId },
						{ mentor: mentorId }
					]
				},
				{ projectStatus:'new' }
			]

		}

		let pendingProjectsAggregate = [
			{
				$match: pendingProjectsWhere,
			},
			{ $sort: { createdAt: -1 } },
			{
				$lookup:{
					from: 'users',
					localField: 'mentor',
					foreignField: '_id',
					as: 'mentor'
				}
			},
			{$unwind: '$mentor'},
			{
				$lookup:{
					from: 'users',
					localField: 'projectOwner',
					foreignField: '_id',
					as: 'projectOwner'
				}
			},
			{$unwind: '$projectOwner'},
			{
				$lookup: {
					from: 'users',
					localField: 'projectMembers',
					foreignField: '_id',
					as: 'projectMembers'
				}
			},
		]
		
		var pendingProjects = await ProjectsModel.aggregate(
			pendingProjectsAggregate
		);

		//getProjectsByMentorId

		let getProjectsByMentorIdAggregate = [
			{
				$match: { projectOwner: mentorId },
			},
			{ $sort: { createdAt: -1 } },
			{
				$lookup:{
					from: 'users',
					localField: 'mentor',
					foreignField: '_id',
					as: 'mentor'
				}
			},
			{$unwind: '$mentor'},
			{
				$lookup:{
					from: 'users',
					localField: 'projectOwner',
					foreignField: '_id',
					as: 'projectOwner'
				}
			},
			{$unwind: '$projectOwner'},
			{
				$lookup: {
					from: 'users',
					localField: 'projectMembers',
					foreignField: '_id',
					as: 'projectMembers'
				}
			},
		]
		
		var projectByMentor = await ProjectsModel.aggregate(
			getProjectsByMentorIdAggregate
		);

	//getMentorProjectList

	let mentorProjectListWhere =
			{
				'$or':
					[
						{ projectOwner: mentorId },
						{ mentor: mentorId }
					]
			}

	let mentorProjectListAggregate = [
				{
					$match: mentorProjectListWhere,
				},
				{ $sort: { createdAt: -1 } },
				{
					$lookup:{
						from: 'users',
						localField: 'mentor',
						foreignField: '_id',
						as: 'mentor'
					}
				},
				{$unwind: '$mentor'},
				{
					$lookup:{
						from: 'users',
						localField: 'projectOwner',
						foreignField: '_id',
						as: 'projectOwner'
					}
				},
				{$unwind: '$projectOwner'},
				{
					$lookup: {
						from: 'users',
						localField: 'projectMembers',
						foreignField: '_id',
						as: 'projectMembers'
					}
				},	
			]
			
			var projects = await ProjectsModel.aggregate(
				mentorProjectListAggregate
			);

		//projectType:'mentor'

		let getProjectsMentortypeAggregate = [
			{
				$match: { projectType:'mentor' },
			},
			{ $sort: { createdAt: -1 } },
			{
				$lookup:{
					from: 'users',
					localField: 'mentor',
					foreignField: '_id',
					as: 'mentor'
				}
			},
			{$unwind: '$mentor'},
			{
				$lookup:{
					from: 'users',
					localField: 'projectOwner',
					foreignField: '_id',
					as: 'projectOwner'
				}
			},
			{$unwind: '$projectOwner'},
			{
				$lookup: {
					from: 'users',
					localField: 'projectMembers',
					foreignField: '_id',
					as: 'projectMembers'
				}
			},
		]
		
		var allMentorProject = await ProjectsModel.aggregate(
			getProjectsMentortypeAggregate
		);

		//projectType: 'Collegy'
		
		let getProjectsCollegytypeAggregate = [
			{
				$match: { projectType:'collegey' },
			},
			{ $sort: { createdAt: -1 } },
			{
				$lookup:{
					from: 'users',
					localField: 'mentor',
					foreignField: '_id',
					as: 'mentor'
				}
			},
			{$unwind: '$mentor'},
			{
				$lookup:{
					from: 'users',
					localField: 'projectOwner',
					foreignField: '_id',
					as: 'projectOwner'
				}
			},
			{$unwind: '$projectOwner'},
			{
				$lookup: {
					from: 'users',
					localField: 'projectMembers',
					foreignField: '_id',
					as: 'projectMembers'
				}
			},
		]
		
		var allCollegyProject = await ProjectsModel.aggregate(
			getProjectsCollegytypeAggregate
		);

		//completedProjects

		let completedProjectsWhere =
		{
			'$and':
				[
					{
						'$or':
							[
								{ projectOwner: mentorId },
								{ mentor: mentorId }
							]
					},
					{ projectStatus: 'completed' }
				]

		}

		let completedProjectsAggregate = [
			{
				$match: completedProjectsWhere,
			},
			{ $sort: { createdAt: -1 } },
			{
				$lookup: {
					from: 'users',
					localField: 'mentor',
					foreignField: '_id',
					as: 'mentor'
				}
			},
			{ $unwind: '$mentor' },
			{
				$lookup: {
					from: 'users',
					localField: 'projectOwner',
					foreignField: '_id',
					as: 'projectOwner'
				}
			},
			{ $unwind: '$projectOwner' },
			{
				$lookup: {
					from: 'users',
					localField: 'projectMembers',
					foreignField: '_id',
					as: 'projectMembers'
				}
			},
		]

		var completedProjects = await ProjectsModel.aggregate(
			completedProjectsAggregate
		);

		//ongoing Projects

		let onGoingProjectsWhere =
		{
			'$and':
				[
					{
						'$or':
							[
								{ mentor: mentorId }
							]
					},
					{
						"projectStatus":
						{
							$in: ["ongoing"]
						}
					},
				]

		}

		let onGoingProjectsAggregate = [
			{
				$match: onGoingProjectsWhere,
			},
			{ $sort: { createdAt: -1 } },
			{
				$lookup: {
					from: 'users',
					localField: 'mentor',
					foreignField: '_id',
					as: 'mentor'
				}
			},
			{ $unwind: '$mentor' },
			{
				$lookup: {
					from: 'users',
					localField: 'projectOwner',
					foreignField: '_id',
					as: 'projectOwner'
				}
			},
			{ $unwind: '$projectOwner' },
			{
				$lookup: {
					from: 'users',
					localField: 'projectMembers',
					foreignField: '_id',
					as: 'projectMembers'
				}
			},
		]

		var inProgressProjects = await ProjectsModel.aggregate(
			onGoingProjectsAggregate
		);


		const profile2 = await userGetServices.getOne(
			mentorId,
			getFields(req.user.type, req.user.user_type).profile
		);

		const profile = await userGetServices.getMentorProfileById(mentorId);

		profile['mentor_profile_completion'] = profile2.mentor_profile_completion;

		res.status(200).json({
			status: 'success',
			message: 'Dashboard info',
			data: {
				profile,
				projects,
				projectByMentor,
				allCollegyProject,
				allMentorProject,
				completedProjects,
				liveProjects,
				inviteProjects,
				inProgressProjects,
				pendingProjects
			},
		});
	} catch (error) {
		next(error);
	}
}

exports.mentorDashboard = async function(req, res, next) {
	try {
		const mentorId = req.user._id;
		const projects = await projectGetServices.getMentorProjectList(mentorId);
		const projectByMentor = await projectGetServices.getProjectsByMentorId(mentorId);
		const allMentorProject = await projectGetServices.getAllMentorProject();
		const completedProjects = await projectGetServices.getMentorProjectCompleted(mentorId);
		const liveProjects = await projectGetServices.getMentorProjectLive(mentorId);
		const inProgressProjects = await projectGetServices.getMentorProjectInProgress(mentorId);
		const pendingProjects = await projectGetServices.getMentorProjectPending(mentorId);
		const profile = await userGetServices.getMentorProfileById(mentorId);
			res.status(200).json({
				status: 'success',
				message: 'Dashboard info',
				data: {
					profile,
					projects,
					projectByMentor,
					allMentorProject,
					completedProjects,
					liveProjects,
					inProgressProjects,
					pendingProjects
				},
			});
	} catch (e) {
		next(e);
	}
};

exports.addMembership = async (req, res, next) => {
	try {
		const mentorId = req.user._id;
		let {name, email} = req.body

		const referData = await membership.findOne({email: email});
		//console.log("referData",referData);
		if(referData != null)
		{
			return res.status(400).json({
				status: 'error',
				message: 'Member already reffered',
			});
		}
		
		const dataToSend = { name, email, referredby: mentorId, createAt: Date.now()}
		const saveMembership = await membershipPostServices.saveRequest(dataToSend);
		
		const userData = await UserModel.findOne({_id: ObjectId(saveMembership.referredby)});

		let member_mailObj = {
			refer_id : saveMembership.id,
			email: saveMembership.email,
			name:saveMembership.name,
			refer_by: userData.name+userData.last_name,
		};
		sendEmail(emailType.NEW_MEMBER_REFFERED_EMAIL,member_mailObj);

		res.status(200).json({ 
			status: 'success',
			message: 'Member reffered successfully!',
			data: saveMembership
		})
	} catch (error) {
		next(error)
	}
}

exports.getMentorPerks = async (req, res, next) => {
	try {
		const mentorId = req.user._id;
		const mentors = await membershipGetServices.getMentors(mentorId)
		res.status(200).json({ 
			status: 'success',
			message: 'Members!',
			data: mentors
		})
	} catch (error) {
		next(error)
	}
}

exports.addOpportunity = async (req, res, next) => {
	try {
		const mentorId = req.user._id;
		let {title, description} = req.body
		let image = ""
		// if(req.file) {
		// 	image = `/opportunity/${req.file.filename}`
		// }
		const dataToSend = { title, description, mentorId, createAt: Date.now(), image}
		const saveMembership = await membershipPostServices.saveOpportunity(dataToSend) 
		res.status(200).json({ 
			status: 'success',
			message: 'Member reffered successfully!',
			data: saveMembership
		})
	} catch (error) {
		next(error)
	}
}

exports.getOpportunites = async (req, res, next) => {
	try {
		const mentorId = req.user._id;
		const opportunities = await membershipGetServices.getOpportunites(mentorId)
		res.status(200).json({ 
			status: 'success',
			message: 'opportunities!',
			data: opportunities
		})
	} catch (error) {
		next(error)
	}
}

// Admin Mentor Perks

exports.getMentorAdminPerksInfo = async function(req, res, next) {
	let postData = req.body;
	let where = {isDeleted: false};
	const page   = postData.page* 1 || 1;
	const limit  = postData.limit * 1 || 5;
	const skip   = (page - 1) * limit;
	let where_resources = {isDeleted: false,featured:'Yes'};
	
	// Get Featured Perk

	let Allfeturedperkaggregate = [ 
		{  
			$match: where_resources,
		},
		{
			$project : {
				_id:1,
				slug:1,
				tags:1,
				favorite:1,
				isDeleted:1,
				title:1,
				description:1,
				short_description:1,
				image:1,
				createdAt:1,
				featured:1,
				"favorite_count": { $size: "$favorite" } 
			}
		}, 
		{ $sort: {"favorite_count":-1}  },
	];

	var result_feturedperk = await MentorPerks.aggregate(
		Allfeturedperkaggregate
	);
	
	let Allperkaggregate = [ 
		{  
			$match: where,
		},
		{
			$project : {
				_id:1,
				slug:1,
				tags:1,
				favorite:1,
				isDeleted:1,
				title:1,
				description:1,
				short_description:1,
				image:1,
				createdAt:1,
				featured:1,
				"favorite_count": { $size: "$favorite" } 
			}
		}, 
		{ $sort: {"featured":-1,"favorite_count":-1}},
		{ $skip: skip },
        { $limit: limit },
	];

	var result_resource = await MentorPerks.aggregate(
		Allperkaggregate
	);
	let totalrecord = await MentorPerks.find(where).count();
	try
    {    
		
	 	res.status(200).json({  
            status: "success",
            message: "Mentor perks retrieved successfully",
            data: result_resource, 
			data_featured: result_feturedperk,
			totalRecords: totalrecord,
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Mentor perks fetch failed',
		});
    } 
};

// Admin Collegey Opportunity

exports.getMentorAdminCollegeyOpportunitInfo = async function(req, res, next) {
	let postData = req.body;
	let where = {isDeleted: false};
	const page   = postData.page* 1 || 1;
	const limit  = postData.limit * 1 || 5;
	const skip   = (page - 1) * limit;
	let where_resources = {isDeleted: false,featured:'Yes'};

	// Get Featured Perk
	
	let AllFeaturedaggregate = [ 
		{  
			$match: where_resources,
		},
		{
			$project : {
				_id:1,
				title:1,
				short_description:1,
				description:1,
				isDeleted:1,
				image:1,
				slug:1,
				tags:1,
				createdAt:1,
				favorite:1,
				featured:1,
				"favorite_count": { $size: "$favorite" } 
			}
		}, 
		{ $sort: {"favorite_count":-1}  },
	];

	var result_feturedperk = await CollegeyOpportunities.aggregate(
		AllFeaturedaggregate
	);

	let Allaggregate = [ 
		{  
			$match: where,
		},
		{
			$project : {
				_id:1,
				title:1,
				short_description:1,
				description:1,
				isDeleted:1,
				image:1,
				slug:1,
				tags:1,
				createdAt:1,
				favorite:1,
				featured:1,
				"favorite_count": { $size: "$favorite" } 
			}
		},
		{ $sort: {"featured":-1,"favorite_count":-1}},
		{ $skip: skip },
        { $limit: limit }, 
	];

	var result_resource = await CollegeyOpportunities.aggregate(
		Allaggregate
	);
	let totalrecord = await CollegeyOpportunities.find(where).count();
	try
    {     
     	 res.status(200).json({  
            status: "success",
            message: "Collegey opportunity retrieved successfully",
            data: result_resource,
			data_featured: result_feturedperk,
			totalRecords: totalrecord,
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Collegey opportunity fetch failed',
		});
    } 
};