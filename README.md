## Chef Claude

A small React + Vite demo that generates recipes from a user's ingredient list using a model (via the Hugging Face Inference client). The UI allows you to add ingredients, request a recipe, and renders the AI-generated recipe as markdown.

> Important: the repository currently calls the Hugging Face Inference client from the frontend (for local/dev use). This exposes any HF token in a client bundle — see the Security section below for the recommended approach (move model calls to a server or serverless function).

## Quick overview (features)

- Add ingredients via a simple form
- When enough ingredients are present, click **Get a recipe** to generate a recipe
- Shows a loading spinner and friendly message while the model responds
- Renders AI output as markdown (using `react-markdown`)

## Project contract (inputs / outputs / error modes)

- Inputs: an array of ingredient strings entered by the user.
- Output: a markdown string containing the recommended recipe returned by the AI.
- Error modes:
	- Network / API errors (model call fails)
	- Missing/invalid HF token
	- Empty or invalid ingredient lists
	- Unexpected model response format

Success criteria (for a single request)
- Clicking "Get a recipe" triggers a request.
- UI shows a spinner and a loading message while waiting.
- The returned markdown is rendered in the recipe area when available.
- Errors are surfaced to the user (or logged for debugging).

## Local setup

Prerequisites:
- Node.js (16+ recommended)
- npm or pnpm

Install dependencies (choose your package manager):

Using npm:
```bash
npm install
```

Using pnpm:
```bash
pnpm install
```

Add environment variables (see Security notes below). Create a `.env` file in the project root:

.env
```
VITE_HF_ACCESS_TOKEN=your_hf_access_token_here
```

Start the dev server (Vite):
```bash
npm run dev
# or
pnpm dev
```

Open the app at http://localhost:5173/

Build for production:
```bash
npm run build
# or
pnpm build
```

Preview a production build:
```bash
npm run preview
# or
pnpm preview
```

Lint:
```bash
npm run lint
```

## Environment variables
- `VITE_HF_ACCESS_TOKEN` — token for Hugging Face Inference client. If you keep the HF client in the browser (not recommended), the token will be bundled unless you proxy it via a server. See Security notes.

Tip: create a `.env.example` (do not commit your real `.env`) with:
```
VITE_HF_ACCESS_TOKEN=
```

## File structure (important files)
- `ai.js` — contains `getRecipeFromMistral(ingredients)` which uses `@huggingface/inference` and `import.meta.env.VITE_HF_ACCESS_TOKEN`. Currently a browser client call (move server-side in production).
- `src/components/Main.jsx` — main app logic (ingredients state, loading state, calls AI function).
- `src/components/IngredientsList.jsx` — renders ingredients and the "Get a recipe" button (shows spinner while loading).
- `src/components/ClaudeRecipe.jsx` — renders recipe markdown via `react-markdown` and shows loading text when the request is pending.
- `src/index.css` — app styles and spinner CSS.
- `package.json` — scripts and deps. Key packages: `react`, `react-dom`, `react-markdown`, `@huggingface/inference`.

## How it works (flow)
1. User adds ingredients (stored in `Main.jsx` state).
2. When the user clicks "Get a recipe", `Main.getRecipe()` calls `getRecipeFromMistral(ingredients)` from `ai.js`.
3. `Main` sets `loading` to `true` and passes the state down to `IngredientsList` (button) and `ClaudeRecipe` (display area).
4. Button shows spinner + "Generating..." while waiting. Recipe area shows "Generating recipe…" while loading.
5. When the call returns, the markdown output is stored in `recipe` state and rendered by `react-markdown` in `ClaudeRecipe`.

## Troubleshooting / common issues

- Vite error: `@huggingface/inference could not be resolved`
	- Ensure you installed the dependency:
		- `npm install @huggingface/inference` or `pnpm add @huggingface/inference`
	- If the error persists, remove `node_modules` and reinstall:
		```bash
		rm -rf node_modules
		npm install
		```
- Warning about token being exposed:
	- The HF token used in the browser is sensitive. Do not commit `.env` with your token. Use a backend to make HF requests and keep tokens secret.
- If `Generating recipe…` never changes:
	- Check browser console for network errors.
	- Verify `VITE_HF_ACCESS_TOKEN` is set and valid.
	- Check `ai.js` logs (it currently console.errors on catch).

## Security notes (very important)
- Current code uses `@huggingface/inference` client from `ai.js` and reads token from `import.meta.env.VITE_HF_ACCESS_TOKEN`. Exposing credentials in client bundles is insecure.
- Recommended: create a minimal server or serverless function that:
	- Accepts a list of ingredients (from the frontend)
	- Calls the Hugging Face Inference API or uses the official server-side SDK with the token stored securely on the server
	- Returns the model output (markdown) to the client
- Advantages of a server proxy:
	- Token never exposed to the browser
	- Easier to add rate limiting, caching, monitoring, and retry logic
	- Can transform model output into a safe format

## Suggested improvements / next steps (prioritized)
Short-term:
- Move HF calls to a server/serverless function.
- Add focus management: move keyboard focus to the recipe area after generation (improves accessibility).
- Enhance UX: show a skeleton or richer loading UI in the recipe area; allow regenerate/cancel.
- Sanitize markdown output and continue to use `react-markdown` with `rehype-sanitize` (to avoid HTML injection).

Medium-term:
- Caching of identical ingredient lists to avoid repeated API calls.
- Add tests: unit tests for components and a mock for the AI function.
- Add CI (lint/test) and a deploy pipeline that stores secrets in the platform (e.g., Vercel/Netlify Environment Variables).

Long-term:
- Streaming model responses for progressive rendering.
- User accounts / preferences (dietary restrictions).
- Rate limit protection & cost monitoring.

## Edge cases to handle
- Empty or very short ingredient lists — show a helpful prompt instead of calling the model.
- API rate limits — show a friendly error and retry guidance.
- Model returns an empty response — show fallback message.
- Model suggests ingredients user doesn't have — consider adding suggested substitutions or a "generate with substitutions" mode.

## Testing & quality gates
- Lint: `npm run lint`
- Build: `npm run build` then `npm run preview` to verify production output
- Add unit tests (Jest/React Testing Library) to mock `getRecipeFromMistral` and assert UI states (loading, disabled button, rendered markdown).

## Example commands

Install dependencies:
```bash
npm install
# or
pnpm install
```

Run dev server:
```bash
npm run dev
# or
pnpm dev
```

Build for production:
```bash
npm run build
```

Lint:
```bash
npm run lint
```

## Minimal serverless proxy example (concept)
(High level — implement separately)
- Endpoint: `/api/generate-recipe`
- Request: POST { ingredients: ["pasta","tomato"] }
- Server reads HF token from server env (never client)
- Server calls Hugging Face Inference endpoints or server-side SDK
- Server returns `{ recipe: "...markdown..." }`

## Attribution & license
- This project skeleton includes usage of open-source libraries listed in `package.json`. Check individual package licenses for details.
- The project is licensed as MIT (set or change license as desired).

