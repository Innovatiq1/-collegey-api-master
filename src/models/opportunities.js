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

const opportunitiesSchema = new mongoose.Schema(
	{
        title: {
            type: String,
            required: true,
            default: 'NA'
        },
        description: {
            type: String,
            required: true,
            default: 'NA'
        },
        image: String,
        createdAt: Number,
        updatedAt: Number,
        mentorId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
	},
	MongoSchemaAddOn
);

const opportunities = mongoose.model('opportunities', opportunitiesSchema);

module.exports = opportunities;
