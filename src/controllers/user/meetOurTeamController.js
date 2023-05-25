const MeetOurTeamTitleModel = require('../../models/meetOurTeamTitle');
const { collegeyFeedPostService } = require('../../services/collegeyFeedService');
const factory = require('../factoryFunctions/handlerFactory');
import CollegeyFeed from  '../../models/CollegeyUniversalFeed'

const request = require('request-promise');
const cheerio = require('cheerio');
const { ObjectId } = require('bson');



//Meet Our Team Title

exports.getAllTitle = async (req, res, next) => {

	let postData = req.body;
	try {
		const allTitle= await MeetOurTeamTitleModel.find({});	
		const totalCount = allTitle.length
		if (allTitle) {
			res.status(200).json({
				status: 'success',
				results: totalCount,
				data: allTitle,
			});
		}
	} catch (error) {
		next(error);
	}
}

export async function addTitleData(req, res, next) {
	let postData = req.body;

	const titleData = new MeetOurTeamTitleModel({
		mainTitle: postData?.mainTitle,
		subTitle1: postData?.subTitle1,
		subTitle2: postData?.subTitle2,
		// status: postData?.status,
	});


	try
    {     
        const motTitleData = await titleData.save();
        res.status(200).json({
			status: 'Success',
			message: 'Title add successfully',
		});
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Title failed',
		});
    } 
}

export async function updateTitle(req, res, next) {
	let postData = req.body;

	try
    {     
		console.log('req.params.id=====>',req.params.id)
        const motTitleData = await MeetOurTeamTitleModel.findOneAndUpdate(req.params.id,postData);
		console.log('motTitleData========>',motTitleData)

        res.status(200).json({
			status: 'Success',
			message: 'Title Updated successfully',
		});
    }
    catch(error)
    {
		console.log(error)
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Update Title failed',
		});
    } 
}




