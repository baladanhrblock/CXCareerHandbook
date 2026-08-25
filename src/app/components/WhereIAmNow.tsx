import { useState, useEffect, useRef } from "react";
import type { Level } from "../data/sharedCompetencies";
import { LEVELS, SHARED_ROWS } from "../data/sharedCompetencies";
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

const PRIMARY_QUESTIONS: { id: string; text: string; provenance: "v1" | "draft" }[] = [
  { id: "contribute", text: "What can I contribute in my current role right now?", provenance: "draft" },
  { id: "invest", text: "Which competencies do I want to invest in next quarter?", provenance: "draft" },
  { id: "develop", text: "What skills or knowledge do I need to develop in the next 6 to 18 months?", provenance: "draft" },
  { id: "future", text: "Where do I want to be in the next 1 to 3 years?", provenance: "draft" },
];

const ADVANCEMENT_QUESTIONS: { id: string; text: string; provenance: "v1" | "draft" }[] = [
  { id: "department", text: "Does my department need this position, or does Block need it in another department?", provenance: "draft" },
  { id: "themes", text: "What themes and differentiators have I demonstrated consistently from the next level?", provenance: "v1" },
];

function todayIso() {
  return new Date().toISOString().split("T")[0];
}

// ─── Rating types ─────────────────────────────────────────────────────────────

type Rating = "developing" | "skilled" | "talented";

const RATING_OPTIONS: { id: Rating; label: string }[] = [
  { id: "developing", label: "Developing" },
  { id: "skilled", label: "Skilled" },
  { id: "talented", label: "Talented" },
];

function ratingChipColors(id: Rating, selected: boolean): React.CSSProperties {
  if (!selected) {
    return { background: "#F1F5F7", color: "#6E6E6E", border: "1px solid #D4D4D3" };
  }
  if (id === "developing") {
    return { background: "#FFF3CD", color: "#7A5F00", border: "1px solid #F5CC02" };
  }
  if (id === "skilled") {
    return { background: "#D6E5DB", color: "#003512", border: "1px solid #5C9770" };
  }
  return { background: "#003512", color: "#00E95C", border: "1px solid #003512" };
}

