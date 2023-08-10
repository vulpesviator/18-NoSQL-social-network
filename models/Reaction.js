// imports DayJS package to create timestamp
const dayjs = require('dayjs');
const { Schema, Types } = require('mongoose');

// Defines fields for the Reactions
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Getter method for formatting the timestamp
            get: (timestamp) => dayjs(timestamp).format('MMM D, YYYY [at] h:mm A'),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;