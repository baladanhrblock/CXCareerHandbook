// ─── Types ───────────────────────────────────────────────────────────────────

export type Level = "associate" | "mid" | "senior" | "lead" | "principal";

export type Provenance = "v1" | "draft";

export type RowType = "shared" | "unique";

export interface MatrixCell {
  text: string;
  provenance: Provenance;
  /** Optional bullet points — if supplied, render as list instead of paragraph */
  bullets?: string[];
  /** Aspirational/forward-looking cells (Experience Strategy lower levels) */
  aspirational?: boolean;
  /** Number of level columns this cell spans (default 1). The spanned cells are skipped in rendering. */
  span?: number;
}

export interface MatrixRow {
  id: string;
  label: string;
  type: RowType;
  /** Tag shown on the row — e.g. "Department-wide" or "UX craft" */
  tag: string;
  /** One-line definition shown under the row label and in the side panel */
  definition?: string;
  cells: Record<Level, MatrixCell>;
}

// ─── Level metadata ───────────────────────────────────────────────────────────

export const LEVELS: { key: Level; label: string; intent: string }[] = [
  {
    key: "associate",
    label: "Associate",
    intent: "Building foundations and delivering with guidance",
  },
  {
    key: "mid",
    label: "Mid",
    intent: "Operating independently on defined problems",
  },
  {
    key: "senior",
    label: "Senior",
    intent: "Raising quality and framing the right problems",
  },
  {
    key: "lead",
    label: "Lead",
    intent: "Setting standards and enabling the team",
  },
  {
    key: "principal",
    label: "Principal",
    intent: "Shaping direction across the organisation",
  },
];

// ─── Shared competency rows (imported by every discipline page) ───────────────
// Seven department-wide competencies, ordered by how strongly people leaders
// weight them when assessing early-career designers.

export const CORE_ROWS: MatrixRow[] = [
  {
    id: "communication",
    label: "Communication",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: {
        text: 'Presents work clearly to the immediate team and explains what they made. Needs support framing the "why" for stakeholders.',
        provenance: "draft",
      },
      mid: {
        text: "Explains rationale, not just output. Handles questions in review without a leader stepping in.",
        provenance: "draft",
      },
      senior: {
        text: "Tailors the story to the audience, adapting depth and framing for design, product, and business partners. Written artifacts stand on their own.",
        provenance: "draft",
      },
      lead: {
        text: "Drives alignment in rooms they don't own. Turns disagreement into a decision the team can act on.",
        provenance: "draft",
      },
      principal: {
        text: "Sets how design communicates across the org and represents design's point of view to executives.",
        provenance: "draft",
      },
    },
  },
  {
    id: "strategic-thinking",
    label: "Strategic Thinking",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: {
        text: "Can state which customer problem their task serves when asked.",
        provenance: "draft",
      },
      mid: {
        text: "Connects feature decisions to stated goals and metrics without prompting; asks why a request exists.",
        provenance: "draft",
      },
      senior: {
        text: "Reframes requests around the underlying customer and business problem, and pushes back on solutions that miss it.",
        provenance: "draft",
      },
      lead: {
        text: "Shapes the roadmap for their area: decides what design should work on, not just how.",
        provenance: "draft",
      },
      principal: {
        text: "Influences business strategy with experience insight and names opportunities the org hadn't seen.",
        provenance: "draft",
      },
    },
  },
  {
    id: "ambiguity",
    label: "Ambiguity",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: {
        text: "Asks for clarification early rather than stalling. Works well when the brief is defined.",
        provenance: "draft",
      },
      mid: {
        text: "Makes progress on loosely defined work by proposing a starting point and testing it.",
        provenance: "draft",
      },
      senior: {
        text: "Creates structure where there was none: frames the problem, sequences the unknowns, keeps the team moving.",
        provenance: "draft",
      },
      lead: {
        text: "Holds direction steady when constraints shift; decides what to protect and what to trade.",
        provenance: "draft",
      },
      principal: {
        text: "Takes on the org's most undefined problems and returns with a defensible path.",
        provenance: "draft",
      },
    },
  },
  {
    id: "collaboration",
    label: "Collaboration",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: {
        text: "Participates actively, shares work early, and responds to feedback without defensiveness.",
        provenance: "draft",
      },
      mid: {
        text: "Partners directly with engineering and product on their scope; anticipates what partners need and when.",
        provenance: "draft",
      },
      senior: {
        text: "Builds trust across functions and brings partners in at the right moment rather than presenting finished work.",
        provenance: "draft",
      },
      lead: {
        text: "Establishes how design and its partner teams work together, and resolves friction between functions.",
        provenance: "draft",
      },
      principal: {
        text: "Builds cross-org relationships that unblock design work before it gets blocked.",
        provenance: "draft",
      },
    },
  },
  {
    id: "impact",
    label: "Impact",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: {
        text: "Delivers assigned work that ships. Contribution is visible at the task level.",
        provenance: "draft",
      },
      mid: {
        text: "Owns a feature end to end; their work measurably improves the experience.",
        provenance: "draft",
      },
      senior: {
        text: "Moves outcomes for a product area; their decisions show up in customer and business metrics.",
        provenance: "draft",
      },
      lead: {
        text: "Multiplies impact through others: the team ships better because of how they've set it up.",
        provenance: "draft",
      },
      principal: {
        text: "Changes what the org is able to do; impact compounds beyond any single product.",
        provenance: "draft",
      },
    },
  },
  {
    id: "autonomy",
    label: "Autonomy",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: {
        text: "Manages assigned tasks and flags blockers. Checks in frequently by design.",
        provenance: "draft",
      },
      mid: {
        text: "Runs their own workstream, sets their own sequence, and hits commitments without oversight.",
        provenance: "draft",
      },
      senior: {
        text: "Operates with direction rather than instruction; leaders hear about the problem and the fix at the same time.",
        provenance: "draft",
      },
      lead: {
        text: "Manages a portfolio of work and other people's dependencies, and creates the clarity that lets others be autonomous.",
        provenance: "draft",
      },
      principal: {
        text: "Sets their own agenda in service of org goals and defines the work worth doing.",
        provenance: "draft",
      },
    },
  },
  {
    id: "leadership",
    label: "Leadership",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: {
        text: "Supports peers informally: shares what they learn and contributes to team rituals.",
        provenance: "draft",
      },
      mid: {
        text: "Onboards and mentors newer designers; improves the team's practices in small, visible ways.",
        provenance: "draft",
      },
      senior: {
        text: "Actively raises the bar around them through critique, mentorship, and modeling craft standards.",
        provenance: "draft",
      },
      lead: {
        text: "Grows designers deliberately and may step into an interim Lead/POC role. Accountable for team capability, not just output.",
        provenance: "draft",
      },
      principal: {
        text: "Develops leaders and shapes the design org's culture and standards.",
        provenance: "draft",
      },
    },
  },
];

