const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    city: {
        type: String
    },
    phone: {
        type: Number
    }
});

module.exports = mongoose.model('Employee', employeeSchema);