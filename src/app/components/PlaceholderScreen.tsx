interface PlaceholderScreenProps {
  title: string;
  description: string;
}

export function PlaceholderScreen({ title, description }: PlaceholderScreenProps) {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "64px 56px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          background: "#D6E5DB",
          color: "#005D1F",
          fontFamily: "var(--font-brand)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "4px 10px",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      >
        Coming soon
      </div>
      <h1
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "36px",
          fontWeight: 700,
          color: "#005D1F",
          letterSpacing: "0.12em",
          lineHeight: 1.15,
          marginBottom: "16px",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontFamily: "var(--font-brand)",
          fontSize: "16px",
          fontWeight: 400,
          color: "#6E6E6E",
          lineHeight: 1.7,
          maxWidth: "560px",
        }}
      >
        {description}
      </p>

      <div
        style={{
          marginTop: "48px",
          padding: "32px",
          background: "#F8F8F5",
          borderTop: "1px solid #D4D4D3",
          borderRight: "1px solid #D4D4D3",
          borderBottom: "1px solid #D4D4D3",
          borderLeft: "4px solid #00E95C",
          borderRadius: "8px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "14px",
            color: "#6E6E6E",
            margin: 0,
          }}
        >
          This section will be built out in the next step.
        </p>
      </div>
    </div>
  );
}
