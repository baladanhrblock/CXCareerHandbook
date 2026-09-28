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

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-brand)",
        fontSize: "16px",
        fontWeight: 400,
        color: "#262626",
        lineHeight: 1.6,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

// ─── Role card ────────────────────────────────────────────────────────────────

function RoleCard({ role, sub }: { role: string; sub: string }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #D4D4D3",
        borderRadius: "8px",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "14px",
          fontWeight: 700,
          color: "#003512",
        }}
      >
        {role}
      </span>
      <span
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "12px",
          fontWeight: 400,
          color: "#595854",
        }}
      >
        {sub}
      </span>
    </div>
  );
}

// ─── Lateral arrow ────────────────────────────────────────────────────────────

function LateralArrow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "0 4px",
        flexShrink: 0,
      }}
    >
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none" aria-hidden="true">
        <line x1="0" y1="8" x2="24" y2="8" stroke="#5C9770" strokeWidth="1.5" />
        <polyline points="6,3 0,8 6,13" stroke="#5C9770" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="18,3 24,8 18,13" stroke="#5C9770" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Ladder data ──────────────────────────────────────────────────────────────

const LADDER = [
  {
    levelLabel: "Level 5",
    ic: { role: "Principal", sub: "UX Design · Content Design · Service Design" },
    manager: { role: "Design Director", sub: "All disciplines" },
    lateral: true,
  },
  {
    levelLabel: "Level 4",
    ic: { role: "Lead", sub: "UX Design · Content Design · Service Design" },
    manager: { role: "Design Manager", sub: "All disciplines" },
    lateral: true,
  },
  {
    levelLabel: "Level 3",
    ic: { role: "Senior", sub: "UX Design · Content Design · Service Design" },
    manager: null,
    lateral: false,
  },
  {
    levelLabel: "Level 2",
    ic: { role: "Mid", sub: "UX Design · Content Design · Service Design" },
    manager: null,
    lateral: false,
  },
  {
    levelLabel: "Level 1",
    ic: { role: "Associate", sub: "UX Design · Content Design · Service Design" },
    manager: null,
    lateral: false,
  },
];

// ─── Column header ────────────────────────────────────────────────────────────

function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-brand)",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#595854",
        marginBottom: "12px",
      }}
    >
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function CareerPaths() {
  return (
    <div style={{ width: "100%", padding: "64px 64px 80px" }}>

      {/* Title + intro */}
      <div style={{ maxWidth: "720px", marginBottom: "48px" }}>
        <div style={{ marginBottom: "24px" }}>
          <PageTitle>Career paths</PageTitle>
        </div>
        <Body>
          There are two paths: individual contributor and manager. Every career is different. Individual contributor and manager roles carry different responsibilities, but aligned levels share the same overall seniority, so moving between paths is a lateral move, not a step up or down.
        </Body>
      </div>

      {/* Ladder diagram */}
      <style>{`
        @media (max-width: 639px) {
          .career-ladder { flex-direction: column !important; }
          .career-ladder-manager-col { margin-top: 40px; }
        }
      `}</style>

      <div style={{ maxWidth: "720px" }}>

        {/* Wide layout: side-by-side columns */}
        <div className="career-ladder" style={{ display: "flex", gap: "0", alignItems: "flex-start" }}>

          {/* Label column */}
          <div style={{ flexShrink: 0, width: "80px", paddingTop: "38px" }}>
            {LADDER.map((row) => (
              <div
                key={row.levelLabel}
                style={{
                  height: "72px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-brand)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#595854",
                    textTransform: "uppercase",
                  }}
                >
                  {row.levelLabel}
                </span>
              </div>
            ))}
          </div>

          {/* IC column */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <ColHeader>Individual contributor</ColHeader>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {LADDER.map((row) => (
                <div key={row.levelLabel} style={{ height: "72px", display: "flex", alignItems: "center" }}>
                  <div style={{ width: "100%" }}>
                    <RoleCard role={row.ic.role} sub={row.ic.sub} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow column */}
          <div style={{ flexShrink: 0, width: "40px", paddingTop: "38px" }}>
            {LADDER.map((row) => (
              <div
                key={row.levelLabel}
                style={{
                  height: "72px",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {row.lateral && <LateralArrow />}
              </div>
            ))}
          </div>

          {/* Manager column */}
          <div className="career-ladder-manager-col" style={{ flex: 1, minWidth: 0 }}>
            <ColHeader>Manager</ColHeader>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {LADDER.map((row) => (
                <div key={row.levelLabel} style={{ height: "72px", display: "flex", alignItems: "center" }}>
                  {row.manager && (
                    <div style={{ width: "100%" }}>
                      <RoleCard role={row.manager.role} sub={row.manager.sub} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
