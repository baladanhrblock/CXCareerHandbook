import type { MatrixRow } from "./sharedCompetencies";

// ─── Discipline definition ────────────────────────────────────────────────────

export interface DisciplineData {
  id: string;
  title: string;
  description: string;
  skillChips: string[];
  /** If true, chip labels render bold (700). False → regular (400). */
  chipsBold: boolean;
  /** Optional badge shown next to title */
  badge?: string;
  /** Optional note rendered below title/description */
  note?: string;
  uniqueRows: MatrixRow[];
}

// ─── UX Design ────────────────────────────────────────────────────────────────

const uxDesign: DisciplineData = {
  id: "ux-design",
  title: "UX Design",
  description: "Designing usable, accessible interfaces and end-to-end product experiences.",
  skillChips: [
    "Design system",
    "UI controls & icons",
    "Visual design",
    "Composition / grids / typography",
    "Prototyping",
    "Interaction motion",
    "Responsive breakpoints",
    "Wireframing",
    "User-journey mapping",
    "Information architecture",
    "Service delivery",
  ],
  chipsBold: false,
  uniqueRows: [
    {
      id: "ux-interface-visual",
      label: "Interface & Visual Craft",
      type: "unique",
      tag: "UX craft",
      cells: {
        associate: { text: "Builds UI with guidance; uses the design system inconsistently.", provenance: "draft" },
        mid: { text: "Constructs UI components with the design system; keeps work consistent.", provenance: "draft" },
        senior: { text: "Delivers polished interfaces and improves the system itself.", provenance: "draft" },
        lead: { text: "Sets visual and UI standards across the team.", provenance: "draft" },
        principal: { text: "Defines interface craft direction for the org.", provenance: "draft" },
      },
    },
    {
      id: "ux-interaction-multi",
      label: "Interaction & Multi-device",
      type: "unique",
      tag: "UX craft",
      cells: {
        associate: { text: "Wireframes simple flows with direction.", provenance: "draft" },
        mid: { text: "Designs interactions across breakpoints with minimal help.", provenance: "draft" },
        senior: { text: "Owns complex interaction and responsive behavior.", provenance: "draft" },
        lead: { text: "Sets interaction patterns and motion standards.", provenance: "draft" },
        principal: { text: "Shapes the org's interaction philosophy.", provenance: "draft" },
      },
    },
    {
      id: "ux-discovery-architecture",
      label: "Discovery & Architecture",
      type: "unique",
      tag: "UX craft",
      cells: {
        associate: { text: "Contributes to journey maps and IA with support.", provenance: "draft" },
        mid: { text: "Maps journeys and structures IA independently.", provenance: "draft" },
        senior: { text: "Leads discovery and architecture for a product area.", provenance: "draft" },
        lead: { text: "Aligns IA and journeys across products.", provenance: "draft" },
        principal: { text: "Owns experience architecture across the portfolio.", provenance: "draft" },
      },
    },
  ],
};

// ─── Content Design ───────────────────────────────────────────────────────────

const contentDesign: DisciplineData = {
  id: "content-design",
  title: "Content Design",
  description: "Shaping the words, structure, and voice of the product experience.",
  skillChips: [
    "Content strategy",
    "Voice and tone",
    "Content patterns & templates",
    "Task microcopy",
    "Help & instructional copy",
    "Chatbot conversation design",
    "SEO",
    "Grammar & proofing",
    "Information architecture",
    "Composition & typography",
  ],
  chipsBold: false,
  uniqueRows: [
    {
      id: "cd-strategy-voice",
      label: "Content Strategy & Voice",
      type: "unique",
      tag: "Content Design craft",
      cells: {
        associate: { text: "Applies voice and patterns with guidance.", provenance: "draft" },
        mid: { text: "Builds content strategy for a feature independently.", provenance: "draft" },
        senior: { text: "Drives content strategy and refines voice across a product.", provenance: "draft" },
        lead: { text: "Sets voice, tone, and content standards for the team.", provenance: "draft" },
        principal: { text: "Defines the org's content strategy direction.", provenance: "draft" },
      },
    },
    {
      id: "cd-functional-copy",
      label: "Functional Copy",
      type: "unique",
      tag: "Content Design craft",
      cells: {
        associate: { text: "Writes microcopy with review.", provenance: "draft" },
        mid: { text: "Owns functional copy for assigned flows.", provenance: "draft" },
        senior: { text: "Crafts complex conversational and instructional copy.", provenance: "draft" },
        lead: { text: "Sets functional-copy patterns across products.", provenance: "draft" },
        principal: { text: "Shapes conversational design direction org-wide.", provenance: "draft" },
      },
    },
    {
      id: "cd-findability-quality",
      label: "Findability & Quality",
      type: "unique",
      tag: "Content Design craft",
      cells: {
        associate: { text: "Proofs and applies basic SEO with guidance.", provenance: "draft" },
        mid: { text: "Owns quality and findability for own work.", provenance: "draft" },
        senior: { text: "Leads content IA and quality for a product area.", provenance: "draft" },
        lead: { text: "Sets quality and findability standards.", provenance: "draft" },
        principal: { text: "Owns content quality strategy across the org.", provenance: "draft" },
      },
    },
  ],
};

