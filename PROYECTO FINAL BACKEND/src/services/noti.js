const Config = require ('../config');
const nodemailer = require ('nodemailer');
const twilioAPI = require('twilio')(Config.TWILIO_ACCOUNT_ID, Config.TWILIO_TOKEN); 

const owner = {
  name: Config.GMAIL_NAME,
  address: Config.GMAIL_EMAIL,
};

const gmailTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: Config.GMAIL_EMAIL,
    pass: Config.GMAIL_PASSWORD,
  },
});

const notifyNewUserByEmail = async (userData) => {
  const mailOptions = {
    from: owner,
    to: Config.GMAIL_EMAIL,
    subject: 'Nuevo usuario creado',
    html: `Un nuevo usuario fue creado. Info:\n\n\n ${userData}`,
  };
  const response = await gmailTransporter.sendMail(mailOptions);
  return response;
};

const notifyNewOrderUsingWhatsApp = (orderData) => {
  const params = {
    body: `A New Order was created. See info below\n\n\n ${orderData}`,
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5492995150047',
  };

  twilioAPI.messages
  .create(params)
  .then((message) => console.log(message.sid))
  .catch((error) => console.log(error));
};


const NotificationService = {
  notifyNewUserByEmail,
  notifyNewOrderUsingWhatsApp,
};

module.exports = {
  NotificationService: NotificationService
}