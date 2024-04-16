import{ useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { categoryFetch, updateCategory, deleteCategory } from '../../../store/slice/categorySlice'; 

function UpdateCategory() {
    const { categories } = useSelector(state => state.categories); // Extraction des catégories depuis le state global avec useSelector
    const dispatch = useDispatch(); // Initialisation du dispatcher avec useDispatch
    const [selectedCategory, setSelectedCategory] = useState(null); // État local pour stocker la catégorie sélectionnée
    const [updatedName, setUpdatedName] = useState(""); // État local pour stocker le nouveau nom de la catégorie

    useEffect(() => {
        dispatch(categoryFetch()); // Appel de la fonction d'action categoryFetch pour récupérer les catégories au chargement du composant
    }, [dispatch]); // Déclenchement de l'effet uniquement au montage du composant

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId); // Mise à jour de la catégorie sélectionnée
        const selectedCategory = categories.find(item => item.ID === categoryId); // Recherche de la catégorie correspondante dans la liste
        setUpdatedName(selectedCategory.name); // Mise à jour du nom de la catégorie sélectionnée
    }

    const handleSaveChanges = () => {
        const confirmMessage = "Êtes-vous sûr de vouloir modifier cette catégorie ?";
        if (window.confirm(confirmMessage)) {
            dispatch(updateCategory({ 
                id: selectedCategory,
                updatedData: { name: updatedName }
            }))
            .then(() => {
                setSelectedCategory(null);
                setUpdatedName("");
                dispatch(categoryFetch()); // Mettre à jour les catégories après la modification
            })
            .catch((error) => {
                console.error("Erreur lors de la modification de la catégorie :", error);
            });
        }
    }

    const handleDeleteCategory = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie?")) {
            dispatch(deleteCategory(selectedCategory))
            .then(() => {
                setSelectedCategory(null);
                dispatch(categoryFetch()); // Mettre à jour les catégories après la suppression
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de la catégorie :", error);
            });
        }
    }

    return (
        <div className='category-list-container'>
            <h2>Listes des categories</h2>
            <ul className='category-list'>
                {categories.map(category => (
                    <li className='list' key={category.ID} onClick={() => handleSelectCategory(category.ID)}>{category.name}</li>
                ))}
            </ul>
            {/* Formulaire de mise à jour de la catégorie */}
            {selectedCategory && (
                <div>
                    <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                    <button onClick={handleSaveChanges}>Enregistrer</button>
                    <button className='delete-btn' onClick={handleDeleteCategory}>Supprimer</button>
                </div>
            )}
        </div>
    );
}

export default UpdateCategory;