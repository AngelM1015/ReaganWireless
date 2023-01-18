var firebase = require('firebase')
const { Router } = require("express");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const path = "./config.json";
const jsonfile = require("jsonfile");
const jp = require("jsonpath");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQOTsSxMokk3ZSTXvpwieeRkbTZ94hYH0",
  authDomain: "reaganwireless-3d37c.firebaseapp.com",
  databaseURL: "https://reaganwireless-3d37c-default-rtdb.firebaseio.com",
  projectId: "reaganwireless-3d37c",
  storageBucket: "reaganwireless-3d37c.appspot.com",
  messagingSenderId: "143358634374",
  appId: "1:143358634374:web:aba69742a514a302132407",
  measurementId: "G-JMXH8SQ7RY"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const analytics = getAnalytics(app);

  let database = firebase.database()

  database.ref('customPath').once('value')
.then(function(snapshot) {
    console.log( snapshot.val() )
})

router.get("/getUsers", async (req, res, next) => {
    let database = firebase.database()
    database.ref('customPath').once('value')
    .then(function(snapshot) {
        console.log( snapshot.val() )
    }
    )
    res.send("hello")
})

module.exports = router;
