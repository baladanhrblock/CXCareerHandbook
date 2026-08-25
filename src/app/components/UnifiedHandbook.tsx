import { useEffect, useRef, useState } from "react";
import {
  DISCIPLINES,
  DISCIPLINE_ORDER,
  type DisciplineId,
} from "../data/disciplines";
import { SHARED_ROWS, LEVELS, type Level } from "../data/sharedCompetencies";
import { CompetencyMatrix, type MatrixSection } from "./CompetencyMatrix";

// Small bullseye motif — reused as a decorative accent
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

// ─── Discipline filter chips (radiogroup) ─────────────────────────────────────

function DisciplineChips({
  value,
  onChange,
}: {
  value: DisciplineId;
  onChange: (id: DisciplineId) => void;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (index + 1) % DISCIPLINE_ORDER.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (index - 1 + DISCIPLINE_ORDER.length) % DISCIPLINE_ORDER.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = DISCIPLINE_ORDER.length - 1;
    }
    if (nextIndex !== null) {
      e.preventDefault();
      const nextId = DISCIPLINE_ORDER[nextIndex];
      onChange(nextId);
      refs.current[nextId]?.focus();
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Filter craft competencies by discipline"
      style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
    >
      {DISCIPLINE_ORDER.map((id, index) => {
        const selected = id === value;
        return (
          <button
            key={id}
            ref={(el) => {
              refs.current[id] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              fontFamily: "var(--font-brand)",
              fontSize: "13px",
              fontWeight: selected ? 700 : 400,
              letterSpacing: "0.01em",
              cursor: "pointer",
              background: selected ? "#003512" : "#F1F5F7",
              color: selected ? "#FFFFFF" : "#003512",
              border: selected ? "1px solid #003512" : "1px solid #D6E5DB",
              transition: "background 0.12s, color 0.12s, border-color 0.12s",
            }}
            onMouseEnter={(e) => {
              if (!selected) e.currentTarget.style.background = "#E6EEF0";
            }}
            onMouseLeave={(e) => {
              if (!selected) e.currentTarget.style.background = "#F1F5F7";
            }}
          >
            {DISCIPLINES[id].title}
          </button>
        );
      })}
    </div>
  );
}

// ─── Level filter chips (radiogroup) ─────────────────────────────────────────

type LevelFilter = "all" | Level;

const LEVEL_OPTIONS: { id: LevelFilter; label: string }[] = [
  { id: "all", label: "All levels" },
  { id: "associate", label: "Associate" },
  { id: "mid", label: "Mid" },
  { id: "senior", label: "Senior" },
  { id: "lead", label: "Lead" },
  { id: "principal", label: "Principal" },
];

function LevelChips({
  value,
  onChange,
}: {
  value: LevelFilter;
  onChange: (id: LevelFilter) => void;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (index + 1) % LEVEL_OPTIONS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (index - 1 + LEVEL_OPTIONS.length) % LEVEL_OPTIONS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = LEVEL_OPTIONS.length - 1;
    }
    if (nextIndex !== null) {
      e.preventDefault();
      const nextId = LEVEL_OPTIONS[nextIndex].id;
      onChange(nextId);
      refs.current[nextId]?.focus();
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Filter competency columns by level"
      style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
    >
      {LEVEL_OPTIONS.map(({ id, label }, index) => {
        const selected = id === value;
        return (
          <button
            key={id}
            ref={(el) => {
              refs.current[id] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              fontFamily: "var(--font-brand)",
              fontSize: "13px",
              fontWeight: selected ? 700 : 400,
              letterSpacing: "0.01em",
              cursor: "pointer",
              background: selected ? "#003512" : "#F1F5F7",
              color: selected ? "#FFFFFF" : "#003512",
              border: selected ? "1px solid #003512" : "1px solid #D6E5DB",
              transition: "background 0.12s, color 0.12s, border-color 0.12s",
            }}
            onMouseEnter={(e) => {
              if (!selected) e.currentTarget.style.background = "#E6EEF0";
            }}
            onMouseLeave={(e) => {
              if (!selected) e.currentTarget.style.background = "#F1F5F7";
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Compute visible level columns from the filter ────────────────────────────

const LEVEL_ORDER: Level[] = ["associate", "mid", "senior", "lead", "principal"];

function computeVisibleLevels(filter: LevelFilter): Level[] | undefined {
  if (filter === "all") return undefined;
  const idx = LEVEL_ORDER.indexOf(filter);
  if (idx === LEVEL_ORDER.length - 1) return [filter];
  return [filter, LEVEL_ORDER[idx + 1]];
}

// ─── Unified handbook page ────────────────────────────────────────────────────

interface UnifiedHandbookProps {
  discipline: DisciplineId;
  onSelectDiscipline: (id: DisciplineId) => void;
  levelFilter: LevelFilter;
  onSelectLevel: (id: LevelFilter) => void;
}

export function UnifiedHandbook({
  discipline,
  onSelectDiscipline,
  levelFilter,
  onSelectLevel,
}: UnifiedHandbookProps) {
  const [sharedCollapsed, setSharedCollapsed] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const data = DISCIPLINES[discipline];
  const visibleLevels = computeVisibleLevels(levelFilter);

  // Announce craft-section and level-filter changes to assistive technology
  useEffect(() => {
    const levelLabel =
      levelFilter === "all"
        ? "all levels"
        : (() => {
            const cols = computeVisibleLevels(levelFilter)!;
            return cols.map((k) => LEVELS.find((l) => l.key === k)!.label).join(" and ");
          })();
    setAnnouncement(`Now showing ${data.title} craft competencies, ${levelLabel}.`);
  }, [discipline, levelFilter, data.title]);

  const sections: MatrixSection[] = [
    {
      id: "shared",
      label: "Shared competencies",
      collapsible: true,
      collapsed: sharedCollapsed,
      onToggle: () => setSharedCollapsed((v) => !v),
      rows: SHARED_ROWS,
    },
  ];

  sections.push({
    id: "craft",
    label: `${data.title} craft`,
    sticky: true,
    rows: data.uniqueRows,
  });

  return (
    <div style={{ width: "100%", padding: "64px 64px 80px" }}>
      {/* Page header */}
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
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
            Career Handbook
          </h1>
        </div>
        <p
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "16px",
            fontWeight: 400,
            color: "#6E6E6E",
            lineHeight: 1.7,
            maxWidth: "660px",
            margin: 0,
          }}
        >
          Shared competencies apply to every designer at every level. Craft
          competencies change by discipline — pick a discipline below to swap the
          lower half of the table. The shared block stays fixed at the top so you
          can compare craft across disciplines.
        </p>
      </div>

      {/* Discipline + level selectors in one row */}
      <div style={{ marginBottom: "24px", display: "flex", flexWrap: "wrap", gap: "24px" }}>
        <div>
          <div
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#005D1F",
              marginBottom: "12px",
            }}
          >
            Discipline
          </div>
          <DisciplineChips value={discipline} onChange={onSelectDiscipline} />
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#005D1F",
              marginBottom: "12px",
            }}
          >
            Level
          </div>
          <LevelChips value={levelFilter} onChange={onSelectLevel} />
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "#5C9770",
          opacity: 0.3,
          marginBottom: "28px",
        }}
      />

      {/* Unified matrix — shared block on top, craft block below */}
      <CompetencyMatrix sections={sections} visibleLevels={visibleLevels} />

      {/* Screen-reader-only live region announcing craft-section changes */}
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {announcement}
      </div>
    </div>
  );
}
