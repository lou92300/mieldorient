import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../store/slice/cart"; // Assurez-vous d'importer l'action updateCartItemQuantity depuis votre fichier Redux approprié

export default function Cart({ onClose }) {
    const { cartItems } = useSelector((state) => state.cart);
    const [selectedItems, setSelectedItems] = useState([]);
    const dispatch = useDispatch(); // Récupérez la fonction dispatch

    const toggleItemSelection = (itemId) => {
        const isSelected = selectedItems.includes(itemId);
        if (isSelected) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    // Fonction pour supprimer un article du panier
    const removeItemFromCart = (itemId) => {
        dispatch(removeFromCart(itemId)); // Dispatchez l'action pour supprimer l'article du panier
        setSelectedItems(selectedItems.filter((id) => id !== itemId)); // Mettez à jour les articles sélectionnés
    };

    // Fonction pour mettre à jour la quantité de l'article dans le panier
    const updateItemQuantity = (itemId, newQuantity) => {
        dispatch(updateCartItemQuantity({ itemId, newQuantity })); // Dispatchez l'action pour mettre à jour la quantité de l'article dans le panier
    };

    // Calcul du total du panier
    const cartTotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0).toFixed(2);

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
                                key={item.ID} // Utilisez un identifiant unique comme clé
                                className={`cart-item ${
                                    selectedItems.includes(item.ID)
                                        ? "selected"
                                        : ""
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
                                                updateItemQuantity(
                                                    item.ID,
                                                    parseInt(e.target.value)
                                                )
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
                                        onClick={() =>
                                            removeItemFromCart(item.ID)
                                        }
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
                {cartItems.length > 0 && ( // Condition pour afficher le bouton de paiement uniquement si le panier n'est pas vide
                    <div className="cart-total">
                        <p>
                            Total : <span>{cartTotal}€</span>
                        </p>
                        <button className="payment-btn">Paiement</button>
                    </div>
                )}
            </div>
        </div>
    );
}