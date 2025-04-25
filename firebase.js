const admin=require("firebase-admin");
const service=require("./key.json");

admin.initializeApp({
    credential:admin.credential.cert(service)
});

const db=admin.firestore();

module.exports={db};

