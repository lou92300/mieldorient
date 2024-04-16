import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import ShoppingCart from '../assets/shopping-cart-228.svg';




export default function FloatingCartButton() {
    const [showModal, setShowModal] = useState(false);
    const cart = useSelector(state => state.cart);


    return (
        <>
            <button onClick={() => setShowModal(!showModal)} className='floating-cart-button'>
                <span className='panier'>Voir votre panier : {cart.cartItems.length}</span>
                <img src={ShoppingCart} alt="shopping cart" />
            </button>
            {showModal && createPortal(<Cart onClose={() => setShowModal(false)} />, document.body)}
            {showModal && <div className='modal-overlay'></div>}
        </>
    );
}