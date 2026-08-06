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

export const SHARED_ROWS: MatrixRow[] = [
  {
    id: "communication",
    label: "Communication",
    type: "shared",
    tag: "Department-wide",
    definition:
      "How well the designer articulates ideas and rationale to their team and stakeholders.",
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
    definition:
      "How well the designer connects their daily work to broader business objectives and customer problems.",
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
        text: "Shapes the roadmap for their area — decides what design should work on, not just how.",
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
    definition:
      "How well the designer navigates unclear problems and adapts to shifting constraints.",
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
        text: "Creates structure where there was none — frames the problem, sequences the unknowns, keeps the team moving.",
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
    definition:
      "How effectively the designer partners across disciplines and within their own team to achieve shared goals.",
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
    definition:
      "How much the designer contributes to the product and the organization.",
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
        text: "Multiplies impact through others — the team ships better because of how they've set it up.",
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
    definition:
      "How independently the designer manages their own work and drives projects forward.",
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
    definition:
      "How well the designer supports peers and elevates the team's capabilities.",
    cells: {
      associate: {
        text: "Supports peers informally — shares what they learn and contributes to team rituals.",
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
