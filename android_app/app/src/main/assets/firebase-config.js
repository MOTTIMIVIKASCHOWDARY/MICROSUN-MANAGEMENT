const isAndroidClient = (typeof window !== 'undefined') && (
    window.location.protocol === 'file:' || 
    window.location.hostname.includes('androidplatform.net') || 
    (typeof navigator !== 'undefined' && /wv|Android.*Version\/[0-9.]+/i.test(navigator.userAgent))
);

// Dedicated Android App Client (google-services.json) vs Dedicated Web App Client
const firebaseConfig = isAndroidClient ? {
    apiKey: "AIzaSyCZVZoTh6yf7Xhi05Y25RcJTFVm_XU346k",
    authDomain: "microsun-management.firebaseapp.com",
    projectId: "microsun-management",
    storageBucket: "microsun-management.firebasestorage.app",
    messagingSenderId: "982179351673",
    appId: "1:982179351673:android:7ac89a74ded74b50f218a8"
} : {
    apiKey: "AIzaSyAmTAo_KD4qoI-GkjX9bu9FY59yuV9go9U",
    authDomain: "microsun-management.firebaseapp.com",
    projectId: "microsun-management",
    storageBucket: "microsun-management.firebasestorage.app",
    messagingSenderId: "982179351673",
    appId: "1:982179351673:web:a353e9d1bb56eb3cf218a8",
    measurementId: "G-RQFWGMQ8Q2"
};

let auth = null;
let db = null;

try {
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        auth = firebase.auth ? firebase.auth() : null;
        db = firebase.firestore ? firebase.firestore() : null;
        console.log("🔥 Firebase Auth & Firestore Connected Successfully!");
    }
} catch (e) {
    console.warn("⚠️ Firebase initialized in Hybrid Local-First Mode:", e.message);
}

// Helper: Save User Document to Firestore Database
async function saveUserToFirestore(phone, userData) {
    if (db && phone) {
        try {
            await db.collection('users').doc(phone).set(userData, { merge: true });
            console.log("☁️ User synced to Firestore DB:", phone);
            return true;
        } catch (err) {
            console.warn("Firestore sync warning:", err.message);
        }
    }
    return false;
}

// Helper: Fetch User Document from Firestore Database
async function fetchUserFromFirestore(phone) {
    if (db && phone) {
        try {
            const doc = await db.collection('users').doc(phone).get();
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

// Real-Time Listener: Listen to Live User Document Changes across Web & Android
function listenToUserRealtime(phone, callback) {
    if (db && phone && typeof callback === 'function') {
        try {
            return db.collection('users').doc(phone).onSnapshot((doc) => {
                if (doc.exists) {
                    console.log("⚡ Real-Time User Update received from Cloud Firestore:", phone);
                    callback(doc.data());
                }
            }, (err) => {
                console.warn("Real-time listener warning:", err.message);
            });
        } catch (e) {
            console.warn("Could not attach real-time listener:", e.message);
        }
    }
    return null;
}

// Real-Time Listener: Listen to Live Collection (Market, Listings, Prices)
function listenToCollectionRealtime(collectionName, callback) {
    if (db && collectionName && typeof callback === 'function') {
        try {
            return db.collection(collectionName).onSnapshot((snapshot) => {
                const items = [];
                snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
                console.log(`⚡ Real-Time ${collectionName} Update: ${items.length} records`);
                callback(items);
            }, (err) => {
                console.warn(`Real-time collection ${collectionName} warning:`, err.message);
            });
        } catch (e) {
            console.warn(`Could not attach collection listener for ${collectionName}:`, e.message);
        }
    }
    return null;
}
