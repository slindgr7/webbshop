//hanterar kontakt med FireBase.
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./database.js";

//db = lagret
// collection = produkt-hyllan.
// doc = plocka ut en specifik produkt från hyllan.
// getDocs = läser av hela lagret med alla produkter.
// addDoc = lägger in ny produkt i lagret.
// deleteDoc = ta bort en produkt från lagret.
// updateDoc = uppdatera pris/namn på produkt.

async function getProducts(setProducts) {
	try {
        const productsCollection = collection(db, 'products');
		const Productsnapshot = await getDocs(productsCollection);
		const products = Productsnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
		setProducts(products);
	} catch (error) {
		console.error('Failed to fetch products:', error);
	}
}

async function addProduct(productData, setProducts) {
	try {
		const productsCollection = collection(db, 'products');
		await addDoc(productsCollection, productData);
		getProducts(setProducts);
	} catch (error) {
		console.error('Fail to add product:', error);
	}
}


async function deleteProduct(productId, setProducts) {
	try {
		const docRef = doc(db, 'products', productId);
		await deleteDoc(docRef);

		getProducts(setProducts);
	} catch (error) {
		console.error('Failed to delete product:', error);
	}
}

async function updateProduct(productId, updatedData, setProducts) {
	try {
		const docRef = doc(db, 'products', productId);
		await updateDoc(docRef, updatedData);
        
		getProducts(setProducts);
	} catch (error) {
		console.error('Failed to update:', error);
	}
}

export { getProducts, addProduct, deleteProduct, updateProduct };
