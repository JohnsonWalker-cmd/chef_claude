import { useState } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main(){
    const [ingredients , setIngredients] = useState(["all the main spices", "pasta", "ground beef", "tomato paste"])

    const [ recipeShown , setRecipeShown] = useState(false)

    function showRecipe(){
        setRecipeShown(prevShow => !prevShow)
    }

    

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
            <IngredientsList ingredients={ingredients} showRecipe={showRecipe}/>
            <ClaudeRecipe recipeShown={recipeShown}/>
            
        </main>
    )
}

