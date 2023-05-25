module.exports = function SanatizeRequest(requestFrom) {
	return function(req, res, next) {
		req.customOrigin = requestFrom;
		if (req.method === 'GET') {
			const { limit, page, sortBy } = req.query;
			req.query.limit = Number(limit) || 10;
			req.query.page = Number(page) || 1;
			req.query.skip = req.query.limit * (req.query.page - 1);

			req.query.sortBy = sortBy && sortBy.trim() ? sortBy : '-createdAt';
		}
		next();
	};
};
