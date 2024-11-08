import Contact from '../models/contact.js'; // Import the Mongoose model for the contact form
import { sendMailToAdmin } from '../sendMail.js';



// Function to save contact data to MongoDB
export async function saveContact(req, res) {
    if (req.method === 'POST') {
        // Connect to the database

        const { name, email, message } = req.body;

        // Validate that the required fields are provided
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new contact document using the Mongoose model
        const newContact = new Contact({
            name,
            email,
            message,
        });
        sendMailToAdmin(newContact)
        try {
            // Save the new contact document to MongoDB
            await newContact.save();

            // Respond with a success message
            return res.status(200).json({ success: true, message: 'Contact form submitted successfully' });
        } catch (error) {
            // Handle error saving the data
            console.error('Error saving contact form:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Handle unsupported methods
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}

export async function getContact(req, res) {
    res.send('hello contact')
}
