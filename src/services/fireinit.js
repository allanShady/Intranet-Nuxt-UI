// This is `services/fireinit.js`

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

var config = {
    apiKey: 'AIzaSyDeQxXFQ4sH0yL4_nF4bK2YuR3AQ2liQPA',
    authDomain: 'mahotacrm.firebaseapp.com',
    databaseURL: 'https://mahotacrm.firebaseio.com',
    projectId: 'mahotacrm',
    storageBucket: 'mahotacrm.firebaseapp.com',
    messagingSenderId: '316484287956'
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase