// Discipline ids remain part of the route union so that other flows (e.g. the
// "Where I Am Now" growth avenues) can request a discipline; App routes those
// to the unified handbook with the matching discipline selected.
export type RouteKey =
  | "welcome"
  | "handbook"
  | "ux-design"
  | "content-design"
  | "service-design"
  | "where-i-am-now"
  | "how-levels-work"
  | "career-paths"
  | "growing-your-career";

interface SidebarProps {
  active: RouteKey;
  onNavigate: (route: RouteKey) => void;
}

function NavItem({
  label,
  isActive,
  onClick,
  indent = false,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  indent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: indent ? "8px 20px 8px 36px" : "10px 20px",
        background: "none",
        borderTop: "none",
        borderRight: "none",
        borderBottom: "none",
        borderLeft: isActive ? "3px solid #00E95C" : "3px solid transparent",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-brand)",
        fontSize: indent ? "13px" : "14px",
        fontWeight: isActive ? 700 : 400,
        color: isActive ? "#005D1F" : "#262626",
        letterSpacing: isActive ? "0.01em" : "normal",
        transition: "color 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.color = "#005D1F";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.color = "#262626";
        }
      }}
    >
      {label}
    </button>
  );
}

export function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside
      style={{
        width: "260px",
        minWidth: "260px",
        height: "100vh",
        background: "#F6F4E9",
        borderRight: "1px solid #D4D4D3",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        overflowY: "auto",
      }}
    >
      {/* Logo / Brand */}
      <div
        style={{
          padding: "28px 20px 24px",
          borderBottom: "1px solid #D4D4D3",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#005D1F",
          }}
        >
          Design Career
        </div>
        <div
          style={{
            fontFamily: "var(--font-brand)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#005D1F",
          }}
        >
          Handbook
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ paddingTop: "12px", flex: 1 }}>
        <NavItem
          label="Welcome"
          isActive={active === "welcome"}
          onClick={() => onNavigate("welcome")}
        />
        <NavItem
          label="How levels work"
          isActive={active === "how-levels-work"}
          onClick={() => onNavigate("how-levels-work")}
        />
        <NavItem
          label="Career paths"
          isActive={active === "career-paths"}
          onClick={() => onNavigate("career-paths")}
        />
        <NavItem
          label="Career Handbook"
          isActive={active === "handbook"}
          onClick={() => onNavigate("handbook")}
        />
        <NavItem
          label="Where I Am Now"
          isActive={active === "where-i-am-now"}
          onClick={() => onNavigate("where-i-am-now")}
        />
        <NavItem
          label="Growing your career"
          isActive={active === "growing-your-career"}
          onClick={() => onNavigate("growing-your-career")}
        />
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #D4D4D3",
          fontFamily: "var(--font-brand)",
          fontSize: "12px",
          color: "#595854",
        }}
      >
        Internal use only · Design Dept
      </div>
    </aside>
  );
}
