const firebaseConfig = {
    apiKey: localStorage.getItem('firebase_api_key') || "DEMO_KEY",
    authDomain: "microsun-management.firebaseapp.com",
    projectId: "microsun-management",
    storageBucket: "microsun-management.firebasestorage.app",
    messagingSenderId: "982179351673",
    appId: "1:982179351673:web:a353e9d1bb56eb3cf218a8",
    measurementId: "G-RQFWGMQ8Q2"
};

let auth = null;
let db = null;
let googleProvider = null;

try {
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        auth = firebase.auth ? firebase.auth() : null;
        db = firebase.firestore ? firebase.firestore() : null;
        if (firebase.auth && firebase.auth.GoogleAuthProvider) {
            googleProvider = new firebase.auth.GoogleAuthProvider();
        }
        console.log("🔥 Firebase Auth, Firestore & Google Provider Connected Successfully!");
    }
} catch (e) {
    console.warn("⚠️ Firebase initialized in Hybrid Local-First Mode:", e.message);
}

// Helper: Sanitize document ID for Firestore (lowercase email / phone)
function cleanDocKey(key) {
    if (!key) return 'user_default';
    return String(key).trim().toLowerCase().replace(/[#$\[\]\/.]/g, '_');
}

// Helper: Save User Document to Firestore Database
async function saveUserToFirestore(userKey, userData) {
    if (db && userKey) {
        try {
            const docId = cleanDocKey(userKey);
            await db.collection('users').doc(docId).set(userData, { merge: true });
            console.log("☁️ User synced to Firestore DB:", docId);
            return true;
        } catch (err) {
            console.warn("Firestore sync warning:", err.message);
        }
    }
    return false;
}

// Helper: Fetch User Document from Firestore Database
async function fetchUserFromFirestore(userKey) {
    if (db && userKey) {
        try {
            const docId = cleanDocKey(userKey);
            const doc = await db.collection('users').doc(docId).get();
            if (doc.exists) {
                console.log("☁️ User loaded from Firestore DB:", doc.data());
                return doc.data();
            }
        } catch (err) {
            console.warn("Firestore fetch warning:", err.message);
        }
    }
    return null;
}

