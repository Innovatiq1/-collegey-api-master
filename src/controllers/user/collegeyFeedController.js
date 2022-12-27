const collegeyFeedController = require('../../models/CollegeyUniversalFeed');
const FeedCommentModel = require('../../models/commentUniversal');
const { collegeyFeedPostService } = require('../../services/collegeyFeedService');
const factory = require('../factoryFunctions/handlerFactory');
import CollegeyFeed from  '../../models/CollegeyUniversalFeed'

const request = require('request-promise');
const cheerio = require('cheerio');
const { ObjectId } = require('bson');


// using default factory functions

// exports.getAllCollegeyFeeds = factory.getAll(collegeyFeedController);

//collegey feed

exports.getAllCollegeyFeeds = async (req, res, next) => {

	let docLimit = req.body.docLimit;
	let skip = req.body.skipFeed;
	let where = {
		isDeleted: false,
		group: null
	}

	let Allaggregate = [
		{
			$match: where
		},
		{ $sort: { _id: -1 } },
		{
			$lookup: {
				from: 'users',
				localField: 'user',
				foreignField: '_id',
				as: 'user'
			}
		},
		{
			$lookup: {
				from: 'likedislikecollegeyfeeds',
				localField: 'likes',
				foreignField: '_id',
				as: 'likes'
			}
		},
		{
			$lookup: {
				from: "comments",
				let: { 
					customerid: "$comment",	
					},
				pipeline: [
					{
						$match: {
							$expr: { $in: ["$_id", "$$customerid"] },
						  },

						},{
							$lookup: {
							from: 'users',
							localField: 'user',
							foreignField: '_id',
							as: 'user'
						},
						
						
					},
					{$unwind: '$user'},
				],
				as: "comment",
			},
			
		},
		{
			$facet: {
				data: [{ $skip: skip },{ $limit: docLimit }],
				pageInfo: [
					{
						$group: { _id: null, count: { $sum: 1 } },
					},
				],
			},
		},
		{
			$unwind: { path: "$pageInfo", preserveNullAndEmptyArrays: true },
		},
		{
			$project: {
				item: "$data",
				pageInfo: {
					count: '$pageInfo.count'
				}
			},
		},
	];

	var allCollegeyfeeds = await CollegeyFeed.aggregate(
		Allaggregate
	);

	try {
		if (allCollegeyfeeds) {
			res.status(200).json({
				status: 'success',
				results: allCollegeyfeeds[0].pageInfo.count,
				data: { data: allCollegeyfeeds[0].item },
			});
		}
	} catch (error) {
		next(error);
	}
}



exports.getAllCollegeyFeedCounter = factory.getAllCounter(collegeyFeedController);
exports.getCollegeyFeed = factory.getOne(collegeyFeedController);
exports.createCollegeyFeed = factory.createOne(collegeyFeedController);
exports.updateCollegeyFeed = factory.updateOne(collegeyFeedController);
exports.deleteCollegeyFeed = factory.deleteOne(collegeyFeedController);

exports.deleteFeedById = async (req, res,next) => {
	try {
		const feedId = req.body.feedId;
		const feed = await CollegeyFeed.findByIdAndDelete(feedId);
	
			res.status(200).json({
				status: 'success',
				message: 'Post Deleted',
			});
		
	} catch (error) {
		next(error);
	}
}

exports.createCommentForFeed = async (req, res, next) => {
 	try {
		const feedId = req.params.id;
		const feed = await collegeyFeedPostService.postFeedComment(feedId, req.body);
		if (feed) {
			res.status(200).json({
				status: 'success',
				message: 'Comment Posted',
				data: {
					feed,
				},
			});
		}
	} catch (error) {
		next(error);
	}
};
exports.liketForFeed = async (req, res, next) => {
	try {
		const feedId = req.params.id;
		//console.log('test',req.body)

		const feed = await collegeyFeedPostService.postFeedLike(feedId, req.body);
		if (feed) {
			res.status(200).json({
				status: 'success',
				message: 'Likes Updated',
				data: {
					feed,
				},
			});
		}
	} catch (error) {
		next(error);
	}
};
exports.DisliketForFeed = async (req, res, next) => {
	try {
		const feedId = req.params.id;
		//console.log('test',req.body)

		const feed = await collegeyFeedPostService.postFeedDisLike(feedId, req.body);
		if (feed) {
			res.status(200).json({
				status: 'success',
				message: 'Likes Updated',
				data: {
					feed,
				},
			});
		}
	} catch (error) {
		next(error);
	}
};
exports.shareForFeed = async (req, res, next) => {
	try {
		const feedId = req.params.id;
		//console.log('test',req.body)

		const feed = await collegeyFeedPostService.postFeedShare(feedId, req.body);
		//console.log('feed',feed)
		if (feed) {
			res.status(200).json({
				status: 'success',
				message: 'Share Updated',
				data: {
					feed,
				},
			});
		}
	} catch (error) {
		next(error);
	}
};

