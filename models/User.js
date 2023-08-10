const { Schema, model } = require('mongoose');

// Defines fields for Users
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Ensures the data entered matches the format of an email address
            match: [/.+@.+\..+/, 'You must use a valid email address!'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Finds and removes all Thoughts when a User is removed by matching the username field from the Thought to the username being deleted.  
userSchema.pre('remove', async function(next) {
    try {
        await Thought.deleteMany({ username: this.username });
        next();
    } catch (err) {
        next(err);
    }
});


const User = model('User', userSchema);

module.exports = User;