/*
 * BOLLINGER CI DASHBOARD — Interactive Chart Components
 * Design: Art Déco Prestige · Noir + Or Champagne
 * Charts: Recharts with custom dark styling
 */

import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, PieChart, Pie, LineChart, Line, ReferenceLine
} from "recharts";
import {
  marketVolumeData, exportMarketsData, priceComparisonData,
  admiredRankingData, socialData, riskData, recoData,
  channelData, segmentData, portfolioData, CHART_COLORS
} from "@/lib/bollingerData";

// ─── Shared Tooltip Style ─────────────────────────────────────────────────────
const tooltipStyle = {
  backgroundColor: "oklch(0.14 0.012 65)",
  border: "1px solid oklch(0.72 0.12 75 / 0.30)",
  borderRadius: "6px",
  color: "oklch(0.90 0.008 80)",
  fontSize: "12px",
  fontFamily: "'DM Sans', sans-serif",
};

const labelStyle = { color: "oklch(0.72 0.12 75)", fontWeight: 600 };

// ─── Market Volume Chart ──────────────────────────────────────────────────────
export function MarketVolumeChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={marketVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#C9A84C" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.72 0.12 75 / 0.08)" />
        <XAxis dataKey="year" tick={{ fill: "oklch(0.55 0.008 75)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "oklch(0.55 0.008 75)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[220, 340]} unit="M" />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={labelStyle}
          formatter={(v: number) => [`${v}M btl`, "Expéditions"]}
        />
        <ReferenceLine y={266} stroke="#E05252" strokeDasharray="4 4" strokeWidth={1.5}
          label={{ value: "2025: 266M", position: "insideTopRight", fill: "#E05252", fontSize: 10 }} />
        <Area type="monotone" dataKey="volume" stroke="#C9A84C" strokeWidth={2.5}
          fill="url(#volGrad)" dot={{ fill: "#C9A84C", r: 3, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "#C9A84C", stroke: "oklch(0.14 0.012 65)", strokeWidth: 2 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Export Markets Bar Chart ─────────────────────────────────────────────────
export function ExportMarketsChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={exportMarketsData} layout="vertical" margin={{ top: 0, right: 50, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.72 0.12 75 / 0.08)" horizontal={false} />
        <XAxis type="number" tick={{ fill: "oklch(0.55 0.008 75)", fontSize: 10 }} axisLine={false} tickLine={false} unit="M" />
        <YAxis type="category" dataKey="pays" tick={{ fill: "oklch(0.75 0.008 80)", fontSize: 11 }} axisLine={false} tickLine={false} width={65} />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={labelStyle}
          formatter={(v: number) => [`${v}M btl`, "Volume"]}
        />
        <Bar dataKey="btl" radius={[0, 4, 4, 0]} maxBarSize={18}>
          {exportMarketsData.map((entry, i) => (
            <Cell key={i} fill={entry.evol > 0 ? "#C9A84C" : "#8B9DC3"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Price Comparison Chart ───────────────────────────────────────────────────
export function PriceComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={priceComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.72 0.12 75 / 0.08)" />
        <XAxis dataKey="maison" tick={{ fill: "oklch(0.65 0.008 75)", fontSize: 10 }} axisLine={false} tickLine={false}
          angle={-35} textAnchor="end" interval={0} />
        <YAxis tick={{ fill: "oklch(0.55 0.008 75)", fontSize: 10 }} axisLine={false} tickLine={false} unit="€" />
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle}
          formatter={(v: number, name: string) => {
            const labels: Record<string, string> = { entree: "Entrée gamme", millesime: "Millésime", prestige: "Prestige", collector: "Collector" };
            return v > 0 ? [`${v}€`, labels[name] || name] : null;
          }} />
        <Legend wrapperStyle={{ color: "oklch(0.60 0.008 75)", fontSize: 11, paddingTop: 8 }} />
        <Bar dataKey="entree" name="Entrée" stackId="a" fill="#C9A84C" radius={[0, 0, 0, 0]} maxBarSize={28} />
        <Bar dataKey="millesime" name="Millésime" stackId="a" fill="#8B9DC3" maxBarSize={28} />
        <Bar dataKey="prestige" name="Prestige" stackId="a" fill="#7BA05B" maxBarSize={28} />
        <Bar dataKey="collector" name="Collector" stackId="a" fill="#C47C5A" radius={[4, 4, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Most Admired Ranking Chart ───────────────────────────────────────────────
export function AdmiredRankingChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={admiredRankingData} layout="vertical" margin={{ top: 0, right: 40, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.72 0.12 75 / 0.08)" horizontal={false} />
        <XAxis type="number" tick={{ fill: "oklch(0.55 0.008 75)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
        <YAxis type="category" dataKey="maison" tick={{ fill: "oklch(0.75 0.008 80)", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle}
          formatter={(v: number) => [`${v}/100`, "Score estimé"]} />
        <Bar dataKey="score" radius={[0, 4, 4, 0]} maxBarSize={18}>
          {admiredRankingData.map((entry, i) => (
            <Cell key={i} fill={entry.maison === "Bollinger" ? "#C9A84C" : i < 2 ? "#8B9DC3" : "oklch(0.35 0.008 75)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Social Media Followers Chart ────────────────────────────────────────────
export function SocialFollowersChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={socialData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.72 0.12 75 / 0.08)" />
        <XAxis dataKey="maison" tick={{ fill: "oklch(0.65 0.008 75)", fontSize: 10 }} axisLine={false} tickLine={false}
          angle={-35} textAnchor="end" interval={0} />
        <YAxis tick={{ fill: "oklch(0.55 0.008 75)", fontSize: 10 }} axisLine={false} tickLine={false} unit="K" />
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle}
          formatter={(v: number) => [`${v}K`, "Abonnés Instagram"]} />
        <Bar dataKey="followers" radius={[4, 4, 0, 0]} maxBarSize={36}>
          {socialData.map((entry, i) => (
            <Cell key={i} fill={entry.maison === "Bollinger" ? "#C9A84C" : "oklch(0.35 0.008 75)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Channel Distribution Pie ─────────────────────────────────────────────────
export function ChannelPieChart() {
  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="oklch(0.95 0.008 80)" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={channelData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
          labelLine={false} label={renderLabel}>
          {channelData.map((entry, i) => (
            <Cell key={i} fill={entry.color} stroke="oklch(0.12 0.010 65)" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle}
          formatter={(v: number, name: string) => [`${v}%`, name]} />
        <Legend wrapperStyle={{ color: "oklch(0.65 0.008 75)", fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

// ─── Market Segment Pie ───────────────────────────────────────────────────────
export function SegmentPieChart() {
  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="oklch(0.95 0.008 80)" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={segmentData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
          labelLine={false} label={renderLabel}>
          {segmentData.map((entry, i) => (
            <Cell key={i} fill={entry.color} stroke="oklch(0.12 0.010 65)" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle}
          formatter={(v: number, name: string) => [`${v}%`, name]} />
        <Legend wrapperStyle={{ color: "oklch(0.65 0.008 75)", fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

// ─── Risk Scatter Plot ────────────────────────────────────────────────────────
export function RiskMatrixChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.72 0.12 75 / 0.08)" />
        <XAxis type="number" dataKey="probability" name="Probabilité" domain={[0, 10]}
          tick={{ fill: "oklch(0.55 0.008 75)", fontSize: 10 }} axisLine={false} tickLine={false}
          label={{ value: "Probabilité →", position: "insideBottom", offset: -10, fill: "oklch(0.45 0.008 75)", fontSize: 10 }} />
        <YAxis type="number" dataKey="impact" name="Impact" domain={[0, 10]}
          tick={{ fill: "oklch(0.55 0.008 75)", fontSize: 10 }} axisLine={false} tickLine={false}
          label={{ value: "Impact ↑", angle: -90, position: "insideLeft", fill: "oklch(0.45 0.008 75)", fontSize: 10 }} />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ strokeDasharray: "3 3", stroke: "oklch(0.72 0.12 75 / 0.30)" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const d = payload[0].payload;
              return (
                <div style={{ ...tooltipStyle, padding: "8px 12px" }}>
                  <p style={{ color: d.color, fontWeight: 600, marginBottom: 4 }}>{d.name}</p>
                  <p style={{ color: "oklch(0.70 0.008 75)" }}>Impact : {d.impact}/10</p>
                  <p style={{ color: "oklch(0.70 0.008 75)" }}>Probabilité : {d.probability}/10</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Scatter data={riskData} shape={(props: any) => {
          const { cx, cy, payload } = props;
          return (
            <g>
              <circle cx={cx} cy={cy} r={18} fill={payload.color} fillOpacity={0.15} stroke={payload.color} strokeWidth={1.5} />
              <circle cx={cx} cy={cy} r={5} fill={payload.color} />
              <text x={cx} y={cy - 24} textAnchor="middle" fill="oklch(0.80 0.008 80)" fontSize={9} fontFamily="'DM Sans', sans-serif">
                {payload.name.length > 12 ? payload.name.slice(0, 12) + "…" : payload.name}
              </text>
            </g>
          );
        }} />
        {/* Quadrant lines */}
        <ReferenceLine x={5} stroke="oklch(0.72 0.12 75 / 0.15)" strokeDasharray="4 4" />
        <ReferenceLine y={5} stroke="oklch(0.72 0.12 75 / 0.15)" strokeDasharray="4 4" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

// ─── Recommendations Impact/Effort Chart ─────────────────────────────────────
export function RecoChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={recoData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.72 0.12 75 / 0.08)" />
        <XAxis dataKey="title" tick={{ fill: "oklch(0.65 0.008 75)", fontSize: 9 }} axisLine={false} tickLine={false}
          angle={-30} textAnchor="end" interval={0} />
        <YAxis tick={{ fill: "oklch(0.55 0.008 75)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 10]} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle}
          formatter={(v: number, name: string) => [`${v}/10`, name === "impact" ? "Impact" : "Effort"]} />
        <Legend wrapperStyle={{ color: "oklch(0.65 0.008 75)", fontSize: 11 }} />
        <Bar dataKey="impact" name="Impact" fill="#C9A84C" radius={[4, 4, 0, 0]} maxBarSize={28} />
        <Bar dataKey="effort" name="Effort" fill="#8B9DC3" radius={[4, 4, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Portfolio Price/Score Bubble ─────────────────────────────────────────────
export function PortfolioScatterChart() {
  const data = portfolioData.filter((p: any) => p.score > 0).map((p: any) => ({
    ...p,
    priceMid: Math.round((p.priceMin + p.priceMax) / 2),
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.72 0.12 75 / 0.08)" />
        <XAxis type="number" dataKey="priceMid" name="Prix moyen" unit="€"
          tick={{ fill: "oklch(0.55 0.008 75)", fontSize: 10 }} axisLine={false} tickLine={false}
          label={{ value: "Prix moyen (€)", position: "insideBottom", offset: -10, fill: "oklch(0.45 0.008 75)", fontSize: 10 }} />
        <YAxis type="number" dataKey="score" name="Score critique" domain={[90, 100]}
          tick={{ fill: "oklch(0.55 0.008 75)", fontSize: 10 }} axisLine={false} tickLine={false}
          label={{ value: "Score", angle: -90, position: "insideLeft", fill: "oklch(0.45 0.008 75)", fontSize: 10 }} />
        <Tooltip
          contentStyle={tooltipStyle}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const d = payload[0].payload;
              return (
                <div style={{ ...tooltipStyle, padding: "8px 12px" }}>
                  <p style={{ color: "#C9A84C", fontWeight: 600, marginBottom: 4 }}>{d.name}</p>
                  <p style={{ color: "oklch(0.70 0.008 75)" }}>Prix moyen : {d.priceMid}€</p>
                  <p style={{ color: "oklch(0.70 0.008 75)" }}>Score : {d.score}/100</p>
                  <p style={{ color: "oklch(0.60 0.008 75)", fontSize: 10 }}>{d.tier}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Scatter data={data} shape={(props: any) => {
          const { cx, cy, payload } = props;
          const r = payload.flagship ? 10 : 7;
          return (
            <g>
              <circle cx={cx} cy={cy} r={r + 6} fill="#C9A84C" fillOpacity={0.10} />
              <circle cx={cx} cy={cy} r={r} fill={payload.flagship ? "#C9A84C" : "oklch(0.45 0.010 75)"} stroke="#C9A84C" strokeWidth={1} />
              <text x={cx} y={cy - r - 6} textAnchor="middle" fill="oklch(0.80 0.008 80)" fontSize={9} fontFamily="'DM Sans', sans-serif">
                {payload.name.split(" ")[0]}
              </text>
            </g>
          );
        }} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
