# React + Vite

OctoFit Tracker's presentation tier is a React 19 + Vite app that reads from the Express API tier.

## Environment

Define `VITE_CODESPACE_NAME` when running inside Codespaces so the frontend can call the public API URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

For local development outside Codespaces, leave `VITE_CODESPACE_NAME` unset and the frontend will use `http://localhost:8000`.

Vite loads local overrides from `.env.local`, so a Codespaces setup can use:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

API requests are built as `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/` when the variable is present. The app falls back safely to `http://localhost:8000/api/[component]/` when it is unset.

## Scripts

Run commands from the repository root with `--prefix octofit-tracker/frontend`:

- `npm run dev --prefix octofit-tracker/frontend`
- `npm run build --prefix octofit-tracker/frontend`
- `npm run lint --prefix octofit-tracker/frontend`

## API Responses

The frontend accepts direct array responses and paginated response shapes that expose arrays through `data`, `results`, `items`, or `docs`.
