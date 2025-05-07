//hämta produkter från firestore, spara i Zustand store

import { create } from 'zustand';
import { getProducts, addProduct, deleteProduct, updateProduct } from './crud.js';

const useProductStore = create((set) => ({
	
	products: [],
	
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

}));



export default useProductStore;
