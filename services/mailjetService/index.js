import { connect } from 'node-mailjet';

const mailJet = connect(
  '29f39b19e57a35dab3c0ce22b8c64123',
  'bcbf2ffec5af4b3b0f33eedb08f8ad8f',
);

class MailJetService {
  sendValidationEmail = (receiver, activationLink) => {
    return this.sendMailWithTemplateId(
      undefined,
      [receiver],
      3116376,
      'Bienvenue sur Agric Auctions',
      { activationLink },
    );
  };

  async sendMailWithTemplateId(
    sender = {
      Email: 'franklinfrost14@gmail.com',
      Name: 'AGRIC AUCTIONS - E-COM',
    },
    receivers,
    templateID,
    subject,
    variables = {},
  ) {
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
  }
}

module.exports = MailJetService;
