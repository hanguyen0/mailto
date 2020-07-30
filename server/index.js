const express = require('express');
const nodemailer = require('nodemailer');
const { defaultMaxListeners } = require('nodemailer/lib/mailer');

const app = express();
app.use(express.json());


let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.production.GMAIL_ADDRESS,
        pass: process.env.production.GMAIL_PASSWORD,
    },
});

//listens for POST requests to /contact
app.post('/contact', (req, res) => {
    mailer.sendMail({
        from: req.body.from,
        to: [contactAddress],
        subject: req.body.subject || '[No subject]',
        html: req.body.message || '[No message]',
    }, (err, info) => {
        if (err) return res.status(500).send(err);
        res.send(info);
    })
});

app.listen(3000);