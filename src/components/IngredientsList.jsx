export default function IngredientsList({ingredients , getRecipe, loading}){


    const ingredientsListItems = ingredients.map(ingredient => 
        <li key={ingredient}>{ingredient}</li>
    )
    return (
        <>
            {ingredients.length > 0 && <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                {ingredients.length > 3 && <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={getRecipe} disabled={loading} aria-busy={loading} aria-live="polite">
                        {loading ? (
                            <>
                                <span className="spinner" aria-hidden="true" style={{marginRight:8}}></span>
                                Generating...
                            </>
                        ) : 'Get a recipe'}
                    </button>
                </div>} 
            </section>}
        </>
    )
}