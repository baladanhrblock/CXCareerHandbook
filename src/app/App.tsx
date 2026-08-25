import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "./components/Sidebar";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { UnifiedHandbook } from "./components/UnifiedHandbook";
import { WhereIAmNow } from "./components/WhereIAmNow";
import { isDisciplineId, type DisciplineId } from "./data/disciplines";
import type { Level } from "./data/sharedCompetencies";
import type { RouteKey } from "./components/Sidebar";

const VALID_LEVELS: Level[] = ["associate", "mid", "senior", "lead", "principal"];

function readDisciplineFromUrl(): DisciplineId {
  const param = new URLSearchParams(window.location.search).get("discipline");
  return isDisciplineId(param) ? param : "ux-design";
}

function readLevelFilterFromUrl(): "all" | Level {
  const param = new URLSearchParams(window.location.search).get("levels");
  return param && (VALID_LEVELS as string[]).includes(param) ? (param as Level) : "all";
}

export default function App() {
  const [route, setRoute] = useState<RouteKey>("welcome");
  const [discipline, setDiscipline] = useState<DisciplineId>(readDisciplineFromUrl);
  const [levelFilter, setLevelFilter] = useState<"all" | Level>(readLevelFilterFromUrl);

  // Reflect the selected discipline and level filter in the URL while on the
  // handbook page, so a specific view can be shared as a link.
  useEffect(() => {
    if (route !== "handbook") return;
    const params = new URLSearchParams(window.location.search);
    params.set("discipline", discipline);
    if (levelFilter === "all") {
      params.delete("levels");
    } else {
      params.set("levels", levelFilter);
    }
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, [route, discipline, levelFilter]);

  // Keep selections in sync with back/forward navigation.
  useEffect(() => {
    function onPop() {
      setDiscipline(readDisciplineFromUrl());
      setLevelFilter(readLevelFilterFromUrl());
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function handleNavigate(r: RouteKey) {
    // Requests for a specific discipline (e.g. from Where I Am Now growth
    // avenues) open the unified handbook with that discipline selected.
    if (isDisciplineId(r)) {
      setDiscipline(r);
      setRoute("handbook");
      return;
    }
    setRoute(r);
  }

  function handleSelectDiscipline(id: DisciplineId) {
    setDiscipline(id);
  }

  function renderContent() {
    if (route === "welcome") {
      return <WelcomeScreen onNavigate={handleNavigate} />;
    }
    if (route === "handbook") {
      return (
        <UnifiedHandbook
          discipline={discipline}
          onSelectDiscipline={handleSelectDiscipline}
          levelFilter={levelFilter}
          onSelectLevel={setLevelFilter}
        />
      );
    }
    if (route === "where-i-am-now") {
      return <WhereIAmNow onNavigate={handleNavigate} />;
    }
    return null;
  }

  return (
    <>
      {/* Print-only styles — injected once at root */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: #FFFFFF !important; }
        }
        @media screen {
          .print-only { display: none !important; }
        }
        /* Smooth focus ring for all interactive elements */
        *:focus-visible {
          outline: 2px solid #005D1F;
          outline-offset: 2px;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          background: "#F6F4E9",
          fontFamily: "var(--font-brand)",
        }}
      >
        {/* Sidebar — hidden in print */}
        <div className="no-print">
          <Sidebar active={route} onNavigate={handleNavigate} />
        </div>

        {/* Main area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Scrollable content */}
          <main
            id="main-content"
            style={{ flex: 1, overflowY: "auto", background: "#F6F4E9" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={route}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{ minHeight: "100%" }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Persistent footer */}
          <footer
            className="no-print"
            style={{
              borderTop: "1px solid #D4D4D3",
              padding: "10px 64px",
              background: "#F6F4E9",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "11px",
                color: "#9FA4AA",
                letterSpacing: "0.02em",
              }}
            >
              Draft proof of concept · <strong style={{ fontWeight: 700 }}>bold text</strong> is unverified
            </span>
            <span
              style={{
                fontFamily: "var(--font-brand)",
                fontSize: "11px",
                color: "#D6DAE0",
              }}
            >
              Design Career Handbook · Internal only
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
