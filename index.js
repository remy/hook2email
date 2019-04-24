const { buffer, text, json } = require('micro');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.TOKEN);

module.exports = async (req, res) => {
  const payload = await json(req);
  console.log(payload);
  const msg = {
    to: process.env.EMAIL,
    from: process.env.EMAIL,
    subject: process.env.SUBJECT || 'hook2email',
    text: JSON.stringify(payload, 0, 2),
  };

  try {
    await sgMail.send(msg);
    res.writeHead(200);
    res.end(`Worked`);
  } catch (e) {
    console.log(e);
    res.writeHead(500);
    res.end('failed');
  }
};
