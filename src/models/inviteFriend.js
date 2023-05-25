const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const inviteFriendSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile_number: { type: String }
}
    , { versionKey: false }

);
const invitationFriend = model('friendInvites',inviteFriendSchema);
module.exports = invitationFriend;
