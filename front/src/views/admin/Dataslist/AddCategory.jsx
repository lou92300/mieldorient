import React from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function AddCategory() {
    const navigate = useNavigate();
    const label = useRef(null);

    // async function submitHandler(e) {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch("http://localhost:9005/api/v1/admin/categories", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ 
    //                 name: label.current.value 
    //              }),
    //              credentials: 'include'
                
    //         });
    //         if (response.ok) {
    //             navigate("/admin/donnees/categories");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
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
                const responseData = await response.json(); // Extraire les données JSON renvoyées par le serveur
                // Faites ce que vous voulez avec les données renvoyées, par exemple, afficher un message
                alert("Catégorie créée avec succès. ID de la nouvelle catégorie : " + responseData.ID);
                // Vous pouvez également mettre à jour l'interface utilisateur avec les données renvoyées, etc.
            } else {
                // Gérer les cas où la réponse n'est pas OK, par exemple, afficher un message d'erreur
                console.log("Erreur lors de la création de la catégorie :", response.status);
            }
        } catch (error) {
            console.log("Erreur lors de la création de la catégorie :", error);
        }
    }

  return (
    <form onSubmit= {submitHandler}>
        <legend>Ajouter une catégorie</legend>
        <div>
            <label htmlFor="label">Label</label>
            <input  ref ={label}type="text" name = "label" />
            <button>envoyer</button>
        </div>
    </form>
  )
}

export default AddCategory