const admin = require('firebase-admin');

// Ensure that you have placed `firebase-adminsdk.json` in the root of your project
let serviceAccount;
try {
    serviceAccount = require('./firebase-adminsdk.json');
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin SDK initialized successfully");
} catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
        console.warn("WARNING: firebase-adminsdk.json not found. Push notifications will fail until the file is provided in the root directory.");
    } else {
        console.error("Firebase Admin SDK initialization error:", error.message);
    }
}

module.exports = admin;
