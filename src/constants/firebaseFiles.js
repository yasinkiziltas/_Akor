// import * as firebase from "firebase"
import firebase from 'firebase';

export const config = {
  apiKey: "AIzaSyDrDBEoOY1b6iZnD0_yAw9EcYtvhhINy40",
  authDomain: "akorapp-3ae3a.firebaseapp.com",
  projectId: "akorapp-3ae3a",
  storageBucket: "akorapp-3ae3a.appspot.com",
  messagingSenderId: "272488545583",
  appId: "1:272488545583:web:a5d39e91d88739edae75da"
};

let app;
let currentUser;
if (firebase.apps.length === 0) {
 app = firebase.initializeApp(config);
}
else {
 app = firebase.app()
 currentUser = firebase.auth().currentUser;
}

const auth = firebase.auth()
export {auth}
export {currentUser}

  // firebase.firestore().settings({ experimentalForceLongPolling: true });