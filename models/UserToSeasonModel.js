const mongoose = require('mongoose');

const UserToSeasonModelSchema = new mongoose.Schema(
    {       
        email: {
            type: String,
            required: true
        },
        seasonDetail: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }
);

const UserToSeasonModel = mongoose.model('user_to_season', UserToSeasonModelSchema);
module.exports = UserToSeasonModel;