import { useState } from "react";
import type { Level } from "../data/sharedCompetencies";
import { LEVELS } from "../data/sharedCompetencies";
import { DISCIPLINES } from "../data/disciplines";
import type { RouteKey } from "./Sidebar";

// ─── Constants ────────────────────────────────────────────────────────────────

const DISCIPLINE_OPTIONS: { id: string; label: string; description: string }[] = [
  { id: "ux-design", label: "UX Design", description: "Interfaces & product experiences" },
  { id: "research", label: "Research", description: "Evidence, methods & insight" },
  { id: "content-design", label: "Content Design", description: "Words, structure & voice" },
  { id: "service-design", label: "Service Design", description: "End-to-end services & systems" },
  { id: "experience-strategy", label: "Experience Strategy", description: "Vision, outcomes & portfolio" },
];

const LEVEL_OPTIONS: { key: Level; label: string; intent: string }[] = LEVELS;

const NEXT_LEVEL: Partial<Record<Level, Level>> = {
  associate: "mid",
  mid: "senior",
  senior: "lead",
  lead: "principal",
};

const ADJACENT_DISCIPLINE: Record<string, string> = {
  "ux-design": "research",
  research: "service-design",
  "content-design": "ux-design",
  "service-design": "experience-strategy",
  "experience-strategy": "service-design",
};

const REFLECTION_QUESTIONS: { text: string; provenance: "v1" | "draft" }[] = [
  { text: "Does my department need this position?", provenance: "v1" },
  { text: "Does Block have this need in another department?", provenance: "v1" },
  { text: "What themes and differentiators have I demonstrated consistently from the next level?", provenance: "v1" },
  { text: "Where do I want to be in the next 1–3 years?", provenance: "draft" },
  { text: "What skills or knowledge do I need to develop in the next 6–18 months?", provenance: "draft" },
  { text: "What can I contribute in my current role right now?", provenance: "draft" },
];

// ─── Shared micro-components ──────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-brand)",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#9FA4AA",
        marginBottom: "12px",
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-brand)",
        fontSize: "20px",
        fontWeight: 700,
        color: "#005D1F",
        letterSpacing: "0.05em",
        marginBottom: "4px",
      }}
    >
      {children}
    </h2>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["Select", "Your Growth", "Reflection"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        marginBottom: "40px",
      }}
    >
      {steps.map((label, i) => {
        const idx = i + 1;
        const isActive = step === idx;
        const isDone = step > idx;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: isDone ? "#005D1F" : isActive ? "#00E95C" : "#E8EEF1",
                  border: isActive ? "none" : isDone ? "none" : "1px solid #D4D4D3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-brand)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: isDone ? "#FFFFFF" : isActive ? "#003512" : "#9FA4AA",
                  flexShrink: 0,
                }}
              >
                {isDone ? "✓" : idx}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "13px",
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? "#005D1F" : isDone ? "#005D1F" : "#9FA4AA",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: "48px",
                  height: "1px",
                  background: step > idx ? "#005D1F" : "#D4D4D3",
                  margin: "0 12px",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Select discipline + level ────────────────────────────────────────

function SelectionCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 2px #005D1F"; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = selected ? "none" : "none"; }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "14px 18px",
        background: selected ? "#005D1F" : hovered ? "#F1F5F7" : "#F8F8F5",
        border: `2px solid ${selected ? "#005D1F" : hovered ? "#5C9770" : "#D4D4D3"}`,
        borderRadius: "8px",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.12s, border-color 0.12s",
        fontFamily: "var(--font-brand)",
        outline: "none",
        flex: 1,
      }}
    >
      <span
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: selected ? "#FFFFFF" : "#262626",
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
      {description && (
        <span
          style={{
            fontSize: "11px",
            fontWeight: 400,
            color: selected ? "rgba(255,255,255,0.75)" : "#9FA4AA",
            marginTop: "3px",
          }}
        >
          {description}
        </span>
      )}
      {selected && (
        <span
          style={{
            marginTop: "6px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#00E95C",
          }}
        >
          ✓ Selected
        </span>
      )}
    </button>
  );
}

