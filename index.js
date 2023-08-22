// Firestore Admin

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();
const colRef = db.collection("products").doc("puzzles").collection("items");

async function addProductToFirestore(product) {
    const docRef = colRef.doc(`${product.id}`);
    await docRef.set(product);
}

const getProductsFromTSV = require("./getProductsFromTSV");
const products = getProductsFromTSV();

products.forEach((product) => {
    addProductToFirestore(product).then(() => {
        console.log(`Success! ${product.id}`);
    }).catch((error) => {
        console.log(`Error! ${product.id}`);
        console.error(error);
    });
});