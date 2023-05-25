var partnerWith = require('../../models/collegeyWithPartner');

export async function addData(req, res, next) {
	let postData = req.body;

	const partnerWithLins = new partnerWith({
		mainTitle: postData.mainTitle,
		title: postData.title,
		subTitle: postData.subTitle,
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

export async function getAllData(req, res) {
	const allData = await partnerWith.find({});

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
		const partnerWithLins = new partnerWith({
			_id: req.params.id,
			mainTitle: postData.mainTitle,
			title: postData.title,
			subTitle: postData.subTitle,
			description: postData.description,
			bannerImg: postData.selectFile,
		});

		let result = await partnerWith.findOneAndUpdate({ _id: req.params.id }, partnerWithLins);
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
