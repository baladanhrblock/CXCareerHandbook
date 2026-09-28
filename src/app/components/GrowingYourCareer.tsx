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
        marginBottom: "40px",
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
        margin: "0 0 10px",
      }}
    >
      {children}
    </h2>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export function GrowingYourCareer() {
  return (
    <div style={{ width: "100%", padding: "64px 64px 80px" }}>
      <div style={{ maxWidth: "720px" }}>

        <PageTitle>Growing your career</PageTitle>

        {/* Designers own their development */}
        <div style={{ marginBottom: "48px" }}>
          <SectionHeading>Designers own their development</SectionHeading>
          <Body>
            Development looks different for everyone. A designer and their manager agree on the most important areas to develop. The designer then prioritizes them and follows through, with the manager{"'"}s support.
          </Body>
        </div>

        {/* Before aiming for the next level */}
        <div style={{ marginBottom: "48px" }}>
          <SectionHeading>Before aiming for the next level</SectionHeading>
          <p
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "16px",
              fontWeight: 400,
              color: "#262626",
              lineHeight: 1.6,
              margin: "0 0 12px",
            }}
          >
            Three questions to consider first:
          </p>
          <ol
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "16px",
              fontWeight: 400,
              color: "#262626",
              lineHeight: 1.7,
              margin: "0 0 20px",
              paddingLeft: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <li>Does the department need this position?</li>
            <li>Does Block have this need in another department?</li>
            <li>Which next-level competencies have been demonstrated consistently?</li>
          </ol>
          <Body>
            Designers should be ready to share examples of how, when, and where they have shown these competencies, and to show they can do the work of the next level while still performing well in their current role.
          </Body>
        </div>

        {/* Two planning cards */}
        <style>{`
          @media (max-width: 599px) {
            .gyc-cards { flex-direction: column !important; }
          }
        `}</style>
        <div
          className="gyc-cards"
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              flex: 1,
              background: "#FFFFFF",
              border: "1px solid #D4D4D3",
              borderRadius: "8px",
              padding: "20px 22px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "14px",
                fontWeight: 700,
                color: "#003512",
                marginBottom: "14px",
                lineHeight: 1.4,
              }}
            >
              Looking ahead: the next 1 to 3 years
            </div>
            <ul
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "14px",
                fontWeight: 400,
                color: "#262626",
                lineHeight: 1.7,
                margin: 0,
                paddingLeft: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <li>Where do I want to be?</li>
              <li>Is there something I{"'"}d like to do more of in my current role?</li>
              <li>What can I contribute now?</li>
              <li>How can I prepare for more responsibility?</li>
              <li>What do I need to learn in the next 6 to 18 months?</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div
            style={{
              flex: 1,
              background: "#FFFFFF",
              border: "1px solid #D4D4D3",
              borderRadius: "8px",
              padding: "20px 22px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "14px",
                fontWeight: 700,
                color: "#003512",
                marginBottom: "14px",
                lineHeight: 1.4,
              }}
            >
              Looking further: the next 3 to 5 years
            </div>
            <ul
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "14px",
                fontWeight: 400,
                color: "#262626",
                lineHeight: 1.7,
                margin: 0,
                paddingLeft: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <li>What skills or knowledge do I need to develop?</li>
              <li>What would I like to do more of in future roles, and less of?</li>
              <li>What level of responsibility do I want?</li>
              <li>What will it take to get there?</li>
            </ul>
          </div>
        </div>

        {/* Build a plan with a manager */}
        <div style={{ marginBottom: "48px" }}>
          <SectionHeading>Build a plan with a manager</SectionHeading>
          <div style={{ marginBottom: "20px" }}>
            <Body>
              Each development goal should include an objective, the actions to take, how the manager will help, a timeframe, and a way to track progress.
            </Body>
          </div>

          {/* Template table — header only */}
          <div style={{ overflowX: "auto", marginBottom: "10px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "var(--font-brand)",
              }}
            >
              <thead>
                <tr>
                  {["Objective", "Actions", "How the manager helps", "Timing", "Progress"].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: "10px 14px",
                        background: "#F1F5F7",
                        border: "1px solid #D4D4D3",
                        fontFamily: "var(--font-brand)",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "#595854",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
          <p
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "13px",
              fontWeight: 400,
              color: "#595854",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Worked examples coming soon.
          </p>
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "13px",
            fontWeight: 400,
            color: "#595854",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Questions about career paths or this handbook go to each designer{"'"}s manager.
        </p>

      </div>
    </div>
  );
}
