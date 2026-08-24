import { useState, useRef, useEffect, Fragment } from "react";
import type { MatrixRow, Level } from "../data/sharedCompetencies";
import { LEVELS } from "../data/sharedCompetencies";

// ─── Side panel ───────────────────────────────────────────────────────────────

interface PanelData {
  rowLabel: string;
  rowDefinition?: string;
  levelLabel: string;
  text: string;
  bullets?: string[];
  provenance: "v1" | "draft";
  aspirational?: boolean;
}

function SidePanel({ data, onClose }: { data: PanelData; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  // Auto-focus panel on open for accessibility
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.18)", zIndex: 40 }}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={`${data.rowLabel} — ${data.levelLabel}`}
        tabIndex={-1}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "380px",
          background: "#F8F8F5",
          borderLeft: "1px solid #D4D4D3",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
          outline: "none",
        }}
      >
        <div
          style={{
            padding: "24px 24px 16px",
            borderBottom: "1px solid #D4D4D3",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9FA4AA",
                marginBottom: "4px",
              }}
            >
              {data.levelLabel}
            </div>
            <div
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "18px",
                fontWeight: 700,
                color: "#005D1F",
                letterSpacing: "0.02em",
              }}
            >
              {data.rowLabel}
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap" }}>
              {data.aspirational && (
                <span
                  style={{
                    display: "inline-block",
                    background: "#E8EEF1",
                    color: "#6E6E6E",
                    fontFamily: "var(--font-brand)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "2px 8px",
                    borderRadius: "3px",
                  }}
                >
                  Aspirational
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close detail panel"
            style={{
              background: "none",
              border: "1px solid transparent",
              cursor: "pointer",
              color: "#6E6E6E",
              fontSize: "20px",
              lineHeight: 1,
              padding: "4px 8px",
              borderRadius: "4px",
              flexShrink: 0,
              transition: "border-color 0.12s, color 0.12s",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#005D1F"; e.currentTarget.style.color = "#005D1F"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = "#6E6E6E"; }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#005D1F"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#6E6E6E"; }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: "24px", flex: 1, overflowY: "auto" }}>
          {data.rowDefinition && (
            <p
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "13px",
                fontWeight: 400,
                color: "#6E6E6E",
                lineHeight: 1.6,
                margin: "0 0 16px",
                paddingBottom: "16px",
                borderBottom: "1px solid #E3E3E0",
              }}
            >
              {data.rowDefinition}
            </p>
          )}
          {data.bullets && data.bullets.length > 0 ? (
            <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
              {data.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-brand)",
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#262626",
                    lineHeight: 1.7,
                    marginBottom: "8px",
                  }}
                >
                  {b}
                </li>
              ))}
            </ul>
          ) : (
            <p
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "15px",
                fontWeight: 400,
                color: "#262626",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {data.text}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Level header ─────────────────────────────────────────────────────────────
// Renders a <div> — the outer <th> wrapper lives in the table thead

function LevelHeader({ label, intent }: { label: string; intent: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {label}
      {hovered && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#262626",
            color: "#FFFFFF",
            fontFamily: "var(--font-brand)",
            fontSize: "11px",
            fontWeight: 400,
            letterSpacing: "normal",
            textTransform: "none",
            padding: "6px 10px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            zIndex: 20,
            pointerEvents: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {intent}
          <div
            style={{
              position: "absolute",
              top: "-5px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderWidth: "5px",
              borderStyle: "solid",
              borderColor: "transparent transparent #262626 transparent",
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Full-width section header row ────────────────────────────────────────────

function SectionHeaderRow({
  label,
  collapsible,
  collapsed,
  onToggle,
}: {
  label: string;
  collapsible?: boolean;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const labelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "var(--font-brand)",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#FFFFFF",
  };

  return (
    <tr>
      <td
        colSpan={LEVELS.length + 1}
        style={{
          padding: 0,
          background: "#5C9770",
          borderBottom: "1px solid #D4D4D3",
        }}
      >
        {collapsible ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={!collapsed}
            style={{
              ...labelStyle,
              width: "100%",
              padding: "8px 14px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              outline: "none",
            }}
            onFocus={(e) => { e.currentTarget.style.boxShadow = "inset 0 0 0 2px #00E95C"; }}
            onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
                transition: "transform 0.15s",
                fontSize: "9px",
                lineHeight: 1,
              }}
            >
              ▼
            </span>
            {label}
          </button>
        ) : (
          <div style={{ ...labelStyle, padding: "8px 14px" }}>{label}</div>
        )}
      </td>
    </tr>
  );
}

// ─── Hatch overlay for aspirational cells ─────────────────────────────────────

const HATCH_BG =
  "repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(0,0,0,0.035) 5px, rgba(0,0,0,0.035) 6px)";

// ─── Matrix cell ──────────────────────────────────────────────────────────────

function MatrixCell({
  row,
  level,
  colSpan,
  onClick,
}: {
  row: MatrixRow;
  level: Level;
  colSpan?: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const cell = row.cells[level];
  const isAspirational = !!cell.aspirational;

  const bgBase = row.type === "shared" ? "#D6E5DB" : isAspirational ? "#EDF0F4" : "#F1F5F7";
  const bgHover = row.type === "shared" ? "#C4D9CB" : isAspirational ? "#E2E7ED" : "#E8EEF1";

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  }

  return (
    <td
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      role="button"
      colSpan={colSpan}
      aria-label={`${row.label} — ${level}: ${cell.text}`}
      style={{
        position: "relative",
        padding: "12px 14px",
        verticalAlign: "top",
        borderRight: "1px solid #D4D4D3",
        borderBottom: "1px solid #D4D4D3",
        background: hovered ? bgHover : bgBase,
        cursor: "pointer",
        transition: "background 0.12s",
        outline: "none",
      }}
      onFocus={(e) => { e.currentTarget.style.boxShadow = "inset 0 0 0 2px #005D1F"; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
    >
      {isAspirational && !hovered && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: HATCH_BG,
            pointerEvents: "none",
          }}
        />
      )}
      {cell.bullets && cell.bullets.length > 0 ? (
        <ul style={{ margin: 0, padding: "0 0 0 14px", position: "relative" }}>
          {cell.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "12px",
                fontWeight: 400,
                color: isAspirational ? "#6E6E6E" : "#262626",
                lineHeight: 1.55,
                marginBottom: "3px",
              }}
            >
              {b}
            </li>
          ))}
        </ul>
      ) : (
        <span
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "12px",
            fontWeight: 400,
            color: isAspirational ? "#6E6E6E" : "#262626",
            lineHeight: 1.55,
            display: "block",
            position: "relative",
          }}
        >
          {cell.text}
        </span>
      )}
    </td>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export interface MatrixSection {
  id: string;
  /** Full-width header row label — rendered uppercase */
  label: string;
  /** Collapsible sections can be toggled; expanded by default */
  collapsible?: boolean;
  rows: MatrixRow[];
}

