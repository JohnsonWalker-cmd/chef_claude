import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { ingredients } = req.body

    if (!ingredients || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: 'Invalid ingredients' })
    }

    const hfToken = (typeof globalThis !== 'undefined' && globalThis.process && globalThis.process.env && globalThis.process.env.HF_ACCESS_TOKEN) ? globalThis.process.env.HF_ACCESS_TOKEN : undefined
    if (!hfToken) {
        return res.status(500).json({ error: 'Server misconfigured: missing HF_ACCESS_TOKEN' })
    }
    const hf = new HfInference(hfToken)
    const ingredientsString = ingredients.join(", ")

    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })

        return res.status(200).json({
            recipe: response.choices[0].message.content
        })
    } catch (error) {
        console.error("HF API Error:", error)
        return res.status(500).json({ 
            error: 'Failed to generate recipe',
            details: error.message 
        })
    }
}