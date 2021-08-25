const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    fullname: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 3,
        required: true
    },
    mobile: {
        type: Number,
        minlength: 10
    },

    role: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

})

module.exports =  mongoose.model('AuthSchema', AuthSchema);
