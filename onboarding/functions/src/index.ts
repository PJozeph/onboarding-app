import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
import { Extension } from "./model/extension.model";

// const admin = require('firebase-admin');
admin.initializeApp();

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const original = snap.data().original;

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log('Uppercasing', context.params.documentId, original);

    const uppercase = original.toUpperCase();

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return snap.ref.set({ uppercase }, { merge: true });
  });

interface UserModel {
  uid: string
  name: string,
  email: string,
  imagePath : string
  extensions: Extension []
}

exports.createUserInDb = functions.auth.user().onCreate((user) => {
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.

  functions.logger.log('signed up email is ' + email);
  functions.logger.log('signed up name is ' + displayName);

  const userModel: UserModel = {
    name: user.displayName ? user.displayName : '',
    email: user.email ? user.email : '',
    uid: user.uid,
    imagePath : user.photoURL? user.photoURL : '',
    extensions: []
  }
  return admin.firestore().collection('accounts').doc(user.uid).set(userModel)

});