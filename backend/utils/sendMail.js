const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.html',
      defaultLayout: '', // set this one empty and provide your template below,
    },
    viewPath: path.join(__dirname, '/templates'),
    extName: '.html',
  })
);

module.exports = async (toMail, subject, htmlFile, name, url) => {
  const mailOptions = {
    to: toMail,
    from: process.env.EMAIL_ID,
    subject: subject,
    template: htmlFile,
    context: {
      url: url,
      name: name,
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('File: sendMail.js');
    console.log(`Information: ${JSON.stringify(info)}`);
    return info;
  } catch (error) {
    console.log('File: sendMail.js');
    console.log(`Error: ${error}`);
    throw error;
  }
};
