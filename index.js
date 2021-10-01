require('dotenv').config();
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger')
const nodemailer = require("nodemailer");
const app = express()

const port = process.env.PORT || 3000

app.use(express.urlencoded({
    extended: true
}))

app.use(logger)
app.use(express.static("public"))
// app.use("/Projects", express.static("public"))

app.set('view engine', 'hbs')

app.engine('hbs', exphbs({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: ".hbs"
}));

app.get(['/', '/Main', '/#'], (req, res) => {
    res.render('Main', { layout: `layout`, title: 'About Me', active: { Main: true } })
})

app.get('/Contact', (req, res) => {
    res.render('Contact', { layout: `layout`, title: "Contact Me", active: { Contact: true } })
})

app.get('/Projects', (req, res) => {
    res.render('Projects', { layout: `layout`, title: "Projects", active: { Projects: true } })
})

app.get('/:primTitle', (req, res) => {
    res.render(req.params.primTitle, { layout: `layout`, title: req.params.primTitle })
})

var transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: "piyushsinghlucky98@gmail.com",
        pass: "q8TNj6L23QykwAVa"
    }
});

app.post('/Contact', (req, res) => {
    let mailOptions = {
        from: req.body.email,
        to: 'piyush.singh.office@gmail.com',
        name: req.body.name,
        phone: req.body.phone,
        subject: req.body.subject,
        text: "From: " + req.body.email + "\n" + "Name: " + req.body.name + "\n" + "Phone: " + req.body.phone + "\n" + "Subject: " + req.body.subject + "\n" + "Message: " + req.body.message,
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err)
            res.render('Contact', { layout: `layout`, title: "Contact Me", active: { Contact: true }, category: "danger", status: "Cannot Send", margin: "50px" })
        }
        else {
            console.log(mailOptions)
            res.render('Contact', { layout: `layout`, title: "Contact Me", active: { Contact: true }, category: "success", status: "Message Sent", margin: "50px" })
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})