exports.getGroupwiseFeed = async (req, res, next) => {

	let docLimit = req.body.docLimit;
	let skip = req.body.skipFeed;
	let groupID= req.body.groupId;
	let where = { group: ObjectId(groupID), isDeleted: false }

	let Allaggregate = [
		{ $match: where },
		{ $sort: { _id: -1 } },
		{
			$lookup: {
				from: 'users',
				localField: 'user',
				foreignField: '_id',
				as: 'user'
			}
		},
		{$unwind: '$user'},
		{
			$lookup: {
				from: 'groups',
				localField: 'group',
				foreignField: '_id',
				as: 'group'
			}
		},
		{$unwind: '$group'},
		{
			$lookup: {
				from: 'likedislikecollegeyfeeds',
				localField: 'likes',
				foreignField: '_id',
				as: 'likes'
			}
		},
		{
			$lookup: {
				from: "comments",
				let: { 
					commentId: "$comment",	
					},
				pipeline: [
					{
						$match: {
							$expr: { $in: ["$_id", "$$commentId"] },
						  },

						},{
							$lookup: {
							from: 'users',
							localField: 'user',
							foreignField: '_id',
							as: 'user'
						},
						
						
					},
					{$unwind: '$user'},
				],
				as: "comment",
			},
			
		},
		{
			$facet: {
				data: [{ $skip: skip },{ $limit: docLimit }],
				pageInfo: [
					{
						$group: { _id: null, count: { $sum: 1 } },
					},
				],
			},
		},
		{
			$unwind: { path: "$pageInfo", preserveNullAndEmptyArrays: true },
		},
		{
			$project: {
				item: "$data",
				pageInfo: {
					count: '$pageInfo.count'
				}
			},
		},
	];

	var allGroupFeeds = await CollegeyFeed.aggregate(
		Allaggregate
	);

	console.log("data: allGroupFeeds[0].item",allGroupFeeds[0].item)


	try {
		if (allGroupFeeds) {
			res.status(200).json({
				status: 'success',
				results: allGroupFeeds[0].pageInfo.count,
				message: 'data fetched',
				data: { data: allGroupFeeds[0].item },
			});
		}
	} catch (error) {
		next(error);
	}
}

exports.getonlyCollgeyFeed = async (req, res, next) => {
	try {
//console.log('test')
		const data = await collegeyFeedPostService.collegeyFeedData();
		if (data) {
			res.status(200).json({
				status: 'success',
				message: 'data fetched',
				data: {
					data,
				},
			});
		}
	} catch (error) {
		next(error);
	}
};
exports.getonlyCollgeyFeed = async (req, res, next) => {
	// 0 Custom defining const to be used
		
		const data = await CollegeyFeed.findAll();

		// Send Response
		res.status(200).json({
			status: 'success',
			data,
		});

}

exports.updateFeedComment = async (req, res) => {
	let postData = req.body;
	try
	{    
		const feedData   = await collegeyFeedController.findOne({ _id: ObjectId(postData.feed_id) });
		let comment_id   = feedData.comment[postData.cmtindex]._id;

		const commentData = await FeedCommentModel.findOneAndUpdate(
			{_id: ObjectId(comment_id) },
			{text:postData.cmtvalue}
		);

		res.status(200).json({
			status: 'Success',
			message: 'Update comment Successfully',
		});
	}
	catch(error)
	{
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Update comment faild',
		});
	}
}

exports.removeFeedComment = async (req, res) => {
	let postData = req.body;
	try
	{    
		const feedData   = await collegeyFeedController.findOne({ _id: ObjectId(postData.feed_id) });
		feedData.comment.splice(postData.cmtindex, 1);
		const updateData = await collegeyFeedController.findOneAndUpdate(
			{_id: ObjectId(postData.feed_id) },
			feedData
		);
		
		res.status(200).json({
			status: 'Success',
			message: 'Remove comment Successfully',
		});
	}
	catch(error)
	{
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Remove comment faild',
		});
	}
}

