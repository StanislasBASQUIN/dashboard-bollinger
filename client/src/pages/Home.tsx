/*
 * BOLLINGER CI DASHBOARD — Home Page
 * Design: Art Déco Prestige, noir + or champagne
 * Sections: Executive Snapshot, Positionnement, Portefeuille, Prix,
 *           Distribution, Part de Voix, Social & Digital, Signaux Faibles, Recommandations
 */

import { useState, useEffect, useRef } from "react";
import {
  TrendingUp, TrendingDown, Minus, ExternalLink, AlertTriangle,
  Star, BarChart2, Globe, ShoppingBag, Megaphone, Smartphone,
  Zap, Target, ChevronRight, Info, Award, MapPin, Package,
  DollarSign, Radio, Activity, Shield, Lightbulb, LayoutDashboard
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type TrendDir = "up" | "down" | "flat";
interface Source { label: string; url: string; date: string; }

// ─── Shared Components ───────────────────────────────────────────────────────
function SourceBadge({ source }: { source: Source }) {
  return (
    <a href={source.url} target="_blank" rel="noopener noreferrer"
      className="source-badge hover:opacity-80 transition-opacity">
      <ExternalLink size={8} />
      {source.label} · {source.date}
    </a>
  );
}

function TrendBadge({ dir, value }: { dir: TrendDir; value: string }) {
  const cls = dir === "up" ? "trend-up" : dir === "down" ? "trend-down" : "trend-flat";
  const Icon = dir === "up" ? TrendingUp : dir === "down" ? TrendingDown : Minus;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${cls}`}>
      <Icon size={12} />
      {value}
    </span>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1.5 rounded" style={{ background: "oklch(0.72 0.12 75 / 0.15)" }}>
          <Icon size={14} style={{ color: "oklch(0.72 0.12 75)" }} />
        </div>
        <h2 className="section-header">{title}</h2>
      </div>
      {subtitle && <p className="text-xs ml-9" style={{ color: "oklch(0.60 0.010 75)" }}>{subtitle}</p>}
      <div className="gold-line mt-3" />
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`b-card p-4 ${className}`}>
      {children}
    </div>
  );
}

function NDTag({ reason, method }: { reason: string; method: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="inline-block">
      <button onClick={() => setOpen(!open)}
        className="text-xs px-2 py-0.5 rounded font-medium"
        style={{ background: "oklch(0.55 0.05 75 / 0.2)", color: "oklch(0.55 0.05 75)" }}>
        N/D <Info size={9} className="inline ml-0.5" />
      </button>
      {open && (
        <div className="mt-1 p-2 rounded text-xs" style={{ background: "oklch(0.18 0.010 65)", border: "1px solid oklch(0.55 0.05 75 / 0.3)" }}>
          <p style={{ color: "oklch(0.60 0.010 75)" }}><strong style={{ color: "oklch(0.72 0.12 75)" }}>Pourquoi N/D :</strong> {reason}</p>
          <p className="mt-1" style={{ color: "oklch(0.60 0.010 75)" }}><strong style={{ color: "oklch(0.72 0.12 75)" }}>Méthode :</strong> {method}</p>
        </div>
      )}
    </span>
  );
}

// ─── Section: Executive Snapshot ─────────────────────────────────────────────
function ExecutiveSnapshot() {
  const insights = [
    {
      icon: TrendingDown,
      color: "oklch(0.60 0.20 25)",
      title: "Marché en contraction structurelle",
      body: "266M bouteilles expédiées en 2025 (−2%), 3e année consécutive de baisse. Bollinger résiste mieux : −3% volume 2024 mais valeur stable.",
      impact: "Pression sur volumes, opportunité de premiumisation.",
      source: { label: "Comité Champagne", url: "https://thefinestbubble.com/news-and-reviews/champagne-shipments-fall-again-for-third-successive-year-down-2-in-2025/", date: "jan. 2026" }
    },
    {
      icon: Award,
      color: "oklch(0.72 0.12 75)",
      title: "#3 Most Admired — stable au podium",
      body: "Bollinger conserve sa 3e place (Drinks International 2025 & 2026) derrière Roederer et Krug. Podium inchangé depuis 3 ans.",
      impact: "Légitimité prestige confirmée. Écart avec Roederer à combler.",
      source: { label: "Drinks International", url: "https://wine-intelligence.com/blogs/wine-news-insights-wine-intelligence-trends-data-reports/most-admired-champagne-brands-2026-roederer-krug-and-bollinger-lead-again", date: "mars 2026" }
    },
    {
      icon: Shield,
      color: "oklch(0.65 0.15 145)",
      title: "Royal Warrant renouvelé — 140 ans",
      body: "Renouvellement du Royal Warrant de Sa Majesté Charles III en décembre 2024. 140 ans de fourniture continue à la Maison Royale.",
      impact: "Actif de réputation unique, différenciant fort sur le marché UK.",
      source: { label: "Drinks International", url: "https://drinksint.com/news/fullstory.php/aid/11530/Bollinger_renews_Royal_Warrant.html", date: "déc. 2024" }
    },
    {
      icon: Zap,
      color: "oklch(0.72 0.12 75)",
      title: "Double partenariat iconique 2025",
      body: "James Bond (45+ ans, Special Cuvée 007 oct. 2025) + Aston Martin (partenariat mondial annoncé sept. 2025). Deux icônes britanniques réunies.",
      impact: "Amplification de la notoriété masculine premium, potentiel cross-sell.",
      source: { label: "Aston Martin", url: "https://www.astonmartin.com/en-us/our-world/news/2025/9/29/two-icons-unite-aston-martin-and-champagne-bollinger-announce-prestigious-new-global-partnership", date: "sept. 2025" }
    },
    {
      icon: AlertTriangle,
      color: "oklch(0.60 0.20 25)",
      title: "Tarifs US : risque majeur sur 1er marché export",
      body: "Les USA (27,5M btl, 820M€ en 2024) subissent les tarifs Trump. Exports vins français −39% en Q4 2025. Menace directe sur le 1er marché export champagne.",
      impact: "Révision urgente de la stratégie de pricing et distribution US.",
      source: { label: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2026-02-06/french-champagne-and-perfume-feel-the-pain-of-trump-tariffs", date: "fév. 2026" }
    },
    {
      icon: Activity,
      color: "oklch(0.65 0.15 145)",
      title: "B Corp + Bicentenaire 2029 : horizon stratégique",
      body: "Certification B Corp (sept. 2023, score 83,9). Hôtel 20 chambres + centre touristique à Aÿ en construction pour le bicentenaire 2029.",
      impact: "Différenciation ESG et wine tourism comme levier de valeur long terme.",
      source: { label: "Bollinger", url: "https://www.champagne-bollinger.com/en/bcorp/", date: "sept. 2023" }
    },
  ];

  return (
    <div className="space-y-3">
      <SectionTitle icon={LayoutDashboard} title="Executive Snapshot" subtitle="6 insights clés · Impact business · Sources vérifiées" />
      {insights.map((ins, i) => (
        <Card key={i}>
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-7 h-7 rounded flex items-center justify-center"
                style={{ background: `${ins.color} / 0.15`, backgroundColor: ins.color.replace(")", " / 0.15)").replace("oklch(", "oklch(") }}>
                <ins.icon size={14} style={{ color: ins.color }} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-1" style={{ color: "oklch(0.95 0.008 80)", fontFamily: "'Playfair Display', serif" }}>
                {ins.title}
              </p>
              <p className="text-xs leading-relaxed mb-2" style={{ color: "oklch(0.70 0.008 75)" }}>
                {ins.body}
              </p>
              <div className="flex items-start gap-1 mb-2">
                <span className="text-xs font-medium flex-shrink-0" style={{ color: "oklch(0.72 0.12 75)" }}>→</span>
                <p className="text-xs italic" style={{ color: "oklch(0.72 0.12 75 / 0.85)" }}>{ins.impact}</p>
              </div>
              <SourceBadge source={ins.source} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── Section: Positionnement ──────────────────────────────────────────────────
function Positionnement() {
  const competitors = [
    { name: "Bollinger", tier: "Prestige indépendant", dna: "Pinot Noir, fûts chêne, tradition", price: "55–600€", indie: true, bcorp: true, bond: true },
    { name: "Louis Roederer", tier: "Prestige indépendant", dna: "Cristal, biodynamie, Blanc de Blancs", price: "45–500€", indie: true, bcorp: false, bond: false },
    { name: "Krug", tier: "Ultra-prestige (LVMH)", dna: "Multi-millésime, 100+ vins, Grande Cuvée", price: "180–2000€", indie: false, bcorp: false, bond: false },
    { name: "Pol Roger", tier: "Prestige indépendant", dna: "Churchill, élégance britannique", price: "45–300€", indie: true, bcorp: false, bond: false },
    { name: "Billecart-Salmon", tier: "Prestige familial", dna: "Rosé, Blanc de Blancs, finesse", price: "55–400€", indie: true, bcorp: false, bond: false },
    { name: "Dom Pérignon", tier: "Ultra-prestige (LVMH)", dna: "Vintage only, collab artistiques", price: "180–5000€", indie: false, bcorp: false, bond: false },
    { name: "Ruinart", tier: "Prestige (LVMH)", dna: "Blanc de Blancs, art contemporain", price: "65–500€", indie: false, bcorp: false, bond: false },
    { name: "Taittinger", tier: "Prestige familial", dna: "Comtes de Champagne, Chardonnay", price: "45–300€", indie: true, bcorp: false, bond: false },
    { name: "Laurent-Perrier", tier: "Prestige familial", dna: "Grand Siècle, Rosé, assemblage", price: "50–400€", indie: true, bcorp: false, bond: false },
  ];

  const bollingerDNA = [
    { label: "Indépendance familiale", value: "Depuis 1829, Aÿ (Marne)" },
    { label: "Pinot Noir dominant", value: "~60% dans Special Cuvée" },
    { label: "Vinification fûts chêne", value: "Tradition rare en Champagne" },
    { label: "Vignoble propre", value: "~180 ha (60% GC + PC)" },
    { label: "Vieilles Vignes Françaises", value: "Vignes non greffées, ultra-rare" },
    { label: "B Corp certifié", value: "Score 83,9 (sept. 2023)" },
    { label: "Royal Warrant", value: "140 ans, Charles III (2024)" },
    { label: "James Bond", value: "Official Champagne 007 depuis 1979" },
  ];

  return (
    <div className="space-y-4">
      <SectionTitle icon={Star} title="Positionnement & Proposition de Valeur" subtitle="Bollinger vs competitive set · 9 maisons" />

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>ADN Bollinger</p>
        <div className="space-y-2">
          {bollingerDNA.map((item, i) => (
            <div key={i} className="flex justify-between items-start gap-2">
              <span className="text-xs" style={{ color: "oklch(0.60 0.010 75)" }}>{item.label}</span>
              <span className="text-xs font-medium text-right" style={{ color: "oklch(0.90 0.008 80)" }}>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="gold-line mt-3 mb-2" />
        <SourceBadge source={{ label: "Bollinger.com", url: "https://www.champagne-bollinger.com", date: "2024" }} />
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Competitive Set — Justification</p>
        <p className="text-xs mb-3 leading-relaxed" style={{ color: "oklch(0.60 0.010 75)" }}>
          Sélection basée sur : positionnement prestige/ultra-prestige, fourchette de prix comparable, distribution internationale similaire, notoriété professionnelle (Drinks International 2025–2026).
        </p>
        <div className="space-y-2">
          {competitors.map((c, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5 border-b last:border-0" style={{ borderColor: "oklch(0.72 0.12 75 / 0.10)" }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`text-sm font-semibold ${c.name === "Bollinger" ? "text-gold-gradient" : ""}`}
                    style={c.name !== "Bollinger" ? { color: "oklch(0.90 0.008 80)", fontFamily: "'Playfair Display', serif" } : { fontFamily: "'Playfair Display', serif" }}>
                    {c.name}
                  </span>
                  {c.indie && <span className="text-xs px-1 py-0.5 rounded" style={{ background: "oklch(0.65 0.15 145 / 0.15)", color: "oklch(0.65 0.15 145)" }}>Indép.</span>}
                  {c.bcorp && <span className="text-xs px-1 py-0.5 rounded" style={{ background: "oklch(0.72 0.12 75 / 0.15)", color: "oklch(0.72 0.12 75)" }}>B Corp</span>}
                  {c.bond && <span className="text-xs px-1 py-0.5 rounded" style={{ background: "oklch(0.55 0.10 260 / 0.20)", color: "oklch(0.65 0.12 260)" }}>007</span>}
                </div>
                <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.008 75)" }}>{c.tier} · {c.dna}</p>
              </div>
              <span className="text-xs font-medium flex-shrink-0" style={{ color: "oklch(0.72 0.12 75)" }}>{c.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <SourceBadge source={{ label: "Drinks International", url: "https://thefinestbubble.com/news-and-reviews/the-worlds-most-admired-champagne-brands-2025-drinks-international-report/", date: "mars 2025" }} />
        </div>
      </Card>
    </div>
  );
}

// ─── Section: Portefeuille ────────────────────────────────────────────────────
function Portefeuille() {
  const gammes = [
    {
      name: "Special Cuvée NV",
      tier: "Entrée prestige",
      desc: "Cuvée phare, ~60% Pinot Noir, vieillissement en fûts de chêne, vins de réserve en magnums. Notes brioche, fruits rouges, agrumes.",
      price: "55–78€",
      scores: "DC95 · JS93 · WS93",
      flagship: true,
    },
    {
      name: "La Grande Année",
      tier: "Millésime prestige",
      desc: "Millésime de prestige, uniquement les meilleures années. Assemblage Pinot Noir + Chardonnay. Potentiel de garde 15–20 ans.",
      price: "149–206€",
      scores: "WA96+ · JS95",
      flagship: false,
    },
    {
      name: "La Grande Année Rosé",
      tier: "Millésime prestige rosé",
      desc: "Version rosé de La Grande Année, saignée de Pinot Noir. Rare et très recherché.",
      price: "180–250€",
      scores: "WA95+",
      flagship: false,
    },
    {
      name: "R.D. (Récemment Dégorgé)",
      tier: "Ultra-prestige",
      desc: "Dégorgement tardif après 10–12 ans sur lies. Complexité oxydative unique. Cuvée iconique créée en 1952.",
      price: "350–500€",
      scores: "WA97+",
      flagship: false,
    },
    {
      name: "Vieilles Vignes Françaises",
      tier: "Ultra-prestige / Collector",
      desc: "Blanc de Noirs issu de vignes non greffées pré-phylloxéra. Production ultra-confidentielle (~3 000 btl/an). Menace phylloxera identifiée.",
      price: "400–600€",
      scores: "WA99",
      flagship: false,
      alert: "Risque extinction phylloxera",
    },
    {
      name: "PN AYC18 / TX17",
      tier: "Innovation / Terroir",
      desc: "Gamme Pinot Noir mono-terroir, expression parcellaire. Positionnement connaisseurs, communication wine-geek.",
      price: "80–120€",
      scores: "WA93+",
      flagship: false,
    },
    {
      name: "Special Cuvée 007 Ltd Ed.",
      tier: "Édition limitée",
      desc: "Célébration 45+ ans de partenariat James Bond. Lancée octobre 2025. Packaging collector.",
      price: "75–100€",
      scores: "N/D",
      flagship: false,
    },
  ];

  return (
    <div className="space-y-4">
      <SectionTitle icon={Package} title="Portefeuille Produits" subtitle="Gammes, cuvées iconiques, innovations" />
      <div className="space-y-3">
        {gammes.map((g, i) => (
          <Card key={i} className={g.flagship ? "border-amber-600/40" : ""}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold" style={{ color: "oklch(0.95 0.008 80)", fontFamily: "'Playfair Display', serif" }}>{g.name}</span>
                  {g.flagship && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "oklch(0.72 0.12 75 / 0.20)", color: "oklch(0.72 0.12 75)" }}>★ Phare</span>}
                </div>
                <p className="text-xs mt-0.5" style={{ color: "oklch(0.72 0.12 75 / 0.80)" }}>{g.tier}</p>
              </div>
              <span className="text-sm font-semibold kpi-value flex-shrink-0 ml-2">{g.price}</span>
            </div>
            <p className="text-xs leading-relaxed mb-2" style={{ color: "oklch(0.65 0.008 75)" }}>{g.desc}</p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs" style={{ color: "oklch(0.55 0.008 75)" }}>Notes : {g.scores}</span>
              {g.alert && (
                <span className="text-xs flex items-center gap-1" style={{ color: "oklch(0.60 0.20 25)" }}>
                  <AlertTriangle size={10} /> {g.alert}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
      <div className="text-xs" style={{ color: "oklch(0.50 0.008 75)" }}>
        WA = Wine Advocate · JS = James Suckling · DC = Decanter · WS = Wine Spectator
      </div>
      <SourceBadge source={{ label: "Wine-Searcher / Bollinger.com", url: "https://www.wine-searcher.com/find/bollinger", date: "mars 2026" }} />
    </div>
  );
}

// ─── Section: Prix ────────────────────────────────────────────────────────────
function Prix() {
  const prixData = [
    { maison: "Bollinger", cuvee: "Special Cuvée NV", prix: "55–78€", segment: "Prestige entrée" },
    { maison: "Bollinger", cuvee: "La Grande Année", prix: "149–206€", segment: "Prestige millésime" },
    { maison: "Bollinger", cuvee: "R.D.", prix: "350–500€", segment: "Ultra-prestige" },
    { maison: "Bollinger", cuvee: "VVF", prix: "400–600€", segment: "Collector" },
    { maison: "Krug", cuvee: "Grande Cuvée", prix: "180–220€", segment: "Ultra-prestige" },
    { maison: "Dom Pérignon", cuvee: "Vintage", prix: "180–220€", segment: "Ultra-prestige" },
    { maison: "Pol Roger", cuvee: "Sir W. Churchill", prix: "180–250€", segment: "Prestige millésime" },
    { maison: "Ruinart", cuvee: "Blanc de Blancs", prix: "80–100€", segment: "Prestige entrée" },
    { maison: "Billecart-Salmon", cuvee: "Blanc de Blancs", prix: "90–120€", segment: "Prestige entrée" },
    { maison: "Louis Roederer", cuvee: "Cristal", prix: "250–350€", segment: "Ultra-prestige" },
    { maison: "Laurent-Perrier", cuvee: "Grand Siècle", prix: "120–160€", segment: "Prestige" },
  ];

  const tendances = [
    { label: "Premiumisation", dir: "up" as TrendDir, desc: "Segment prestige cuvée domine à 44,6% du marché en 2024" },
    { label: "Volumes globaux", dir: "down" as TrendDir, desc: "−9,2% en 2024, −2% en 2025 (3e année consécutive)" },
    { label: "Valeur exports", dir: "flat" as TrendDir, desc: "3,68 Mds USD en 2025 malgré la baisse des volumes" },
    { label: "Prix Bollinger SC", dir: "up" as TrendDir, desc: "Hausse modérée, alignée avec inflation et premiumisation" },
  ];

  return (
    <div className="space-y-4">
      <SectionTitle icon={DollarSign} title="Analyse des Prix" subtitle="Fourchettes, tendances, comparatif concurrents" />

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Tendances prix marché</p>
        <div className="space-y-2">
          {tendances.map((t, i) => (
            <div key={i} className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <TrendBadge dir={t.dir} value={t.label} />
              </div>
              <p className="text-xs text-right flex-1" style={{ color: "oklch(0.60 0.010 75)" }}>{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="gold-line mt-3 mb-2" />
        <SourceBadge source={{ label: "DataBridge / Comité Champagne", url: "https://www.databridgemarketresearch.com/reports/global-champagne-market", date: "2024" }} />
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Comparatif prix (bouteille 75cl)</p>
        <div className="space-y-1.5">
          {prixData.map((p, i) => (
            <div key={i} className={`flex items-center gap-2 py-1 border-b last:border-0 ${p.maison === "Bollinger" ? "rounded px-1" : ""}`}
              style={p.maison === "Bollinger" ? { background: "oklch(0.72 0.12 75 / 0.06)", borderColor: "transparent" } : { borderColor: "oklch(0.72 0.12 75 / 0.08)" }}>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium" style={{ color: p.maison === "Bollinger" ? "oklch(0.72 0.12 75)" : "oklch(0.85 0.008 80)" }}>
                  {p.maison === "Bollinger" ? "★ " : ""}{p.maison}
                </span>
                <span className="text-xs ml-1" style={{ color: "oklch(0.55 0.008 75)" }}>· {p.cuvee}</span>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-semibold" style={{ color: p.maison === "Bollinger" ? "oklch(0.72 0.12 75)" : "oklch(0.80 0.008 80)" }}>{p.prix}</span>
                <p className="text-xs" style={{ color: "oklch(0.50 0.008 75)" }}>{p.segment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <SourceBadge source={{ label: "Wine-Searcher", url: "https://www.wine-searcher.com/find/bollinger", date: "mars 2026" }} />
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "oklch(0.72 0.12 75)" }}>Politique promotionnelle</p>
        <p className="text-xs leading-relaxed" style={{ color: "oklch(0.60 0.010 75)" }}>
          Bollinger maintient une politique de prix ferme, sans promotions massives. La rareté (VVF, R.D.) et les éditions limitées (007) soutiennent la valeur perçue. Pas de démarque en grande distribution.
        </p>
        <div className="mt-2 p-2 rounded text-xs" style={{ background: "oklch(0.65 0.15 145 / 0.10)", border: "1px solid oklch(0.65 0.15 145 / 0.20)" }}>
          <span style={{ color: "oklch(0.65 0.15 145)" }}>✓ Avantage concurrentiel :</span>
          <span style={{ color: "oklch(0.70 0.008 75)" }}> Bollinger préserve mieux sa valeur que les marques LVMH soumises à des objectifs de volume.</span>
        </div>
      </Card>
    </div>
  );
}

// ─── Section: Distribution ────────────────────────────────────────────────────
function Distribution() {
  const markets = [
    { rank: 1, pays: "USA", btl: "27,45M", val: "820M€", evol: "+1,9%", dir: "up" as TrendDir, note: "1er marché export, tarifs Trump = risque" },
    { rank: 2, pays: "UK", btl: "22,31M", val: "519M€", evol: "−12,7%", dir: "down" as TrendDir, note: "Royal Warrant, distributeur Mentzendorff" },
    { rank: 3, pays: "Japon", btl: "12,45M", val: "386M€", evol: "−18,6%", dir: "down" as TrendDir, note: "Marché premium, correction post-Covid" },
    { rank: 4, pays: "Allemagne", btl: "9,51M", val: "229M€", evol: "−18,5%", dir: "down" as TrendDir, note: "" },
    { rank: 10, pays: "EAU", btl: "3,45M", val: "100M€", evol: "+21,6%", dir: "up" as TrendDir, note: "Marché en forte croissance" },
  ];

  const channels = [
    { name: "On-Trade (hôtels, restaurants, bars)", share: "~67%", trend: "up" as TrendDir, note: "CAGR +6,94% projeté (Fortune Business Insights)" },
    { name: "Off-Trade (cavistes, e-commerce)", share: "~33%", trend: "up" as TrendDir, note: "E-commerce en croissance, cavistes premium" },
  ];

  return (
    <div className="space-y-4">
      <SectionTitle icon={Globe} title="Distribution" subtitle="On-trade / Off-trade · Géographies clés · Canaux" />

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Top marchés export champagne 2024</p>
        <div className="space-y-2">
          {markets.map((m, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5 border-b last:border-0" style={{ borderColor: "oklch(0.72 0.12 75 / 0.10)" }}>
              <span className="text-xs w-4 flex-shrink-0 font-bold" style={{ color: "oklch(0.72 0.12 75)" }}>#{m.rank}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: "oklch(0.90 0.008 80)" }}>{m.pays}</span>
                  <TrendBadge dir={m.dir} value={m.evol} />
                </div>
                <p className="text-xs" style={{ color: "oklch(0.55 0.008 75)" }}>{m.btl} · {m.val}</p>
                {m.note && <p className="text-xs italic mt-0.5" style={{ color: "oklch(0.60 0.010 75)" }}>{m.note}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <SourceBadge source={{ label: "The Drinks Business", url: "https://www.thedrinksbusiness.com/2025/03/the-top-10-markets-for-champagne-in-2024/", date: "mars 2025" }} />
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Canaux de distribution</p>
        {channels.map((c, i) => (
          <div key={i} className="mb-3 last:mb-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium" style={{ color: "oklch(0.85 0.008 80)" }}>{c.name}</span>
              <span className="text-sm font-bold kpi-value">{c.share}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.20 0.010 65)" }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: c.share, background: "linear-gradient(90deg, oklch(0.72 0.12 75), oklch(0.62 0.14 70))" }} />
            </div>
            <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.008 75)" }}>{c.note}</p>
          </div>
        ))}
        <div className="mt-3">
          <SourceBadge source={{ label: "Fortune Business Insights", url: "https://www.fortunebusinessinsights.com/champagne-market-112162", date: "fév. 2026" }} />
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "oklch(0.72 0.12 75)" }}>Distribution Bollinger — Spécificités</p>
        <div className="space-y-2 text-xs" style={{ color: "oklch(0.65 0.008 75)" }}>
          <p><span style={{ color: "oklch(0.72 0.12 75)" }}>UK :</span> Distributeur exclusif Mentzendorff & Co (Londres). Présence forte on-trade, hôtels 5*, restaurants étoilés.</p>
          <p><span style={{ color: "oklch(0.72 0.12 75)" }}>USA :</span> Distribution premium, cavistes spécialisés, restaurants gastronomiques. Pas de grande distribution.</p>
          <p><span style={{ color: "oklch(0.72 0.12 75)" }}>E-commerce :</span> Vente directe via champagne-bollinger.com et cavistes en ligne premium (Millesima, etc.).</p>
          <p><span style={{ color: "oklch(0.72 0.12 75)" }}>Wine Tourism :</span> Visites Maison à Aÿ, futur hôtel 20 chambres (bicentenaire 2029).</p>
        </div>
      </Card>
    </div>
  );
}

// ─── Section: Part de Voix ────────────────────────────────────────────────────
function PartDeVoix() {
  const rankings = [
    { rank: 1, maison: "Louis Roederer", move: "=", note: "Dominant depuis 2018, 7e titre consécutif" },
    { rank: 2, maison: "Krug", move: "=", note: "Ultra-prestige LVMH, forte couverture presse" },
    { rank: 3, maison: "Bollinger", move: "=", note: "Podium stable, partenariats médiatiques forts" },
    { rank: 4, maison: "Billecart-Salmon", move: "=", note: "" },
    { rank: 5, maison: "Charles Heidsieck", move: "↑2", note: "Montée en puissance" },
    { rank: 6, maison: "Pol Roger", move: "↓1", note: "" },
    { rank: 7, maison: "Ruinart", move: "↑1", note: "Art contemporain, forte visibilité" },
    { rank: 8, maison: "Dom Pérignon", move: "↓2", note: "Recul malgré budget marketing LVMH" },
  ];

  const mediaAssets = [
    { asset: "Partenariat James Bond (007)", impact: "Très élevé", type: "Entertain." },
    { asset: "Partenariat Aston Martin", impact: "Élevé", type: "Luxe auto" },
    { asset: "Royal Warrant Charles III", impact: "Élevé", type: "Institutionnel" },
    { asset: "B Corp certification", impact: "Moyen", type: "ESG/Presse" },
    { asset: "Bicentenaire 2029", impact: "Fort (futur)", type: "Événementiel" },
    { asset: "VVF — menace extinction", impact: "Élevé (risque)", type: "Presse spéc." },
  ];

  return (
    <div className="space-y-4">
      <SectionTitle icon={Megaphone} title="Part de Voix & Médias" subtitle="Classements, presse spécialisée, actifs médiatiques" />

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Most Admired Champagne 2025–2026</p>
        <p className="text-xs mb-3 italic" style={{ color: "oklch(0.55 0.008 75)" }}>
          Drinks International · Jury : sommeliers, MW, journalistes, acheteurs (40 maisons évaluées)
        </p>
        <div className="space-y-1.5">
          {rankings.map((r, i) => (
            <div key={i} className={`flex items-center gap-2 py-1 px-2 rounded ${r.rank === 3 ? "" : ""}`}
              style={r.rank === 3 ? { background: "oklch(0.72 0.12 75 / 0.08)", border: "1px solid oklch(0.72 0.12 75 / 0.20)" } : {}}>
              <span className="text-xs w-5 font-bold flex-shrink-0" style={{ color: r.rank <= 3 ? "oklch(0.72 0.12 75)" : "oklch(0.50 0.008 75)" }}>#{r.rank}</span>
              <span className="text-xs flex-1 font-medium" style={{ color: r.rank === 3 ? "oklch(0.72 0.12 75)" : "oklch(0.85 0.008 80)" }}>{r.maison}</span>
              <span className="text-xs w-6 text-center" style={{ color: r.move.includes("↑") ? "oklch(0.65 0.15 145)" : r.move.includes("↓") ? "oklch(0.60 0.20 25)" : "oklch(0.55 0.008 75)" }}>{r.move}</span>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <SourceBadge source={{ label: "Drinks International / Wine Intelligence", url: "https://wine-intelligence.com/blogs/wine-news-insights-wine-intelligence-trends-data-reports/most-admired-champagne-brands-2026-roederer-krug-and-bollinger-lead-again", date: "mars 2026" }} />
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Actifs médiatiques Bollinger</p>
        <div className="space-y-2">
          {mediaAssets.map((a, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium" style={{ color: "oklch(0.85 0.008 80)" }}>{a.asset}</span>
              </div>
              <span className="text-xs px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: "oklch(0.20 0.010 65)", color: "oklch(0.65 0.008 75)" }}>{a.type}</span>
              <span className="text-xs font-medium flex-shrink-0 w-20 text-right"
                style={{ color: a.impact.includes("Très") || a.impact.includes("Fort") ? "oklch(0.72 0.12 75)" : a.impact.includes("risque") ? "oklch(0.60 0.20 25)" : "oklch(0.65 0.15 145)" }}>
                {a.impact}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "oklch(0.72 0.12 75)" }}>Données N/D</p>
        <p className="text-xs mb-1" style={{ color: "oklch(0.60 0.010 75)" }}>
          <span style={{ color: "oklch(0.90 0.008 80)" }}>Part de voix médias (%) :</span> <NDTag reason="Données propriétaires Meltwater/Cision non accessibles publiquement." method="Abonnement Meltwater ou Cision pour suivi mentions presse + SOV mensuel." />
        </p>
        <p className="text-xs" style={{ color: "oklch(0.60 0.010 75)" }}>
          <span style={{ color: "oklch(0.90 0.008 80)" }}>Budget marketing Bollinger :</span> <NDTag reason="Maison indépendante non cotée, pas de publication de comptes détaillés." method="Demande directe ou estimation via Kantar AdIntel (dépenses publicitaires mesurées)." />
        </p>
      </Card>
    </div>
  );
}

// ─── Section: Social & Digital ────────────────────────────────────────────────
function SocialDigital() {
  const socialData = [
    { platform: "Instagram", maison: "Bollinger", followers: "252K", posts: "1 600+", note: "Compte @champagne_bollinger" },
    { platform: "Instagram", maison: "Dom Pérignon", followers: "799K", posts: "1 621", note: "Compte @domperignonofficial" },
    { platform: "Instagram", maison: "Krug", followers: "N/D", posts: "N/D", note: "Compte officiel non identifié" },
    { platform: "Instagram", maison: "Ruinart", followers: "N/D", posts: "N/D", note: "À vérifier" },
    { platform: "Instagram", maison: "Pol Roger", followers: "N/D", posts: "N/D", note: "À vérifier" },
  ];

  const campaigns = [
    { name: "Special Cuvée 007 Launch", date: "Oct. 2025", type: "Campagne intégrée", desc: "Photographie dramatique + animation bold. Partenariat Datum Creative Partners." },
    { name: "Aston Martin Partnership", date: "Sept. 2025", type: "Partenariat luxe", desc: "Activation globale, expériences exclusives, cross-promotion." },
    { name: "Royal Warrant Renewal", date: "Déc. 2024", type: "PR institutionnel", desc: "Annonce renouvellement Royal Warrant Charles III, 140 ans." },
    { name: "Bicentenary 2029 Teaser", date: "2024–2025", type: "Campagne long terme", desc: "Construction hôtel + centre touristique Aÿ, communication progressive." },
  ];

  return (
    <div className="space-y-4">
      <SectionTitle icon={Smartphone} title="Social & Digital" subtitle="Croissance, engagement, campagnes clés" />

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Instagram — Comparatif abonnés</p>
        <div className="space-y-2">
          {socialData.map((s, i) => (
            <div key={i} className={`flex items-center gap-2 py-1.5 border-b last:border-0 ${s.maison === "Bollinger" ? "rounded px-1" : ""}`}
              style={s.maison === "Bollinger" ? { background: "oklch(0.72 0.12 75 / 0.06)", borderColor: "transparent" } : { borderColor: "oklch(0.72 0.12 75 / 0.08)" }}>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium" style={{ color: s.maison === "Bollinger" ? "oklch(0.72 0.12 75)" : "oklch(0.85 0.008 80)" }}>
                  {s.maison === "Bollinger" ? "★ " : ""}{s.maison}
                </span>
                <p className="text-xs" style={{ color: "oklch(0.50 0.008 75)" }}>{s.note}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold kpi-value">{s.followers}</span>
                <p className="text-xs" style={{ color: "oklch(0.50 0.008 75)" }}>{s.posts} posts</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 p-2 rounded text-xs" style={{ background: "oklch(0.60 0.20 25 / 0.10)", border: "1px solid oklch(0.60 0.20 25 / 0.20)" }}>
          <span style={{ color: "oklch(0.60 0.20 25)" }}>⚠ Écart notable :</span>
          <span style={{ color: "oklch(0.65 0.008 75)" }}> Dom Pérignon (799K) dépasse Bollinger (252K) de 3x sur Instagram. Opportunité de croissance digitale.</span>
        </div>
        <div className="mt-2">
          <SourceBadge source={{ label: "Instagram", url: "https://www.instagram.com/champagne_bollinger/", date: "mars 2026" }} />
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Campagnes digitales notables</p>
        <div className="space-y-3">
          {campaigns.map((c, i) => (
            <div key={i} className="pb-3 border-b last:border-0 last:pb-0" style={{ borderColor: "oklch(0.72 0.12 75 / 0.10)" }}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-semibold" style={{ color: "oklch(0.90 0.008 80)", fontFamily: "'Playfair Display', serif" }}>{c.name}</span>
                <span className="text-xs flex-shrink-0" style={{ color: "oklch(0.72 0.12 75)" }}>{c.date}</span>
              </div>
              <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "oklch(0.20 0.010 65)", color: "oklch(0.60 0.008 75)" }}>{c.type}</span>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "oklch(0.60 0.010 75)" }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "oklch(0.72 0.12 75)" }}>Données N/D</p>
        <div className="space-y-2 text-xs" style={{ color: "oklch(0.60 0.010 75)" }}>
          <p><span style={{ color: "oklch(0.90 0.008 80)" }}>Taux d'engagement Instagram :</span> <NDTag reason="Données non publiques, nécessite outil tiers." method="Utiliser Phlanx.com ou Sprout Social pour calculer le taux d'engagement moyen." /></p>
          <p><span style={{ color: "oklch(0.90 0.008 80)" }}>Followers Krug / Ruinart / Pol Roger :</span> <NDTag reason="Comptes officiels non identifiés avec certitude lors de la recherche." method="Vérification manuelle sur Instagram + outil SimilarWeb pour trafic web." /></p>
        </div>
      </Card>
    </div>
  );
}

// ─── Section: Signaux Faibles ─────────────────────────────────────────────────
function SignauxFaibles() {
  const signals = [
    {
      level: "critique",
      icon: AlertTriangle,
      title: "Tarifs douaniers US (Trump)",
      desc: "Exports vins français −39% en Q4 2025. USA = 1er marché export champagne (820M€ en 2024). Tarifs 10% en vigueur depuis avril 2025.",
      action: "Diversifier vers EAU (+21,6%), Canada, Corée du Sud. Réviser pricing US.",
      source: { label: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2026-02-06/french-champagne-and-perfume-feel-the-pain-of-trump-tariffs", date: "fév. 2026" }
    },
    {
      level: "critique",
      icon: AlertTriangle,
      title: "Phylloxera — Vieilles Vignes Françaises",
      desc: "Les vignes non greffées de Bollinger (VVF) sont menacées par le phylloxera. Production ultra-confidentielle (~3 000 btl/an) pourrait disparaître.",
      action: "Accélérer recherche agronomique. Communiquer sur la rareté comme actif de valeur.",
      source: { label: "Champagne Club", url: "https://www.champagneclub.com/champagnes-rare-jewel-at-risk-of-extinction/", date: "mars 2024" }
    },
    {
      level: "modere",
      icon: Shield,
      title: "Risque réputation — Affaire Folc",
      desc: "Bollinger (via Mentzendorff) a envoyé un cease & desist à la marque anglaise Folc (oct. 2025) pour usage du terme 'Bollie'. Couverture négative dans la presse UK ('bullying').",
      action: "Revoir stratégie de protection de marque pour éviter image de 'bully'. Approche plus nuancée.",
      source: { label: "The Times", url: "https://drinksint.com/news/fullstory.php/aid/12032/Bollinger_threatens_English_wine_brand_over__Bollie__ad.html", date: "oct. 2025" }
    },
    {
      level: "modere",
      icon: Activity,
      title: "Changement climatique — Champagne",
      desc: "Gel printanier précoce, millésimes irréguliers. Budburst plus précoce = vulnérabilité accrue. Impact sur qualité et rendements.",
      action: "Investir en viticulture adaptative. Valoriser les millésimes atypiques comme signature.",
      source: { label: "Vinetur", url: "https://www.vinetur.com/en/2025070889521/climate-change-forces-global-wine-industry-to-adapt-as-traditional-regions-face-new-risks-and-emerging-areas-gain-prominence.html", date: "juil. 2025" }
    },
    {
      level: "faible",
      icon: TrendingDown,
      title: "Déclin structurel marché France",
      desc: "Marché domestique : −63M bouteilles en 13 ans (181M en 2011 → 118M en 2024). Tendance de fond liée à la modération alcool.",
      action: "Réduire dépendance au marché FR. Renforcer présence dans marchés émergents.",
      source: { label: "The Drinks Business", url: "https://www.thedrinksbusiness.com/2025/03/the-top-10-markets-for-champagne-in-2024/", date: "mars 2025" }
    },
    {
      level: "faible",
      icon: Zap,
      title: "Génération Z & modération alcool",
      desc: "Consommateurs jeunes : shift vers 'conscientious consumption' (Forbes, août 2024). Marché no/low alcohol en croissance.",
      action: "Explorer positionnement 'occasion spéciale' pour justifier la valeur. Surveiller no-low.",
      source: { label: "Forbes", url: "https://www.forbes.com/sites/joemicallef/2024/08/13/how-young-consumers-are-changing-the-marketing-of-luxury-beverages/", date: "août 2024" }
    },
  ];

  const levelColors: Record<string, string> = {
    critique: "oklch(0.60 0.20 25)",
    modere: "oklch(0.72 0.12 75)",
    faible: "oklch(0.55 0.10 260)",
  };
  const levelLabels: Record<string, string> = {
    critique: "Critique",
    modere: "Modéré",
    faible: "Faible",
  };

  return (
    <div className="space-y-4">
      <SectionTitle icon={Radio} title="Signaux Faibles & Risques" subtitle="Réglementaire, supply, réputation, tendances" />
      <div className="space-y-3">
        {signals.map((s, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-7 h-7 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${levelColors[s.level]}22` }}>
                  <s.icon size={14} style={{ color: levelColors[s.level] }} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold" style={{ color: "oklch(0.95 0.008 80)", fontFamily: "'Playfair Display', serif" }}>{s.title}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{ background: `${levelColors[s.level]}22`, color: levelColors[s.level] }}>
                    {levelLabels[s.level]}
                  </span>
                </div>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "oklch(0.65 0.008 75)" }}>{s.desc}</p>
                <div className="flex items-start gap-1 mb-2">
                  <span className="text-xs font-medium flex-shrink-0" style={{ color: "oklch(0.65 0.15 145)" }}>→ Action :</span>
                  <p className="text-xs" style={{ color: "oklch(0.65 0.15 145 / 0.85)" }}>{s.action}</p>
                </div>
                <SourceBadge source={s.source} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Recommandations ─────────────────────────────────────────────────
