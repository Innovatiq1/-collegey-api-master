const mongoose = require('mongoose');

    const MeetOurTeamTitleSchema = new mongoose.Schema(
	{
		mainTitle: {type: String},
		subTitle1: {type: String},
		subTitle2: {type: String},
		// status: {type: Boolean},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updateAt: {
			type: Date,
			default: Date.now,
		},
	},
);


const MeetOurTeamTitle = mongoose.model('MeetOurTeamTitle', MeetOurTeamTitleSchema);

module.exports = MeetOurTeamTitle;
