import { partnerTypes } from '../utilities/constant_variables';
module.exports = function(req, res, next) {
	if (req.method == 'GET') {
		switch (req.params.type) {
			case 'student': {
				req.query.type = 'student';
				break;
			}
			case 'mentor': {
				req.query.type = 'mentor';
				break;
			}
			case 'impact-partner': {
				req.query.type = 'partner';
				req.query.user_type = partnerTypes.IMPACT_PARTNER;
				break;
			}
			case 'school-partner': {
				req.query.type = 'partner';
				req.query.user_type = partnerTypes.SCHL_PARTNER;
				break;
			}
			case 'university-partner': {
				req.query.type = 'partner';
				req.query.user_type = partnerTypes.UNIVERSITY_PARTNER;
				break;
			}
			case 'admin': {
				req.query.type = 'admin';
				break;
			}
			case 'counsellor': {
				req.query.type = 'counsellor';
				break;
			}
		}
	}
	if (req.method == 'POST' || req.method == 'PUT') {
		switch (req.params.type) {
			case 'student': {
				req.body.type = 'student';
				break;
			}
			case 'mentor': {
				req.body.type = 'mentor';
				break;
			}
			case 'impact-partner': {
				req.body.type = 'partner';
				req.body.user_type = partnerTypes.IMPACT_PARTNER;
				break;
			}
			case 'school-partner': {
				req.body.type = 'partner';
				req.body.user_type = partnerTypes.SCHL_PARTNER;
				break;
			}
			case 'university-partner': {
				req.body.type = 'partner';
				req.body.user_type = partnerTypes.UNIVERSITY_PARTNER;
				break;
			}
			case 'admin': {
				req.body.type = 'admin';
				break;
			}
			case 'counsellor': {
				req.body.type = 'counsellor';
				break;
			}
		}
	}
	next();
};
