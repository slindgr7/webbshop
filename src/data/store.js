//hämta produkter från firestore, spara i Zustand store

import { create } from 'zustand';
import { getProducts, addProduct, deleteProduct, updateProduct } from './crud.js';

const useProductStore = create((set, get) => ({
	
	products: [],
	orderedItems: [],
	
	//tom låda, hämta produkt från databas. Lägg i låda products.
    fetchProducts: async () => {
		await getProducts((products) => set({ products }));
	},
	
    addProduct: async (data) => {
		await addProduct(data, (products) => set({ products }));
	},
	
    deleteProduct: async (id) => {
		await deleteProduct(id, (products) => set({ products }));
	},
	
    updateProduct: async (id, data) => {
		await updateProduct(id, data, (products) => set({ products }));
	},



	// Lägg till en produkt i varukorgen
	addToCart: (product) => {
		// Hämta nuvarande produkter i varukorgen
		const currentItems = get().orderedItems;
	
		// Kolla om produkten redan finns i varukorgen
		const alreadyExists = currentItems.find(item => item.id === product.id);
	
		if (alreadyExists) {
		// Om den finns: öka bara mängden med 1
		const updatedItems = currentItems.map(item => {
			if (item.id === product.id) {
			return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});
	
		set({ orderedItems: updatedItems });
		} else {
		// Om den inte finns: lägg till den med quantity = 1
		const newItem = { ...product, quantity: 1 };
		set({ orderedItems: [...currentItems, newItem] });
		}
	},
  
  	// Öka antalet av en viss produkt
  	increaseQuantity: (productId) => {
		const updatedItems = get().orderedItems.map(item => {
		if (item.id === productId) {
			return { ...item, quantity: item.quantity + 1 };
		}
		return item;
		});
	
		set({ orderedItems: updatedItems });
	},
  
  // Minska antalet av en viss produkt
  	decreaseQuantity: (productId) => {
		const updatedItems = get().orderedItems
		.map(item => {
			if (item.id === productId) {
			return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		})
		.filter(item => item.quantity > 0); // Ta bort produkten om quantity blir 0
	
		set({ orderedItems: updatedItems });
	},
  
  	removeFromCart: (productId) => {
		// Hämta alla produkter UTOM den med det angivna id:t
		const remainingItems = get().orderedItems.filter(item => item.id !== productId);
	
		// Uppdatera varukorgen med den nya listan
		set({ orderedItems: remainingItems });
	},


}));






export default useProductStore;
