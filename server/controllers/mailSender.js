const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mandrillapp.com',
  port: 587,
  auth: {
    user: 'Abhishek',
    pass: "md-fOXiQJj5RNe5MLrpBKxjlw"
  }
});

const sendLoginEmail = (to, username, password) => {
  const mailOptions = {
    from: 'abhishekadhav7449@gmail.com', 
    to: 'abhiadhav2843@gmail.com',
    subject: 'Your Login Details',
    html: `<p>Dear ${"username"},</p>
           <p>Thank you for signing in. He
           re are your login details:</p>
           <p><b>Username:</b
           > ${"username"}</p>
           <p><b>Password:</b> ${"password"}</p>
           <p>Please keep this information safe.</p>
           <p>Best regards,<br>Your Company</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error: ' + error);
    }
    console.log('Email sent: ' + info.response);
  });
};

sendLoginEmail();
