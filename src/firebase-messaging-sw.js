importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCgzB2IcOFeSTkWgiMdd73eUUmnDLMdb-c",
    authDomain: "fir-deea4.firebaseapp.com",
    databaseURL: "https://fir-deea4.firebaseio.com",
    projectId: "fir-deea4",
    storageBucket: "fir-deea4.appspot.com",
    messagingSenderId: "1045286324771",
    appId: "1:1045286324771:web:eec50fd01bb965bdabbf96",
    measurementId: "G-Z0VQEPRS5V"
});

const messaging = firebase.messaging();