import React, { useState } from 'react'; // Ajout de useState
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import ShoppingCart from '../assets/shopping-cart-228.svg'; // Supposons que votre image soit stockée dans le dossier "assets"

export default function FloatingCartButton() {
    const [showModal, setShowModal] = useState(false);
    const cart = useSelector(state => state.cart);

    return (
        <>
            <button onClick={() => setShowModal(!showModal)} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '998', backgroundColor: '#fda100', border: 'none', cursor: 'pointer', borderRadius: '20px', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className='panier' style={{ fontWeight: 'bold', marginRight: '10px' }}>Voir votre panier : {cart.cartItems.length}</span>
                <img src={ShoppingCart} alt="shopping cart" style={{ width: '30px', height: 'auto' }} />
            </button>
            {showModal && createPortal(<Cart onClose={() => setShowModal(false)} />, document.body)}
            {showModal && <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '997' }}></div>}
        </>
    );
}