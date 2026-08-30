const nodemailer = require("nodemailer");

// to interact with the googles SMTP servers we use this transporters
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
  },
  tls: {
    rejectUnauthorized: false
  }
});
// verify the connection config

transporter.verify((error, success) => {
  if (error) {
    console.log("Error connecting to the email server: ", error);
  } else {
    console.log(
      "Email server is ready to send the messages, this is the success message: ",
      success
    );
  }
});

// function to send the email

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"~Aditya learns Backend~  <${process.env.EMAIL_USER}> "`,
      to,
      subject,
      text,
      html
    });

    console.log("message sent to : ", info.messageId);
    console.log("Preview URL : ", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log("Error occured while sending the email ", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to my NodeJS Backend Project!";

  const text = `Hi ${name}, welcome aboard! Thanks for registering.`;

  const html = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>Welcome, ${name}!</h2>
            <p>Thanks for registering on my Node.js backend project.</p>
            <p>We're glad to have you here 🎉</p>
        </div>
    `;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAmount) {
  const subject = "Transaction Confirmation";

  const text = `Hi ${name}, your transaction of $${amount} to ${toAmount} has been processed.`;

  const html = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>Transaction Confirmation</h2>
            <p>Hi ${name},</p>
            <p>Your transaction of $${amount} to ${toAmount} has been processed successfully.</p>
        </div>
    `;

  await sendEmail(userEmail, subject, text, html);
}


async function sendTransactionFailedEmail(userEmail, name, amount, toAmount) {
  const subject = "Transaction Failed";
  const text = `Hi ${name}, your transaction of $${amount} to ${toAmount} has failed.`;
  const html = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>Transaction Failed</h2>
            <p>Hi ${name},</p>
            <p>Your transaction of $${amount} to ${toAmount} has failed.</p>
        </div>
    `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailedEmail
};