// ─── Service Design ───────────────────────────────────────────────────────────

const serviceDesign: DisciplineData = {
  id: "service-design",
  title: "Service Design",
  description: "Designing the end-to-end service across people, touchpoints, and systems.",
  skillChips: [
    "Service blueprinting",
    "Journey mapping",
    "Touchpoint design",
    "Cross-channel orchestration",
    "Front / back-stage systems",
    "Operations alignment",
  ],
  chipsBold: true,
  uniqueRows: [
    {
      id: "sd-blueprinting-journeys",
      label: "Service Blueprinting & Journeys",
      type: "unique",
      tag: "Service Design craft",
      cells: {
        associate: { text: "Contributes to service blueprints with guidance.", provenance: "draft" },
        mid: { text: "Maps service journeys independently.", provenance: "draft" },
        senior: { text: "Owns end-to-end service blueprints for an area.", provenance: "draft" },
        lead: { text: "Aligns service design across teams.", provenance: "draft" },
        principal: { text: "Defines the service design practice org-wide.", provenance: "draft" },
      },
    },
    {
      id: "sd-cross-channel",
      label: "Cross-channel Orchestration",
      type: "unique",
      tag: "Service Design craft",
      cells: {
        associate: { text: "Documents touchpoints with support.", provenance: "draft" },
        mid: { text: "Coordinates across 2–3 channels.", provenance: "draft" },
        senior: { text: "Orchestrates multi-channel experiences.", provenance: "draft" },
        lead: { text: "Sets cross-channel standards.", provenance: "draft" },
        principal: { text: "Shapes omni-channel strategy.", provenance: "draft" },
      },
    },
    {
      id: "sd-operational-systems",
      label: "Operational & Systems Thinking",
      type: "unique",
      tag: "Service Design craft",
      cells: {
        associate: { text: "Learns service operations basics.", provenance: "draft" },
        mid: { text: "Connects design to operational reality.", provenance: "draft" },
        senior: { text: "Designs for front-stage and back-stage systems.", provenance: "draft" },
        lead: { text: "Aligns service design with operations partners.", provenance: "draft" },
        principal: { text: "Drives service-system strategy across the org.", provenance: "draft" },
      },
    },
  ],
};

// ─── Experience Strategy ──────────────────────────────────────────────────────

const experienceStrategy: DisciplineData = {
  id: "experience-strategy",
  title: "Experience Strategy",
  description: "Connecting experience decisions to vision, business outcomes, and the broader portfolio.",
  badge: "Emerging track",
  note: "This track is forward-looking — we currently have one Lead in Experience Strategy. Associate–Senior expectations are aspirational.",
  skillChips: [
    "Experience vision",
    "Narrative framing",
    "Business & market acumen",
    "Outcome measurement",
    "Portfolio prioritization",
    "Cross-org facilitation",
  ],
  chipsBold: true,
  uniqueRows: [
    {
      id: "xs-vision-narrative",
      label: "Vision & Narrative",
      type: "unique",
      tag: "Experience Strategy craft",
      cells: {
        associate: { text: "Supports vision artifacts (forward-looking).", provenance: "draft", aspirational: true },
        mid: { text: "Frames problem narratives (forward-looking).", provenance: "draft", aspirational: true },
        senior: { text: "Builds compelling experience visions.", provenance: "draft" },
        lead: { text: "Sets and sells experience vision for a domain.", provenance: "draft" },
        principal: { text: "Defines long-range experience vision for the org.", provenance: "draft" },
      },
    },
    {
      id: "xs-business-acumen",
      label: "Business & Market Acumen",
      type: "unique",
      tag: "Experience Strategy craft",
      cells: {
        associate: { text: "Learns the business context (forward-looking).", provenance: "draft", aspirational: true },
        mid: { text: "Connects design to business goals (forward-looking).", provenance: "draft", aspirational: true },
        senior: { text: "Ties experience decisions to outcomes.", provenance: "draft" },
        lead: { text: "Aligns experience strategy to business strategy.", provenance: "draft" },
        principal: { text: "Shapes org strategy with experience insight.", provenance: "draft" },
      },
    },
    {
      id: "xs-portfolio-measurement",
      label: "Portfolio Influence & Measurement",
      type: "unique",
      tag: "Experience Strategy craft",
      cells: {
        associate: { text: "Tracks basic metrics (forward-looking).", provenance: "draft", aspirational: true },
        mid: { text: "Measures feature outcomes (forward-looking).", provenance: "draft", aspirational: true },
        senior: { text: "Influences a product area with evidence.", provenance: "draft" },
        lead: { text: "Drives portfolio-level prioritization.", provenance: "draft" },
        principal: { text: "Defines how the org measures experience value.", provenance: "draft" },
      },
    },
  ],
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const DISCIPLINES: Record<string, DisciplineData> = {
  "ux-design": uxDesign,
  "content-design": contentDesign,
  "service-design": serviceDesign,
  "experience-strategy": experienceStrategy,
};
