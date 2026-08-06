import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export type RouteKey =
  | "welcome"
  | "shared-competencies"
  | "ux-design"
  | "content-design"
  | "service-design"
  | "experience-strategy"
  | "where-i-am-now";

interface SidebarProps {
  active: RouteKey;
  onNavigate: (route: RouteKey) => void;
}

const DISCIPLINES: { key: RouteKey; label: string }[] = [
  { key: "ux-design", label: "UX Design" },
  { key: "content-design", label: "Content Design" },
  { key: "service-design", label: "Service Design" },
  { key: "experience-strategy", label: "Experience Strategy" },
];

const DISCIPLINE_KEYS: RouteKey[] = DISCIPLINES.map((d) => d.key);

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
        border: "none",
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
  const [disciplinesOpen, setDisciplinesOpen] = useState(
    DISCIPLINE_KEYS.includes(active)
  );

  const isDisciplineActive = DISCIPLINE_KEYS.includes(active);

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
            fontSize: "11px",
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
            fontSize: "11px",
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
          label="Shared Competencies"
          isActive={active === "shared-competencies"}
          onClick={() => onNavigate("shared-competencies")}
        />

        {/* Disciplines group */}
        <button
          onClick={() => setDisciplinesOpen((o) => !o)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "10px 20px",
            background: "none",
            border: "none",
            borderLeft: isDisciplineActive
              ? "3px solid #00E95C"
              : "3px solid transparent",
            cursor: "pointer",
            fontFamily: "var(--font-brand)",
            fontSize: "14px",
            fontWeight: isDisciplineActive ? 700 : 400,
            color: isDisciplineActive ? "#005D1F" : "#262626",
          }}
        >
          <span>Disciplines</span>
          {disciplinesOpen ? (
            <ChevronDown size={14} color="#6E6E6E" />
          ) : (
            <ChevronRight size={14} color="#6E6E6E" />
          )}
        </button>

        {disciplinesOpen &&
          DISCIPLINES.map((d) => (
            <NavItem
              key={d.key}
              label={d.label}
              isActive={active === d.key}
              onClick={() => onNavigate(d.key)}
              indent
            />
          ))}

        <NavItem
          label="Where I Am Now"
          isActive={active === "where-i-am-now"}
          onClick={() => onNavigate("where-i-am-now")}
        />
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #D4D4D3",
          fontFamily: "var(--font-brand)",
          fontSize: "11px",
          color: "#9FA4AA",
        }}
      >
        Internal use only · Design Dept
      </div>
    </aside>
  );
}