function RatingChips({
  rowId,
  value,
  onChange,
}: {
  rowId: string;
  value: Rating | null;
  onChange: (r: Rating | null) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = (index + 1) % RATING_OPTIONS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = (index - 1 + RATING_OPTIONS.length) % RATING_OPTIONS.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = RATING_OPTIONS.length - 1;
    }
    if (next !== null) {
      e.preventDefault();
      refs.current[next]?.focus();
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label={`Rating for ${rowId}`}
      style={{ display: "flex", gap: "6px", flexShrink: 0 }}
    >
      {RATING_OPTIONS.map(({ id, label }, index) => {
        const selected = value === id;
        const tabbable = value === null ? index === 0 : selected;
        const colors = ratingChipColors(id, selected);
        return (
          <button
            key={id}
            ref={(el) => { refs.current[index] = el; }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={tabbable ? 0 : -1}
            onClick={() => onChange(selected ? null : id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 2px #005D1F"; }}
            onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            style={{
              padding: "5px 12px",
              borderRadius: "20px",
              fontFamily: "var(--font-brand)",
              fontSize: "12px",
              fontWeight: selected ? 700 : 400,
              letterSpacing: "0.01em",
              cursor: "pointer",
              transition: "background 0.1s, color 0.1s",
              outline: "none",
              ...colors,
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Assess step ──────────────────────────────────────────────────────────────

function AssessStep({
  mode,
  disciplineId,
  level,
  ratings,
  onRate,
  onBack,
  onContinue,
}: {
  mode: "self" | "manager";
  disciplineId: string;
  level: Level;
  ratings: Record<string, Rating | null>;
  onRate: (rowId: string, r: Rating | null) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const [confirmingUnmarked, setConfirmingUnmarked] = useState(false);

  const allRows = [...SHARED_ROWS, ...DISCIPLINES[disciplineId].uniqueRows];
  const markedCount = allRows.filter((r) => ratings[r.id] != null).length;
  const totalCount = allRows.length;
  const unmarkedCount = totalCount - markedCount;

  function handleContinue() {
    if (unmarkedCount > 0) {
      setConfirmingUnmarked(true);
    } else {
      onContinue();
    }
  }

  const navButtonBase: React.CSSProperties = {
    padding: "10px 20px",
    background: "none",
    border: "1px solid #D4D4D3",
    borderRadius: "6px",
    fontFamily: "var(--font-brand)",
    fontSize: "13px",
    fontWeight: 400,
    color: "#6E6E6E",
    cursor: "pointer",
  };

  const continueButtonBase: React.CSSProperties = {
    padding: "12px 28px",
    background: "#00E95C",
    border: "none",
    borderRadius: "6px",
    fontFamily: "var(--font-brand)",
    fontSize: "14px",
    fontWeight: 700,
    color: "#003512",
    cursor: "pointer",
    transition: "background 0.12s",
  };

  return (
    <div>
      {/* Legend */}
      <div
        style={{
          marginBottom: "28px",
          padding: "16px 20px",
          background: "#F8F8F5",
          border: "1px solid #D4D4D3",
          borderRadius: "8px",
          maxWidth: "540px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#9FA4AA",
            marginBottom: "10px",
          }}
        >
          {mode === "self" ? "How to mark yourself" : "How to mark this person"}
        </div>
        <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "5px" }}>
          {[
            { term: "Developing", def: "not yet doing this consistently." },
            { term: "Skilled", def: "this describes the work today." },
            { term: "Talented", def: "operating beyond this, toward the next level." },
          ].map(({ term, def }) => (
            <div key={term} style={{ display: "flex", gap: "8px" }}>
              <dt
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#262626",
                  whiteSpace: "nowrap",
                }}
              >
                {term}:
              </dt>
              <dd
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#6E6E6E",
                  margin: 0,
                }}
              >
                {def}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Progress line */}
      <p
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "13px",
          fontWeight: 400,
          color: markedCount === totalCount ? "#005D1F" : "#6E6E6E",
          marginBottom: "16px",
        }}
      >
        {markedCount} of {totalCount} competencies marked
        {markedCount === totalCount && " ✓"}
      </p>

      {/* Competency rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "32px" }}>
        {allRows.map((row) => {
          const isShared = row.type === "shared";
          const cell = row.cells[level];
          return (
            <div
              key={row.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "14px 16px",
                background: isShared ? "#D6E5DB" : "#F1F5F7",
                borderLeft: `4px solid ${isShared ? "#5C9770" : "#D4D4D3"}`,
                borderRadius: "4px",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-brand)",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#003512",
                    marginBottom: "3px",
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-brand)",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#6E6E6E",
                    lineHeight: 1.55,
                  }}
                >
                  {cell.text}
                </div>
              </div>
              <RatingChips
                rowId={row.id}
                value={ratings[row.id] ?? null}
                onChange={(r) => onRate(row.id, r)}
              />
            </div>
          );
        })}
      </div>

      {/* Nav / inline confirm */}
      {confirmingUnmarked ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <p
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "14px",
              color: "#262626",
              margin: 0,
              maxWidth: "540px",
            }}
          >
            {unmarkedCount} {unmarkedCount === 1 ? "competency is" : "competencies are"} unmarked and will appear as Not marked in the PDF. Continue?
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => setConfirmingUnmarked(false)} style={navButtonBase}>
              Go back
            </button>
            <button onClick={onContinue} style={continueButtonBase}>
              Continue →
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={onBack} style={navButtonBase}>
            ← Back
          </button>
          <button onClick={handleContinue} style={continueButtonBase}>
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}

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

function StepIndicator({ steps, activeIndex }: { steps: string[]; activeIndex: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "40px" }}>
      {steps.map((label, i) => {
        const isActive = activeIndex === i;
        const isDone = activeIndex > i;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: isDone ? "#005D1F" : isActive ? "#00E95C" : "#E8EEF1",
                  border: isActive || isDone ? "none" : "1px solid #D4D4D3",
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
                {isDone ? "✓" : i + 1}
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
                  background: activeIndex > i ? "#005D1F" : "#D4D4D3",
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

// ─── SelectionCard ────────────────────────────────────────────────────────────

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
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
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

// ─── Mode selection screen ────────────────────────────────────────────────────

function ModeSelect({ onSelect }: { onSelect: (mode: "self" | "manager") => void }) {
  const [pending, setPending] = useState<"self" | "manager" | null>(null);

  return (
    <div>
      <SectionTitle>Who is this assessment for?</SectionTitle>
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        <SelectionCard
          label="Myself"
          description="I am assessing my own career level"
          selected={pending === "self"}
          onClick={() => setPending("self")}
        />
        <SelectionCard
          label="A team member I manage"
          description="I am preparing for a conversation with someone I lead"
          selected={pending === "manager"}
          onClick={() => setPending("manager")}
        />
      </div>
      <button
        onClick={() => { if (pending) onSelect(pending); }}
        disabled={!pending}
        style={{
          padding: "12px 28px",
          background: pending ? "#00E95C" : "#E8EEF1",
          border: "none",
          borderRadius: "6px",
          fontFamily: "var(--font-brand)",
          fontSize: "14px",
          fontWeight: 700,
          color: pending ? "#003512" : "#9FA4AA",
          cursor: pending ? "pointer" : "not-allowed",
          transition: "background 0.12s",
          letterSpacing: "0.02em",
        }}
      >
        Continue →
      </button>
    </div>
  );
}

// ─── Text input ───────────────────────────────────────────────────────────────

function TextInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "12px",
          fontWeight: 700,
          color: "#003512",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: "9px 12px",
          border: "1px solid #D4D4D3",
          borderRadius: "6px",
          fontFamily: "var(--font-brand)",
          fontSize: "14px",
          fontWeight: 400,
          color: "#262626",
          background: "#FFFFFF",
          outline: "none",
          transition: "border-color 0.12s",
          width: "260px",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#005D1F"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#D4D4D3"; }}
      />
    </div>
  );
}

// ─── Setup step ───────────────────────────────────────────────────────────────

function SetupStep({
  mode,
  selfName,
  setSelfName,
  memberName,
  setMemberName,
  date,
  setDate,
  disciplineId,
  onDisciplineChange,
  level,
  onLevelChange,
  onContinue,
  onBack,
}: {
  mode: "self" | "manager";
  selfName: string;
  setSelfName: (v: string) => void;
  memberName: string;
  setMemberName: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  disciplineId: string | null;
  onDisciplineChange: (id: string) => void;
  level: Level | null;
  onLevelChange: (l: Level) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const namesFilled =
    selfName.trim() !== "" && (mode === "self" || memberName.trim() !== "");
  const canContinue = namesFilled && disciplineId !== null && level !== null;

  return (
    <div>
      {/* Name and date inputs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "36px" }}>
        <TextInput
          label="Your name"
          value={selfName}
          onChange={setSelfName}
          placeholder="e.g. Alex Smith"
        />
        {mode === "manager" && (
          <TextInput
            label="Team member's name"
            value={memberName}
            onChange={setMemberName}
            placeholder="e.g. Jordan Lee"
          />
        )}
        <TextInput
          label="Date"
          type="date"
          value={date}
          onChange={setDate}
        />
      </div>

      {/* Discipline */}
      <div style={{ marginBottom: "36px" }}>
        <SectionTitle>
          {mode === "self" ? "Your discipline" : "Their discipline"}
        </SectionTitle>
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
      <div style={{ marginBottom: "32px" }}>
        <SectionTitle>
          {mode === "self" ? "Your current level" : "Their current level"}
        </SectionTitle>
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

      {/* Notice */}
      <p
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "13px",
          fontWeight: 400,
          color: "#9FA4AA",
          lineHeight: 1.6,
          marginBottom: "28px",
          maxWidth: "560px",
        }}
      >
        Nothing you enter here is saved anywhere. When you finish, export your PDF before closing this tab.
      </p>

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
          ← Back
        </button>
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
            transition: "background 0.12s",
            letterSpacing: "0.02em",
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}


// ─── Reflection card ──────────────────────────────────────────────────────────

function ReflectionCard({
  question,
  value,
  onChange,
}: {
  question: { id: string; text: string; provenance: "v1" | "draft" };
  value: string;
  onChange: (text: string) => void;
}) {
  return (
    <div
      style={{
        padding: "16px 18px",
        background: "#F8F8F5",
        border: "1px solid #D4D4D3",
        borderRadius: "8px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "14px",
          fontWeight: question.provenance === "draft" ? 700 : 400,
          color: "#003512",
          lineHeight: 1.5,
          margin: "0 0 10px",
        }}
      >
        {question.text}
      </p>
      <label
        style={{
          display: "block",
          fontFamily: "var(--font-brand)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#9FA4AA",
          marginBottom: "6px",
        }}
      >
        Notes (included in your PDF)
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your thoughts here..."
        rows={3}
        style={{
          width: "100%",
          padding: "8px 10px",
          border: "1px solid #D4D4D3",
          borderRadius: "6px",
          fontFamily: "var(--font-brand)",
          fontSize: "13px",
          color: "#262626",
          background: "#FFFFFF",
          resize: "vertical",
          lineHeight: 1.55,
          outline: "none",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#005D1F"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#D4D4D3"; }}
      />
    </div>
  );
}

// ─── Reflect step (self mode only) ───────────────────────────────────────────

function ReflectStep({
  reflectionNotes,
  onNoteChange,
  advancementGoal,
  onToggleAdvancement,
  onBack,
  onContinue,
}: {
  reflectionNotes: Record<string, string>;
  onNoteChange: (id: string, text: string) => void;
  advancementGoal: boolean;
  onToggleAdvancement: () => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
        {PRIMARY_QUESTIONS.map((q) => (
          <ReflectionCard
            key={q.id}
            question={q}
            value={reflectionNotes[q.id] ?? ""}
            onChange={(text) => onNoteChange(q.id, text)}
          />
        ))}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={advancementGoal}
        onClick={onToggleAdvancement}
        onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 2px #005D1F"; }}
        onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
          padding: "14px 18px",
          background: advancementGoal ? "#D6E5DB" : "#F1F5F7",
          border: `1px solid ${advancementGoal ? "#5C9770" : "#D4D4D3"}`,
          borderRadius: "8px",
          marginBottom: advancementGoal ? "14px" : "28px",
          cursor: "pointer",
          textAlign: "left",
          outline: "none",
          transition: "background 0.15s, border-color 0.15s",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "20px",
            borderRadius: "10px",
            background: advancementGoal ? "#005D1F" : "#D4D4D3",
            position: "relative",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "3px",
              left: advancementGoal ? "17px" : "3px",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#FFFFFF",
              transition: "left 0.15s",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "14px",
            fontWeight: advancementGoal ? 700 : 400,
            color: advancementGoal ? "#003512" : "#6E6E6E",
          }}
        >
          Advancement is a goal for me
        </span>
      </button>

      {advancementGoal && (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
          {ADVANCEMENT_QUESTIONS.map((q) => (
            <ReflectionCard
              key={q.id}
              question={q}
              value={reflectionNotes[q.id] ?? ""}
              onChange={(text) => onNoteChange(q.id, text)}
            />
          ))}
        </div>
      )}

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
          ← Back
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
            transition: "background 0.12s",
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

// ─── Summary step ─────────────────────────────────────────────────────────────

function SummaryStep({
  mode,
  selfName,
  memberName,
  disciplineId,
  level,
  date,
  ratings,
  reflectionNotes,
  advancementGoal,
  onBack,
}: {
  mode: "self" | "manager";
  selfName: string;
  memberName: string;
  disciplineId: string;
  level: Level;
  date: string;
  ratings: Record<string, Rating | null>;
  reflectionNotes: Record<string, string>;
  advancementGoal: boolean;
  onBack: () => void;
}) {
  const discipline = DISCIPLINES[disciplineId];
  const allRows = [...SHARED_ROWS, ...discipline.uniqueRows];
  const levelLabel = LEVELS.find((l) => l.key === level)!.label;
  const nextLevel = NEXT_LEVEL[level];
  const nextLevelLabel = nextLevel ? LEVELS.find((l) => l.key === nextLevel)!.label : null;
  const allReflectionQuestions = advancementGoal
    ? [...PRIMARY_QUESTIONS, ...ADVANCEMENT_QUESTIONS]
    : PRIMARY_QUESTIONS;

  function ratingLabel(r: Rating | null): string {
    if (!r) return "Not marked";
    return RATING_OPTIONS.find((o) => o.id === r)?.label ?? "Not marked";
  }

  function ratingColor(r: Rating | null): string {
    if (!r) return "#9FA4AA";
    if (r === "developing") return "#7A5F00";
    if (r === "skilled") return "#005D1F";
    return "#003512";
  }

  const metaItems = [
    { label: "Name", value: selfName },
    ...(mode === "manager" ? [{ label: "Team member", value: memberName }] : []),
    { label: "Discipline", value: discipline.title },
    { label: "Level", value: levelLabel },
    { label: "Date", value: date },
  ];

  return (
    <div>
      {/* Export controls — hidden in print */}
      <div
        className="no-print"
        style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}
      >
        <button
          onClick={() => window.print()}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#003512"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#005D1F"; }}
          style={{
            padding: "10px 22px",
            background: "#005D1F",
            border: "none",
            borderRadius: "6px",
            fontFamily: "var(--font-brand)",
            fontSize: "14px",
            fontWeight: 700,
            color: "#FFFFFF",
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "background 0.12s",
          }}
        >
          Export PDF
        </button>
        <span
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "13px",
            color: "#9FA4AA",
          }}
        >
          Choose Save as PDF in the print dialog.
        </span>
      </div>

      {/* Printable summary content */}
      <div className="assessment-summary-content">
        {/* Header block */}
        <div
          style={{
            marginBottom: "28px",
            paddingBottom: "18px",
            borderBottom: "2px solid #005D1F",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "22px",
              fontWeight: 700,
              color: "#005D1F",
              letterSpacing: "0.08em",
              marginBottom: "14px",
            }}
          >
            {mode === "self" ? "Self-assessment" : "Manager assessment"}
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 40px" }}>
            {metaItems.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: "8px",
                  fontFamily: "var(--font-brand)",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontWeight: 700, color: "#003512", minWidth: "104px" }}>
                  {label}:
                </span>
                <span style={{ color: "#262626" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Competency table */}
        <table
          className="summary-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "32px",
            fontFamily: "var(--font-brand)",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "10px 14px",
                  background: "#003512",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "var(--font-brand)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textAlign: "left",
                  width: "62%",
                }}
              >
                Competency
              </th>
              <th
                style={{
                  padding: "10px 14px",
                  background: "#003512",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-brand)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textAlign: "left",
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                Mark
              </th>
            </tr>
          </thead>
          <tbody>
            {allRows.map((row, i) => {
              const isShared = row.type === "shared";
              const r = ratings[row.id] ?? null;
              return (
                <tr key={row.id}>
                  <td
                    style={{
                      padding: "9px 14px",
                      background: isShared ? "#D6E5DB" : "#F1F5F7",
                      borderTop: i > 0 ? "1px solid #D4D4D3" : "none",
                      borderRight: "1px solid #D4D4D3",
                      fontFamily: "var(--font-brand)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#003512",
                      verticalAlign: "middle",
                    }}
                  >
                    {row.label}
                  </td>
                  <td
                    style={{
                      padding: "9px 14px",
                      background: isShared ? "#D6E5DB" : "#F1F5F7",
                      borderTop: i > 0 ? "1px solid #D4D4D3" : "none",
                      fontFamily: "var(--font-brand)",
                      fontSize: "13px",
                      fontWeight: r ? 700 : 400,
                      color: ratingColor(r),
                      verticalAlign: "middle",
                    }}
                  >
                    {ratingLabel(r)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Self mode only: reflection answers */}
        {mode === "self" && (
          <div style={{ marginBottom: "32px" }}>
            <h3
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "16px",
                fontWeight: 700,
                color: "#005D1F",
                letterSpacing: "0.06em",
                marginBottom: "16px",
                paddingBottom: "8px",
                borderBottom: "1px solid #D6E5DB",
              }}
            >
              Reflections
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {allReflectionQuestions.map((q) => {
                const notes = reflectionNotes[q.id];
                return (
                  <div key={q.id}>
                    <p
                      style={{
                        fontFamily: "var(--font-brand)",
                        fontSize: "13px",
                        fontWeight: q.provenance === "draft" ? 700 : 400,
                        color: "#003512",
                        margin: "0 0 6px",
                      }}
                    >
                      {q.text}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-brand)",
                        fontSize: "13px",
                        color: notes ? "#262626" : "#9FA4AA",
                        lineHeight: 1.6,
                        padding: "8px 12px",
                        background: "#F8F8F5",
                        border: "1px solid #E8EEF1",
                        borderRadius: "4px",
                        margin: 0,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {notes || "No notes"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Self mode only: looking ahead delta table (omitted at Principal) */}
        {mode === "self" && nextLevel && nextLevelLabel && (
          <div className="looking-ahead-section">
            <h3
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "16px",
                fontWeight: 700,
                color: "#005D1F",
                letterSpacing: "0.06em",
                marginBottom: "16px",
                paddingBottom: "8px",
                borderBottom: "1px solid #D6E5DB",
              }}
            >
              {`Looking ahead: ${levelLabel} to ${nextLevelLabel}`}
            </h3>
            <AdvanceDelta disciplineId={disciplineId} level={level} />
          </div>
        )}
      </div>

      {/* Back nav — hidden in print */}
      <div
        className="no-print"
        style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "32px" }}
      >
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
          ← Back
        </button>
      </div>
    </div>
  );
}

// ─── AdvanceDelta ─────────────────────────────────────────────────────────────

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

// ─── Root component ───────────────────────────────────────────────────────────

interface WhereIAmNowProps {
  onNavigate: (r: RouteKey) => void;
}

const SELF_STEPS = ["Setup", "Assess", "Reflect", "Summary"];
const MANAGER_STEPS = ["Setup", "Assess", "Summary"];

export function WhereIAmNow({ onNavigate: _onNavigate }: WhereIAmNowProps) {
  const [mode, setMode] = useState<"self" | "manager" | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const [disciplineId, setDisciplineId] = useState<string | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [selfName, setSelfName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [date, setDate] = useState(todayIso);
  const [ratings, setRatings] = useState<Record<string, Rating | null>>({});
  const [reflectionNotes, setReflectionNotes] = useState<Record<string, string>>({});
  const [advancementGoal, setAdvancementGoal] = useState(false);

  // Reset ratings whenever the discipline or level changes so stale marks don't bleed across.
  useEffect(() => {
    setRatings({});
  }, [disciplineId, level]);

  function handleRate(rowId: string, r: Rating | null) {
    setRatings((prev) => ({ ...prev, [rowId]: r }));
  }

  function handleNoteChange(id: string, text: string) {
    setReflectionNotes((prev) => ({ ...prev, [id]: text }));
  }

  const steps = mode === "manager" ? MANAGER_STEPS : SELF_STEPS;

  function handleSelectMode(m: "self" | "manager") {
    setMode(m);
    setStepIndex(0);
  }

  function advance() { setStepIndex((i) => i + 1); }
  function retreat() {
    if (stepIndex === 0) {
      setMode(null);
    } else {
      setStepIndex((i) => i - 1);
    }
  }

  return (
    <div className="where-i-am-now-shell" style={{ width: "100%", padding: "64px 64px 80px" }}>
      {/* Page header */}
      <div className="no-print" style={{ marginBottom: "40px" }}>
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
      <div className="no-print" style={{ height: "1px", background: "#5C9770", opacity: 0.3, marginBottom: "36px" }} />

      {/* Mode selection (no step indicator) */}
      {mode === null && (
        <ModeSelect onSelect={handleSelectMode} />
      )}

      {/* Stepped flow */}
      {mode !== null && (
        <>
          <div className="no-print"><StepIndicator steps={steps} activeIndex={stepIndex} /></div>

          {stepIndex === 0 && (
            <SetupStep
              mode={mode}
              selfName={selfName}
              setSelfName={setSelfName}
              memberName={memberName}
              setMemberName={setMemberName}
              date={date}
              setDate={setDate}
              disciplineId={disciplineId}
              onDisciplineChange={setDisciplineId}
              level={level}
              onLevelChange={setLevel}
              onContinue={advance}
              onBack={retreat}
            />
          )}

          {steps[stepIndex] === "Assess" && disciplineId !== null && level !== null && (
            <AssessStep
              mode={mode}
              disciplineId={disciplineId}
              level={level}
              ratings={ratings}
              onRate={handleRate}
              onBack={retreat}
              onContinue={advance}
            />
          )}

          {steps[stepIndex] === "Reflect" && (
            <ReflectStep
              reflectionNotes={reflectionNotes}
              onNoteChange={handleNoteChange}
              advancementGoal={advancementGoal}
              onToggleAdvancement={() => setAdvancementGoal((g) => !g)}
              onBack={retreat}
              onContinue={advance}
            />
          )}

          {steps[stepIndex] === "Summary" && disciplineId !== null && level !== null && (
            <SummaryStep
              mode={mode}
              selfName={selfName}
              memberName={memberName}
              disciplineId={disciplineId}
              level={level}
              date={date}
              ratings={ratings}
              reflectionNotes={reflectionNotes}
              advancementGoal={advancementGoal}
              onBack={retreat}
            />
          )}
        </>
      )}
    </div>
  );
}
