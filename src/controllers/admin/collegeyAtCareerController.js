var careerAt = require('../../models/collegeyAtCareer');

export async function addData(req, res, next) {
	let postData = req.body;

	const partnerWithLins = new careerAt({
		mainTitle: postData.mainTitle,
		title: postData.title,
		subTitle: postData.subTitle,
		imgSubTitle: postData.imgSubTitle,
		description: postData.description,
		bannerImg: postData.selectFile,
	});

	try {
		const allData = await partnerWithLins.save();
		res.status(200).json({
			status: 'Success',
			message: 'Collegey Parner With Theam add successfully',
		});
	} catch (error) {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Parner With  In Theam failed',
		});
	}
}

exports.getAllData = async (req, res) => {
	const allData = await careerAt.find({});

	try {
		res.status(200).json({
			status: 'success',
			message: 'retrieved data successfully',
			data: allData,
		});
	} catch (error) {
		res.status(400).json({
			status: 'error',
			message: 'data fetch failed',
		});
	}
};

export async function updateData(req, res) {
	let postData = req.body;
	try {
		const partnerWithLins = new careerAt({
			_id: req.params.id,
			mainTitle: postData.mainTitle,
			title: postData.title,
			subTitle: postData.subTitle,
			imgSubTitle: postData.imgSubTitle,
			description: postData.description,
			bannerImg: postData.selectFile,
		});

		let result = await careerAt.findOneAndUpdate({ _id: req.params.id }, partnerWithLins);
		res.status(200).json({
			status: 'Success',
			message: 'update Successfully',
		});
	} catch (error) {
		res.status(400).json({
			status: 'error',
			message: error.message,
		});
	}
}