// ─── Practice rows (department-wide "Practice" band) ──────────────────────────
// Moved out of the UX Design craft set — these two now apply to every discipline.

export const PRACTICE_ROWS: MatrixRow[] = [
  {
    id: "ux-design-systems",
    label: "Systems & Ecosystem",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: { text: "Demonstrates and effectively uses the design system for UI construction and identifies gaps when existing patterns do not support the experience.", provenance: "draft" },
      mid: { text: "Demonstrates and effectively uses the design system for UI construction and identifies gaps when existing patterns do not support the experience.", provenance: "draft" },
      senior: { text: "Creates reusable patterns that solve recurring problems and are adopted beyond their immediate work.", provenance: "draft" },
      lead: { text: "Drives design system consistency across a squad and helps reconcile product needs with system standards.", provenance: "draft" },
      principal: { text: "Shapes the direction of the design system and influences how patterns scale across the organization.", provenance: "draft" },
    },
  },
  {
    id: "ux-innovation-emerging",
    label: "Innovation & Emerging Technologies",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: { text: "Aware of new tools, patterns, and technologies and applies relevant learnings to their own work.", provenance: "draft" },
      mid: { text: "Tests new approaches when appropriate and integrates useful tools into their design practice with good judgment.", provenance: "draft" },
      senior: { text: "Experiments with new methods or technologies and helps teams understand how they might improve the user experience.", provenance: "draft" },
      lead: { text: "Guides where a squad should experiment, helps manage risk, and turns learnings into practical improvements.", provenance: "draft" },
      principal: { text: "Anticipates shifts in how experiences are designed and helps the organization prepare for new ways of working.", provenance: "draft" },
    },
  },
];

// Combined shared block (Core behaviours + Practice) — consumed anywhere that
// needs "everything that applies to every designer" (e.g. Where I Am Now).
export const SHARED_ROWS: MatrixRow[] = [...CORE_ROWS, ...PRACTICE_ROWS];
