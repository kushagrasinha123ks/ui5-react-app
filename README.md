# SiteDesk — React facilities dashboard

A small, practical dashboard for campus facilities requests. Create a request, filter the queue, change its status, and explore requests by building on a schematic map. The app uses sample data and saves changes in your browser with `localStorage`; it has no backend or login.

**Live site:** [GitHub Pages](https://kushagrasinha123ks.github.io/ui5-react-app/)

## Run locally

Use Node.js 22 or later.

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite. Other commands:

```bash
npm test       # React Testing Library + Jest
npm run build  # production files in dist/
npm run preview
```

## What to inspect for an interview

| Topic | Where it appears | What to explain |
| --- | --- | --- |
| Components and props | `src/components/` | Reusable cards, status badges, map pins, and layout receive data through props. |
| Rendering and arrays | `Dashboard.jsx`, `RequestsPage.jsx`, `LocationsPage.jsx` | `map` renders cards and navigation; `filter`, `sort`, and `reduce` derive displayed data. Stable IDs are React keys. |
| State and hooks | `RequestsPage.jsx`, `Dashboard.jsx`, `NewRequestPage.jsx` | `useState` holds UI and form state; `useMemo` derives filtered lists and counts; `useRef` focuses the title after a validation error. |
| Shared state | `src/context/RequestsContext.jsx` | `createContext` and `useContext` share requests between routes; `useEffect` saves them to `localStorage`. |
| Forms and validation | `NewRequestPage.jsx`, `src/utils/requests.js` | Controlled inputs, simple synchronous validation, accessible error messages, and navigation after success. |
| Routing | `src/App.jsx`, `src/main.jsx` | React Router's `HashRouter` supports refreshing routes on static GitHub Pages. |
| JavaScript fundamentals | `src/utils/requests.js`, `src/context/RequestsContext.jsx` | Objects, arrays, destructuring, spread syntax, functions, conditions, `map`, `filter`, `reduce`, `sort`, dates, and JSON. |
| Tests | `src/pages/*.test.jsx` | User focused tests cover filtering, invalid and valid submission, and status persistence. |
| Styling | `src/styles.css` and JSX | Tailwind utilities handle layout and spacing; a small CSS layer defines repeated controls and map pins. |

The map is an illustrative SVG, not a geographic map or a map API. This project demonstrates front-end React and JavaScript fundamentals. It does not claim SAPUI5 or SAP BTP integration.

## Project structure

```text
src/
  components/   reusable UI elements
  context/      shared request state and localStorage
  data/         demo requests and locations
  pages/        dashboard, list, form, detail, and map routes
  utils/        validation and summary functions
  styles.css    Tailwind import and small reusable styles
```

## GitHub Pages

`vite.config.js` sets the base path to `/ui5-react-app/`. The workflow in `.github/workflows/deploy.yml` runs tests, builds the app, and deploys `dist/` on pushes to `main`. In the repository's **Settings → Pages**, select **GitHub Actions** as the build and deployment source if it is not selected already.
