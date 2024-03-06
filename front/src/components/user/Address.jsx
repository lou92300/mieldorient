import { useState } from 'react';

const AddAddressForm = ({ userId }) => {
    const [address, setAddress] = useState({
        country: '',
        city: '',
        zipcode: '',
        number: '',
        street: ''
    });

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9005/api/v1/utilisateur/updateUser/${userId}/address`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials:"include",
                body: JSON.stringify(address)
            });
            
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de l\'adresse');
            }

            
            console.log('Adresse ajoutée avec succès');
        } catch (error) {
           
            console.error('Erreur lors de l\'ajout de l\'adresse :', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Adresse de livraison</h3>
            <label>
                Pays:
                <input type="text" name="country" value={address.country} onChange={handleChange} />
            </label>
            <label>
                Ville:
                <input type="text" name="city" value={address.city} onChange={handleChange} />
            </label>
            <label>
                Code Postal:
                <input type="text" name="zipcode" value={address.zipcode} onChange={handleChange} />
            </label>
            <label>
                Numéro:
                <input type="text" name="number" value={address.number} onChange={handleChange} />
            </label>
            <label>
                Rue:
                <input type="text" name="street" value={address.street} onChange={handleChange} />
            </label>
            <button type="submit">Ajouter l'adresse</button>
        </form>
        
    );
};

export default AddAddressForm;