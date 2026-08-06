import type { RouteKey } from "./Sidebar";

interface WelcomeScreenProps {
  onNavigate: (route: RouteKey) => void;
}

interface EntryCardProps {
  title: string;
  description: string;
  cta: string;
  route: RouteKey;
  onNavigate: (route: RouteKey) => void;
}

function EntryCard({
  title,
  description,
  cta,
  route,
  onNavigate,
}: EntryCardProps) {
  return (
    <div
      style={{
        background: "#F8F8F5",
        border: "1px solid #D4D4D3",
        borderRadius: "8px",
        padding: "28px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        cursor: "pointer",
        transition: "box-shadow 0.15s, border-color 0.15s",
      }}
      onClick={() => onNavigate(route)}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "#005D1F";
        el.style.boxShadow = "0 2px 12px rgba(0,93,31,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "#D4D4D3";
        el.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "16px",
          fontWeight: 700,
          color: "#005D1F",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "14px",
          fontWeight: 400,
          color: "#6E6E6E",
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {description}
      </div>
      <div
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "13px",
          fontWeight: 700,
          color: "#005D1F",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "4px",
        }}
      >
        {cta}
        <span style={{ fontSize: "16px" }}>→</span>
      </div>
    </div>
  );
}

const HANDBOOK_STEPS: { title: string; body: string }[] = [
  {
    title: "Start with the shared competencies",
    body: "Seven expectations apply to every designer, whatever your discipline. Read these first — they carry the most weight early in your career.",
  },
  {
    title: "Then read your discipline",
    body: "Each discipline adds three craft competencies on top of the shared set, described level by level from Associate to Principal.",
  },
  {
    title: "Place yourself, then plan",
    body: "Use Where I Am Now to mark your current level, see what changes at the next one, and work through the reflection questions with your lead.",
  },
];

const ENTRY_CARDS: {
  title: string;
  description: string;
  cta: string;
  route: RouteKey;
}[] = [
  {
    title: "Shared Competencies",
    description:
      "The seven competencies expected of every designer, regardless of discipline or level.",
    cta: "Explore competencies",
    route: "shared-competencies",
  },
  {
    title: "Browse Disciplines",
    description:
      "Dive into the level-by-level expectations for UX Design, Research, Content Design, Service Design, and Experience Strategy.",
    cta: "Browse disciplines",
    route: "ux-design",
  },
  {
    title: "Where Am I Now?",
    description:
      "Use the self-assessment tool to locate yourself on the ladder and start a growth conversation with your leader.",
    cta: "Start self-assessment",
    route: "where-i-am-now",
  },
];

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "64px 56px",
      }}
    >
      {/* Heading block */}
      <div style={{ marginBottom: "48px" }}>
        <h1
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "48px",
            fontWeight: 700,
            color: "#005D1F",
            letterSpacing: "0.12em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Design Career Handbook
        </h1>
        <p
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "20px",
            fontWeight: 400,
            color: "#262626",
            marginBottom: "20px",
            lineHeight: 1.4,
          }}
        >
          A shared language for growth — for designers and their leaders.
        </p>
        <p
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "15px",
            fontWeight: 400,
            color: "#6E6E6E",
            lineHeight: 1.7,
            maxWidth: "660px",
          }}
        >
          This handbook describes what's expected at each level across our design
          disciplines, so you can understand the ladder, see where you are, and
          start a plan with your leader.
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "#5C9770",
          opacity: 0.3,
          marginBottom: "48px",
        }}
      />

      {/* How to use this handbook */}
      <section style={{ marginBottom: "56px" }}>
        <h2
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#005D1F",
            margin: "0 0 20px",
          }}
        >
          How to use this handbook
        </h2>

        <div
          style={{
            display: "flex",
            gap: "24px",
            padding: "28px 32px",
            background: "#F8F8F5",
            border: "1px solid #D4D4D3",
            borderRadius: "8px",
          }}
        >
          {HANDBOOK_STEPS.map((step, i) => (
            <div key={step.title} style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#5C9770",
                  marginBottom: "8px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#003512",
                  marginBottom: "6px",
                  lineHeight: 1.35,
                }}
              >
                {step.title}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#6E6E6E",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Entry cards */}
      <div style={{ display: "flex", gap: "20px" }}>
        {ENTRY_CARDS.map((card) => (
          <EntryCard key={card.route} {...card} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}