export interface CompetencyMatrixProps {
  /** Flat row list — used when the table has no section grouping */
  rows?: MatrixRow[];
  /** Grouped rows, each under a full-width header row. Takes precedence over `rows`. */
  sections?: MatrixSection[];
  /** Highlight a specific level column with a "you are here" marker */
  highlightLevel?: Level;
}

export function CompetencyMatrix({ rows, sections, highlightLevel }: CompetencyMatrixProps) {
  const [panel, setPanel] = useState<PanelData | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const resolvedSections: MatrixSection[] =
    sections ?? [{ id: "__all", label: "", rows: rows ?? [] }];

  function openPanel(row: MatrixRow, level: Level) {
    const levelMeta = LEVELS.find((l) => l.key === level)!;
    const cell = row.cells[level];
    setPanel({
      rowLabel: row.label,
      rowDefinition: row.definition,
      levelLabel: levelMeta.label,
      text: cell.text,
      bullets: cell.bullets,
      provenance: cell.provenance,
      aspirational: cell.aspirational,
    });
  }

  return (
    <div>
      {/* Horizontally scrollable wrapper — does not break outer layout */}
      <div
        style={{
          overflowX: "auto",
          borderRadius: "6px",
          border: "1px solid #D4D4D3",
          maxWidth: "100%",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: "760px",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <colgroup>
            <col style={{ width: "148px" }} />
            {LEVELS.map((l) => (
              <col key={l.key} />
            ))}
          </colgroup>

          <thead>
            <tr>
              <th
                style={{
                  padding: "12px 14px",
                  background: "#003512",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "left",
                  fontFamily: "var(--font-brand)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                Competency
              </th>
              {LEVELS.map((l) => (
                <th
                  key={l.key}
                  style={{
                    position: "relative",
                    padding: "12px 14px",
                    fontFamily: "var(--font-brand)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    textAlign: "left",
                    background: "#003512",
                    borderRight: "1px solid rgba(255,255,255,0.08)",
                    cursor: "default",
                  }}
                >
                  {highlightLevel === l.key && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "#00E95C",
                      }}
                    />
                  )}
                  <LevelHeader label={l.label} intent={l.intent} />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {resolvedSections.map((section) => {
              const isCollapsed = !!collapsed[section.id];
              return (
                <Fragment key={section.id}>
                  {section.label && (
                    <SectionHeaderRow
                      label={section.label}
                      collapsible={section.collapsible}
                      collapsed={isCollapsed}
                      onToggle={() =>
                        setCollapsed((c) => ({ ...c, [section.id]: !c[section.id] }))
                      }
                    />
                  )}
                  {!isCollapsed &&
                    section.rows.map((row) => (
                      <tr key={row.id}>
                        <td
                          style={{
                            padding: "12px 14px",
                            verticalAlign: "top",
                            borderRight: "1px solid #D4D4D3",
                            borderBottom: "1px solid #D4D4D3",
                            background: row.type === "shared" ? "#D6E5DB" : "#F1F5F7",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-brand)",
                              fontSize: "13px",
                              fontWeight: 700,
                              color: "#003512",
                              lineHeight: 1.3,
                            }}
                          >
                            {row.label}
                          </div>
                          {row.definition && (
                            <div
                              style={{
                                fontFamily: "var(--font-brand)",
                                fontSize: "11px",
                                fontWeight: 400,
                                color: "#6E6E6E",
                                lineHeight: 1.45,
                                marginTop: "4px",
                              }}
                            >
                              {row.definition}
                            </div>
                          )}
                        </td>
                        {(() => {
                          const tds = [];
                          let i = 0;
                          while (i < LEVELS.length) {
                            const l = LEVELS[i];
                            const span = row.cells[l.key].span ?? 1;
                            tds.push(
                              <MatrixCell
                                key={l.key}
                                row={row}
                                level={l.key}
                                colSpan={span > 1 ? span : undefined}
                                onClick={() => openPanel(row, l.key)}
                              />
                            );
                            i += span;
                          }
                          return tds;
                        })()}
                      </tr>
                    ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {panel && <SidePanel data={panel} onClose={() => setPanel(null)} />}
    </div>
  );
}
