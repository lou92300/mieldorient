import { useState, useEffect } from 'react';
import { createArticle } from '../../../store/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { categoryFetch } from '../../../store/slice/categorySlice';

function NewArticles() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newArticleName, setNewArticleName] = useState('');
  const [newArticleDescription, setNewArticleDescription] = useState('');
  const [newArticlePrice, setNewArticlePrice] = useState('');
  const [newArticlePicture, setNewArticlePicture] = useState('');
  const [newArticleStock, setNewArticleStock] = useState('');
  const [newArticleAlt, setNewArticleAlt] = useState('');
  const [newArticleTva, setNewArticleTva] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    dispatch(categoryFetch());
   
  }, [dispatch]);

  const handleAddArticle = async (e) => {
    e.preventDefault();

    const newArticleData = {
      name: newArticleName,
      description: newArticleDescription,
      price: newArticlePrice,
      picture: newArticlePicture,
      stock: newArticleStock,
      alt: newArticleAlt,
      tva: newArticleTva,
      category_id: selectedCategory 
    };

    dispatch(createArticle(newArticleData));

    
    setShowConfirmation(true);

    
    setNewArticleName('');
    setNewArticleDescription('');
    setNewArticlePrice('');
    setNewArticlePicture('');
    setNewArticleStock('');
    setNewArticleAlt('');
    setNewArticleTva('');
    setSelectedCategory('');

    // Redirection ou autre action
    // navigate('/admin/dashboard/articles/ajouter');
  };

  return (
    <div className='NewArticle-container'>
      <h3>Ajouter un nouvel article</h3>
      {showConfirmation && <p>L'article a été ajouté avec succès !</p>}
      <form onSubmit={handleAddArticle} encType="multipart/form-data">
        <div>
          <p>Nom :</p>
          <input
            type="text"
            value={newArticleName}
            onChange={(e) => setNewArticleName(e.target.value)}
          />
        </div>
        <div>
          <p>Description :</p>
          <textarea
            value={newArticleDescription}
            onChange={(e) => setNewArticleDescription(e.target.value)}
          />
        </div>
        <div>
          <p>Prix :</p>
          <input
            type="number"
            value={newArticlePrice}
            onChange={(e) => setNewArticlePrice(e.target.value)}
          />
        </div>
        <div>
          <p>Image :</p>
          <input
            type="file"
            name="picture"
            onChange={(e) => setNewArticlePicture(e.target.files[0])}
          />
        </div>
        <div>
          <p>Stock :</p>
          <input
            type="number"
            value={newArticleStock}
            onChange={(e) => setNewArticleStock(e.target.value)}
          />
        </div>
        <div>
          <p>Alt :</p>
          <input
            type="text"
            value={newArticleAlt}
            onChange={(e) => setNewArticleAlt(e.target.value)}
          />
        </div>
        <div>
          <p>TVA :</p>
          <input
            type="text"
            value={newArticleTva}
            onChange={(e) => setNewArticleTva(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Catégorie :</label>
          <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Sélectionnez une catégorie</option>
            {categories.map(category => (
              <option key={category.ID} value={category.ID}>{category.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Ajouter l'article</button>
      </form>
    </div>
  );
}

export default NewArticles;