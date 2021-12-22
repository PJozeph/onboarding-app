import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
interface UserModel {
  uid: string
  displayName: string,
  email: string,
  stripeUid: string,
  imagePath : string,
}

const stripe = require('stripe')(functions.config().stripe.testkey)
  exports.createStripeCustomer = functions.auth.user().onCreate( createdUser => {
       return stripe.customers.create({email : createdUser.email})
       .then((stripeUser : any) => {
        const userModel : UserModel = {
          displayName: createdUser.displayName ? createdUser.displayName : 'name is missing',
          email: createdUser.email ? createdUser.email : '',
          uid: createdUser.uid,
          stripeUid : stripeUser.id,
          imagePath : createdUser.photoURL? createdUser.photoURL : 'https://avatars.dicebear.com/api/gridy/' + createdUser.uid + '.svg',
        }
        return admin.firestore().collection('accounts').doc(createdUser.uid).set(userModel)
       }
       );
  });

// exports.createSubscription = functions.database
//                               .ref('accounts/{userId}/pro-membership/token')
//                               .onWrite( event => {
//                                 console.log(event)
//                               })  





