import type { DisciplineData } from "../data/disciplines";
import { SHARED_ROWS } from "../data/sharedCompetencies";
import { CompetencyMatrix } from "./CompetencyMatrix";

// Small bullseye motif — reused from Welcome screen as a decorative accent
function BullseyeAccent() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, opacity: 0.55 }}
    >
      <circle cx="11" cy="11" r="9.5" stroke="#005D1F" strokeWidth="1.5" />
      <circle cx="11" cy="11" r="5.5" stroke="#005D1F" strokeWidth="1.5" />
      <circle cx="11" cy="11" r="2.5" fill="#005D1F" />
    </svg>
  );
}

interface DisciplinePageProps {
  discipline: DisciplineData;
}

export function DisciplinePage({ discipline }: DisciplinePageProps) {
  const sections = [
    {
      id: "shared",
      label: "Shared competencies — expected of every designer",
      collapsible: true,
      rows: SHARED_ROWS,
    },
    {
      id: "craft",
      label: `${discipline.title} craft`,
      rows: discipline.uniqueRows,
    },
  ];

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 56px" }}>
      {/* Page header */}
      <div style={{ marginBottom: "32px" }}>
        {/* Title row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          <BullseyeAccent />
          <h1
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "36px",
              fontWeight: 700,
              color: "#005D1F",
              letterSpacing: "0.12em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {discipline.title}
          </h1>

          {discipline.badge && (
            <span
              style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: "20px",
                background: "#00E95C",
                fontFamily: "var(--font-brand)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#003512",
                flexShrink: 0,
              }}
            >
              {discipline.badge}
            </span>
          )}
        </div>

        <p
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "16px",
            fontWeight: 400,
            color: "#6E6E6E",
            lineHeight: 1.7,
            maxWidth: "620px",
            margin: "0 0 8px",
          }}
        >
          {discipline.description}
        </p>

        {/* Aspirational note (Experience Strategy) */}
        {discipline.note && (
          <div
            style={{
              marginTop: "14px",
              padding: "12px 16px",
              background: "#F8F8F5",
              border: "1px solid #D4D4D3",
              borderLeft: "4px solid #00E95C",
              borderRadius: "4px",
              fontFamily: "var(--font-brand)",
              fontSize: "13px",
              fontWeight: 400,
              color: "#6E6E6E",
              lineHeight: 1.6,
              maxWidth: "680px",
            }}
          >
            {discipline.note}
          </div>
        )}
      </div>

      {/* Skill chips */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#9FA4AA",
            marginBottom: "10px",
          }}
        >
          Craft skills
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {discipline.skillChips.map((chip) => (
            <span
              key={chip}
              style={{
                display: "inline-block",
                padding: "5px 12px",
                borderRadius: "20px",
                background: "#F1F5F7",
                border: "1px solid #D6DAE0",
                fontFamily: "var(--font-brand)",
                fontSize: "12px",
                fontWeight: discipline.chipsBold ? 700 : 400,
                color: "#262626",
                transition: "border-color 0.12s",
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#5C9770", opacity: 0.3, marginBottom: "32px" }} />

      {/* Matrix — shared rows grouped on top, craft rows below */}
      <CompetencyMatrix sections={sections} />
    </div>
  );
}
