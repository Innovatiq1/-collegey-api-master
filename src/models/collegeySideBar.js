const mongoose = require('mongoose');

    const CollegeySideBarSchema = new mongoose.Schema(
	{
		collegeyAcademy: [{	
			academyTitle: {type: String},
			academySubTitle: {type: String},
			academyDescription:{type: String},
			academyBtnText: {type: String},
			academyLink: {type: String},
			questionTitle: {type: String},
		}],
		// collegeyQuestion: [{	
		// 	question: {type: String},
		// 	status: {type: Boolean},
		// }],
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


const CollegeyFeed = mongoose.model('CollegeySideBar', CollegeySideBarSchema);

module.exports = CollegeyFeed;
