import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { articleFetch, updateArticle, deleteArticle } from "../../../store/slice/productSlice";
import { categoryFetch } from "../../../store/slice/categorySlice";

function UpdateArticles() {
  const { items } = useSelector((state) => state.products);
  console.log(items)
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArticle, setSelectedArticle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");

  useEffect(() => {
    dispatch(articleFetch());
    dispatch(categoryFetch());
    
}, []); 

  const handleSelectArticle = (articleId) => {
    setSelectedArticle(articleId);
    const selectedArticle = items.find((item) => item.ID === articleId);
    setUpdatedDescription(selectedArticle.description);
    setUpdatedPrice(selectedArticle.price);
    const associatedCategory = categories.find((category) => category.ID === selectedArticle.categoryID);
    setSelectedCategory(associatedCategory ? associatedCategory.ID : null);
  };

  const handleSaveChanges = () => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir modifier cet article ?");
    if (confirmation) {
      dispatch(
        updateArticle({
          id: selectedArticle,
          updatedData: {
            picture : updateArticle,
            description: updatedDescription,
            price: updatedPrice,
            category_id: selectedCategory
          },
        })
      )
      .then(() => {
        setSelectedArticle("");
        setUpdatedDescription("");
        setUpdatedPrice("");
        setSelectedCategory("");
        dispatch(articleFetch());
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'article :", error);
      });
    }
  };

  const handleDeleteArticle = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      dispatch(deleteArticle(selectedArticle))
        .then(() => {
          setSelectedArticle("");
          dispatch(articleFetch());
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'article :", error);
        });
    }
  };

  return (
    <div className="articles-list-container">
      <h2>Liste des articles</h2>
      <ul className="articles-list">
        {items.map((article) => (
          <li key={article.ID}>
            <button onClick={() => handleSelectArticle(article.ID)}>
              {article.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedArticle && (
        <div>
          <h3>{items.find((item) => item.ID === selectedArticle)?.name}</h3>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category.ID} value={category.ID}>{category.name}</option>
            ))}
          </select>
          <p className="description">
            Description :
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </p>
          <p className="price">
            Prix :
            <input
              type="number"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
            />
          </p>
          <button onClick={handleSaveChanges}>
            Enregistrer les modifications
          </button>
          <button className="delete-btn" onClick={handleDeleteArticle}>
            Supprimer l'article
          </button>{" "}
        </div>
      )}
    </div>
  );
}

export default UpdateArticles;




