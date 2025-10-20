import { useState } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

import { getRecipeFromMistral } from "../../ai"


export default function Main(){
    const [ingredients , setIngredients] = useState([])

    const [ recipe , setRecipe] = useState('')

    async function getRecipe(){
        const generatedRecipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(generatedRecipeMarkdown)
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
            <IngredientsList ingredients={ingredients} getRecipe={getRecipe}/>
            {recipe && <ClaudeRecipe recipe={recipe}/>}
            
        </main>
    )
}


