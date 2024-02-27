import React from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function AddCategory() {
    const navigate = useNavigate();
    const label = useRef(null);

    async function submitHandler(e) {
        e.preventDefault();
        try {
            const response = await fetch("/api/v1/admin/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ label: label.current.value }),
            });
            if (response.ok) {
                navigate("/admin/donnees/categories");
            }
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <form onSubmit= {submitHandler}>
        <legend>Ajouter une catégorie</legend>
        <div>
            <label htmlFor="label">Label</label>
            <input  ref ={label}type="text" name = "label" />
        </div>
    </form>
  )
}

export default AddCategory