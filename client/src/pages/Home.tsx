/*
 * BOLLINGER CI DASHBOARD — Lead Magnet Version
 * Design: Art Déco Prestige · Noir + Or Champagne
 * Responsive: Sidebar desktop (≥768px) + Bottom nav mobile (<768px)
 * Access: Freemium (sections 1-2 libres) / Full (mot de passe "full-access")
 */

import { useState, useEffect, useRef, useCallback } from "react";
import {
  TrendingUp, TrendingDown, Minus, ExternalLink, AlertTriangle,
  Star, BarChart2, Globe, Megaphone, Smartphone,
  Zap, Target, ChevronRight, Info, Award, MapPin, Package,
  DollarSign, Radio, Activity, Shield, Lightbulb, LayoutDashboard,
  Search, ArrowUpDown, Lock, Unlock, LogOut
} from "lucide-react";
import {
  MarketVolumeChart, ExportMarketsChart, PriceComparisonChart,
  AdmiredRankingChart, SocialFollowersChart, ChannelPieChart,
  SegmentPieChart, RiskMatrixChart, RecoChart, PortfolioScatterChart
} from "@/components/BollingerCharts";
import {
  exportMarketsData, priceComparisonData, portfolioData,
  recoData, socialData, admiredRankingData
} from "@/lib/bollingerData";
import { LockedSection, PasswordModal } from "@/components/LockedSection";
import { useAccess } from "@/contexts/AccessContext";

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
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1.5 rounded" style={{ background: "oklch(0.72 0.12 75 / 0.15)" }}>
          <Icon size={15} style={{ color: "oklch(0.72 0.12 75)" }} />
        </div>
        <h2 className="section-header">{title}</h2>
      </div>
      {subtitle && <p className="text-xs ml-9" style={{ color: "oklch(0.60 0.010 75)" }}>{subtitle}</p>}
      <div className="gold-line mt-3" />
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`b-card p-4 ${className}`}>{children}</div>;
}

function ChartCard({ title, subtitle, children, source }: {
  title: string; subtitle?: string; children: React.ReactNode; source?: Source;
}) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "oklch(0.72 0.12 75)" }}>{title}</p>
      {subtitle && <p className="text-xs mb-3" style={{ color: "oklch(0.50 0.008 75)" }}>{subtitle}</p>}
      {children}
      {source && <div className="mt-3"><SourceBadge source={source} /></div>}
    </Card>
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

