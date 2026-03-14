# Bollinger Dashboard

Interactive analytics dashboard for the Bollinger wine & champagne portfolio, built with React and Vite and deployed on GitHub Pages.

## Demo

- GitHub Pages: https://stanislasbasquin.github.io/dashboard-bollinger/
- Custom domain (planned): https://dashboard-bollinger.noah-consultant.com

## Features

- Portfolio overview and key KPIs for Bollinger.
- Visualizations for sales, volumes, markets and channels.
- Responsive layout designed for desktop usage.

## Tech stack

- React + Vite for the frontend.
- Tailwind CSS for styling.
- GitHub Actions + GitHub Pages for continuous deployment.

## Branches

This repository currently uses two main branches:

- `main`: legacy branch containing the original version of the project and historical code.
- `public-github-pages`: branch used for the standalone public version deployed to GitHub Pages.

All deployment automation targets the `public-github-pages` branch.

## Local development

> For the standalone public version (GitHub Pages build)

Prerequisites:

- Node.js (version 18+ recommended)

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
Deployment of the public dashboard is handled automatically by GitHub Actions:

Any push to the public-github-pages branch triggers a workflow that:

installs dependencies,

builds the app with Vite,

publishes the dist folder to GitHub Pages.

```

The site is served at:

GitHub Pages URL: https://stanislasbasquin.github.io/dashboard-bollinger/

Custom domain (when configured): https://dashboard-bollinger.noah-consultant.com
