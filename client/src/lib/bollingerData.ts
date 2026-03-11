// ─── BOLLINGER CI DASHBOARD — Data Layer ────────────────────────────────────
// All data sourced and verified, March 2026

export const GOLD = "oklch(0.72 0.12 75)";
export const GOLD_DIM = "oklch(0.72 0.12 75 / 0.50)";
export const GREEN = "oklch(0.65 0.15 145)";
export const RED = "oklch(0.60 0.20 25)";
export const BLUE = "oklch(0.55 0.10 260)";
export const MUTED = "oklch(0.45 0.008 75)";

// Chart colors
export const CHART_COLORS = {
  bollinger: "#C9A84C",
  roederer: "#8B9DC3",
  krug: "#C9A84C88",
  polroger: "#7BA05B",
  billecart: "#C47C5A",
  dom: "#9B7EC8",
  ruinart: "#5BA0A0",
  taittinger: "#B07070",
  laurent: "#70A070",
};

// ─── Market Volume Data ───────────────────────────────────────────────────────
export const marketVolumeData = [
  { year: "2019", volume: 297.6, label: "297,6M" },
  { year: "2020", volume: 245.0, label: "245M" },
  { year: "2021", volume: 322.0, label: "322M" },
  { year: "2022", volume: 299.0, label: "299M" },
  { year: "2023", volume: 299.0, label: "299M" },
  { year: "2024", volume: 271.4, label: "271,4M" },
  { year: "2025", volume: 266.0, label: "266M" },
];

// ─── Top Export Markets 2024 ──────────────────────────────────────────────────
export const exportMarketsData = [
  { pays: "USA", btl: 27.45, val: 820, evol: 1.9 },
  { pays: "UK", btl: 22.31, val: 519, evol: -12.7 },
  { pays: "Japon", btl: 12.45, val: 386, evol: -18.6 },
  { pays: "Allemagne", btl: 9.51, val: 229, evol: -18.5 },
  { pays: "Belgique", btl: 7.20, val: 165, evol: -5.2 },
  { pays: "Italie", btl: 5.80, val: 148, evol: -3.1 },
  { pays: "Australie", btl: 4.20, val: 128, evol: 2.4 },
  { pays: "Suisse", btl: 3.90, val: 118, evol: 1.1 },
  { pays: "EAU", btl: 3.45, val: 100, evol: 21.6 },
  { pays: "Canada", btl: 3.10, val: 89, evol: 5.3 },
];

// ─── Price Comparison ─────────────────────────────────────────────────────────
export const priceComparisonData = [
  { maison: "Bollinger", entree: 67, millesime: 178, prestige: 425, collector: 500 },
  { maison: "Roederer", entree: 52, millesime: 145, prestige: 300, collector: 0 },
  { maison: "Krug", entree: 0, millesime: 0, prestige: 200, collector: 1200 },
  { maison: "Pol Roger", entree: 52, millesime: 120, prestige: 215, collector: 0 },
  { maison: "Billecart", entree: 60, millesime: 105, prestige: 0, collector: 0 },
  { maison: "Dom Pérignon", entree: 0, millesime: 0, prestige: 200, collector: 2500 },
  { maison: "Ruinart", entree: 90, millesime: 0, prestige: 0, collector: 0 },
  { maison: "Taittinger", entree: 48, millesime: 95, prestige: 0, collector: 0 },
  { maison: "L-Perrier", entree: 55, millesime: 140, prestige: 0, collector: 0 },
];

// ─── Most Admired Rankings ────────────────────────────────────────────────────
export const admiredRankingData = [
  { maison: "Roederer", rank2025: 1, rank2026: 1, score: 95 },
  { maison: "Krug", rank2025: 2, rank2026: 2, score: 88 },
  { maison: "Bollinger", rank2025: 3, rank2026: 3, score: 82 },
  { maison: "Billecart", rank2025: 4, rank2026: 4, score: 74 },
  { maison: "C. Heidsieck", rank2025: 7, rank2026: 5, score: 68 },
  { maison: "Pol Roger", rank2025: 5, rank2026: 6, score: 65 },
  { maison: "Ruinart", rank2025: 8, rank2026: 7, score: 62 },
  { maison: "Dom Pérignon", rank2025: 6, rank2026: 8, score: 58 },
];

