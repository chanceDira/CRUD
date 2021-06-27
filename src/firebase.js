import firebase from "firebase"
import "firebase/auth";

const firebaseConfig = {
    // FirebaseConfig for CRUD

    apiKey: "AIzaSyC0HtTuOiodsge3xaVTyZcEt07rPu4cN-E",
    authDomain: "fir-crud-rhak.firebaseapp.com",
    databaseURL: "https://fir-crud-rhak-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fir-crud-rhak",
    storageBucket: "fir-crud-rhak.appspot.com",
    messagingSenderId: "469804715076",
    appId: "1:469804715076:web:5fd13d39e7f573f53e0011",
    measurementId: "G-YEW6LXR157"

     // FirebaseConfig for Authentication
    //  apiKey: "AIzaSyBBWlwi-Bk-jXwDiJPWn8Mkkt1VR3l22To",
    //  authDomain: "smallapp333.firebaseapp.com",
    //  projectId: "smallapp333",
    //  storageBucket: "smallapp333.appspot.com",
    //  messagingSenderId: "1040873154084",
    //  appId: "1:1040873154084:web:aae016fee4ad2ab5d21ab1"

}

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth()
export default firebase;
