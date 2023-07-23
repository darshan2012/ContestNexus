const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        unique:true,    
        required: true
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname:{
        type: String,
        default:''
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    method: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        default: ''
    },
    mailToken: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    myblogs: {
        type: [{ id: String }],
        default: []
    },
    mycodes: {
        type: [{ id: String }],
        default: []
    },
    settings: {
        mode: String,
        theme: String,
        code: String
    },
    handles: {
        leetcodeHandle: String,
        codeforcesHandle: String,
    }
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema)