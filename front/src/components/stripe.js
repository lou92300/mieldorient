import { Stripe } from "stripe";


const stripe = Stripe("sk_test_51OcV7wHqDMPifetyj5Jxf5udvwIasOWVjZVU9XZHjBMPVY6Ox3iXzQ64tdpc2yKH3ScrWXzSamFrsdqocuB2tx4K00OQ8VuyWr");

const handlePayment = async (cartItems) => {
    // const { cartItems } = useSelector((state) => state.cart);

    // Créez une session de paiement avec Stripe
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cartItems.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // prix en centimes
            },
            quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: "https://miel-d'orient.com/paiement-reussi", 
        cancel_url: "https://miel-d'orient.com/paiement-annule", 
    });

    // Redirigez l'utilisateur vers la page de paiement Stripe
    window.location.href = session.url;
};

export { handlePayment };