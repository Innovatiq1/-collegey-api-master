import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import urlSlug from 'mongoose-url-slugs';
import { statusTypes } from '../utilities/constant_variables';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';

const studentProjectIdeaSchema = new mongoose.Schema({
    title: String,   
    description: String,  
    slug: {type: String, lowercase: true, unique: true, index: true},
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Number,
        enum: Object.values(statusTypes),
        default: statusTypes.ACTIVE
    },
},MongoSchemaAddOn);
studentProjectIdeaSchema.plugin(urlSlug('title'));
studentProjectIdeaSchema.plugin(mongoosePaginate);

const StudentProjectIdea = mongoose.model('student_project_idea', studentProjectIdeaSchema);
module.exports = StudentProjectIdea;