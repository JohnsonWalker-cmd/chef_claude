import { useState } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

import { getRecipeFromMistral } from "../../ai"


export default function Main(){
    const [ingredients , setIngredients] = useState([])

    const [ recipe , setRecipe] = useState('')
    const [loading, setLoading] = useState(false)

    async function getRecipe(){
        try{
            setLoading(true)
            const generatedRecipeMarkdown = await getRecipeFromMistral(ingredients)
            setRecipe(generatedRecipeMarkdown)
        } finally{
            setLoading(false)
        }
    }

    

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        console.log(newIngredient)
        setIngredients(prevIngredients => [...prevIngredients , newIngredient])
    }
    return (
        <main>
            <form className="add-ingredient-form" action={addIngredient}> {/** the action prop of the form component can take in a URL or a function. the function will handle the form submission */}
                <input
                type="text" 
                placeholder="e.g. oregano"
                aria-label="Add ingredient"
                name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            <IngredientsList ingredients={ingredients} getRecipe={getRecipe} loading={loading} />
            {(loading || recipe) && <ClaudeRecipe recipe={recipe} loading={loading}/>} 
            
        </main>
    )
}


