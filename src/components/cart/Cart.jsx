import React from "react";
import "./Cart.css";
import useProductStore from "../../data/store.js";
import { useCartStore } from "../../data/cartStore.js";

const Cart = () => {
  // om varukorg är öppen så hämtar den.
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  //Hämtar produkter samt funktionerna för att ändra eller ta bort.
  const orderedItems = useProductStore((state) => state.orderedItems);
  const increaseQuantity = useProductStore((state) => state.increaseQuantity);
  const decreaseQuantity = useProductStore((state) => state.decreaseQuantity);
  const removeFromCart = useProductStore((state) => state.removeFromCart);


  if (!isOpen) return null;
  // TODO: totalpris
  const total = orderedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-overlay" onClick={closeCart}>
      <div className="cart-content" onClick={(e) => e.stopPropagation()}>
        <h2>Din varukorg</h2>

        {orderedItems.length === 0 ? (
          <p>Inga produkter i varukorgen.</p>
        ) : (
          <>
            {orderedItems.map((item) => (
              <div key={item.id} className="cart-item">
                <p>{item.namn}</p>
                <p>{item.price} kr/st</p>
                <p>Antal: {item.quantity}</p>
                <p>Total: {item.price * item.quantity} kr</p>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>Ta bort</button>
               

              </div>
            ))}
            <hr />
            <p><strong>Totalt: {total} kr</strong></p>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
