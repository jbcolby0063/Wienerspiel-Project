import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

const app = firebase.initializeApp({ // used .env.local to hide the actual auth keys (need to create .env.local file on your local)
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // bring the auth key from .env.local by typing "process.env."
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = app.auth() // export the app variable as authentication (auth instance)
export const db = app.database() // firebase realtime database
export const storage = app.storage() // firebase storage
export default app