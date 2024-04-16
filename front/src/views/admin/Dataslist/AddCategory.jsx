
import { useRef } from 'react';



function AddCategory() {

    const label = useRef(null);
    
    async function submitHandler(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:9005/api/v1/admin/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name: label.current.value 
                }),
                credentials: 'include'
            });
    
            if (response.ok) {
                const responseData = await response.json(); 

                alert("Catégorie créée avec succès. Nom de la nouvelle catégorie : " + responseData.name);
                
                label.current.value = "";
               
            } else {
                
                console.log("Erreur lors de la création de la catégorie :");
            }
        } catch (error) {
            console.log("Erreur lors de la création de la catégorie :", error);
        }
    }

  return (
    <form className='add-category' onSubmit= {submitHandler}>
        <legend>Ajouter une catégorie</legend>
        <div>
            <label htmlFor="label">Nom</label>
            <input  ref ={label}type="text" name = "label" />
            <button>envoyer</button>
        </div>
    </form>
  )
}

export default AddCategory