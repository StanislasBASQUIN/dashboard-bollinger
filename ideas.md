# Bollinger CI Dashboard — Brainstorm Design

## Approche retenue : **Maison de Champagne Prestige — Art Déco Contemporain**

### Design Movement
Art Déco revisité avec une sensibilité éditoriale luxe. Références : Champagne Bollinger (étiquette noire et or), les grands hôtels parisiens des années 30, les rapports annuels des maisons de luxe LVMH/Kering.

### Core Principles
1. **Noir profond + or champagne** : fond sombre (#0D0D0D à #1A1208) avec accents or/ambre (#C9A84C, #E8C96A). Texte blanc cassé (#F5F0E8).
2. **Typographie éditoriale** : Playfair Display (titres, chiffres clés) + DM Sans (corps, données). Contraste fort entre serif élégant et sans-serif lisible.
3. **Densité d'information maîtrisée** : cartes compactes avec hiérarchie claire. Chaque section = une carte autonome avec badge de source.
4. **Ligne fine dorée** : séparateurs, bordures de cartes, accents visuels en `border-amber-600/30`.

### Color Philosophy
- Background: `oklch(0.10 0.015 60)` — noir chaud, évoque les caves de Champagne
- Primary (or): `oklch(0.72 0.12 75)` — or champagne, prestige sans ostentation
- Surface cards: `oklch(0.15 0.01 60)` — légèrement plus clair que le fond
- Accent vert: `oklch(0.65 0.15 145)` — pour les indicateurs positifs
- Accent rouge: `oklch(0.60 0.20 25)` — pour les risques et baisses
- Texte principal: `oklch(0.95 0.005 80)` — blanc cassé chaud

### Layout Paradigm
Mobile-first avec navigation par onglets en bas (bottom tab bar). Chaque section = page scrollable avec sticky header. Pas de sidebar. Navigation fluide entre sections. Header compact avec logo Bollinger et titre section.

### Signature Elements
1. **Badge "Source"** : petit badge discret en bas de chaque donnée factuelle avec lien et date
2. **Indicateur de tendance** : flèche colorée (↑ vert / ↓ rouge / → neutre) avec pourcentage
3. **Barre de comparaison** : barres horizontales pour comparer Bollinger vs concurrents

### Interaction Philosophy
- Tap pour déplier les détails d'une carte
- Swipe entre sections
- Sticky bottom navigation avec icônes et labels
- Animations d'entrée subtiles (fade + slide up)

### Animation
- Entrée des cartes: `fade-in` + `translate-y` (150ms stagger)
- Transitions entre onglets: slide horizontal
- Indicateurs numériques: compteur animé au premier affichage

### Typography System
- Display/KPI: Playfair Display Bold, 28-36px, or (#C9A84C)
- Section titles: Playfair Display SemiBold, 18-22px, blanc cassé
- Body/data: DM Sans Regular/Medium, 13-15px, gris clair
- Labels/badges: DM Sans Medium, 11px, uppercase, letter-spacing
- Citations: DM Sans Italic, 11px, muted
