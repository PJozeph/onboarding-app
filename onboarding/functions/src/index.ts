import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
interface UserModel {
  uid: string
  stripeUid: string,
  displayName: string,
  email: string,
  imagePath : string,
}

const stripe = require('stripe')(functions.config().stripe.testkey)
  exports.createStripeCustomer = functions.auth.user().onCreate( createdUser => {
       return stripe.customers.create({ name : createdUser.displayName  ,email : createdUser.email})
       .then((stripeUser : any) => {
        const userModel : UserModel = {
          displayName: createdUser.displayName ? createdUser.displayName : 'name is missing',
          email: createdUser.email ? createdUser.email : '',
          uid: createdUser.uid,
          stripeUid : stripeUser.id,
          imagePath : createdUser.photoURL? createdUser.photoURL : 'https://avatars.dicebear.com/api/gridy/' + createdUser.uid + '.svg',
        }
        return admin.firestore()
        .collection('accounts')
        .doc(createdUser.uid)
        .set(userModel)
       }
       );
  });

//  HANDLE RECURRING PAYMENT FROM STRIPE 
 exports.recurringPayment = functions.https
              .onRequest((req, res) => {

                const hook = req.body.type;
                const data = req.body.data;

                if(hook === 'invoice.payment_succeeded') {
                    const memberShip = {
                    name : 'pro-membership',
                    active : true
                  }
                  
                  const user = admin.auth().getUserByEmail(req.body.data.object.customer_email)
                  user.then(user => {
                    admin.firestore()
                          .collection('accounts')
                          .doc(user.uid)
                          .collection('membership')
                          .doc('membership')
                          .set(memberShip)
                          })
                }

                if(hook === 'invoice_payment_failed') {
                  admin.firestore()
                         .collection('accounts')
                         .doc(data.customer)
                         .update({"pro-membership" : false})
                }
                res.status(200).send('lorem ipsum');
              })
               

