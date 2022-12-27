/* eslint-disable node/no-unsupported-features/es-syntax */
import { blogGetServices } from '../../services/blogServices';
import { webinarGetServices } from '../../services/webinarServices';
import { programGetServices } from '../../services/programServices';
import { courseGetServices } from '../../services/courseServices';
import { conferenceGetServices } from '../../services/conferenceServices';
import Blogs from '../../models/Blogs';
import User from '../../models/User';

// Load Model
import NrStudentResource from '../../models/nr-resource/nr-resource';
import NrStudentArticle from '../../models/nr-article/nr-article';
import NrStudentCurated from '../../models/nr-curated-resources/nr-curated-resources';
import NrStudentFile from '../../models/nr-student-file/nr-student-file';

import { statusTypes } from '../../utilities/constant_variables';
const { ObjectId } = require('bson');


// New & Resources

exports.getNewsResourcesData = async function(req, res, next) {
	let postData = req.body;
	const page   = postData.page* 1 || 1;
	const limit  = postData.limit * 1 || 5;
	const skip   = (page - 1) * limit;
	let where    = {isDeleted: false};
	try
    {       
     	 let result_resource = await NrStudentResource.find(where).sort( { createdAt : -1} ).skip(skip).limit(limit);
		 res.status(200).json({  
            status: "success",
            message: "News resource retrieved successfully",
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
export async function blogTag (req, res, next) {
    try{
        const blogs = await Blogs.find({ tags: req.body.blogTag });
        if(blogs){
        res.status(200).json({
            status: "success",
            message: "blog retrieved successfully",
            data: blogs
        });
    }else{
        res.status(400).json({
            status: "success",
            message: "blog failed",
            data: ""
        });

    }
    }catch(e){
        next(e);
    }
}

exports.getSearchPostData = async function(req, res, next) {
	try {
		let postData = req.body;

		let where = {};
		
		if(postData.searchKeyword != null && postData.searchKeyword != '')
		{
			let regex = new RegExp(postData.searchKeyword, "i");
			where["title"] = regex;
		}

		let aggregateQueryRem = [
			{ 
				$match:where  
			},
			{    
				$project: { 
				  _id:1,
				  slug:1,
				  title:1,
				  author:1,
				} 
			},  
		];

		let all_blog;
		if(postData.searchKeyword != null && postData.searchKeyword != '')
		{
			 all_blog = await Blogs.aggregate(
				aggregateQueryRem
			);
		}
		else
		{
			all_blog = [];
		}	

		res.status(200).json({
			status: "Success",
			message: "Fetch data successfully",
			data: all_blog,
		});

	} catch (e) {
		next(e);
	}
};

exports.getNewsArticle = async function(req, res, next) {
	let postData = req.body;
	const page   = postData.page* 1 || 1;
	const limit  = postData.limit * 1 || 5;
	const skip   = (page - 1) * limit;
	let where    = {isDeleted: false};
	try
    {    
     	let result_resource = await NrStudentArticle.find(where).sort( { createdAt : -1} ).skip(skip).limit(limit);
		res.status(200).json({  
            status: "success",
            message: "Article retrieved successfully",
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

exports.getStudentCurated = async function(req, res, next) {
	let postData = req.body;
	const page   = postData.page* 1 || 1;
	const limit  = postData.limit * 1 || 5;
	const skip   = (page - 1) * limit;
	let where    = {isDeleted: false};
	try
    {    
     	let result_resource = await NrStudentCurated.find(where).sort( { createdAt : -1} ).skip(skip).limit(limit);
		res.status(200).json({  
            status: "success",
            message: "Student curated retrieved successfully",
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

exports.getStudentFileData = async function(req, res, next) {
	let postData = req.body;
	const page   = postData.page* 1 || 1;
	const limit  = postData.limit * 1 || 4;
	const skip   = (page - 1) * limit;
	let where    = {isDeleted: false};
	try
    {    
     	 let result_resource = await NrStudentFile.find(where).sort( { createdAt : -1} ).skip(skip).limit(limit);
		 res.status(200).json({  
            status: "success",
            message: "Student file retrieved successfully",
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
			message: 'Student file fetch faild',
		});
    } 
};

exports.add_blogComment = async (req, res) => { 
	let postData = req.body;
	var blogComment = [];
	const userData = await User.findOne({ _id: postData.user });
	var upObj = {
		user: postData.user,
		name: userData.name,
		email: userData.email,
		comment: postData.comments,
		createdAt: Date.now(),
	};
	blogComment.push(upObj);
	try
	{    
		let result = await Blogs.findOneAndUpdate(
			{_id: postData.blog_id},
			{ $push: { "blogComments":{$each: blogComment,$position:0} } }
		); 
		res.status(200).json({
			status: 'Success',
			message: 'Comment added Successfully',
		});
	}
	catch(error)
	{
		res.status(400).json({
			status: 'error',
			message: 'Comment add faild',
		});
	}
}
exports.add_CommentReply = async (req, res) => { 
	let postData = req.body;
	console.log("comment reply req.body ===>", req.body)
	var commentReply = [];
	const userData = await User.findOne({ _id: postData.user });

	var upObj = {
		user: postData.user,
		name: userData.name,
		email: userData.email,
		avatar: userData.avatar,
		comment: postData.replyText,
		createdAt: Date.now(),
	};

	const blogdata = await Blogs.findOne({_id: postData.blog_id});
	commentReply.push(upObj);

	const commentArray = blogdata.blogComments;

	// for (let index = 0; index < commentArray.length; index++) {
		// if (commentArray[index]._id == postData.commentId) {
			try
			{    

				let result = await Blogs.findOneAndUpdate(
					{_id: postData.blog_id, "blogComments._id": postData.commentId},
					{ $push: { 'blogComments.$.reply' :{$each: commentReply,$position:0} } }
				); 
				res.status(200).json({
					status: 'Success',
					message: 'Comment Reply added Successfully',
				});
			}
			catch(error)
			{
				res.status(400).json({
					status: 'error',
					message: 'Comment Reply failed to add.',
				});
			}
		// }
	// }

}

exports.getBlogComment = async (req, res) => { 
	let postData = req.body;
	let where = {_id: ObjectId(postData.blog_id)};
	let Allaggregate = [ 
		{  
			$match: where,
		},
		{ $sort: { _id: -1 } },
		{
			$lookup:{
					from: 'users',
					localField: 'blogComments.user',
					foreignField: '_id',
					as: 'userdata'
			}
		},
		{    
			$project: { 
			  _id:1,
			  blogComments:1,
			  userdata: "$userdata"
			} 
		},  
	];
	var all_comment = await Blogs.aggregate(
		Allaggregate
	);
	
	for (let i = 0; i < all_comment[0].blogComments?.length; i++) {
		let userId = all_comment[0].blogComments[i].user.toString();
		let filterArray = all_comment[0].userdata.filter(
		  (x) => x._id.toString() === userId
		); 
		if (filterArray.length > 0) {
			all_comment[0].blogComments[i].userData = filterArray[0];
		}
	}

	try
    {    
		res.status(200).json({  
			status: "success",
			message: "Blog comment retrieved successfully",
			data: all_comment[0]
		});
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Blog comment fetch faild',
		});
    } 		
}
// exports.getCommentReply = async (req, res) => { 
// 	let postData = req.body;
// 	console.log("postData==>", postData)
// 	let where = {
// 		// $and: [
// 			"_id": ObjectId(postData.blog_id),
// 	// 		{"blogComments._id": postData.commentId}
// 	// ]
		
// 	};
// 	let Allaggregate = [ 
// 		{  
// 			$match: where,
// 		},
// 		{ $sort: { _id: -1 } },
// 		{
// 			$lookup:{
// 					from: 'users',
// 					localField: 'blogComments.user',
// 					foreignField: '_id',
// 					as: 'userdata'
// 			}
// 		},
// 		{
// 			$unwind: "$userdata" 
// 		},
// 		{    
// 			$project: { 
// 			  _id:1,
// 			  blogComments:1,
// 			  userdata: "$userdata"
// 			} 
// 		},  
// 	];
// 	var all_comment = await Blogs.aggregate(
// 		Allaggregate
// 	);

// 	console.log(" all_comment ===>",  all_comment)
	
// 	// for (let i = 0; i < all_comment[0].blogComments.length; i++) {
// 	// 	let userId = all_comment[0].blogComments[i].user.toString();
// 	// 	let filterArray = all_comment[0].userdata.filter(
// 	// 	  (x) => x._id.toString() === userId
// 	// 	); 
// 	// 	if (filterArray.length > 0) {
// 	// 		all_comment[0].blogComments[i].userData = filterArray[0];
// 	// 	}
// 	// }

// 	try
//     {    
// 		res.status(200).json({  
// 			status: "success",
// 			message: "Blog comment retrieved successfully",
// 			data: all_comment[0]
// 		});
//     }
//     catch(error)
//     {
// 		next(error);
// 		res.status(400).json({
// 			status: 'error',
// 			message: 'Blog comment fetch faild',
// 		});
//     } 		
// }

export async function getBlogs(req, res, next) {
	try {
		const blogs = await blogGetServices.getAll(req.query, statusTypes.ACTIVE);
		if (blogs) {
			res.status(200).json({
				status: 'success',
				message: 'Blogs',
				data: blogs
			});
		}
	} catch (e) {
		next(e);
	}
}
export async function getBlogDetails(req, res, next) {
	try {
		const blog = await blogGetServices.getOneBySlug(req.params.slug);
		if (blog) {
			res.status(200).json({
				status: 'success',
				message: 'Blog Details',
				data: blog
			});
		}
	} catch (e) {
		next(e);
	}
}

export async function getWebinars(req, res, next) {
	try {
		const webinars = await webinarGetServices.getAll(req.query, statusTypes.ACTIVE);
		if (webinars) {
			res.status(200).json({
				status: 'success',
				message: 'Webinars',
				data: webinars
			});
		}
	} catch (e) {
		next(e);
	}
}

export async function getPrograms(req, res, next) {
	try {
		const programs = await programGetServices.getAll(req.query, statusTypes.ACTIVE);
		if (programs) {
			res.status(200).json({
				status: 'success',
				message: 'programs',
				data: programs
			});
		}
	} catch (e) {
		next(e);
	}
}
export async function getProgramsDetails(req, res, next) {
	try {
		const programs = await programGetServices.getOne(req.params.id);
		if (programs) {
			res.status(200).json({
				status: 'success',
				message: 'Programs Details',
				data: programs
			});
		}
	} catch (e) {
		next(e);
	}
}

export async function getCourses(req, res, next) {
	try {
		const courses = await courseGetServices.getAll(req.query, statusTypes.ACTIVE);
		if (courses) {
			res.status(200).json({
				status: 'success',
				message: 'courses',
				data: courses
			});
		}
	} catch (e) {
		next(e);
	}
}

export async function getConferences(req, res, next) {
	try {
		const conferences = await conferenceGetServices.getAll(req.query, statusTypes.ACTIVE);
		if (conferences) {
			res.status(200).json({
				status: 'success',
				message: 'conferences',
				data: conferences
			});
		}
	} catch (e) {
		next(e);
	}
}

export async function getAllResources(req, res, next) {
	try {
		const programs = await programGetServices.getAll(
			{ limit: 6, sortBy: '-createdAt' },
			statusTypes.ACTIVE
		);
		const courses = await courseGetServices.getAll(
			{ limit: 6, sortBy: '-createdAt' },
			statusTypes.ACTIVE
		);
		const blogs = await blogGetServices.getAll(
			{ limit: 6, sortBy: '-createdAt' },
			statusTypes.ACTIVE
		);
		const webinars = await webinarGetServices.getAll(
			{ limit: 6, sortBy: '-createdAt' },
			statusTypes.ACTIVE
		);
		res.status(200).json({
			status: 'success',
			message: 'resources',
			data: { blogs, webinars, programs, courses }
		});
	} catch (e) {
		next(e);
	}
}
