import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../store/slice/cart";
import { handlePayment } from "./stripe";

export default function Cart({ onClose }) {
  const { cartItems } = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch(); 

  const toggleItemSelection = (itemId) => {
    const isSelected = selectedItems.includes(itemId);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  
  const removeItemFromCart = (itemId) => {
    dispatch(removeFromCart(itemId)); 
    setSelectedItems(selectedItems.filter((id) => id !== itemId)); 
  };


  const updateItemQuantity = (itemId, newQuantity) => {
    dispatch(updateCartItemQuantity({ itemId, newQuantity })); 
  };

 
  const cartTotal = cartItems
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  const handlePaymentClick = () => {
    handlePayment(cartItems);
  };

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Votre panier</h2>
          <button onClick={onClose}>Fermer</button>
        </div>
        <div className="cart-items">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.ID} 
                className={`cart-item ${
                  selectedItems.includes(item.ID) ? "selected" : ""
                }`}
                onClick={() => toggleItemSelection(item.ID)}
              >
                <img
                  src={`http://localhost:9005/img/${item.picture}`}
                  alt={item.name}
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>Prix: {item.price}€</p>
                  <p>
                    Quantité:{" "}
                    <select
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItemQuantity(item.ID, parseInt(e.target.value))
                      }
                    >
                      {[1, 2, 3, 4, 5, 6].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => removeItemFromCart(item.ID)}
                  >
                    Supprimer du panier
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Votre panier est vide</p>
          )}
        </div>
        {cartItems.length > 0 && ( 
          <div className="cart-total">
            <p>
              Total : <span>{cartTotal}€</span>
            </p>
            <button className="payment-btn" onClick={handlePaymentClick}>
              Paiement
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
