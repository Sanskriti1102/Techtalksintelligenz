import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();
export const sendMailToAdmin = (userdata) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_ID, // by this email id you will get mail 
            pass: process.env.PASS_KEY, // passkey 
        },
    });

    async function main() {
        await transporter.sendMail({
            from: {
                name: `IntelligenZ - ${new Date().toLocaleString()}`,
                address: process.env.EMAIL_ID,
            }, // sender address
            to: process.env.ADMIN_EMAIL_ID, // list of receivers
            subject: "New Message from IntelligenZ Website ✔", // Subject line
            text: "New message received from IntelligenZ website", // plain text body
            html: `<div style="background: #003366; color: white; height: 100vh; padding: 20px;">
                        <div class="heading" style="font-size: 2rem; text-align: center; margin-bottom: 20px;">
                            IntelligenZ Website Message Details
                        </div>
                        <table style="width: 50%; border-collapse: collapse; margin: 0 auto;">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid white; padding: 10px; text-align:center; background-color: #1E90FF;">
                                        Field
                                    </th>
                                    <th style="border: 1px solid white; padding: 10px; text-align:center; background-color: #1E90FF;">
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Name</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.name}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Email</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.email}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Message</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.message}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Submitted At</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${new Date().toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>`, // html body
        });
    }

    main().catch(console.error);
};
export default sendMailToAdmin;
