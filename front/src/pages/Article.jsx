import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { articleFetch } from "../store/slice/productSlice";
import { addOneToCart, removeFromCart } from "../store/slice/cart";

function Article() {
  const { items } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    dispatch(articleFetch());
  }, []);

  const isAddedToCart = (ID) => {
    return cartItems.some(item => item.ID === ID);
  };

  const handleAddToCart = (ID) => {
    if (isAddedToCart(ID)) {
      dispatch(removeFromCart(ID));
      setAddedToCart((prevState) => ({
        ...prevState,
        [ID]: false
      }));
    } else {
      dispatch(addOneToCart(ID));
      setAddedToCart((prevState) => ({
        ...prevState,
        [ID]: true
      }));
    }
  };

  return (
    <div className="articles">
      <h1>Nos produits</h1>
      <input
        className="search-bar"
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {items             
          .filter((article) =>
            article.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((el) => (
            <li key={el.ID}>
              <img
                className="product-img"
                src={`http://localhost:9005/img/${el.picture}`}
                alt={el.name}
              />
              <div>
                <p className="product-name">{el.name}</p>
                <p className="product-description">{el.description}</p>
                <p className="price">{el.price}€</p>
              </div>
              <button
                onClick={() => handleAddToCart(el.ID)}
                style={{
                  backgroundColor: isAddedToCart(el.ID) ? "green" : ""
                }}
              >
                {isAddedToCart(el.ID) ? "Ajouté" : "Ajouter au panier"}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Article;

