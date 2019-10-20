// global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

var config = {
  apiKey: 'AIzaSyDeQxXFQ4sH0yL4_nF4bK2YuR3AQ2liQPA',
  authDomain: 'mahotacrm.firebaseapp.com',
  databaseURL: 'https://mahotacrm.firebaseio.com',
  projectId: 'mahotacrm',
  storageBucket: 'mahotacrm.firebaseapp.com',
  messagingSenderId: '316484287956'
}

if (!firebase.apps.length) firebase.initializeApp(config)

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export default firebase