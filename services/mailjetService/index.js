const mailJet = require('node-mailjet').connect(
  '1c8c4797d0f32db720cc0a70a6134015',
  '772ee643fe53d1928c3b0300f970d851',
);

exports.sendValidationEmail = async (receiver, activationLink) => {
  console.log(activationLink);
  return await sendMailWithTemplateId(
    undefined,
    [receiver],
    3325308,
    'Bienvenue sur Agric Auctions',
    { activationLink },
  );
};

const sendMailWithTemplateId = async (
  sender = {
    Email: 'tmaevaleslie0202@gmail.com',
    Name: 'AGRIC AUCTIONS - E-COM',
  },
  receivers,
  templateID,
  subject,
  variables = {},
) => {
  console.log(sender, receivers, templateID, subject, variables);
  const request = mailJet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: sender,
        To: receivers,
        Bcc: [sender],
        TemplateID: templateID,
        TemplateLanguage: true,
        Subject: subject,
        Variables: variables,
      },
    ],
  });

  return await request
    .then((result) => {
      return result.body;
    })
    .catch((err) => {
      console.log(err, err.message);
    });
};
