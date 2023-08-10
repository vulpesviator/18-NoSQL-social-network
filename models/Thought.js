// imports DayJS package to create timestamp
const dayjs = require('dayjs');
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Defines fields for the Thoughts
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Getter method for formatting the timestamp
            get: (timestamp) => dayjs(timestamp).format('MMM D, YYYY [at] h:mm A'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;