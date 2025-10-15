import { useState } from "react"

export default function Main(){
    const [ingredients , setIngredients] = useState([])

    const ingredient_item = ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients , newIngredient])
    }
    return (
        <main>
            <form className="add-ingredient-form" action={addIngredient}>
                <input
                type="text" 
                placeholder="e.g. oregano"
                aria-label="Add ingredient"
                name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            <ol>
                {ingredient_item}
            </ol>
        </main>
    )
}
