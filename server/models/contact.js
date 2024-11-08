import mongoose from 'mongoose';

// Define the schema for the contact form
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Mongoose model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;  // Use ES6 export syntax