// ─── Animated KPI Counter ─────────────────────────────────────────────────────
function AnimatedKPI({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{display.toLocaleString("fr-FR")}{suffix}</span>;
}

function KPICard({ label, value, suffix = "", prefix = "", trend, trendVal, note, color = "oklch(0.72 0.12 75)" }: {
  label: string; value: number; suffix?: string; prefix?: string;
  trend?: TrendDir; trendVal?: string; note?: string; color?: string;
}) {
  return (
    <Card className="flex flex-col gap-1">
      <p className="text-xs uppercase tracking-widest" style={{ color: "oklch(0.50 0.008 75)" }}>{label}</p>
      <p className="text-2xl font-bold" style={{ color, fontFamily: "'Playfair Display', serif" }}>
        <AnimatedKPI value={value} suffix={suffix} prefix={prefix} />
      </p>
      {trend && trendVal && <TrendBadge dir={trend} value={trendVal} />}
      {note && <p className="text-xs mt-1" style={{ color: "oklch(0.50 0.008 75)" }}>{note}</p>}
    </Card>
  );
}

// ─── FREE SECTION: Executive Snapshot ────────────────────────────────────────
function ExecutiveSnapshot() {
  const kpis = [
    { label: "Expéditions 2025", value: 266, suffix: "M btl", trend: "down" as TrendDir, trendVal: "−2% vs 2024", note: "3e année consécutive de baisse", color: "oklch(0.60 0.20 25)" },
    { label: "Rang Most Admired", value: 3, suffix: "e", trend: "flat" as TrendDir, trendVal: "Stable 2025–2026", note: "Derrière Roederer & Krug", color: "oklch(0.72 0.12 75)" },
    { label: "Royal Warrant", value: 140, suffix: " ans", trend: "up" as TrendDir, trendVal: "Renouvelé déc. 2024", note: "Charles III", color: "oklch(0.65 0.15 145)" },
    { label: "Score B Corp", value: 83, suffix: ".9", trend: "up" as TrendDir, trendVal: "Certifié sept. 2023", note: "Engagement ESG", color: "oklch(0.65 0.15 145)" },
    { label: "Partenariat 007", value: 45, suffix: "+ ans", trend: "up" as TrendDir, trendVal: "Cuvée Ltd Oct. 2025", note: "Depuis 1979", color: "oklch(0.72 0.12 75)" },
    { label: "Exports USA 2024", value: 820, suffix: "M€", trend: "down" as TrendDir, trendVal: "Tarifs Trump −39%", note: "1er marché export", color: "oklch(0.60 0.20 25)" },
  ];

  const insights = [
    { icon: TrendingDown, color: "oklch(0.60 0.20 25)", title: "Marché en contraction structurelle", body: "266M bouteilles expédiées en 2025 (−2%), 3e année consécutive de baisse. Bollinger résiste mieux : −3% volume 2024 mais valeur stable.", impact: "Pression sur volumes, opportunité de premiumisation.", source: { label: "Comité Champagne", url: "https://thefinestbubble.com/news-and-reviews/champagne-shipments-fall-again-for-third-successive-year-down-2-in-2025/", date: "jan. 2026" } },
    { icon: Award, color: "oklch(0.72 0.12 75)", title: "#3 Most Admired — stable au podium", body: "Bollinger conserve sa 3e place (Drinks International 2025 & 2026) derrière Roederer et Krug. Podium inchangé depuis 3 ans.", impact: "Légitimité prestige confirmée. Écart avec Roederer à combler.", source: { label: "Drinks International", url: "https://wine-intelligence.com/blogs/wine-news-insights-wine-intelligence-trends-data-reports/most-admired-champagne-brands-2026-roederer-krug-and-bollinger-lead-again", date: "mars 2026" } },
    { icon: Shield, color: "oklch(0.65 0.15 145)", title: "Royal Warrant renouvelé — 140 ans", body: "Renouvellement du Royal Warrant de Sa Majesté Charles III en décembre 2024. 140 ans de fourniture continue à la Maison Royale.", impact: "Actif de réputation unique, différenciant fort sur le marché UK.", source: { label: "Drinks International", url: "https://drinksint.com/news/fullstory.php/aid/11530/Bollinger_renews_Royal_Warrant.html", date: "déc. 2024" } },
    { icon: Zap, color: "oklch(0.72 0.12 75)", title: "Double partenariat iconique 2025", body: "James Bond (45+ ans, Special Cuvée 007 oct. 2025) + Aston Martin (partenariat mondial annoncé sept. 2025). Deux icônes britanniques réunies.", impact: "Amplification de la notoriété masculine premium, potentiel cross-sell.", source: { label: "Aston Martin", url: "https://www.astonmartin.com/en-us/our-world/news/2025/9/29/two-icons-unite-aston-martin-and-champagne-bollinger-announce-prestigious-new-global-partnership", date: "sept. 2025" } },
    { icon: AlertTriangle, color: "oklch(0.60 0.20 25)", title: "Tarifs US : risque majeur sur 1er marché export", body: "Les USA (27,5M btl, 820M€ en 2024) subissent les tarifs Trump. Exports vins français −39% en Q4 2025. Menace directe sur le 1er marché export champagne.", impact: "Révision urgente de la stratégie de pricing et distribution US.", source: { label: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2026-02-06/french-champagne-and-perfume-feel-the-pain-of-trump-tariffs", date: "fév. 2026" } },
    { icon: Activity, color: "oklch(0.65 0.15 145)", title: "B Corp + Bicentenaire 2029 : horizon stratégique", body: "Certification B Corp (sept. 2023, score 83,9). Hôtel 20 chambres + centre touristique à Aÿ en construction pour le bicentenaire 2029.", impact: "Différenciation ESG et wine tourism comme levier de valeur long terme.", source: { label: "Bollinger", url: "https://www.champagne-bollinger.com/en/bcorp/", date: "sept. 2023" } },
  ];

  return (
    <div className="space-y-5">
      <SectionTitle icon={LayoutDashboard} title="Executive Snapshot" subtitle="6 KPIs clés · Insights actionnables · Sources vérifiées" />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((k, i) => <KPICard key={i} {...k} />)}
      </div>
      <ChartCard title="Expéditions champagne mondiales 2019–2025"
        subtitle="Millions de bouteilles · Données Comité Champagne"
        source={{ label: "Comité Champagne", url: "https://thefinestbubble.com/news-and-reviews/champagne-shipments-fall-again-for-third-successive-year-down-2-in-2025/", date: "jan. 2026" }}>
        <MarketVolumeChart />
      </ChartCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {insights.map((ins, i) => (
          <Card key={i}>
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: `color-mix(in oklch, ${ins.color} 15%, transparent)` }}>
                  <ins.icon size={15} style={{ color: ins.color }} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm mb-1" style={{ color: "oklch(0.95 0.008 80)", fontFamily: "'Playfair Display', serif" }}>{ins.title}</p>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "oklch(0.70 0.008 75)" }}>{ins.body}</p>
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
    </div>
  );
}

// ─── FREE SECTION: Positionnement ────────────────────────────────────────────
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

  const [filter, setFilter] = useState<"all" | "indie" | "group">("all");
  const filtered = competitors.filter(c =>
    filter === "all" ? true : filter === "indie" ? c.indie : !c.indie
  );

  return (
    <div className="space-y-5">
      <SectionTitle icon={Star} title="Positionnement & Proposition de Valeur" subtitle="Bollinger vs competitive set · 9 maisons" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>ADN Bollinger — Différenciants clés</p>
          {[
            { label: "Indépendance familiale", value: "Depuis 1829, Aÿ (Marne)" },
            { label: "Pinot Noir dominant", value: "~60% dans Special Cuvée" },
            { label: "Vinification fûts chêne", value: "Tradition rare en Champagne" },
            { label: "Vignoble propre", value: "~180 ha (60% GC + PC)" },
            { label: "Vieilles Vignes Françaises", value: "Vignes non greffées, ultra-rare" },
            { label: "B Corp certifié", value: "Score 83,9 (sept. 2023)" },
            { label: "Royal Warrant", value: "140 ans, Charles III (2024)" },
            { label: "James Bond", value: "Official Champagne 007 depuis 1979" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-start gap-2 py-1.5 border-b last:border-0"
              style={{ borderColor: "oklch(0.72 0.12 75 / 0.08)" }}>
              <span className="text-xs" style={{ color: "oklch(0.60 0.010 75)" }}>{item.label}</span>
              <span className="text-xs font-medium text-right" style={{ color: "oklch(0.90 0.008 80)" }}>{item.value}</span>
            </div>
          ))}
          <div className="mt-3"><SourceBadge source={{ label: "Bollinger.com", url: "https://www.champagne-bollinger.com", date: "2024" }} /></div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.12 75)" }}>Competitive Set</p>
            <div className="flex gap-1">
              {(["all", "indie", "group"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="text-xs px-2 py-1 rounded transition-all"
                  style={{
                    background: filter === f ? "oklch(0.72 0.12 75 / 0.20)" : "oklch(0.18 0.010 65)",
                    color: filter === f ? "oklch(0.72 0.12 75)" : "oklch(0.50 0.008 75)",
                    border: filter === f ? "1px solid oklch(0.72 0.12 75 / 0.30)" : "1px solid transparent"
                  }}>
                  {f === "all" ? "Tous" : f === "indie" ? "Indép." : "Groupe"}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {filtered.map((c, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 border-b last:border-0"
                style={{ borderColor: "oklch(0.72 0.12 75 / 0.10)" }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-semibold" style={{ color: c.name === "Bollinger" ? "oklch(0.72 0.12 75)" : "oklch(0.90 0.008 80)", fontFamily: "'Playfair Display', serif" }}>
                      {c.name === "Bollinger" ? "★ " : ""}{c.name}
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
          <div className="mt-3"><SourceBadge source={{ label: "Drinks International", url: "https://thefinestbubble.com/news-and-reviews/the-worlds-most-admired-champagne-brands-2025-drinks-international-report/", date: "mars 2025" }} /></div>
        </Card>
      </div>
    </div>
  );
}

// ─── LOCKED SECTION: Portefeuille ─────────────────────────────────────────────
function Portefeuille() {
  const [sortBy, setSortBy] = useState<"price" | "score" | "tier">("price");
  const [search, setSearch] = useState("");

  const gammes = [
    { name: "Special Cuvée NV", tier: "Prestige entrée", desc: "Cuvée phare, ~60% Pinot Noir, vieillissement en fûts de chêne, vins de réserve en magnums.", price: "55–78€", priceVal: 67, scores: "DC95 · JS93 · WS93", scoreVal: 94, flagship: true },
    { name: "La Grande Année", tier: "Millésime prestige", desc: "Millésime de prestige, uniquement les meilleures années. Potentiel de garde 15–20 ans.", price: "149–206€", priceVal: 178, scores: "WA96+ · JS95", scoreVal: 96, flagship: false },
    { name: "Grande Année Rosé", tier: "Millésime rosé", desc: "Version rosé de La Grande Année, saignée de Pinot Noir. Rare et très recherché.", price: "180–250€", priceVal: 215, scores: "WA95+", scoreVal: 95, flagship: false },
    { name: "R.D. (Récemment Dégorgé)", tier: "Ultra-prestige", desc: "Dégorgement tardif après 10–12 ans sur lies. Complexité oxydative unique. Créée en 1952.", price: "350–500€", priceVal: 425, scores: "WA97+", scoreVal: 97, flagship: false },
    { name: "Vieilles Vignes Françaises", tier: "Collector", desc: "Blanc de Noirs issu de vignes non greffées pré-phylloxéra. ~3 000 btl/an. ⚠ Menace phylloxera.", price: "400–600€", priceVal: 500, scores: "WA99", scoreVal: 99, flagship: false, alert: true },
    { name: "PN AYC18 / TX17", tier: "Terroir", desc: "Gamme Pinot Noir mono-terroir, expression parcellaire. Positionnement connaisseurs.", price: "80–120€", priceVal: 100, scores: "WA93+", scoreVal: 93, flagship: false },
    { name: "Special Cuvée 007 Ltd Ed.", tier: "Édition limitée", desc: "Célébration 45+ ans de partenariat James Bond. Lancée octobre 2025. Packaging collector.", price: "75–100€", priceVal: 88, scores: "N/D", scoreVal: 0, flagship: false },
  ];

  const filtered = gammes
    .filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.tier.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === "price" ? b.priceVal - a.priceVal : sortBy === "score" ? b.scoreVal - a.scoreVal : a.tier.localeCompare(b.tier));

  const content = (
    <div className="space-y-5">
      <SectionTitle icon={Package} title="Portefeuille Produits" subtitle="Gammes, cuvées iconiques, innovations · Tri interactif" />
      <ChartCard title="Prix moyen vs Score critique — Cuvées Bollinger"
        subtitle="Taille du cercle = cuvée phare · Source : Wine Advocate, Wine-Searcher"
        source={{ label: "Wine-Searcher / Wine Advocate", url: "https://www.wine-searcher.com/find/bollinger", date: "mars 2026" }}>
        <PortfolioScatterChart />
      </ChartCard>
      <Card>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex-1 relative min-w-40">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.45 0.008 75)" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher une cuvée…"
              className="w-full pl-8 pr-3 py-1.5 rounded text-xs outline-none"
              style={{ background: "oklch(0.18 0.010 65)", border: "1px solid oklch(0.72 0.12 75 / 0.15)", color: "oklch(0.85 0.008 80)" }} />
          </div>
          <div className="flex gap-1">
            {(["price", "score", "tier"] as const).map(s => (
              <button key={s} onClick={() => setSortBy(s)} className="text-xs px-2 py-1 rounded flex items-center gap-1 transition-all"
                style={{ background: sortBy === s ? "oklch(0.72 0.12 75 / 0.20)" : "oklch(0.18 0.010 65)", color: sortBy === s ? "oklch(0.72 0.12 75)" : "oklch(0.50 0.008 75)", border: sortBy === s ? "1px solid oklch(0.72 0.12 75 / 0.30)" : "1px solid transparent" }}>
                <ArrowUpDown size={10} />
                {s === "price" ? "Prix" : s === "score" ? "Score" : "Gamme"}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {filtered.map((g, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded transition-all hover:bg-white/5"
              style={{ border: "1px solid oklch(0.72 0.12 75 / 0.08)" }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-sm font-semibold" style={{ color: "oklch(0.95 0.008 80)", fontFamily: "'Playfair Display', serif" }}>{g.name}</span>
                  {g.flagship && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "oklch(0.72 0.12 75 / 0.20)", color: "oklch(0.72 0.12 75)" }}>★ Phare</span>}
                  {(g as any).alert && <span className="text-xs px-1.5 py-0.5 rounded flex items-center gap-1" style={{ background: "oklch(0.60 0.20 25 / 0.15)", color: "oklch(0.60 0.20 25)" }}><AlertTriangle size={9} />Risque</span>}
                </div>
                <p className="text-xs" style={{ color: "oklch(0.72 0.12 75 / 0.70)" }}>{g.tier}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "oklch(0.60 0.008 75)" }}>{g.desc}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold kpi-value">{g.price}</p>
                <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.008 75)" }}>{g.scores}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <LockedSection
      title="Portefeuille Produits — Analyse complète"
      description="7 cuvées analysées avec prix, scores critiques (WA, JS, DC), alertes stratégiques et graphique Prix × Score."
    >
      {content}
    </LockedSection>
  );
}

// ─── LOCKED SECTION: Prix ─────────────────────────────────────────────────────
function Prix() {
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");
  const tendances = [
    { label: "Premiumisation", dir: "up" as TrendDir, desc: "Segment prestige cuvée domine à 44,6% du marché en 2024" },
    { label: "Volumes globaux", dir: "down" as TrendDir, desc: "−9,2% en 2024, −2% en 2025 (3e année consécutive)" },
    { label: "Valeur exports", dir: "flat" as TrendDir, desc: "3,68 Mds USD en 2025 malgré la baisse des volumes" },
    { label: "Prix Bollinger SC", dir: "up" as TrendDir, desc: "Hausse modérée, alignée avec inflation et premiumisation" },
  ];

  const content = (
    <div className="space-y-5">
      <SectionTitle icon={DollarSign} title="Analyse des Prix" subtitle="Fourchettes, tendances, comparatif concurrents" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Tendances prix marché</p>
          <div className="space-y-2">
            {tendances.map((t, i) => (
              <div key={i} className="flex items-start justify-between gap-2 py-1.5 border-b last:border-0"
                style={{ borderColor: "oklch(0.72 0.12 75 / 0.08)" }}>
                <TrendBadge dir={t.dir} value={t.label} />
                <p className="text-xs text-right flex-1" style={{ color: "oklch(0.60 0.010 75)" }}>{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <ChartCard title="Segments marché 2024" subtitle="Part en valeur">
              <SegmentPieChart />
            </ChartCard>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.12 75)" }}>Comparatif prix par gamme</p>
            <div className="flex gap-1">
              {(["chart", "table"] as const).map(v => (
                <button key={v} onClick={() => setViewMode(v)} className="text-xs px-2 py-1 rounded transition-all"
                  style={{ background: viewMode === v ? "oklch(0.72 0.12 75 / 0.20)" : "oklch(0.18 0.010 65)", color: viewMode === v ? "oklch(0.72 0.12 75)" : "oklch(0.50 0.008 75)", border: viewMode === v ? "1px solid oklch(0.72 0.12 75 / 0.30)" : "1px solid transparent" }}>
                  {v === "chart" ? "Graphique" : "Tableau"}
                </button>
              ))}
            </div>
          </div>
          {viewMode === "chart" ? <PriceComparisonChart /> : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: "1px solid oklch(0.72 0.12 75 / 0.15)" }}>
                    {["Maison", "Entrée", "Millésime", "Prestige", "Collector"].map(h => (
                      <th key={h} className="text-left py-2 pr-3 font-medium" style={{ color: "oklch(0.72 0.12 75)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceComparisonData.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid oklch(0.72 0.12 75 / 0.06)", background: row.maison === "Bollinger" ? "oklch(0.72 0.12 75 / 0.05)" : "transparent" }}>
                      <td className="py-2 pr-3 font-medium" style={{ color: row.maison === "Bollinger" ? "oklch(0.72 0.12 75)" : "oklch(0.85 0.008 80)" }}>
                        {row.maison === "Bollinger" ? "★ " : ""}{row.maison}
                      </td>
                      {["entree", "millesime", "prestige", "collector"].map(k => (
                        <td key={k} className="py-2 pr-3" style={{ color: "oklch(0.70 0.008 75)" }}>
                          {(row as any)[k] > 0 ? `${(row as any)[k]}€` : "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );

  return (
    <LockedSection
      title="Analyse des Prix — Comparatif 9 maisons"
      description="Fourchettes de prix par gamme, tendances 2024–2026, comparatif concurrents et graphique interactif Prix × Segment."
    >
      {content}
    </LockedSection>
  );
}

// ─── LOCKED SECTION: Distribution ────────────────────────────────────────────
function Distribution() {
  const [sortEvol, setSortEvol] = useState(false);
  const data = sortEvol ? [...exportMarketsData].sort((a, b) => b.evol - a.evol) : exportMarketsData;

  const content = (
    <div className="space-y-5">
      <SectionTitle icon={Globe} title="Distribution" subtitle="On-trade / Off-trade · Géographies clés · Canaux" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Top 10 marchés export champagne 2024"
          subtitle="Millions de bouteilles · Or = croissance, Bleu = recul"
          source={{ label: "The Drinks Business", url: "https://www.thedrinksbusiness.com/2025/03/the-top-10-markets-for-champagne-in-2024/", date: "mars 2025" }}>
          <ExportMarketsChart />
        </ChartCard>
        <div className="space-y-4">
          <ChartCard title="Canaux de distribution champagne" subtitle="Part en volume · On-trade dominant"
            source={{ label: "Fortune Business Insights", url: "https://www.fortunebusinessinsights.com/champagne-market-112162", date: "fév. 2026" }}>
            <ChannelPieChart />
          </ChartCard>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.72 0.12 75)" }}>Détail marchés</p>
              <button onClick={() => setSortEvol(!sortEvol)} className="text-xs px-2 py-1 rounded flex items-center gap-1 transition-all"
                style={{ background: sortEvol ? "oklch(0.72 0.12 75 / 0.20)" : "oklch(0.18 0.010 65)", color: sortEvol ? "oklch(0.72 0.12 75)" : "oklch(0.50 0.008 75)", border: sortEvol ? "1px solid oklch(0.72 0.12 75 / 0.30)" : "1px solid transparent" }}>
                <ArrowUpDown size={10} /> {sortEvol ? "Tri : évolution" : "Tri : volume"}
              </button>
            </div>
            <div className="space-y-1.5 max-h-52 overflow-y-auto">
              {data.map((m, i) => (
                <div key={i} className="flex items-center gap-2 py-1 hover:bg-white/5 rounded px-1 transition-colors">
                  <span className="text-xs font-bold w-4 flex-shrink-0" style={{ color: "oklch(0.72 0.12 75 / 0.60)" }}>{i + 1}</span>
                  <span className="text-xs font-medium flex-1" style={{ color: "oklch(0.85 0.008 80)" }}>{m.pays}</span>
                  <span className="text-xs" style={{ color: "oklch(0.65 0.008 75)" }}>{m.btl}M btl</span>
                  <TrendBadge dir={m.evol > 0 ? "up" : "down"} value={`${m.evol > 0 ? "+" : ""}${m.evol}%`} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <LockedSection
      title="Distribution — Géographies & Canaux"
      description="Top 10 marchés export 2024, canaux on-trade/off-trade/e-commerce et tableau trié par croissance ou volume."
    >
      {content}
    </LockedSection>
  );
}

// ─── LOCKED SECTION: Part de Voix ────────────────────────────────────────────
function PartDeVoix() {
  const content = (
    <div className="space-y-5">
      <SectionTitle icon={Megaphone} title="Part de Voix & Médias" subtitle="Classements, presse spécialisée, actifs médiatiques" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Most Admired Champagne 2025–2026"
          subtitle="Score estimé sur 100 · Drinks International · Jury professionnel"
          source={{ label: "Drinks International / Wine Intelligence", url: "https://wine-intelligence.com/blogs/wine-news-insights-wine-intelligence-trends-data-reports/most-admired-champagne-brands-2026-roederer-krug-and-bollinger-lead-again", date: "mars 2026" }}>
          <AdmiredRankingChart />
        </ChartCard>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Actifs médiatiques Bollinger</p>
          {[
            { asset: "Partenariat James Bond (007)", impact: "Très élevé", color: "oklch(0.72 0.12 75)" },
            { asset: "Partenariat Aston Martin", impact: "Élevé", color: "oklch(0.65 0.15 145)" },
            { asset: "Royal Warrant Charles III", impact: "Élevé", color: "oklch(0.65 0.15 145)" },
            { asset: "B Corp certification", impact: "Moyen", color: "oklch(0.55 0.10 260)" },
            { asset: "Bicentenaire 2029", impact: "Fort (futur)", color: "oklch(0.72 0.12 75)" },
            { asset: "VVF — menace extinction", impact: "Élevé (risque)", color: "oklch(0.60 0.20 25)" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 border-b last:border-0" style={{ borderColor: "oklch(0.72 0.12 75 / 0.08)" }}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color }} />
              <span className="text-xs flex-1 font-medium" style={{ color: "oklch(0.85 0.008 80)" }}>{a.asset}</span>
              <span className="text-xs font-medium" style={{ color: a.color }}>{a.impact}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );

  return (
    <LockedSection
      title="Part de Voix & Médias — Analyse complète"
      description="Classement Most Admired 2025–2026, actifs médiatiques valorisés et données SOV avec sources vérifiées."
    >
      {content}
    </LockedSection>
  );
}

// ─── LOCKED SECTION: Social & Digital ────────────────────────────────────────
function SocialDigital() {
  const content = (
    <div className="space-y-5">
      <SectionTitle icon={Smartphone} title="Social & Digital" subtitle="Croissance, engagement, campagnes clés" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Abonnés Instagram — Comparatif maisons"
          subtitle="En milliers · Or = Bollinger · Source : Instagram mars 2026"
          source={{ label: "Instagram", url: "https://www.instagram.com/champagne_bollinger/", date: "mars 2026" }}>
          <SocialFollowersChart />
          <div className="mt-2 p-2 rounded text-xs" style={{ background: "oklch(0.60 0.20 25 / 0.10)", border: "1px solid oklch(0.60 0.20 25 / 0.20)" }}>
            <span style={{ color: "oklch(0.60 0.20 25)" }}>⚠ Écart notable :</span>
            <span style={{ color: "oklch(0.65 0.008 75)" }}> Dom Pérignon (799K) dépasse Bollinger (252K) de 3x. Opportunité de croissance digitale.</span>
          </div>
        </ChartCard>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>Campagnes digitales notables</p>
          {[
            { name: "Special Cuvée 007 Launch", date: "Oct. 2025", desc: "Photographie dramatique + animation bold. Partenariat Datum Creative Partners." },
            { name: "Aston Martin Partnership", date: "Sept. 2025", desc: "Activation globale, expériences exclusives, cross-promotion." },
            { name: "Royal Warrant Renewal", date: "Déc. 2024", desc: "Annonce renouvellement Royal Warrant Charles III, 140 ans." },
            { name: "Bicentenary 2029 Teaser", date: "2024–2025", desc: "Construction hôtel + centre touristique Aÿ, communication progressive." },
          ].map((c, i) => (
            <div key={i} className="pb-3 mb-3 border-b last:border-0 last:mb-0 last:pb-0" style={{ borderColor: "oklch(0.72 0.12 75 / 0.10)" }}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-semibold" style={{ color: "oklch(0.90 0.008 80)", fontFamily: "'Playfair Display', serif" }}>{c.name}</span>
                <span className="text-xs flex-shrink-0" style={{ color: "oklch(0.72 0.12 75)" }}>{c.date}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "oklch(0.60 0.010 75)" }}>{c.desc}</p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );

  return (
    <LockedSection
      title="Social & Digital — Benchmarks & Campagnes"
      description="Comparatif Instagram 9 maisons, taux d'engagement estimés et analyse des 4 campagnes digitales clés 2024–2025."
    >
      {content}
    </LockedSection>
  );
}

// ─── LOCKED SECTION: Signaux Faibles ─────────────────────────────────────────
function SignauxFaibles() {
  const [filter, setFilter] = useState<"all" | "critique" | "modere" | "faible">("all");
  const signals = [
    { level: "critique", icon: AlertTriangle, title: "Tarifs douaniers US (Trump)", desc: "Exports vins français −39% en Q4 2025. USA = 1er marché export champagne (820M€ en 2024).", action: "Diversifier vers EAU (+21,6%), Canada, Corée du Sud.", source: { label: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2026-02-06/french-champagne-and-perfume-feel-the-pain-of-trump-tariffs", date: "fév. 2026" } },
    { level: "critique", icon: AlertTriangle, title: "Phylloxera — Vieilles Vignes Françaises", desc: "Les vignes non greffées de Bollinger (VVF) sont menacées par le phylloxera. ~3 000 btl/an.", action: "Accélérer recherche agronomique. Communiquer sur la rareté.", source: { label: "Champagne Club", url: "https://www.champagneclub.com/champagnes-rare-jewel-at-risk-of-extinction/", date: "mars 2024" } },
    { level: "modere", icon: Shield, title: "Risque réputation — Affaire Folc", desc: "Bollinger a envoyé un cease & desist à la marque anglaise Folc (oct. 2025). Couverture négative UK.", action: "Revoir stratégie de protection de marque.", source: { label: "The Times", url: "https://drinksint.com/news/fullstory.php/aid/12032/Bollinger_threatens_English_wine_brand_over__Bollie__ad.html", date: "oct. 2025" } },
    { level: "modere", icon: Activity, title: "Changement climatique — Champagne", desc: "Gel printanier précoce, millésimes irréguliers. Budburst plus précoce = vulnérabilité accrue.", action: "Investir en viticulture adaptative.", source: { label: "Vinetur", url: "https://www.vinetur.com/en/2025070889521/climate-change-forces-global-wine-industry-to-adapt-as-traditional-regions-face-new-risks-and-emerging-areas-gain-prominence.html", date: "juil. 2025" } },
    { level: "faible", icon: TrendingDown, title: "Déclin structurel marché France", desc: "Marché domestique : −63M bouteilles en 13 ans (181M en 2011 → 118M en 2024).", action: "Réduire dépendance au marché FR.", source: { label: "The Drinks Business", url: "https://www.thedrinksbusiness.com/2025/03/the-top-10-markets-for-champagne-in-2024/", date: "mars 2025" } },
    { level: "faible", icon: Zap, title: "Génération Z & modération alcool", desc: "Shift vers 'conscientious consumption'. Marché no/low alcohol en croissance.", action: "Explorer positionnement 'occasion spéciale'.", source: { label: "Forbes", url: "https://www.forbes.com/sites/joemicallef/2024/08/13/how-young-consumers-are-changing-the-marketing-of-luxury-beverages/", date: "août 2024" } },
  ];

  const levelColors: Record<string, string> = { critique: "oklch(0.60 0.20 25)", modere: "oklch(0.72 0.12 75)", faible: "oklch(0.55 0.10 260)" };
  const levelLabels: Record<string, string> = { critique: "Critique", modere: "Modéré", faible: "Faible" };
  const filtered = signals.filter(s => filter === "all" || s.level === filter);

  const content = (
    <div className="space-y-5">
      <SectionTitle icon={Radio} title="Signaux Faibles & Risques" subtitle="Réglementaire, supply, réputation, tendances" />
      <ChartCard title="Matrice risques — Impact vs Probabilité" subtitle="Taille du cercle proportionnelle au niveau de risque combiné">
        <RiskMatrixChart />
      </ChartCard>
      <div className="flex gap-2 flex-wrap">
        {(["all", "critique", "modere", "faible"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className="text-xs px-3 py-1.5 rounded transition-all"
            style={{ background: filter === f ? (f === "all" ? "oklch(0.72 0.12 75 / 0.20)" : `color-mix(in oklch, ${levelColors[f] || "oklch(0.72 0.12 75)"} 20%, transparent)`) : "oklch(0.18 0.010 65)", color: filter === f ? (f === "all" ? "oklch(0.72 0.12 75)" : levelColors[f]) : "oklch(0.50 0.008 75)", border: `1px solid ${filter === f ? (f === "all" ? "oklch(0.72 0.12 75 / 0.30)" : `color-mix(in oklch, ${levelColors[f] || "oklch(0.72 0.12 75)"} 40%, transparent)`) : "transparent"}` }}>
            {f === "all" ? "Tous" : levelLabels[f]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((s, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `color-mix(in oklch, ${levelColors[s.level]} 15%, transparent)` }}>
                <s.icon size={15} style={{ color: levelColors[s.level] }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold" style={{ color: "oklch(0.95 0.008 80)", fontFamily: "'Playfair Display', serif" }}>{s.title}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: `color-mix(in oklch, ${levelColors[s.level]} 15%, transparent)`, color: levelColors[s.level] }}>{levelLabels[s.level]}</span>
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

  return (
    <LockedSection
      title="Signaux Faibles & Risques — 6 risques analysés"
      description="Matrice Impact × Probabilité, 6 risques classifiés (critique/modéré/faible) avec actions prioritaires et sources."
    >
      {content}
    </LockedSection>
  );
}

// ─── LOCKED SECTION: Recommandations ─────────────────────────────────────────
function Recommandations() {
  const recs = [
    { priority: 1, impact: "Très élevé", effort: "Élevé", impactColor: "oklch(0.65 0.15 145)", impactVal: 9, effortVal: 7, title: "Diversifier les marchés export face aux tarifs US", desc: "Accélérer le développement des marchés EAU (+21,6%), Canada, Corée du Sud et Singapour.", kpi: "Part des marchés hors USA/UK > 40% d'ici 2027", horizon: "Court terme (6–12 mois)" },
    { priority: 2, impact: "Très élevé", effort: "Moyen", impactColor: "oklch(0.65 0.15 145)", impactVal: 8, effortVal: 5, title: "Amplifier la présence digitale — réduire l'écart avec Dom Pérignon", desc: "Bollinger (252K Instagram) vs Dom Pérignon (799K) : écart de 3x. Investir dans une stratégie de contenu premium.", kpi: "Atteindre 400K followers Instagram d'ici fin 2026", horizon: "Court terme (3–9 mois)" },
    { priority: 3, impact: "Élevé", effort: "Moyen", impactColor: "oklch(0.72 0.12 75)", impactVal: 8, effortVal: 6, title: "Capitaliser sur le Bicentenaire 2029 — stratégie événementielle", desc: "Lancer dès 2026 une communication progressive autour du bicentenaire (1829–2029).", kpi: "Lancement campagne bicentenaire Q3 2026, 3 éditions limitées d'ici 2029", horizon: "Moyen terme (12–36 mois)" },
    { priority: 4, impact: "Élevé", effort: "Faible", impactColor: "oklch(0.72 0.12 75)", impactVal: 7, effortVal: 3, title: "Protéger et valoriser les Vieilles Vignes Françaises", desc: "Face à la menace phylloxera, investir dans la recherche agronomique et communiquer sur la rareté.", kpi: "Programme de préservation VVF documenté et communiqué d'ici 2025", horizon: "Urgent (0–6 mois)" },
    { priority: 5, impact: "Moyen", effort: "Faible", impactColor: "oklch(0.55 0.10 260)", impactVal: 5, effortVal: 2, title: "Revoir la stratégie de protection de marque (post-affaire Folc)", desc: "L'affaire Folc a généré une couverture négative dans la presse UK. Adopter une approche plus nuancée.", kpi: "Zéro couverture négative 'bullying' dans les 12 prochains mois", horizon: "Court terme (1–3 mois)" },
  ];

  const content = (
    <div className="space-y-5">
      <SectionTitle icon={Lightbulb} title="Recommandations Stratégiques" subtitle="5 actions priorisées · Impact / Effort" />
      <ChartCard title="Impact vs Effort — Vue comparative" subtitle="Or = Impact · Bleu = Effort · Échelle /10">
        <RecoChart />
      </ChartCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recs.map((r, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base font-bold"
                style={{ background: "oklch(0.72 0.12 75 / 0.15)", color: "oklch(0.72 0.12 75)", fontFamily: "'Playfair Display', serif" }}>
                {r.priority}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold mb-1" style={{ color: "oklch(0.95 0.008 80)", fontFamily: "'Playfair Display', serif" }}>{r.title}</p>
                <div className="flex gap-2 mb-2 flex-wrap">
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `color-mix(in oklch, ${r.impactColor} 15%, transparent)`, color: r.impactColor }}>Impact : {r.impact}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "oklch(0.20 0.010 65)", color: "oklch(0.60 0.008 75)" }}>Effort : {r.effort}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "oklch(0.20 0.010 65)", color: "oklch(0.55 0.10 260)" }}>{r.horizon}</span>
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

  return (
    <LockedSection
      title="Recommandations Stratégiques — 5 actions"
      description="5 actions priorisées par Impact/Effort avec KPIs mesurables, horizons temporels et graphique comparatif interactif."
    >
      {content}
    </LockedSection>
  );
}

// ─── FREE SECTION: Sources Log ────────────────────────────────────────────────
function SourcesLog() {
  const [filterType, setFilterType] = useState("Tous");
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
    { id: "S13", label: "The Times — Affaire Folc / Bollinger", url: "https://drinksint.com/news/fullstory.php/aid/12032/Bollinger_threatens_English_wine_brand_over__Bollie__ad.html", date: "oct. 2025", type: "Risque" },
    { id: "S14", label: "DataBridge — Prestige Cuvée segment 44,6%", url: "https://www.databridgemarketresearch.com/reports/global-champagne-market", date: "2024", type: "Marché" },
    { id: "S15", label: "Fortune Business Insights — On-trade CAGR", url: "https://www.fortunebusinessinsights.com/champagne-market-112162", date: "fév. 2026", type: "Marché" },
    { id: "S16", label: "Vinetur — Most Admired 2026 (détail)", url: "https://www.vinetur.com/en/2026031097315/louis-roederer-krug-and-bollinger-secure-top-spots-in-2026-most-admired-champagne-brands-ranking.html", date: "mars 2026", type: "Classement" },
    { id: "S17", label: "Instagram — @champagne_bollinger (252K)", url: "https://www.instagram.com/champagne_bollinger/", date: "mars 2026", type: "Digital" },
    { id: "S18", label: "Instagram — @domperignonofficial (799K)", url: "https://www.instagram.com/domperignonofficial/", date: "mars 2026", type: "Digital" },
  ];

  const types = ["Tous", ...Array.from(new Set(sources.map(s => s.type)))];
  const typeColors: Record<string, string> = {
    Marché: "oklch(0.55 0.10 260)", Classement: "oklch(0.72 0.12 75)", Presse: "oklch(0.65 0.15 145)",
    Partenariat: "oklch(0.60 0.12 200)", Risque: "oklch(0.60 0.20 25)", Institutionnel: "oklch(0.65 0.10 280)",
    ESG: "oklch(0.65 0.15 145)", Prix: "oklch(0.72 0.12 75)", Produit: "oklch(0.60 0.12 200)", Digital: "oklch(0.55 0.10 260)",
  };
  const filtered = filterType === "Tous" ? sources : sources.filter(s => s.type === filterType);

  return (
    <div className="space-y-4">
      <SectionTitle icon={BarChart2} title="Log des Sources" subtitle="18 sources vérifiées · Liens directs · Dates de publication" />
      <div className="flex gap-2 flex-wrap">
        {types.map(t => (
          <button key={t} onClick={() => setFilterType(t)} className="text-xs px-2.5 py-1 rounded transition-all"
            style={{ background: filterType === t ? `color-mix(in oklch, ${typeColors[t] || "oklch(0.72 0.12 75)"} 20%, transparent)` : "oklch(0.18 0.010 65)", color: filterType === t ? (typeColors[t] || "oklch(0.72 0.12 75)") : "oklch(0.50 0.008 75)", border: filterType === t ? `1px solid color-mix(in oklch, ${typeColors[t] || "oklch(0.72 0.12 75)"} 40%, transparent)` : "1px solid transparent" }}>
            {t} {t !== "Tous" && `(${sources.filter(s => s.type === t).length})`}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[filtered.slice(0, Math.ceil(filtered.length / 2)), filtered.slice(Math.ceil(filtered.length / 2))].map((col, ci) => (
          <Card key={ci}>
            <div className="space-y-2">
              {col.map((s, i) => (
                <div key={i} className="flex items-start gap-2 py-1.5 border-b last:border-0 hover:bg-white/5 rounded px-1 transition-colors"
                  style={{ borderColor: "oklch(0.72 0.12 75 / 0.08)" }}>
                  <span className="text-xs font-bold flex-shrink-0 w-7" style={{ color: "oklch(0.72 0.12 75 / 0.60)" }}>{s.id}</span>
                  <div className="flex-1 min-w-0">
                    <a href={s.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs hover:opacity-80 transition-opacity flex items-start gap-1 group"
                      style={{ color: "oklch(0.80 0.008 80)" }}>
                      <span className="flex-1 group-hover:underline">{s.label}</span>
                      <ExternalLink size={9} className="flex-shrink-0 mt-0.5" style={{ color: "oklch(0.72 0.12 75 / 0.60)" }} />
                    </a>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="px-1 py-0.5 rounded" style={{ background: `color-mix(in oklch, ${typeColors[s.type] || "oklch(0.55 0.05 75)"} 15%, transparent)`, color: typeColors[s.type] || "oklch(0.55 0.05 75)", fontSize: "10px" }}>{s.type}</span>
                      <span className="text-xs" style={{ color: "oklch(0.45 0.008 75)" }}>{s.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Navigation items ─────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "snapshot", label: "Snapshot", icon: LayoutDashboard, locked: false },
  { id: "position", label: "Positionnement", icon: Star, locked: false },
  { id: "portfolio", label: "Portefeuille", icon: Package, locked: true },
  { id: "prix", label: "Prix", icon: DollarSign, locked: true },
  { id: "distrib", label: "Distribution", icon: Globe, locked: true },
  { id: "media", label: "Part de Voix", icon: Megaphone, locked: true },
  { id: "digital", label: "Social & Digital", icon: Smartphone, locked: true },
  { id: "risques", label: "Signaux & Risques", icon: Shield, locked: true },
  { id: "reco", label: "Recommandations", icon: Lightbulb, locked: true },
  { id: "sources", label: "Sources", icon: BarChart2, locked: false },
];

const HERO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032620985/kLQsdpqWbkyuVgHJ6bT7Wg/bollinger-hero-RRuA5yNB5k8o3Z66uCQtXq.webp";

// ─── Access Toggle Button (sidebar) ──────────────────────────────────────────
function AccessToggle() {
  const { isFullAccess, lock, openPasswordModal } = useAccess();

  if (isFullAccess) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded"
          style={{ background: "oklch(0.65 0.15 145 / 0.10)", border: "1px solid oklch(0.65 0.15 145 / 0.25)" }}>
          <Unlock size={12} style={{ color: "oklch(0.65 0.15 145)" }} />
          <span style={{ fontSize: "0.70rem", color: "oklch(0.65 0.15 145)", fontWeight: 600 }}>Accès complet actif</span>
        </div>
        <button onClick={lock}
          className="w-full flex items-center gap-2 px-3 py-1.5 rounded transition-all hover:opacity-80"
          style={{ background: "oklch(0.18 0.010 65)", border: "1px solid oklch(0.72 0.12 75 / 0.10)" }}>
          <LogOut size={11} style={{ color: "oklch(0.45 0.008 75)" }} />
          <span style={{ fontSize: "0.68rem", color: "oklch(0.45 0.008 75)" }}>Revenir en mode aperçu</span>
        </button>
      </div>
    );
  }

  return (
    <button onClick={openPasswordModal}
      className="w-full flex items-center gap-2 px-3 py-2.5 rounded transition-all duration-200 hover:scale-[1.02] active:scale-95"
      style={{
        background: "linear-gradient(135deg, oklch(0.72 0.12 75 / 0.20) 0%, oklch(0.62 0.14 65 / 0.15) 100%)",
        border: "1px solid oklch(0.72 0.12 75 / 0.35)",
        boxShadow: "0 2px 12px oklch(0.72 0.12 75 / 0.12)",
      }}>
      <Lock size={13} style={{ color: "oklch(0.72 0.12 75)" }} />
      <div className="flex-1 text-left">
        <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "oklch(0.90 0.008 80)", lineHeight: 1.2 }}>Rapport complet</p>
        <p style={{ fontSize: "0.62rem", color: "oklch(0.55 0.008 75)" }}>7 sections · Entrer le code</p>
      </div>
      <ChevronRight size={12} style={{ color: "oklch(0.72 0.12 75)" }} />
    </button>
  );
}

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────
function DesktopSidebar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  const { isFullAccess, openPasswordModal } = useAccess();

  return (
    <aside className="hidden md:flex flex-col flex-shrink-0"
      style={{ width: "240px", background: "oklch(0.12 0.010 65)", borderRight: "1px solid oklch(0.72 0.12 75 / 0.15)", height: "100vh", position: "sticky", top: 0 }}>
      <div className="p-5 pb-4" style={{ borderBottom: "1px solid oklch(0.72 0.12 75 / 0.15)" }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 rounded-full" style={{ background: "oklch(0.72 0.12 75)" }} />
          <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'DM Sans', sans-serif" }}>
            Competitive Intelligence
          </span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "oklch(0.97 0.005 80)", lineHeight: 1.2 }}>
          Champagne<br />
          <span className="text-gold-gradient">Bollinger</span>
        </h1>
        <p className="text-xs mt-1.5" style={{ color: "oklch(0.50 0.008 75)" }}>Dashboard CI · Mars 2026</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          const isLocked = item.locked && !isFullAccess;
          return (
            <button key={item.id}
              onClick={() => isLocked ? openPasswordModal() : onSelect(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md mb-0.5 transition-all duration-200 text-left"
              style={{
                background: isActive ? "oklch(0.72 0.12 75 / 0.12)" : "transparent",
                border: isActive ? "1px solid oklch(0.72 0.12 75 / 0.25)" : "1px solid transparent",
              }}>
              <item.icon size={15} style={{ color: isActive ? "oklch(0.72 0.12 75)" : isLocked ? "oklch(0.35 0.008 75)" : "oklch(0.45 0.008 75)", flexShrink: 0 }} />
              <span className="text-sm font-medium flex-1" style={{ color: isActive ? "oklch(0.90 0.008 80)" : isLocked ? "oklch(0.40 0.008 75)" : "oklch(0.55 0.008 75)", fontFamily: "'DM Sans', sans-serif" }}>
                {item.label}
              </span>
              {isLocked ? (
                <Lock size={10} style={{ color: "oklch(0.72 0.12 75 / 0.50)", flexShrink: 0 }} />
              ) : isActive ? (
                <ChevronRight size={12} style={{ color: "oklch(0.72 0.12 75)", flexShrink: 0 }} />
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="p-3" style={{ borderTop: "1px solid oklch(0.72 0.12 75 / 0.15)" }}>
        <AccessToggle />
        <p className="text-xs mt-3 text-center" style={{ color: "oklch(0.35 0.008 75)" }}>© 2026 — Usage interne</p>
      </div>
    </aside>
  );
}

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────
function MobileBottomNav({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  const { isFullAccess, openPasswordModal } = useAccess();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const idx = NAV_ITEMS.findIndex(n => n.id === active);
    if (scrollRef.current && idx >= 0) {
      const el = scrollRef.current.children[idx] as HTMLElement;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  return (
    <div className="md:hidden bottom-nav fixed bottom-0 left-0 right-0 z-50">
      <div ref={scrollRef} className="flex overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          const isLocked = item.locked && !isFullAccess;
          return (
            <button key={item.id}
              onClick={() => isLocked ? openPasswordModal() : onSelect(item.id)}
              className="flex flex-col items-center gap-1 px-3 py-2.5 flex-shrink-0 transition-all duration-200 relative"
              style={{ minWidth: "60px" }}>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ background: "oklch(0.72 0.12 75)" }} />
              )}
              <div className="relative">
                <item.icon size={16} style={{ color: isActive ? "oklch(0.72 0.12 75)" : isLocked ? "oklch(0.35 0.008 75)" : "oklch(0.50 0.008 75)" }} />
                {isLocked && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center"
                    style={{ background: "oklch(0.72 0.12 75 / 0.20)" }}>
                    <Lock size={6} style={{ color: "oklch(0.72 0.12 75)" }} />
                  </div>
                )}
              </div>
              <span style={{ color: isActive ? "oklch(0.72 0.12 75)" : isLocked ? "oklch(0.35 0.008 75)" : "oklch(0.45 0.008 75)", fontFamily: "'DM Sans', sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.02em" }}>
                {item.label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mobile Header ────────────────────────────────────────────────────────────
function MobileHeader({ activeSection }: { activeSection: string }) {
  const { isFullAccess, openPasswordModal } = useAccess();
  const active = NAV_ITEMS.find(n => n.id === activeSection);

  return (
    <div className="md:hidden relative overflow-hidden" style={{ height: activeSection === "snapshot" ? "180px" : "72px" }}>
      {activeSection === "snapshot" && (
        <img src={HERO_URL} alt="Bollinger" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0" style={{
        background: activeSection === "snapshot"
          ? "linear-gradient(to bottom, oklch(0.10 0.012 65 / 0.3) 0%, oklch(0.10 0.012 65 / 0.88) 100%)"
          : "oklch(0.12 0.010 65)"
      }} />
      <div className="relative z-10 h-full flex flex-col justify-end px-4 pb-3">
        {activeSection === "snapshot" ? (
          <>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 rounded-full" style={{ background: "oklch(0.72 0.12 75)" }} />
                  <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "oklch(0.72 0.12 75)" }}>Competitive Intelligence</span>
                </div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "oklch(0.97 0.005 80)", lineHeight: 1.2 }}>
                  Champagne <span className="text-gold-gradient">Bollinger</span>
                </h1>
              </div>
              {!isFullAccess && (
                <button onClick={openPasswordModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0"
                  style={{ background: "oklch(0.72 0.12 75 / 0.20)", border: "1px solid oklch(0.72 0.12 75 / 0.40)" }}>
                  <Lock size={11} style={{ color: "oklch(0.72 0.12 75)" }} />
                  <span style={{ fontSize: "0.68rem", color: "oklch(0.72 0.12 75)", fontWeight: 600 }}>Accès complet</span>
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-5 rounded-full" style={{ background: "oklch(0.72 0.12 75)" }} />
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: "oklch(0.72 0.12 75)" }}>Bollinger CI</p>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 600, color: "oklch(0.95 0.008 80)" }}>
                  {active?.label}
                </h1>
              </div>
            </div>
            {!isFullAccess && (
              <button onClick={openPasswordModal}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{ background: "oklch(0.72 0.12 75 / 0.15)", border: "1px solid oklch(0.72 0.12 75 / 0.30)" }}>
                <Lock size={10} style={{ color: "oklch(0.72 0.12 75)" }} />
                <span style={{ fontSize: "0.65rem", color: "oklch(0.72 0.12 75)", fontWeight: 600 }}>Full</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Desktop Page Header ──────────────────────────────────────────────────────
function DesktopPageHeader({ activeSection }: { activeSection: string }) {
  return (
    <div className="hidden md:block relative overflow-hidden"
      style={{ height: activeSection === "snapshot" ? "220px" : "0px", transition: "height 0.3s ease" }}>
      {activeSection === "snapshot" && (
        <>
          <img src={HERO_URL} alt="Bollinger" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.10 0.012 65 / 0.2) 0%, oklch(0.10 0.012 65 / 0.85) 100%)" }} />
          <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-5 rounded-full" style={{ background: "oklch(0.72 0.12 75)" }} />
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "oklch(0.72 0.12 75)" }}>Competitive Intelligence · Mars 2026</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "oklch(0.97 0.005 80)", lineHeight: 1.2 }}>
              Champagne <span className="text-gold-gradient">Bollinger</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: "oklch(0.70 0.008 75)" }}>18 sources vérifiées · Competitive set 9 maisons · Données mars 2026</p>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Home Component ──────────────────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState("snapshot");
  const contentRef = useRef<HTMLDivElement>(null);
  const { isFullAccess, openPasswordModal } = useAccess();

  const handleSelect = useCallback((id: string) => {
    setActiveSection(id);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, []);

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
    <div className="min-h-screen flex" style={{ background: "oklch(0.10 0.012 65)" }}>
      <DesktopSidebar active={activeSection} onSelect={handleSelect} />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader activeSection={activeSection} />
        <DesktopPageHeader activeSection={activeSection} />
        <div ref={contentRef} className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-8 pt-4 md:pt-0">
          <div className="max-w-5xl">
            {renderSection()}
          </div>
        </div>
      </div>
      <MobileBottomNav active={activeSection} onSelect={handleSelect} />
      <PasswordModal />
    </div>
  );
}
