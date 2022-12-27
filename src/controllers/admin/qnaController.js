const QNA = require('../../models/questionAndAnswers');

exports.getAllQuestionsAndAnswers = async (req, res, next) => {
    try {
        let postData = req.query;
        let docLimit = postData.limit ? postData.limit : 10;
        const allQNA = await QNA.find().limit(docLimit);
        const totalRecords = await QNA.find().count();

        res.status(200).json({
            status: 'success',
            data: allQNA,
            totalRecords: totalRecords,
        });
    } catch (error) {
        next(error)
    }
}

exports.updateQuestionsAndAnswers1 = async (req, res, next) => {
    try {
        let activationStatus = req.body.activationStatus;
        let id = req.body.queId;
        let updateQuestion = await QNA.findByIdAndUpdate(id, { active: activationStatus });
        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        next(error)
    }
}