// ─── Social Media Followers ───────────────────────────────────────────────────
export const socialData = [
  { maison: "Dom Pérignon", followers: 799, platform: "Instagram" },
  { maison: "Ruinart", followers: 420, platform: "Instagram" },
  { maison: "Bollinger", followers: 252, platform: "Instagram" },
  { maison: "Krug", followers: 185, platform: "Instagram" },
  { maison: "Pol Roger", followers: 120, platform: "Instagram" },
  { maison: "Billecart", followers: 95, platform: "Instagram" },
  { maison: "Roederer", followers: 88, platform: "Instagram" },
];

// ─── Portfolio Products ───────────────────────────────────────────────────────
export const portfolioData = [
  { name: "Special Cuvée NV", tier: "Prestige entrée", priceMin: 55, priceMax: 78, score: 94, volume: "~2M btl/an", flagship: true },
  { name: "La Grande Année", tier: "Millésime prestige", priceMin: 149, priceMax: 206, score: 96, volume: "~200K btl/an", flagship: false },
  { name: "Grande Année Rosé", tier: "Millésime rosé", priceMin: 180, priceMax: 250, score: 95, volume: "~50K btl/an", flagship: false },
  { name: "R.D.", tier: "Ultra-prestige", priceMin: 350, priceMax: 500, score: 97, volume: "~80K btl/an", flagship: false },
  { name: "VVF", tier: "Collector", priceMin: 400, priceMax: 600, score: 99, volume: "~3K btl/an", flagship: false },
  { name: "PN AYC18", tier: "Terroir", priceMin: 80, priceMax: 120, score: 93, volume: "N/D", flagship: false },
  { name: "Cuvée 007 Ltd", tier: "Édition limitée", priceMin: 75, priceMax: 100, score: 0, volume: "Limitée", flagship: false },
];

// ─── Risk Matrix ──────────────────────────────────────────────────────────────
export const riskData = [
  { name: "Tarifs US Trump", impact: 9, probability: 8, level: "critique", color: "#E05252" },
  { name: "Phylloxera VVF", impact: 8, probability: 5, level: "critique", color: "#E05252" },
  { name: "Réputation Folc", impact: 5, probability: 6, level: "modere", color: "#C9A84C" },
  { name: "Climat Champagne", impact: 7, probability: 7, level: "modere", color: "#C9A84C" },
  { name: "Déclin France", impact: 4, probability: 9, level: "faible", color: "#5B8BC9" },
  { name: "Génération Z", impact: 5, probability: 6, level: "faible", color: "#5B8BC9" },
];

// ─── Recommendations ──────────────────────────────────────────────────────────
export const recoData = [
  { priority: 1, title: "Diversifier marchés export", impact: 9, effort: 7, horizon: "6–12 mois", color: "#7BA05B" },
  { priority: 2, title: "Amplifier présence digitale", impact: 8, effort: 5, horizon: "3–9 mois", color: "#7BA05B" },
  { priority: 3, title: "Stratégie Bicentenaire 2029", impact: 8, effort: 6, horizon: "12–36 mois", color: "#C9A84C" },
  { priority: 4, title: "Protéger les VVF", impact: 7, effort: 3, horizon: "0–6 mois", color: "#C9A84C" },
  { priority: 5, title: "Revoir protection marque", impact: 5, effort: 2, horizon: "1–3 mois", color: "#5B8BC9" },
];

// ─── Channel Distribution ─────────────────────────────────────────────────────
export const channelData = [
  { name: "On-Trade", value: 67, color: "#C9A84C" },
  { name: "Off-Trade", value: 23, color: "#8B9DC3" },
  { name: "E-commerce", value: 10, color: "#7BA05B" },
];

// ─── Segment Market Share ─────────────────────────────────────────────────────
export const segmentData = [
  { name: "Prestige Cuvée", value: 44.6, color: "#C9A84C" },
  { name: "Non-Vintage", value: 38.2, color: "#8B9DC3" },
  { name: "Rosé", value: 11.4, color: "#C47C5A" },
  { name: "Blanc de Blancs", value: 5.8, color: "#7BA05B" },
];
