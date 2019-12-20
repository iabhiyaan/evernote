import firebase from "firebase/app";
import "firebase/firestore";

const config = {
	apiKey: "AIzaSyD86ulK2TgxQ9s8tVx-BqRfjLUU-cwXw9k",
	authDomain: "evernote-e6b34.firebaseapp.com",
	databaseURL: "https://evernote-e6b34.firebaseio.com",
	projectId: "evernote-e6b34",
	storageBucket: "evernote-e6b34.appspot.com",
	messagingSenderId: "60442394951",
	appId: "1:60442394951:web:9586cb3ebb556b78380c62",
	measurementId: "G-6ZSZ5MGJJV"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
db.settings({});
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export default firebase;
