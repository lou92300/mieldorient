import{ useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { categoryFetch, updateCategory, deleteCategory } from '../../../store/slice/categorySlice'; 

function UpdateCategory() {
    const { categories } = useSelector(state => state.categories); 
    const dispatch = useDispatch(); 
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [updatedName, setUpdatedName] = useState(""); 

    useEffect(() => {
        dispatch(categoryFetch()); 
    }, [dispatch]); 

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId); 
        const selectedCategory = categories.find(item => item.ID === categoryId); 
        setUpdatedName(selectedCategory.name); 
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
                dispatch(categoryFetch()); 
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
                dispatch(categoryFetch()); 
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