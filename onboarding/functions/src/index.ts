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
                const data = req.body.data.object;

                if(hook === 'invoice_payment_success') {
                    const memberShip = {
                    name : 'pro-membership',
                    active : true
                  }
                    admin.firestore()
                          .collection('accounts')
                         .doc('cus_KpaAF6fMpnmKNU')
                         .update(memberShip)
                         
                }

                if(hook === 'invoice_payment_failed') {
                  admin.firestore()
                         .collection('accounts')
                         .doc(data.customer)
                         .update({"pro-membership" : false})
                }

                res.status(200).send('lorem ipsum');
              })
               