function Step1({
  disciplineId,
  level,
  onDisciplineChange,
  onLevelChange,
  onContinue,
}: {
  disciplineId: string | null;
  level: Level | null;
  onDisciplineChange: (id: string) => void;
  onLevelChange: (l: Level) => void;
  onContinue: () => void;
}) {
  const canContinue = disciplineId !== null && level !== null;

  return (
    <div>
      {/* Discipline */}
      <div style={{ marginBottom: "36px" }}>
        <SectionTitle>Step 1 of 3 · Select your discipline</SectionTitle>
        <div style={{ display: "flex", gap: "10px" }}>
          {DISCIPLINE_OPTIONS.map((d) => (
            <SelectionCard
              key={d.id}
              label={d.label}
              description={d.description}
              selected={disciplineId === d.id}
              onClick={() => onDisciplineChange(d.id)}
            />
          ))}
        </div>
      </div>

      {/* Level */}
      <div style={{ marginBottom: "40px" }}>
        <SectionTitle>Select your current level</SectionTitle>
        <div style={{ display: "flex", gap: "10px" }}>
          {LEVEL_OPTIONS.map((l) => (
            <SelectionCard
              key={l.key}
              label={l.label}
              description={l.intent}
              selected={level === l.key}
              onClick={() => onLevelChange(l.key)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!canContinue}
        style={{
          padding: "12px 28px",
          background: canContinue ? "#00E95C" : "#E8EEF1",
          border: "none",
          borderRadius: "6px",
          fontFamily: "var(--font-brand)",
          fontSize: "14px",
          fontWeight: 700,
          color: canContinue ? "#003512" : "#9FA4AA",
          cursor: canContinue ? "pointer" : "not-allowed",
          transition: "background 0.12s, transform 0.1s",
          letterSpacing: "0.02em",
        }}
        onMouseEnter={(e) => { if (canContinue) e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
      >
        See your growth →
      </button>
    </div>
  );
}

// ─── Step 2A: Advance (delta to next level) ───────────────────────────────────

function AdvanceDelta({ disciplineId, level }: { disciplineId: string; level: Level }) {
  const nextLevel = NEXT_LEVEL[level];
  if (!nextLevel) return null;

  const discipline = DISCIPLINES[disciplineId];
  const allRows = [...SHARED_ROWS, ...discipline.uniqueRows];
  const currentLabel = LEVELS.find((l) => l.key === level)!.label;
  const nextLabel = LEVELS.find((l) => l.key === nextLevel)!.label;

  return (
    <div>
      <div
        style={{
          overflowX: "auto",
          borderRadius: "6px",
          border: "1px solid #D4D4D3",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: "600px",
            borderCollapse: "collapse",
          }}
        >
          <colgroup>
            <col style={{ width: "180px" }} />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th
                style={{
                  padding: "10px 14px",
                  background: "#003512",
                  fontFamily: "var(--font-brand)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  textAlign: "left",
                }}
              >
                Competency
              </th>
              <th
                style={{
                  padding: "10px 14px",
                  background: "#003512",
                  fontFamily: "var(--font-brand)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  textAlign: "left",
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {currentLabel} (now)
              </th>
              <th
                style={{
                  padding: "10px 14px",
                  background: "#003512",
                  fontFamily: "var(--font-brand)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "#00E95C",
                  textAlign: "left",
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {nextLabel} ▶
              </th>
            </tr>
          </thead>
          <tbody>
            {allRows.map((row, i) => {
              const currCell = row.cells[level];
              const nextCell = row.cells[nextLevel];
              const isShared = row.type === "shared";
              const rowBg = isShared ? "#D6E5DB" : "#F1F5F7";

              return (
                <tr key={row.id}>
                  <td
                    style={{
                      padding: "11px 14px",
                      background: rowBg,
                      borderTop: i > 0 ? "1px solid #D4D4D3" : "none",
                      borderRight: "1px solid #D4D4D3",
                      verticalAlign: "top",
                    }}
                  >
                    <div style={{ fontFamily: "var(--font-brand)", fontSize: "12px", fontWeight: 700, color: "#003512" }}>
                      {row.label}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "11px 14px",
                      background: rowBg,
                      borderTop: i > 0 ? "1px solid #D4D4D3" : "none",
                      borderRight: "1px solid #D4D4D3",
                      verticalAlign: "top",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-brand)", fontSize: "12px", fontWeight: currCell.provenance === "draft" ? 700 : 400, color: "#6E6E6E", lineHeight: 1.5 }}>
                      {currCell.text}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "11px 14px",
                      background: isShared ? "#C4D9CB" : "#E8EEF1",
                      borderTop: i > 0 ? "1px solid #D4D4D3" : "none",
                      verticalAlign: "top",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-brand)", fontSize: "12px", fontWeight: nextCell.provenance === "draft" ? 700 : 400, color: "#262626", lineHeight: 1.5 }}>
                      {nextCell.text}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Step 2C: Avenues ─────────────────────────────────────────────────────────

function AvenueCard({
  title,
  body,
  cta,
  onClick,
  accent,
}: {
  title: string;
  body: string;
  cta?: string;
  onClick?: () => void;
  accent?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "20px 22px",
        background: "#F8F8F5",
        borderTop: `1px solid ${hovered && onClick ? "#005D1F" : "#D4D4D3"}`,
        borderRight: `1px solid ${hovered && onClick ? "#005D1F" : "#D4D4D3"}`,
        borderBottom: `1px solid ${hovered && onClick ? "#005D1F" : "#D4D4D3"}`,
        borderLeft: `4px solid ${accent ? "#00E95C" : "#5C9770"}`,
        borderRadius: "6px",
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.12s, box-shadow 0.12s",
        boxShadow: hovered && onClick ? "0 2px 12px rgba(0,93,31,0.08)" : "none",
        flex: 1,
      }}
    >
      <div style={{ fontFamily: "var(--font-brand)", fontSize: "14px", fontWeight: 700, color: "#005D1F", marginBottom: "6px" }}>
        {title}
      </div>
      <div style={{ fontFamily: "var(--font-brand)", fontSize: "13px", fontWeight: 400, color: "#6E6E6E", lineHeight: 1.6, marginBottom: cta ? "10px" : 0 }}>
        {body}
      </div>
      {cta && (
        <div style={{ fontFamily: "var(--font-brand)", fontSize: "12px", fontWeight: 700, color: "#005D1F" }}>
          {cta} →
        </div>
      )}
    </div>
  );
}

function Avenues({
  disciplineId,
  level,
  onNavigate,
}: {
  disciplineId: string;
  level: Level;
  onNavigate: (r: RouteKey) => void;
}) {
  const adjacentId = ADJACENT_DISCIPLINE[disciplineId] as RouteKey;
  const adjacentLabel = DISCIPLINES[adjacentId]?.title ?? adjacentId;
  const cards: React.ReactNode[] = [];

  if ((disciplineId === "ux-design" || disciplineId === "content-design") && level === "senior") {
    cards.push(
      <AvenueCard
        key="poc"
        accent
        title="Interim Lead / POC"
        body="High-performing Seniors may step into an interim Lead (POC) role when a team or section lacks a Lead. POC responsibilities are part of the Lead role."
      />
    );
  }

  cards.push(
    <AvenueCard
      key="adjacent"
      title={`Explore ${adjacentLabel}`}
      body={`An adjacent discipline that complements your current track — broadens perspective and opens cross-discipline career paths.`}
      cta={`Go to ${adjacentLabel}`}
      onClick={() => onNavigate(adjacentId)}
    />
  );

  if (level === "lead" || level === "principal") {
    cards.push(
      <AvenueCard
        key="management"
        title="Management track"
        body="At Lead and above you can also explore the management track (Manager → Director)."
      />
    );
  }

  return (
    <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
      {cards}
    </div>
  );
}

// ─── Step 2: Results ──────────────────────────────────────────────────────────

function Step2({
  disciplineId,
  level,
  onNavigate,
  onContinue,
  onBack,
}: {
  disciplineId: string;
  level: Level;
  onNavigate: (r: RouteKey) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const nextLevel = NEXT_LEVEL[level];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {/* A: Advance */}
      {nextLevel && (
        <section aria-labelledby="advance-heading">
          <SectionTitle>A · Advance</SectionTitle>
          <SectionHeading>
            <span id="advance-heading">
              {LEVELS.find((l) => l.key === level)!.label} → {LEVELS.find((l) => l.key === nextLevel)!.label}
            </span>
          </SectionHeading>
          <p style={{ fontFamily: "var(--font-brand)", fontSize: "13px", color: "#6E6E6E", marginBottom: "20px", lineHeight: 1.6 }}>
            Side-by-side comparison of all competencies between your current and next level.
          </p>
          <AdvanceDelta disciplineId={disciplineId} level={level} />
        </section>
      )}

      {/* B: Avenues */}
      <section aria-labelledby="avenues-heading">
        <SectionTitle>B · Avenues</SectionTitle>
        <SectionHeading>
          <span id="avenues-heading">Paths open to you</span>
        </SectionHeading>
        <p style={{ fontFamily: "var(--font-brand)", fontSize: "13px", color: "#6E6E6E", marginBottom: "20px", lineHeight: 1.6 }}>
          Based on your discipline and level.
        </p>
        <Avenues disciplineId={disciplineId} level={level} onNavigate={onNavigate} />
      </section>

      {/* Nav */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            background: "none",
            border: "1px solid #D4D4D3",
            borderRadius: "6px",
            fontFamily: "var(--font-brand)",
            fontSize: "13px",
            fontWeight: 400,
            color: "#6E6E6E",
            cursor: "pointer",
          }}
        >
          ← Change selection
        </button>
        <button
          onClick={onContinue}
          style={{
            padding: "12px 28px",
            background: "#00E95C",
            border: "none",
            borderRadius: "6px",
            fontFamily: "var(--font-brand)",
            fontSize: "14px",
            fontWeight: 700,
            color: "#003512",
            cursor: "pointer",
            transition: "transform 0.1s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Go to reflection →
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Reflection ────────────────────────────────────────────────────────

interface ReflectionState {
  checked: boolean[];
  notes: string[];
}

function Step3({
  disciplineId,
  level,
  onBack,
}: {
  disciplineId: string;
  level: Level;
  onBack: () => void;
}) {
  const [state, setState] = useState<ReflectionState>({
    checked: REFLECTION_QUESTIONS.map(() => false),
    notes: REFLECTION_QUESTIONS.map(() => ""),
  });

  const discipline = DISCIPLINES[disciplineId];
  const levelLabel = LEVELS.find((l) => l.key === level)!.label;

  function toggleCheck(i: number) {
    setState((prev) => {
      const checked = [...prev.checked];
      checked[i] = !checked[i];
      return { ...prev, checked };
    });
  }

  function setNote(i: number, value: string) {
    setState((prev) => {
      const notes = [...prev.notes];
      notes[i] = value;
      return { ...prev, notes };
    });
  }

  return (
    <div>
      {/* Not-saved notice */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 14px",
          background: "#FFF3CD",
          border: "1px solid #F5CC02",
          borderRadius: "6px",
          marginBottom: "28px",
        }}
      >
        <span style={{ fontFamily: "var(--font-brand)", fontSize: "12px", fontWeight: 700, color: "#7A5F00", letterSpacing: "0.04em" }}>
          ⚠ Not saved — responses reset on refresh. Copy or print before leaving.
        </span>
      </div>

      {/* Print header (visible only in print) */}
      <div className="print-only" style={{ display: "none" }}>
        <div style={{ fontFamily: "var(--font-brand)", fontSize: "18px", fontWeight: 700, color: "#005D1F", marginBottom: "4px" }}>
          Design Career Handbook — Reflection
        </div>
        <div style={{ fontFamily: "var(--font-brand)", fontSize: "13px", color: "#6E6E6E", marginBottom: "20px" }}>
          {discipline.title} · {levelLabel}
        </div>
      </div>

      {/* Questions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
        {REFLECTION_QUESTIONS.map((q, i) => {
          const isDraft = q.provenance === "draft";
          return (
            <div
              key={i}
              style={{
                padding: "18px 20px",
                background: "#F8F8F5",
                borderTop: `1px solid ${state.checked[i] ? "#5C9770" : "#D4D4D3"}`,
                borderRight: `1px solid ${state.checked[i] ? "#5C9770" : "#D4D4D3"}`,
                borderBottom: `1px solid ${state.checked[i] ? "#5C9770" : "#D4D4D3"}`,
                borderLeft: `4px solid ${state.checked[i] ? "#005D1F" : isDraft ? "#F5CC02" : "#D4D4D3"}`,
                borderRadius: "6px",
                transition: "border-color 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                <input
                  type="checkbox"
                  id={`q-${i}`}
                  checked={state.checked[i]}
                  onChange={() => toggleCheck(i)}
                  style={{ marginTop: "2px", accentColor: "#005D1F", width: "16px", height: "16px", cursor: "pointer", flexShrink: 0 }}
                />
                <label
                  htmlFor={`q-${i}`}
                  style={{
                    fontFamily: "var(--font-brand)",
                    fontSize: "14px",
                    fontWeight: isDraft ? 700 : 400,
                    color: "#262626",
                    lineHeight: 1.5,
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {q.text}
                  {isDraft && (
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#7A5F00",
                        background: "#FFF3CD",
                        padding: "1px 6px",
                        borderRadius: "3px",
                        verticalAlign: "middle",
                      }}
                    >
                      Draft
                    </span>
                  )}
                </label>
              </div>
              <textarea
                placeholder="Your notes…"
                value={state.notes[i]}
                onChange={(e) => setNote(i, e.target.value)}
                rows={2}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "8px 10px",
                  background: "#FFFFFF",
                  border: "1px solid #D4D4D3",
                  borderRadius: "4px",
                  fontFamily: "var(--font-brand)",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#262626",
                  lineHeight: 1.5,
                  resize: "vertical",
                  outline: "none",
                  transition: "border-color 0.12s",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#005D1F"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#D4D4D3"; }}
              />
            </div>
          );
        })}
      </div>

      {/* Action row */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            background: "none",
            border: "1px solid #D4D4D3",
            borderRadius: "6px",
            fontFamily: "var(--font-brand)",
            fontSize: "13px",
            fontWeight: 400,
            color: "#6E6E6E",
            cursor: "pointer",
          }}
        >
          ← Back to results
        </button>

        <button
          onClick={() => window.print()}
          style={{
            padding: "12px 28px",
            background: "#00E95C",
            border: "none",
            borderRadius: "6px",
            fontFamily: "var(--font-brand)",
            fontSize: "14px",
            fontWeight: 700,
            color: "#003512",
            cursor: "pointer",
            transition: "transform 0.1s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Take this to your leader ↗
        </button>
      </div>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

interface WhereIAmNowProps {
  onNavigate: (r: RouteKey) => void;
}

export function WhereIAmNow({ onNavigate }: WhereIAmNowProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [disciplineId, setDisciplineId] = useState<string | null>(null);
  const [level, setLevel] = useState<Level | null>(null);

  function handleContinueToResults() {
    if (disciplineId && level) setStep(2);
  }

  function handleContinueToReflection() {
    setStep(3);
  }

  function handleBackToSelect() {
    setStep(1);
  }

  function handleBackToResults() {
    setStep(2);
  }

  return (
    <div style={{ width: "100%", padding: "64px 64px 80px" }}>
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
            marginBottom: "12px",
          }}
        >
          Where I Am Now
        </h1>
        <p
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "16px",
            fontWeight: 400,
            color: "#6E6E6E",
            lineHeight: 1.7,
            maxWidth: "580px",
            margin: 0,
          }}
        >
          A short guided flow to locate yourself on the ladder and prepare for a growth conversation with your leader.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#5C9770", opacity: 0.3, marginBottom: "36px" }} />

      {/* Step indicator */}
      <StepIndicator step={step} />

      {/* Step content */}
      {step === 1 && (
        <Step1
          disciplineId={disciplineId}
          level={level}
          onDisciplineChange={setDisciplineId}
          onLevelChange={setLevel}
          onContinue={handleContinueToResults}
        />
      )}
      {step === 2 && disciplineId && level && (
        <Step2
          disciplineId={disciplineId}
          level={level}
          onNavigate={onNavigate}
          onContinue={handleContinueToReflection}
          onBack={handleBackToSelect}
        />
      )}
      {step === 3 && disciplineId && level && (
        <Step3
          disciplineId={disciplineId}
          level={level}
          onBack={handleBackToResults}
        />
      )}
    </div>
  );
}
