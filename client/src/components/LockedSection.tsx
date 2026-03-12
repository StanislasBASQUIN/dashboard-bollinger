/*
 * LockedSection — Bollinger CI Dashboard Lead Magnet
 * Composant de flou overlay pour sections premium verrouillées
 * Design: Art Déco Prestige · Noir + Or Champagne
 */

import { Lock, Sparkles, ChevronRight } from "lucide-react";
import { useAccess } from "@/contexts/AccessContext";

interface LockedSectionProps {
  children: React.ReactNode;
  title: string;
  description: string;
  previewLines?: number; // nombre de lignes visibles avant flou (défaut: 3)
}

export function LockedSection({ children, title, description, previewLines = 3 }: LockedSectionProps) {
  const { isFullAccess, openPasswordModal } = useAccess();

  if (isFullAccess) return <>{children}</>;

  return (
    <div className="locked-section-wrapper relative">
      {/* Contenu flouté en arrière-plan */}
      <div
        className="locked-content-blur"
        style={{
          filter: "blur(6px)",
          opacity: 0.45,
          pointerEvents: "none",
          userSelect: "none",
          maxHeight: "420px",
          overflow: "hidden",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)",
        }}
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Overlay semi-transparent avec CTA */}
      <div
        className="locked-overlay absolute inset-0 flex flex-col items-center justify-center px-6 py-8"
        style={{
          background: "linear-gradient(to bottom, oklch(0.10 0.012 65 / 0.30) 0%, oklch(0.10 0.012 65 / 0.82) 40%, oklch(0.10 0.012 65 / 0.96) 100%)",
          backdropFilter: "blur(1px)",
          zIndex: 10,
        }}
      >
        {/* Icône cadenas animée */}
        <div
          className="lock-icon-wrapper mb-4 flex items-center justify-center rounded-full"
          style={{
            width: "56px",
            height: "56px",
            background: "oklch(0.72 0.12 75 / 0.12)",
            border: "1.5px solid oklch(0.72 0.12 75 / 0.40)",
            boxShadow: "0 0 24px oklch(0.72 0.12 75 / 0.15)",
          }}
        >
          <Lock size={22} style={{ color: "oklch(0.72 0.12 75)" }} />
        </div>

        {/* Titre de la section verrouillée */}
        <p
          className="text-center mb-2 font-semibold"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.05rem",
            color: "oklch(0.95 0.008 80)",
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>

        {/* Description */}
        <p
          className="text-center mb-5 max-w-xs leading-relaxed"
          style={{
            fontSize: "0.78rem",
            color: "oklch(0.62 0.010 75)",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>

        {/* Badge "Rapport complet" */}
        <div
          className="flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full"
          style={{
            background: "oklch(0.72 0.12 75 / 0.10)",
            border: "1px solid oklch(0.72 0.12 75 / 0.25)",
          }}
        >
          <Sparkles size={11} style={{ color: "oklch(0.72 0.12 75)" }} />
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "oklch(0.72 0.12 75)",
            }}
          >
            Rapport complet
          </span>
        </div>

        {/* CTA principal */}
        <button
          onClick={openPasswordModal}
          className="unlock-cta flex items-center gap-2 px-5 py-2.5 rounded font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, oklch(0.72 0.12 75) 0%, oklch(0.62 0.14 65) 100%)",
            color: "oklch(0.10 0.012 65)",
            fontSize: "0.82rem",
            letterSpacing: "0.04em",
            boxShadow: "0 4px 20px oklch(0.72 0.12 75 / 0.30)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <Lock size={13} />
          Accéder au rapport complet
          <ChevronRight size={13} />
        </button>

        {/* Sous-texte */}
        <p
          className="mt-3 text-center"
          style={{ fontSize: "0.68rem", color: "oklch(0.42 0.008 75)" }}
        >
          Entrez votre code d'accès ou contactez-nous
        </p>
      </div>
    </div>
  );
}

/* ─── Password Modal ─────────────────────────────────────────────────────── */
export function PasswordModal() {
  const { showPasswordModal, closePasswordModal, unlock, isFullAccess, lock } = useAccess();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!showPasswordModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = unlock(input);
    if (ok) {
      setSuccess(true);
      setError(false);
      setTimeout(() => closePasswordModal(), 1200);
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "oklch(0.05 0.010 65 / 0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) closePasswordModal(); }}
    >
      <div
        className="w-full max-w-sm rounded-xl p-6"
        style={{
          background: "oklch(0.14 0.012 65)",
          border: "1px solid oklch(0.72 0.12 75 / 0.25)",
          boxShadow: "0 24px 80px oklch(0.05 0.010 65 / 0.80)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{ width: "40px", height: "40px", background: "oklch(0.72 0.12 75 / 0.12)", border: "1px solid oklch(0.72 0.12 75 / 0.30)" }}
          >
            <Lock size={16} style={{ color: "oklch(0.72 0.12 75)" }} />
          </div>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "oklch(0.95 0.008 80)" }}>
              Accès rapport complet
            </p>
            <p style={{ fontSize: "0.72rem", color: "oklch(0.50 0.008 75)" }}>
              Bollinger CI Dashboard · Mars 2026
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-4" style={{ height: "1px", background: "oklch(0.72 0.12 75 / 0.12)" }} />

        {success ? (
          <div className="text-center py-4">
            <div
              className="mx-auto mb-3 flex items-center justify-center rounded-full"
              style={{ width: "48px", height: "48px", background: "oklch(0.65 0.15 145 / 0.15)" }}
            >
              <Sparkles size={20} style={{ color: "oklch(0.65 0.15 145)" }} />
            </div>
            <p style={{ color: "oklch(0.65 0.15 145)", fontWeight: 600, fontSize: "0.9rem" }}>Accès déverrouillé</p>
            <p style={{ color: "oklch(0.50 0.008 75)", fontSize: "0.75rem", marginTop: "4px" }}>Toutes les sections sont maintenant accessibles</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(0.55 0.008 75)", marginBottom: "8px" }}>
              Code d'accès
            </label>
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false); }}
              placeholder="Entrez votre code…"
              autoFocus
              className="w-full px-4 py-2.5 rounded outline-none transition-all"
              style={{
                background: "oklch(0.18 0.010 65)",
                border: `1px solid ${error ? "oklch(0.60 0.20 25 / 0.60)" : "oklch(0.72 0.12 75 / 0.20)"}`,
                color: "oklch(0.90 0.008 80)",
                fontSize: "0.875rem",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            {error && (
              <p style={{ color: "oklch(0.60 0.20 25)", fontSize: "0.72rem", marginTop: "6px" }}>
                Code incorrect. Contactez-nous pour obtenir l'accès.
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-4 py-2.5 rounded font-semibold transition-all duration-200 hover:opacity-90 active:scale-98"
              style={{
                background: "linear-gradient(135deg, oklch(0.72 0.12 75) 0%, oklch(0.62 0.14 65) 100%)",
                color: "oklch(0.10 0.012 65)",
                fontSize: "0.82rem",
                letterSpacing: "0.04em",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Déverrouiller le rapport
            </button>

            <div className="mt-4 pt-4" style={{ borderTop: "1px solid oklch(0.72 0.12 75 / 0.10)" }}>
              <p style={{ fontSize: "0.70rem", color: "oklch(0.42 0.008 75)", textAlign: "center" }}>
                Vous n'avez pas de code d'accès ?{" "}
                <a
                  href="mailto:contact@example.com"
                  style={{ color: "oklch(0.72 0.12 75)", textDecoration: "underline" }}
                >
                  Contactez-nous
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Fix: useState import needed in same file
import { useState } from "react";
