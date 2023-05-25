const Feed = require('../../models/CollegeyUniversalFeed');
const sidebar = require('../../models/collegeySideBar');
const futureSelf=require('../../models/futureSelf')
const collegeyquestion = require('../../models/collegeyQuestion');
const { ObjectId } = require('bson');
const request = require('request-promise');
const cheerio = require('cheerio');

exports.getAllCollegeyFeeds = async (req, res, next) => {
    try {        
        
        let postData = req.query;
        
        let docLimit = postData.limit ? postData.limit : 10;
        // let aggregate = [
        //     {
        //         $facet: {
        //             data: [
        //                 { $limit: docLimit },
        //             ],
        //             pageInfo: [
        //                 {
        //                     $group: { _id: null, count: { $sum: 1 } },
        //                 },
        //             ],
        //         },
        //     },
        // ];
        // var allCollegeyfeeds = await Feed.aggregate(
        //     aggregate
        // );
        let allCollegeyfeeds = await Feed.find().limit(docLimit).sort({createdAt:-1});
        
        let totalRecords = await Feed.find().count();
            res.status(200).json({
            status: 'success',
            data: allCollegeyfeeds,
            totalRecords: totalRecords
        });
    } catch (error) {
        next(error)
    }
}
exports.updateFeedPost = async (req, res) => {
	let postDataGet = req.body;
    
	let feedid   	= ObjectId(postDataGet.id);
	const url_data 	= postDataGet.post_url;
	const feedData  = await Feed.findOne({ _id: feedid });

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
			const postData = await Feed.findOneAndUpdate(
				{_id: feedid },
				collegylins
			);
			res.status(200).json({
				status: 'Success',
				message: 'Update Post Successfully',
			});
		}
		catch(error)
		{
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
			const postData = await Feed.findOneAndUpdate(
				{_id: ObjectId(feedid) },
				collegylins
			);
			res.status(200).json({
				status: 'Success',
				message: 'Post update Successfully',
			});
		}
		catch(error)
		{
			//next(error);
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
            
			
			const postData = await Feed.findOneAndUpdate(
				{_id: feedid },
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


exports.updateCollegeyFeed1 = async (req, res, next) => {
    try {
        let activationStatus = req.body.activationStatus;
        let id = req.body.feedId;
        let updateFeed = await Feed.findByIdAndUpdate(id, { isDeleted: activationStatus });
        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        next(error)
    }
}

//acedamic box

export async function add_AcedamicBoxData(req, res, next) {
	let postData = req.body;

	const acedamicLins = new sidebar({
		collegeyAcademy:[{
			academyTitle: postData.academyTitle, 
			academySubTitle: postData.academySubTitle,
			academyDescription: postData.academyDescription,
			academyBtnText: postData.academyBtnText,
			academyLink: postData.academyLink,
			questionTitle: postData.questionTitle,
		}]
	});


	try
    {     
        const acedamicBoxData = await acedamicLins.save();
        res.status(200).json({
			status: 'Success',
			message: 'Collegey Acadamic add successfully',
		});
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Collegey Acadamic failed',
		});
    } 
}

exports.get_AcedamicBoxData  = async (req, res) => {

	const acedamicBoxData = await sidebar.find({});

	try { 
        res.status(200).json({  
            status: "success",
            message: "retrieved data successfully",
            data: acedamicBoxData
        });
    }catch (error) {
      	res.status(400).json({
			status: 'error',
			message: 'data fetch failed',
		});
    }
}

export async function update_AcedamicBoxData(req, res, next) {
	let postData = req.body;
	try {
		const acedamicLins = {
			collegeyAcademy:[{
				academyTitle: postData.academyTitle, 
				academySubTitle: postData.academySubTitle,
				academyDescription: postData.academyDescription,
				academyBtnText: postData.academyBtnText,
				academyLink: postData.academyLink,
				questionTitle: postData.questionTitle,
			}]
		};

        let result = await sidebar.findOneAndUpdate(
            {_id: req.params.id},
            acedamicLins
        );
        res.status(200).json({
            status: 'Success',
            message: 'update Successfully',
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'update faild',
        });
    }
}

//collegey Question box

export async function add_collegeyQuestionData(req, res, next) {
	let postData = req.body;

	const questionLins = new collegeyquestion({
		question: postData.question,
		responseLable:postData.responseLable,
		question_content: postData.question_content, 
		status: postData.status,
	});

	try
    {     
        const questionBoxData = await questionLins.save();
        res.status(200).json({
			status: 'Success',
			message: 'Collegey Acadamic add successfully',
		});
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Collegey Acadamic failed',
		});
    } 
}

exports.get_collegeyQuestionData  = async (req, res) => {

	const questionBoxData = await collegeyquestion.find({});

	try { 
        res.status(200).json({  
            status: "success",
            message: "retrieved data successfully",
            data: questionBoxData
        });
    }catch (error) {
      	res.status(400).json({
			status: 'error',
			message: 'data fetch failed',
		});
    }
}

export async function update_collegeyQuestionData(req, res, next) {
	let postData = req.body;
	try {
		const questionLins = {
			question: postData.question,
			responseLable:postData.responseLable,
			question_content: postData.question_content, 
			status: postData.status,
		};

        let result = await collegeyquestion.findOneAndUpdate(
            {_id: req.params.id},
            questionLins
        );
        res.status(200).json({
            status: 'Success',
            message: 'update Successfully',
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'update faild',
        });
    }
}

export async function get_collegeyAnswerData(req, res) {
	let postData = req.body.id;
	try
    {   
		let Allaggregate = [{
			$match: {questionId:ObjectId(postData)},
		},
		{ $sort: { _id: -1 } },
		{
			$lookup: {
				from: 'users',
				localField: 'UserId',
				foreignField: '_id',
				as: 'user'
			}
		},
		{
			$project: {
				name: { $arrayElemAt: ["$user.name",0] },
				Answer:1,
				Question:1,
				UserId:1,
				questionId:1,
				responseLable:1
			},
	}];
        const answerBoxData = await futureSelf.aggregate(Allaggregate)
        res.status(200).json({
			status: 'Success',
			message: 'Answer getting successfully',
			data:answerBoxData
		});
    }
    catch(error)
    {
		res.status(400).json({
			status: 'error',
			message: 'Answer getting fail',
		});
    } 
}

exports.get_collegeyMasterQuestion  = async (req, res) => {
	var UserId=req.user._id;
	const questionBoxData = await collegeyquestion.find({});
	var finalData=[]
	for(let i = 0; i< questionBoxData.length;i++){
		const answerBoxData = await futureSelf.find({UserId:UserId,questionId:questionBoxData[i]._id});
		if(answerBoxData.length == 0){
			console.log('-answerBoxData=-=-=-=->',questionBoxData[i])

			finalData.push(questionBoxData[i])
		}
	}

	try { 
        res.status(200).json({  
            status: "success",
            message: "retrieved data successfully",
            data: finalData
        });
    }catch (error) {
      	res.status(400).json({
			status: 'error',
			message: 'data fetch failed',
		});
    }
}


