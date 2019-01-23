import firebase from "firebase";
var config = {
    apiKey: "AIzaSyAC482wwvh-1A0Yw-vlwdChLxW1Jr04zxo",
    authDomain: "pt13353-mob.firebaseapp.com",
    databaseURL: "https://pt13353-mob.firebaseio.com",
    projectId: "pt13353-mob",
    storageBucket: "pt13353-mob.appspot.com",
    messagingSenderId: "93740380746"
  };
export default firebaseConf =  firebase.initializeApp(config);