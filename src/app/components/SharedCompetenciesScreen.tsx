import { SHARED_ROWS } from "../data/sharedCompetencies";
import { CompetencyMatrix } from "./CompetencyMatrix";

export function SharedCompetenciesScreen() {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "64px 56px",
      }}
    >
      {/* Page header */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "36px",
            fontWeight: 700,
            color: "#005D1F",
            letterSpacing: "0.12em",
            lineHeight: 1.15,
            marginBottom: "16px",
          }}
        >
          Shared Competencies
        </h1>
        <p
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "16px",
            fontWeight: 400,
            color: "#6E6E6E",
            lineHeight: 1.7,
            maxWidth: "620px",
            margin: 0,
          }}
        >
          Seven competencies expected of every designer at every level, regardless of
          discipline. They are ordered by how strongly our people leaders weight them
          when assessing early-career designers — that weighting shifts as you move up
          the ladder.
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "#5C9770",
          opacity: 0.3,
          marginBottom: "32px",
        }}
      />

      {/* Matrix */}
      <CompetencyMatrix rows={SHARED_ROWS} />
    </div>
  );
}