exports.addNewFeedPost = async (req, res) => {
	let postDataGet   = req.body;	
	const url_data 	  = postDataGet.post_url;

	if(typeof postDataGet.post_url === 'undefined' || postDataGet.post_url == '' && postDataGet.postImageUrl != '')
	{
		let collegylins; 
		if(postDataGet.postImageUrl !== '' && postDataGet.postImageUrl !== null && typeof postDataGet.postImageUrl !== 'undefined')
		{ 
			collegylins = new collegeyFeedController({
				postText: postDataGet.postText, 
				postData: postDataGet.postData,
				postImageUrl: postDataGet.postImageUrl,
				postType: 'image',
				user: postDataGet.user,
				createdAt: Date.now(),
			}); 
		}
		else
		{
			collegylins = new collegeyFeedController({
				postText: postDataGet.postText, 
				postData: postDataGet.postData,
				user: postDataGet.user,
				postType: 'text',
			}); 
		}

		try
		{    
			const postData = await collegylins.save();
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}
		catch(error)
		{
			next(error);
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		}
	}
	else if(typeof postDataGet.post_url !== 'undefined' && postDataGet.post_url !== '' && postDataGet.postImageUrl !== '' && postDataGet.postImageUrl !== null)
	{
		let collegylins = new collegeyFeedController({
			postText: postDataGet.postText, 
			postData: postDataGet.postData,
			posturl: postDataGet.post_url,
			postImageUrl: postDataGet.postImageUrl,
			postType: 'image',
			user: postDataGet.user,
			createdAt: Date.now(),
		});
		
		try
		{     
			const postData = await collegylins.save();
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}
		catch(error)
		{
			next(error);
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		}

	} 
	else
	{
		request(url_data).then(async function(html){
			//success! 
			var $ = cheerio.load(html),
			title = $('head title').text(),
			$desc = $('meta[name="description"]').attr('content'),
			$ogTitle = $('meta[property="og:title"]').attr('content'),
			$ogImage = $('meta[property="og:image"]').attr('content'),
			$images  = $('img');
	
			if($ogTitle == '')
			{
				return res.status(400).json({
					status: 'error',
					message: 'Please add valid Post url',
				});
			}
			
			const feddpostlins = new collegeyFeedController({
				postText: postDataGet.postText, 
				postComment: postDataGet.post_comment,
				postData: $ogTitle, 
				postImageUrl: $ogImage,
				posturl: url_data,
				user: postDataGet.user,
				postType: 'image',
				createdAt: Date.now(),
			}); 
	
			const postData = await feddpostlins.save();
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}).catch(function(err){
			//console.log("err",err);
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		  });
	}
	
}

exports.addNewGroupFeedPost = async (req, res) => {
	let postDataGet   = req.body;	
	const url_data 	  = postDataGet.post_url;
	
	if(typeof postDataGet.post_url === 'undefined' || postDataGet.post_url == '' && postDataGet.postImageUrl != '')
	{
		let collegylins; 
		if(postDataGet.postImageUrl !== '' && postDataGet.postImageUrl !== null && typeof postDataGet.postImageUrl !== 'undefined')
		{ 
			collegylins = new collegeyFeedController({
				group: postDataGet.group,
				postText: postDataGet.postText, 
				postData: postDataGet.postData,
				postImageUrl: postDataGet.postImageUrl,
				postType: 'image',
				user: postDataGet.user,
				createdAt: Date.now(),
			}); 
		}
		else
		{
			collegylins = new collegeyFeedController({
				postImageUrl:null,
				group: postDataGet.group,
				postText: postDataGet.postText, 
				postData: postDataGet.postData,
				user: postDataGet.user,
				postType: 'text',
			}); 
		}

		try
		{    
			const postData = await collegylins.save();
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}
		catch(error)
		{
			next(error);
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		}
	}
	else if(typeof postDataGet.post_url !== 'undefined' && postDataGet.post_url !== '' && postDataGet.postImageUrl !== '' && postDataGet.postImageUrl !== null)
	{
		let collegylins = new collegeyFeedController({
			group: postDataGet.group,
			postText: postDataGet.postText, 
			postData: postDataGet.postData,
			postImageUrl: postDataGet.postImageUrl,
			postType: 'image',
			user: postDataGet.user,
			posturl: url_data,
			createdAt: Date.now(),
		});
		
		try
		{     
			const postData = await collegylins.save();
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}
		catch(error)
		{
			next(error);
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		}

	} 
	else
	{
		console.log("step 3")
		request(url_data).then(async function(html){
			//success! 
			var $ = cheerio.load(html),
			title = $('head title').text(),
			$desc = $('meta[name="description"]').attr('content'),
			$ogTitle = $('meta[property="og:title"]').attr('content'),
			$ogImage = $('meta[property="og:image"]').attr('content'),
			$images  = $('img');
	
			if($ogTitle == '')
			{
				return res.status(400).json({
					status: 'error',
					message: 'Please add valid Post url',
				});
			}
			
			const feddpostlins = new collegeyFeedController({
				group: postDataGet.group,
				postText: postDataGet.postText, 
				postComment: postDataGet.post_comment,
				postData: $ogTitle, 
				postImageUrl: $ogImage,
				posturl: url_data,
				user: postDataGet.user,
				postType: 'image',
				createdAt: Date.now(),
			}); 
	
			const postData = await feddpostlins.save();
			res.status(200).json({
				status: 'Success',
				message: 'Post added Successfully',
			});
		}).catch(function(err){
			//console.log("err",err);
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		  });
	}
	
}

