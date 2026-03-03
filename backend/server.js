import express from 'express';
import mongoose from 'mongoose';
import { buildAdminJS } from './config/setup.js';
import protfolioRouter from './routers/protfolio.js';
import mailRouter from './routers/mail.js';
import sendEmail from './routers/sendEmail.js';
import bodyParser from 'body-parser';

import cors from 'cors';

import dotenv from 'dotenv';

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
// Adds headers: Access-Control-Allow-Origin: *
app.use(cors())

//Routes
app.use('/api/protfolio', protfolioRouter);

app.use('/api/portfolio', mailRouter);


app.post("/api/sendemail", async (req, res) => {
    const { email, subject } = req.body;

    try {
        const send_to = email;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = email;
        subject = subject;
        const message = `
        <h3>Hello Zino</h3>
        <p>Thank for your YouTube Tutorials</p>
        <p>Regards...</p>
    `;

        await sendEmail(subject, message, send_to, sent_from, reply_to);
        res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
        res.status(500).json(error.message);
    }
});



const start = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);

        await buildAdminJS(app)

        app.listen({ port: PORT, host: '0.0.0.0' }, (err, addr) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`server started on http://localhost:${PORT}/admin`);
            }
        });
    } catch (error) {
        console.log('Error starting server->', error)
    }
}


start();
