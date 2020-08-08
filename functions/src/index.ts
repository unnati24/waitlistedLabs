const functions = require('firebase-functions')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const SENDGRID_API_KEY = functions.config().sendgrid.key

const sendGridEmail = require('@sendgrid/mail')
sendGridEmail.setApiKey(SENDGRID_API_KEY)

exports.registerEmail = functions.firestore
  .document('users/{user}')
  .onCreate((event: any) => {
    const emailTestData = event.data()
    const msg = {
      to: emailTestData.email,
      from: 'unavee.24@gmail.com',
      subject: 'My subject',
      templateId: 'd-412b8828f1c64d7aaf218b228c2e7eca',
      
    }

    return sendGridEmail
      .send(msg)
      .then(() => console.info('email sent'))
      .catch((error: any) => console.error(error.toString()))
  })