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

export const SHARED_ROWS: MatrixRow[] = [
  {
    id: "knowledge",
    label: "Knowledge",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: {
        text: "Builds foundational understanding of the design process and customer insights; applies them with guidance.",
        provenance: "draft",
      },
      mid: {
        text: "Independently defines feature-level problems and applies data and research to inform decisions.",
        provenance: "draft",
      },
      senior: {
        text: "Deeply understands customers; proactively frames the right questions and uncovers deeper opportunities.",
        provenance: "draft",
      },
      lead: {
        text: "Connects customer insight to business strategy and sets the knowledge bar for the team.",
        provenance: "draft",
      },
      principal: {
        text: "Shapes how the org understands its customers and turns insight into long-range strategy.",
        provenance: "draft",
      },
    },
  },
  {
    id: "craft-delivery",
    label: "Craft & Delivery",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: {
        text: "Completes assigned work with oversight; building consistency in core craft.",
        provenance: "draft",
      },
      mid: {
        text: "Delivers assigned work independently with minimal supervision; iterates with growing confidence.",
        provenance: "draft",
      },
      senior: {
        text: "Delivers high-quality work on complex problems with little oversight; raises craft quality around them.",
        provenance: "draft",
      },
      lead: {
        text: "Sets craft standards, unblocks delivery, and aligns work to broader dependencies.",
        provenance: "draft",
      },
      principal: {
        text: "Defines craft direction across the org and de-risks the most ambiguous, high-impact work.",
        provenance: "draft",
      },
    },
  },
  {
    id: "communication-leadership",
    label: "Communication & Leadership",
    type: "shared",
    tag: "Department-wide",
    cells: {
      associate: {
        text: "Shares updates and seeks feedback; building collaboration and presentation skills.",
        provenance: "draft",
      },
      mid: {
        text: "Communicates clearly, partners well cross-functionally, and presents work effectively.",
        provenance: "draft",
      },
      senior: {
        text: "Communicates proactively, influences peers, and drives alignment at reviews.",
        provenance: "draft",
      },
      lead: {
        text: "Leads through influence, mentors others, and represents design to stakeholders.",
        provenance: "draft",
      },
      principal: {
        text: "Sets communication norms and shapes design's voice and influence across the org.",
        provenance: "draft",
      },
    },
  },
];
