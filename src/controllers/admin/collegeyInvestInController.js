var investIn = require('../../models/collegeyInvestIn');

export async function addData(req, res, next) {
	let postData = req.body;

	const investInLins = new investIn({
		mainTitle: postData.mainTitle,
		title: postData.title,
		subTitle: postData.subTitle,
		description: postData.description,
		bannerImg: postData.selectFile,
	});

	try {
		const allData = await investInLins.save();
		res.status(200).json({
			status: 'Success',
			message: 'Collegey Invest In Theam add successfully',
		});
	} catch (error) {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Collegey Invest In Theam failed',
		});
	}
}

export async function getAllData (req, res) {
	const allData = await investIn.find({});

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
		const investInLins = new investIn({
			_id: req.params.id,
			mainTitle: postData.mainTitle,
			title: postData.title,
			subTitle: postData.subTitle,
			description: postData.description,
			bannerImg: postData.selectFile,
		});

		let result = await investIn.findOneAndUpdate({ _id: req.params.id }, investInLins);
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
