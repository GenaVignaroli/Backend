const {a} = require("../config/index");
const nodemailer = require("nodemailer");
const twilio = require("twilio");

const twilioAPI = twilio(a.TWILIO_ACCOUNT_ID, a.TWILIO_TOKEN);

const owner = {
  name: a.GMAIL_NAME,
  address: a.GMAIL_EMAIL,
};

const gmailTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: a.GMAIL_EMAIL,
    pass: a.GMAIL_PASSWORD,
  },
});

const notifyNewUserByEmail = async (userData) => {
  const mailOptions = {
    from: owner,
    to: a.GMAIL_EMAIL,
    subject: 'New User Created',
    html: `A New User was created. See info below\n\n\n ${userData}`,
  };
  const response = await gmailTransporter.sendMail(mailOptions);
  return response;
};

const notifyNewOrderUsingWhatsApp = async (orderData) => {
  const params = {
    body: `A New Order was created. See info below\n\n\n ${orderData}`,
    from: `whatsapp:${a.TWILIO_WSP_CELLPHONE}`,
    to: `whatsapp:${a.ADMIN_PHONE}`,
  };

  const response = await twilioAPI.messages.create(params);
  return response;
};

export const NotificationService = {
  notifyNewUserByEmail,
  notifyNewOrderUsingWhatsApp,
};

