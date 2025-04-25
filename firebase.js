const admin=require("firebase-admin");
require('dotenv').config();
const service=JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);


admin.initializeApp({
    credential:admin.credential.cert(service)
});

const db=admin.firestore();

module.exports={db};

