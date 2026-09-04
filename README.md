# Adedeji David — Portfolio

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for deployment

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy anywhere (Vercel, Netlify, GitHub Pages).

## Structure

- `src/App.jsx` — the whole page as one component
- `src/App.css` — all styling, using CSS variables defined at the top (`:root`) so colors are easy to retune in one place
- `src/main.jsx` — mounts the app
- `index.html` — page shell and meta tags
