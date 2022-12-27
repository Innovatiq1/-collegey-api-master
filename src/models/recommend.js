const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recommendSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email_id: {
            type: String
        },
    },
        {
        versionKey: false
    }

    );

const recommend = model('Recommend', recommendSchema);
module.exports = recommend;