function Recommandations() {
  const recs = [
    {
      priority: 1,
      impact: "Très élevé",
      effort: "Élevé",
      impactColor: "oklch(0.65 0.15 145)",
      title: "Diversifier les marchés export face aux tarifs US",
      desc: "Accélérer le développement des marchés EAU (+21,6% en 2024), Canada, Corée du Sud et Singapour pour compenser la pression tarifaire sur les USA. Adapter le pricing et les partenariats distributeurs.",
      kpi: "Part des marchés hors USA/UK > 40% d'ici 2027",
      horizon: "Court terme (6–12 mois)",
    },
    {
      priority: 2,
      impact: "Très élevé",
      effort: "Moyen",
      impactColor: "oklch(0.65 0.15 145)",
      title: "Amplifier la présence digitale — réduire l'écart avec Dom Pérignon",
      desc: "Bollinger (252K Instagram) vs Dom Pérignon (799K) : écart de 3x. Investir dans une stratégie de contenu premium, collaborations avec créateurs de contenu vin/luxe, et campagnes Reels/Stories autour des partenariats 007 et Aston Martin.",
      kpi: "Atteindre 400K followers Instagram d'ici fin 2026",
      horizon: "Court terme (3–9 mois)",
    },
    {
      priority: 3,
      impact: "Élevé",
      effort: "Moyen",
      impactColor: "oklch(0.72 0.12 75)",
      title: "Capitaliser sur le Bicentenaire 2029 — stratégie événementielle",
      desc: "Lancer dès 2026 une communication progressive autour du bicentenaire (1829–2029). Hôtel 20 chambres à Aÿ = levier wine tourism premium. Créer des éditions limitées annuelles 'Countdown to 200'.",
      kpi: "Lancement campagne bicentenaire Q3 2026, 3 éditions limitées d'ici 2029",
      horizon: "Moyen terme (12–36 mois)",
    },
    {
      priority: 4,
      impact: "Élevé",
      effort: "Faible",
      impactColor: "oklch(0.72 0.12 75)",
      title: "Protéger et valoriser les Vieilles Vignes Françaises",
      desc: "Face à la menace phylloxera, investir dans la recherche agronomique et communiquer activement sur la rareté comme actif de valeur. Documenter l'histoire des parcelles pour renforcer le storytelling.",
      kpi: "Programme de préservation VVF documenté et communiqué d'ici 2025",
      horizon: "Urgent (0–6 mois)",
    },
    {
      priority: 5,
      impact: "Moyen",
      effort: "Faible",
      impactColor: "oklch(0.55 0.10 260)",
      title: "Revoir la stratégie de protection de marque (post-affaire Folc)",
      desc: "L'affaire Folc a généré une couverture négative ('bullying') dans la presse UK. Adopter une approche plus nuancée : dialogue avant action légale, communication proactive sur la valeur de la marque Bollinger.",
      kpi: "Zéro couverture négative 'bullying' dans les 12 prochains mois",
      horizon: "Court terme (1–3 mois)",
    },
  ];

  const impactEffortMatrix = [
    { label: "Impact Très élevé / Effort Élevé", recs: [1], color: "oklch(0.65 0.15 145)" },
    { label: "Impact Très élevé / Effort Moyen", recs: [2], color: "oklch(0.65 0.15 145)" },
    { label: "Impact Élevé / Effort Moyen", recs: [3], color: "oklch(0.72 0.12 75)" },
    { label: "Impact Élevé / Effort Faible", recs: [4], color: "oklch(0.72 0.12 75)" },
    { label: "Impact Moyen / Effort Faible", recs: [5], color: "oklch(0.55 0.10 260)" },
  ];

  return (
    <div className="space-y-4">
      <SectionTitle icon={Lightbulb} title="Recommandations Stratégiques" subtitle="5 actions priorisées · Impact / Effort" />

      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Matrice Impact / Effort</p>
        <div className="space-y-1.5">
          {impactEffortMatrix.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: `${m.color}22`, color: m.color }}>
                {m.recs[0]}
              </div>
              <span className="text-xs" style={{ color: "oklch(0.65 0.008 75)" }}>{m.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-3">
        {recs.map((r, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                style={{ background: "oklch(0.72 0.12 75 / 0.15)", color: "oklch(0.72 0.12 75)", fontFamily: "'Playfair Display', serif" }}>
                {r.priority}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                  <p className="text-sm font-semibold" style={{ color: "oklch(0.95 0.008 80)", fontFamily: "'Playfair Display', serif" }}>{r.title}</p>
                </div>
                <div className="flex gap-2 mb-2 flex-wrap">
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${r.impactColor}22`, color: r.impactColor }}>
                    Impact : {r.impact}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "oklch(0.20 0.010 65)", color: "oklch(0.60 0.008 75)" }}>
                    Effort : {r.effort}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "oklch(0.20 0.010 65)", color: "oklch(0.55 0.10 260)" }}>
                    {r.horizon}
                  </span>
                </div>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "oklch(0.65 0.008 75)" }}>{r.desc}</p>
                <div className="flex items-start gap-1">
                  <span className="text-xs font-medium flex-shrink-0" style={{ color: "oklch(0.72 0.12 75)" }}>KPI :</span>
                  <p className="text-xs" style={{ color: "oklch(0.72 0.12 75 / 0.80)" }}>{r.kpi}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Sources Log ─────────────────────────────────────────────────────
function SourcesLog() {
  const sources = [
    { id: "S1", label: "Comité Champagne — Expéditions 2025", url: "https://thefinestbubble.com/news-and-reviews/champagne-shipments-fall-again-for-third-successive-year-down-2-in-2025/", date: "jan. 2026", type: "Marché" },
    { id: "S2", label: "Drinks International — Most Admired 2026", url: "https://wine-intelligence.com/blogs/wine-news-insights-wine-intelligence-trends-data-reports/most-admired-champagne-brands-2026-roederer-krug-and-bollinger-lead-again", date: "mars 2026", type: "Classement" },
    { id: "S3", label: "The Finest Bubble — Most Admired 2025", url: "https://thefinestbubble.com/news-and-reviews/the-worlds-most-admired-champagne-brands-2025-drinks-international-report/", date: "mars 2025", type: "Classement" },
    { id: "S4", label: "Forbes — Bollinger 2024 performance", url: "https://www.forbes.com/sites/johnkell/2025/02/14/how-bollinger-is-finding-ways-to-celebrate-as-champagne-sales-soften/", date: "fév. 2025", type: "Presse" },
    { id: "S5", label: "The Drinks Business — Top 10 marchés 2024", url: "https://www.thedrinksbusiness.com/2025/03/the-top-10-markets-for-champagne-in-2024/", date: "mars 2025", type: "Marché" },
    { id: "S6", label: "Aston Martin — Partenariat Bollinger", url: "https://www.astonmartin.com/en-us/our-world/news/2025/9/29/two-icons-unite-aston-martin-and-champagne-bollinger-announce-prestigious-new-global-partnership", date: "sept. 2025", type: "Partenariat" },
    { id: "S7", label: "Bloomberg — Tarifs Trump, vins français", url: "https://www.bloomberg.com/news/articles/2026-02-06/french-champagne-and-perfume-feel-the-pain-of-trump-tariffs", date: "fév. 2026", type: "Risque" },
    { id: "S8", label: "Drinks International — Royal Warrant renouvelé", url: "https://drinksint.com/news/fullstory.php/aid/11530/Bollinger_renews_Royal_Warrant.html", date: "déc. 2024", type: "Institutionnel" },
    { id: "S9", label: "Bollinger.com — B Corp certification", url: "https://www.champagne-bollinger.com/en/bcorp/", date: "sept. 2023", type: "ESG" },
    { id: "S10", label: "Champagne Club — VVF menace extinction", url: "https://www.champagneclub.com/champagnes-rare-jewel-at-risk-of-extinction/", date: "mars 2024", type: "Risque" },
    { id: "S11", label: "Wine-Searcher — Prix Bollinger", url: "https://www.wine-searcher.com/find/bollinger", date: "mars 2026", type: "Prix" },
    { id: "S12", label: "PR Newswire — Special Cuvée 007 Ltd Ed.", url: "https://www.prnewswire.com/news-releases/champagne-bollinger-to-launch-a-new-special-cuvee-007-limited-edition-celebrating-over-45-years-as-the-official-champagne-of-james-bond-302573009.html", date: "oct. 2025", type: "Produit" },
    { id: "S13", label: "The Times — Affaire Folc / Bollinger", url: "https://drinksint.com/news/fullstory.php/aid/12032/Bollinger_threatens_English_wine_brand_over__Bollie__ad.html", date: "oct. 2025", type: "Réputation" },
    { id: "S14", label: "DataBridge — Prestige Cuvée segment 44,6%", url: "https://www.databridgemarketresearch.com/reports/global-champagne-market", date: "2024", type: "Marché" },
    { id: "S15", label: "Fortune Business Insights — On-trade CAGR", url: "https://www.fortunebusinessinsights.com/champagne-market-112162", date: "fév. 2026", type: "Marché" },
    { id: "S16", label: "Vinetur — Most Admired 2026 (détail)", url: "https://www.vinetur.com/en/2026031097315/louis-roederer-krug-and-bollinger-secure-top-spots-in-2026-most-admired-champagne-brands-ranking.html", date: "mars 2026", type: "Classement" },
    { id: "S17", label: "Instagram — @champagne_bollinger (252K)", url: "https://www.instagram.com/champagne_bollinger/", date: "mars 2026", type: "Digital" },
    { id: "S18", label: "Instagram — @domperignonofficial (799K)", url: "https://www.instagram.com/domperignonofficial/", date: "mars 2026", type: "Digital" },
  ];

  const typeColors: Record<string, string> = {
    Marché: "oklch(0.55 0.10 260)",
    Classement: "oklch(0.72 0.12 75)",
    Presse: "oklch(0.65 0.15 145)",
    Partenariat: "oklch(0.60 0.12 200)",
    Risque: "oklch(0.60 0.20 25)",
    Institutionnel: "oklch(0.65 0.10 280)",
    ESG: "oklch(0.65 0.15 145)",
    Prix: "oklch(0.72 0.12 75)",
    Produit: "oklch(0.60 0.12 200)",
    Réputation: "oklch(0.60 0.20 25)",
    Digital: "oklch(0.55 0.10 260)",
  };

  return (
    <div className="space-y-4">
      <SectionTitle icon={BarChart2} title="Log des Sources" subtitle="18 sources vérifiées · Liens directs · Dates de publication" />
      <Card>
        <div className="space-y-2">
          {sources.map((s, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5 border-b last:border-0" style={{ borderColor: "oklch(0.72 0.12 75 / 0.08)" }}>
              <span className="text-xs font-bold flex-shrink-0 w-7" style={{ color: "oklch(0.72 0.12 75 / 0.60)" }}>{s.id}</span>
              <div className="flex-1 min-w-0">
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs hover:opacity-80 transition-opacity flex items-start gap-1"
                  style={{ color: "oklch(0.80 0.008 80)" }}>
                  <span className="flex-1">{s.label}</span>
                  <ExternalLink size={9} className="flex-shrink-0 mt-0.5" style={{ color: "oklch(0.72 0.12 75 / 0.60)" }} />
                </a>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs px-1 py-0.5 rounded"
                    style={{ background: `${typeColors[s.type] || "oklch(0.55 0.05 75)"}22`, color: typeColors[s.type] || "oklch(0.55 0.05 75)", fontSize: "10px" }}>
                    {s.type}
                  </span>
                  <span className="text-xs" style={{ color: "oklch(0.45 0.008 75)" }}>{s.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "snapshot", label: "Snapshot", icon: LayoutDashboard },
  { id: "position", label: "Position", icon: Star },
  { id: "portfolio", label: "Portfolio", icon: Package },
  { id: "prix", label: "Prix", icon: DollarSign },
  { id: "distrib", label: "Distrib.", icon: Globe },
  { id: "media", label: "Médias", icon: Megaphone },
  { id: "digital", label: "Digital", icon: Smartphone },
  { id: "risques", label: "Risques", icon: Shield },
  { id: "reco", label: "Reco.", icon: Lightbulb },
  { id: "sources", label: "Sources", icon: BarChart2 },
];

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ activeSection, heroUrl }: { activeSection: string; heroUrl: string }) {
  const active = NAV_ITEMS.find(n => n.id === activeSection);
  return (
    <div className="relative overflow-hidden" style={{ height: activeSection === "snapshot" ? "180px" : "80px" }}>
      {activeSection === "snapshot" && (
        <img src={heroUrl} alt="Bollinger" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0" style={{
        background: activeSection === "snapshot"
          ? "linear-gradient(to bottom, oklch(0.10 0.012 65 / 0.3) 0%, oklch(0.10 0.012 65 / 0.85) 100%)"
          : "oklch(0.12 0.010 65)"
      }} />
      <div className="relative z-10 h-full flex flex-col justify-end px-4 pb-4">
        {activeSection === "snapshot" ? (
          <>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 rounded-full" style={{ background: "oklch(0.72 0.12 75)" }} />
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
                Competitive Intelligence
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "oklch(0.97 0.005 80)", lineHeight: 1.2 }}>
              Champagne<br />
              <span className="text-gold-gradient">Bollinger</span>
            </h1>
            <p className="text-xs mt-1" style={{ color: "oklch(0.70 0.008 75)" }}>
              Dashboard CI · Mars 2026 · 18 sources
            </p>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-0.5 h-6 rounded-full" style={{ background: "oklch(0.72 0.12 75)" }} />
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>Bollinger CI</p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600, color: "oklch(0.95 0.008 80)" }}>
                {active?.label}
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────
function BottomNav({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const idx = NAV_ITEMS.findIndex(n => n.id === active);
    if (scrollRef.current && idx >= 0) {
      const el = scrollRef.current.children[idx] as HTMLElement;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  return (
    <div className="bottom-nav fixed bottom-0 left-0 right-0 z-50">
      <div ref={scrollRef} className="flex overflow-x-auto gap-0 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="flex flex-col items-center gap-1 px-3 py-2.5 flex-shrink-0 transition-all duration-200 relative"
              style={{ minWidth: "60px" }}>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ background: "oklch(0.72 0.12 75)" }} />
              )}
              <item.icon size={16} style={{ color: isActive ? "oklch(0.72 0.12 75)" : "oklch(0.50 0.008 75)" }} />
              <span className="text-xs font-medium" style={{
                color: isActive ? "oklch(0.72 0.12 75)" : "oklch(0.45 0.008 75)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.02em"
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Home Component ──────────────────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState("snapshot");
  const contentRef = useRef<HTMLDivElement>(null);

  const HERO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032620985/kLQsdpqWbkyuVgHJ6bT7Wg/bollinger-hero-RRuA5yNB5k8o3Z66uCQtXq.webp";

  const handleSelect = (id: string) => {
    setActiveSection(id);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "snapshot": return <ExecutiveSnapshot />;
      case "position": return <Positionnement />;
      case "portfolio": return <Portefeuille />;
      case "prix": return <Prix />;
      case "distrib": return <Distribution />;
      case "media": return <PartDeVoix />;
      case "digital": return <SocialDigital />;
      case "risques": return <SignauxFaibles />;
      case "reco": return <Recommandations />;
      case "sources": return <SourcesLog />;
      default: return <ExecutiveSnapshot />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.10 0.012 65)", maxWidth: "480px", margin: "0 auto" }}>
      <Header activeSection={activeSection} heroUrl={HERO_URL} />

      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto px-4 pt-4 pb-24"
        style={{ background: "oklch(0.10 0.012 65)" }}>
        {renderSection()}
      </div>

      <BottomNav active={activeSection} onSelect={handleSelect} />
    </div>
  );
}
