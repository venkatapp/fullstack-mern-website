import { Router } from "express";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

//create transporter 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})


//the api end point
router.post('/send-email', async (req, res) => {
    const { email, subject, message } = req.body;

    const mailOptions = {
        // Use the verified user as 'from', and set 'replyTo' for the user's address
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: subject,
        text: `Message from ${email}:\n\n${message}`,
        replyTo: email
    };

    try {
        // Use async/await for cleaner, promise-based handling
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        // Only one response per request
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        console.error('Error sending email:', err);
        // Only one response per request
        res.status(500).json({ message: 'Email not sent' });
    }
});

export default router;