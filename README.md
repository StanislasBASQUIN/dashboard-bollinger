# Bollinger Dashboard

Interactive analytics dashboard for the Bollinger wine & champagne portfolio, built with React and Vite and deployed on GitHub Pages.

## Demo

- Live demo: https://stanislasbasquin.github.io/dashboard-bollinger/

## Features

- Portfolio overview and key KPIs for Bollinger.
- Visualizations for sales, volumes, markets and channels.
- Responsive layout designed for desktop usage.

## Tech stack

- React + Vite for the frontend.
- Tailwind CSS for styling.
- GitHub Actions + GitHub Pages for continuous deployment.

## Local development

Prerequisites:

- Node.js (version 18+ recommandée).

Setup:

```bash
# Install dependencies
npm ci

# Start dev server
npm run dev
Then open http://localhost:3000/ in your browser.

Production build
bash
npm run build
The production bundle is generated in the dist folder.

Deployment
Deployment is handled automatically by GitHub Actions:

Any push to the public-github-pages branch triggers a workflow that:

installs dependencies,

builds the app with Vite,

publishes the dist folder to GitHub Pages.

```

The site is served at:

https://stanislasbasquin.github.io/dashboard-bollinger/
