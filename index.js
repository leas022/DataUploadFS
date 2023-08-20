// Firestore Admin

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
    credential: cert(serviceAccount)
});

async function addProductToFirestore(product) {
    const boardgameDocRef = boardgamesColRef.doc(`${product.id}`);
    await boardgameDocRef.set(product);
}

const db = getFirestore();
const boardgamesColRef = db.collection("products").doc("boardgames").collection("items");

const getProductsFromCSV = require("./getProductsFromCSV");
const products = getProductsFromCSV();

products.forEach((product) => {
    addProductToFirestore(product).then(() => {
        console.log(`Success! ${product.id}`);
    }).catch((error) => {
        console.log(`Error! ${product.id}`);
        console.error(error);
    });
});