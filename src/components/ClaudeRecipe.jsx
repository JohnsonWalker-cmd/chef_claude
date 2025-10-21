import Markdown from "react-markdown"


export default function ClaudeRecipe({recipe, loading}){
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Chef Claude Recommends:</h2>
            {loading ? <p>Generating recipe…</p> : <Markdown>{recipe}</Markdown>}
        </section>
    )
}