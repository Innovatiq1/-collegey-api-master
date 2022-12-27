/* eslint-disable camelcase */
/* eslint-disable node/no-unsupported-features/es-syntax */
// User Model
import urlSlug from 'mongoose-url-slugs';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';
import studentProfileSchema from './studentProfile';
import mentorProfileSchema from './mentorProfileSchema'
import { getProfileCompletion, getMentorProfileCompletion } from '../utilities/helpers';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const membershipSchema = new mongoose.Schema(
	{
        name: {
            type: String,
            required: true,
            default: 'NA'
        }, 
        email: {
            type: String,
            required: true,
            default: 'NA'
        },
        createdAt: Number,
        updatedAt: Number,
        referredby: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
	},
	MongoSchemaAddOn
);

const membership = mongoose.model('membership', membershipSchema);

module.exports = membership;
