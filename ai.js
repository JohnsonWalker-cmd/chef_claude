export async function getRecipeFromMistral(ingredientsArr) {
    try {
        const response = await fetch('/api/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientsArr })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.details || 'Failed to get recipe')
        }

        const data = await response.json()
        return data.recipe
    } catch (err) {
        console.error("Error fetching recipe:", err)
        throw err
    }
}