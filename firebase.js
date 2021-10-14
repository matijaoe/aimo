import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.dbApiKey,
	authDomain: process.env.dbAuthDomain,
	projectId: 'aimo-test',
	storageBucket: 'aimo-test.appspot.com',
	messagingSenderId: '909261717167',
	appId: '1:909261717167:web:08b261d06c01fe11e79e5a',
	measurementId: 'G-3CMS8T5E94',
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const usersCollection = db.collection('users');
const categoriesCollection = db.collection('categories');
const socialsCollection = db.collection('socials');

export {
	firebase,
	db,
	usersCollection,
	categoriesCollection,
	socialsCollection,
	app,
};
