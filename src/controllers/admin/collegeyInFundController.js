var fundIn = require('../../models/collegeyInFund');

export async function addData(req, res, next) {
	let postData = req.body;

	const fundInLins = new fundIn({
		mainTitle: postData.mainTitle,
		title: postData.title,
		subTitle: postData.subTitle,
		description: postData.description,
		bannerImg: postData.selectFile,
	});

	try {
		const allData = await fundInLins.save();
		res.status(200).json({
			status: 'Success',
			message: 'Collegey Fund In Theam add successfully',
		});
	} catch (error) {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Collegey Fund In Theam failed',
		});
	}
}

exports.getAllData = async (req, res) => {
	const allData = await fundIn.find({});

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
		const fundInLins = new fundIn({
			_id: req.params.id,
			mainTitle: postData.mainTitle,
			title: postData.title,
			subTitle: postData.subTitle,
			description: postData.description,
			bannerImg: postData.selectFile,
		});

		let result = await fundIn.findOneAndUpdate({ _id: req.params.id }, fundInLins);
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
