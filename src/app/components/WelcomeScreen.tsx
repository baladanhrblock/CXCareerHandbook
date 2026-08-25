import { useState } from "react";
import { LEVELS, type Level } from "../data/sharedCompetencies";
import type { RouteKey } from "./Sidebar";

interface WelcomeScreenProps {
  onNavigate: (route: RouteKey) => void;
  onOpenHandbookAtLevel: (level: Level) => void;
}

export function WelcomeScreen({ onNavigate, onOpenHandbookAtLevel }: WelcomeScreenProps) {
  return (
    <div style={{ width: "100%", padding: "64px 64px 80px" }}>

      {/* Heading */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "48px",
            fontWeight: 700,
            color: "#005D1F",
            letterSpacing: "0.12em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Career Handbook
        </h1>
        <p
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "20px",
            fontWeight: 400,
            color: "#262626",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          How designers grow at Block: what we expect at every level, and how to see where you are.
        </p>
      </div>

      {/* CTA buttons */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "64px" }}>
        <button
          type="button"
          onClick={() => onNavigate("handbook")}
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "14px",
            fontWeight: 700,
            color: "#FFFFFF",
            background: "#005D1F",
            border: "2px solid #005D1F",
            borderRadius: "6px",
            padding: "12px 24px",
            cursor: "pointer",
            letterSpacing: "0.01em",
            transition: "background 0.12s, border-color 0.12s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#004A18";
            e.currentTarget.style.borderColor = "#004A18";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#005D1F";
            e.currentTarget.style.borderColor = "#005D1F";
          }}
        >
          Open the handbook
        </button>
        <button
          type="button"
          onClick={() => onNavigate("where-i-am-now")}
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "14px",
            fontWeight: 700,
            color: "#005D1F",
            background: "transparent",
            border: "2px solid #005D1F",
            borderRadius: "6px",
            padding: "12px 24px",
            cursor: "pointer",
            letterSpacing: "0.01em",
            transition: "background 0.12s, color 0.12s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,93,31,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Start your self-assessment
        </button>
      </div>

      {/* Level spine */}
      <LevelSpine onOpenHandbookAtLevel={onOpenHandbookAtLevel} />

      {/* Body copy */}
      <p
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "15px",
          fontWeight: 400,
          color: "#262626",
          lineHeight: 1.7,
          maxWidth: "620px",
          margin: "0 0 32px",
        }}
      >
        Nine shared competencies apply to every designer, at every level. Each discipline adds its own craft competencies below them.
      </p>

      {/* Closing note */}
      <p
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "14px",
          fontWeight: 400,
          color: "#6E6E6E",
          lineHeight: 1.7,
          maxWidth: "620px",
          margin: 0,
        }}
      >
        This is a career-building guide, not a checklist. Growth is not only upward: it can mean deepening at your level, moving up, or moving between the individual contributor and manager paths. A promotion also requires a business need.
      </p>

    </div>
  );
}

// ─── Level spine ──────────────────────────────────────────────────────────────

function LevelSpine({ onOpenHandbookAtLevel }: { onOpenHandbookAtLevel: (level: Level) => void }) {
  const [hovered, setHovered] = useState<Level | null>(null);

  return (
    <div
      style={{
        marginBottom: "48px",
        // Horizontal on wide, vertical on narrow
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 0,
      }}
    >
      <style>{`
        @media (max-width: 719px) {
          .level-spine { flex-direction: column !important; }
          .level-spine-connector-h { display: none !important; }
          .level-spine-connector-v { display: block !important; }
          .level-spine-stop { flex-direction: row !important; align-items: flex-start !important; }
          .level-spine-dot-col { flex-direction: column !important; align-items: center !important; margin-right: 16px !important; margin-bottom: 0 !important; }
          .level-spine-text { text-align: left !important; }
        }
        @media (min-width: 720px) {
          .level-spine-connector-v { display: none !important; }
        }
      `}</style>

      <div
        className="level-spine"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: "760px",
        }}
      >
        {LEVELS.map((level, i) => {
          const isHovered = hovered === level.key;
          const isLast = i === LEVELS.length - 1;

          return (
            <div
              key={level.key}
              className="level-spine-stop"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: isLast ? "0 0 auto" : 1,
              }}
            >
              {/* Label + dot + connector row */}
              <div
                className="level-spine-dot-col"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "12px",
                }}
              >
                {/* Horizontal connector + dot */}
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                  {/* Left half-line (hidden for first item) */}
                  <div
                    className="level-spine-connector-h"
                    style={{
                      flex: 1,
                      height: "2px",
                      background: i === 0 ? "transparent" : "#5C9770",
                      opacity: 0.4,
                    }}
                  />
                  {/* Dot */}
                  <button
                    type="button"
                    onClick={() => onOpenHandbookAtLevel(level.key)}
                    onMouseEnter={() => setHovered(level.key)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={`Open handbook at ${level.label} level`}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: isHovered ? "#005D1F" : "#5C9770",
                      border: isHovered ? "2px solid #005D1F" : "2px solid #5C9770",
                      cursor: "pointer",
                      padding: 0,
                      flexShrink: 0,
                      transition: "background 0.12s, border-color 0.12s, transform 0.12s",
                      transform: isHovered ? "scale(1.35)" : "scale(1)",
                      outline: "none",
                    }}
                    onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,93,31,0.25)"; }}
                    onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                  />
                  {/* Right half-line (hidden for last item) */}
                  <div
                    className="level-spine-connector-h"
                    style={{
                      flex: 1,
                      height: "2px",
                      background: isLast ? "transparent" : "#5C9770",
                      opacity: 0.4,
                    }}
                  />
                </div>

                {/* Vertical connector for mobile stacked view */}
                <div
                  className="level-spine-connector-v"
                  style={{
                    display: "none",
                    width: "2px",
                    height: isLast ? "0" : "32px",
                    background: "#5C9770",
                    opacity: 0.4,
                    flexShrink: 0,
                  }}
                />
              </div>

              {/* Text block */}
              <button
                type="button"
                onClick={() => onOpenHandbookAtLevel(level.key)}
                onMouseEnter={() => setHovered(level.key)}
                onMouseLeave={() => setHovered(null)}
                className="level-spine-text"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 8px",
                  textAlign: "center",
                  fontFamily: "var(--font-brand)",
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: isHovered ? "#005D1F" : "#003512",
                    lineHeight: 1.2,
                    marginBottom: "4px",
                    transition: "color 0.12s",
                  }}
                >
                  {level.label}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: isHovered ? "#005D1F" : "#6E6E6E",
                    lineHeight: 1.5,
                    maxWidth: "180px",
                    transition: "color 0.12s",
                  }}
                >
                  {level.intent}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
