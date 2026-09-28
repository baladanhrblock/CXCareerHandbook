// ─── Shared primitives ────────────────────────────────────────────────────────

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </h1>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-brand)",
        fontSize: "18px",
        fontWeight: 700,
        color: "#003512",
        letterSpacing: "0.04em",
        margin: "0 0 16px",
      }}
    >
      {children}
    </h2>
  );
}

function QAHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-brand)",
        fontSize: "15px",
        fontWeight: 700,
        color: "#003512",
        letterSpacing: "0.02em",
        margin: "0 0 6px",
      }}
    >
      {children}
    </h3>
  );
}

function Body({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-brand)",
        fontSize: "16px",
        fontWeight: 400,
        color: muted ? "#595854" : "#262626",
        lineHeight: 1.6,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-brand)",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#595854",
        marginBottom: "8px",
      }}
    >
      {children}
    </div>
  );
}

// ─── Level row ────────────────────────────────────────────────────────────────

function LevelRow({ levelLabel, description }: { levelLabel: string; description: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "12px 0",
        borderBottom: "1px solid #E8EEF1",
        alignItems: "baseline",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "14px",
          fontWeight: 700,
          color: "#003512",
          flexShrink: 0,
          minWidth: "200px",
        }}
      >
        {levelLabel}
      </span>
      <span
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "14px",
          fontWeight: 400,
          color: "#262626",
          lineHeight: 1.6,
        }}
      >
        {description}
      </span>
    </div>
  );
}

// ─── Rating chip (display only) ───────────────────────────────────────────────

function RatingChip({ label, bg, color, border }: { label: string; bg: string; color: string; border: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "5px 12px",
        borderRadius: "999px",
        fontFamily: "var(--font-brand)",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.01em",
        background: bg,
        color,
        border,
      }}
    >
      {label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HowLevelsWork() {
  return (
    <div style={{ width: "100%", padding: "64px 64px 80px" }}>
      <div style={{ maxWidth: "720px" }}>

        {/* Title */}
        <div style={{ marginBottom: "40px" }}>
          <PageTitle>How levels work</PageTitle>
          <Body>
            This page describes the levels used for individual contributors and managers on the CX design team. A designer{"'"}s level reflects the maturity of their skills, their contribution to the team, and their overall seniority.
          </Body>
        </div>

        {/* Q&A blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "56px" }}>
          <div>
            <QAHeading>What are levels?</QAHeading>
            <Body>
              Levels describe the scope and complexity of work at each stage of a design career. Each level builds on the one before it. Levels climb by complexity and ownership, not polish: a Senior designer{"'"}s work is not more beautiful than an Associate{"'"}s, but the problems a Senior designer owns are bigger and harder.
            </Body>
          </div>

          <div>
            <QAHeading>Why does level matter?</QAHeading>
            <Body>
              A designer{"'"}s level sets the expectations for their work and development. Knowing those expectations helps designers and managers agree on what good looks like today.
            </Body>
          </div>

          <div>
            <QAHeading>How does a designer move levels?</QAHeading>
            <Body>
              Movement depends on readiness, open positions, and business need. Years of experience do not determine level. To be considered for the next level, a designer shows the work of that level consistently over time while continuing to perform well in their current role.
            </Body>
          </div>

          <div>
            <QAHeading>{"What's the impact?"}</QAHeading>
            <Body>
              Work should be engaging, challenging, and enjoyable, and every designer should feel supported as they grow.
            </Body>
          </div>
        </div>

        {/* Levels at a glance */}
        <div style={{ marginBottom: "56px" }}>
          <SectionHeading>The levels at a glance</SectionHeading>

          <GroupLabel>Individual contributor</GroupLabel>
          <div style={{ borderTop: "1px solid #E8EEF1", marginBottom: "24px" }}>
            <LevelRow levelLabel="Level 1 · Associate" description="Demonstrates core professional and technical skills, resolving day-to-day problems while learning the organizational context." />
            <LevelRow levelLabel="Level 2 · Mid" description="Brings an established skillset with solid communication and delivery, directly shaping the quality and timeline of features." />
            <LevelRow levelLabel="Level 3 · Senior" description="Influences through strong partner relationships and takes on increasingly difficult problems with efficient solutions." />
            <LevelRow levelLabel="Level 4 · Lead" description="A thought leader who solves most problems and drives the design, quality, and timeline of entire products or services." />
            <LevelRow levelLabel="Level 5 · Principal" description="An indispensable individual contributor who turns company strategy into department objectives." />
          </div>

          <GroupLabel>Manager</GroupLabel>
          <div style={{ borderTop: "1px solid #E8EEF1" }}>
            <LevelRow levelLabel="Level 4 · Design Manager" description="Leads individual contributors in a discipline, developing each person so the team delivers strong product outcomes." />
            <LevelRow levelLabel="Level 5 · Design Director" description="Leads design disciplines and teams across a function, challenging convention and driving company-wide impact." />
          </div>
        </div>

        {/* How ratings work */}
        <div>
          <SectionHeading>How ratings work</SectionHeading>
          <div style={{ marginBottom: "16px" }}>
            <Body>
              Each cell in the Career Handbook describes what Skilled looks like at that level. Less skilled means not yet doing this consistently. Talented means operating beyond it, toward the next level.
            </Body>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <RatingChip
              label="Less skilled"
              bg="#FDF3C2"
              color="#262626"
              border="1px solid #F5CC02"
            />
            <RatingChip
              label="Skilled"
              bg="#D6E5DB"
              color="#003512"
              border="1px solid #5C9770"
            />
            <RatingChip
              label="Talented"
              bg="#003512"
              color="#00E95C"
              border="1px solid #003512"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
