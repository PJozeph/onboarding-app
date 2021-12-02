import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

admin.initializeApp();
interface UserModel {
  uid: string
  displayName: string,
  email: string,
  imagePath : string
}

exports.createUserInDb = functions.auth.user().onCreate((user) => {
  const email = user.email;
  const displayName = user.displayName; 

  functions.logger.log('signed up email is ' + email);
  functions.logger.log('signed up name is ' + displayName);

  const userModel: UserModel = {
    displayName: user.displayName ? user.displayName : '',
    email: user.email ? user.email : '',
    uid: user.uid,
    imagePath : user.photoURL? user.photoURL : '',
  }
  return admin.firestore().collection('accounts').doc(user.uid).set(userModel)

});