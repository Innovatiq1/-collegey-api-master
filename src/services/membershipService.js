/* eslint-disable no-useless-catch */
import membership from '../models/membership';
import opportunities from '../models/opportunities';
import { getFields } from '../utilities/helpers';
import { getQueryParams, updateProfileCompletion } from '../utilities/helpers';
import { statusTypes, registrationType } from '../utilities/constant_variables';
import { STATES } from 'mongoose';
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.membershipPostServices = {
	async saveRequest(requestData) {
		try {
			return await membership.create(requestData);
		} catch (e) {
			throw e;
		}
	},

    async saveOpportunity(requestData) {
		try {
			return await opportunities.create(requestData);
		} catch (e) {
			throw e;
		}
	},
};

exports.membershipGetServices = {
	async getMentors(id) {
		return await membership.find({referredby: id}, {}, {lean: true})
	},

    async getOpportunites(id) {
		return await opportunities.find({mentorId:id}, {}, {lean: true})
	},
};

function _throwException(message) {
	throw {
		name: 'error in userServices.js',
		code: 400,
		message,
	};
}

function extend(target) {
	var sources = [].slice.call(arguments, 1);
	sources.forEach(function(source) {
		for (var prop in source) {
			target[prop] = source[prop];
		}
	});
	return target;
}