exports.updateFeedPost = async (req, res) => {
	let postDataGet = req.body;
	let feedid   	= ObjectId(postDataGet.feedid);
	const url_data 	= postDataGet.post_url;
	const feedData  = await collegeyFeedController.findOne({ _id: feedid });

	let feedImage;
	if(postDataGet.postImageUrl == '')
	{
		feedImage = feedData.postImageUrl;
	}
	else
	{
		feedImage = postDataGet.postImageUrl;	
	}
	
	if(typeof postDataGet.post_url === 'undefined' || postDataGet.post_url == '' && feedImage != '')
	{
		let collegylins; 
		if(feedImage !== '' && feedImage !== null && typeof feedImage !== 'undefined')
		{ 
			collegylins = {
				postText: postDataGet.postText, 
				postData: postDataGet.postData,
				postImageUrl: feedImage,
				postType: 'image',
				user: postDataGet.user,
				updateAt: Date.now(),
			}; 
		}
		else
		{
			collegylins = {
				postImageUrl:null,
				postText: postDataGet.postText, 
				postData: postDataGet.postData,
				user: postDataGet.user,
				postType: 'text',
			}; 
		}

		try
		{    
			const postData = await collegeyFeedController.findOneAndUpdate(
				{_id: ObjectId(postDataGet.feedid) },
				collegylins
			);
			res.status(200).json({
				status: 'Success',
				message: 'Update Post Successfully',
			});
		}
		catch(error)
		{
			next(error);
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		}
	}
	else if(typeof postDataGet.post_url !== 'undefined' && postDataGet.post_url !== '' && feedImage !== '' && feedImage !== null)
	{
		let collegylins = {
			postText: postDataGet.postText, 
			postData: postDataGet.postData,
			postImageUrl: feedImage,
			postType: 'image',
			user: postDataGet.user,
			updateAt: Date.now(),
		};

		try
		{     
			const postData = await collegeyFeedController.findOneAndUpdate(
				{_id: ObjectId(postDataGet.feedid) },
				collegylins
			);
			res.status(200).json({
				status: 'Success',
				message: 'Post update Successfully',
			});
		}
		catch(error)
		{
			next(error);
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		}

	} 
	else
	{
		request(url_data).then(async function(html){
			//success! 
			var $ = cheerio.load(html),
			title = $('head title').text(),
			$desc = $('meta[name="description"]').attr('content'),
			$ogTitle = $('meta[property="og:title"]').attr('content'),
			$ogImage = $('meta[property="og:image"]').attr('content'),
			$images  = $('img');
	
			if($ogTitle == '')
			{
				return res.status(400).json({
					status: 'error',
					message: 'Please add valid Post url',
				});
			}
			
			const feddpostlins = {
				postText: postDataGet.postText, 
				postComment: postDataGet.post_comment,
				postData: $ogTitle, 
				postImageUrl: $ogImage,
				posturl: url_data,
				user: postDataGet.user,
				postType: 'image',
				updateAt: Date.now(),
			}; 
			
			const postData = await collegeyFeedController.findOneAndUpdate(
				{_id: ObjectId(postDataGet.feedid) },
				feddpostlins
			);

			res.status(200).json({
				status: 'Success',
				message: 'Update Post Successfully',
			});
		}).catch(function(err){
			//console.log("err",err);
			res.status(400).json({
				status: 'error',
				message: 'Please add valid Post url',
			});
		  });
	}
}
