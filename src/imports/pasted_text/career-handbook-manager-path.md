Add a manager path to the Career Handbook page. The individual contributor (IC) view must keep working exactly as it does today. Use all competency text exactly as written below. Do not shorten, reword, or split it into bullets.

Styling rules for anything new: use only these colors: #262626 (text), #595854 (secondary text), #005D1F, #003512, #D6E5DB, #F6F4E9, #D4D4D3, #FFFFFF, #F1F5F7. No text smaller than 12px. Match the existing matrix, chip, and side panel styles.

1. DATA
In src/app/data/sharedCompetencies.ts, add a new exported array MANAGER_ROWS with two levels of its own: "manager" (label "Design Manager", Level 4) and "director" (label "Design Director", Level 5). Do not add these to the existing IC LEVELS array. Each row has type "shared" and tag "Manager-wide".

Row 1, label "Knowledge"
Design Manager: "Builds people management practices and handles difficult management situations. Demonstrates knowledge of industry trends and regularly seeks external expertise to accelerate learning. Understands the critical success metrics and KPIs within area of focus."
Design Director: "Command of people management strategies, developing people leaders, design process. Contributes to industry trends. Identifies future capabilities for UX, Product, IT organizations. Defines critical success metrics and KPIs within each line of business to their organization."

Row 2, label "Craft & Delivery"
Design Manager: "Manages individuals across a single discipline and many experiences, applications, and products. Effectively runs design team through resource planning and allocation per sprint. Strategic planning and roadmap focus for several quarters. Support fiscal responsibility for team and project resource spend. Proactively identifies and clears roadblocks for the team. Leads hiring activities for their teams."
Design Director: "Manages managers across multiple disciplines and lines of business. Plans resources across entire design team and advocates continued investment and optimization. Conducts annual strategic planning and roadmap focus for each line of business. Supports vendor management for design tooling. Plans fiscal allocations for entire organization and project resource spend. Proactively identifies and clears roadblocks for the organization. Leads hiring activities for their team."

Row 3, label "Communication & Leadership"
Design Manager: "Evaluates talent effectively, communicates strength and areas of opportunity. Effectively challenges and guides teams to elevate creative execution across all facets of design. Helps the team navigate feedback from customers and senior stakeholders by defining frameworks for processing it. Influences peers and partners to ensure teams are delivering great design and customer value. Sets clear expectations for team, peers, and manager, and solicits and delivers timely feedback."
Design Director: "Creates and leads with the design principles for the enterprise. Effectively challenges and guides design craft across all disciplines. Prepares managers for senior-level interactions, sets expectations to senior-level stakeholders. Influences peers and partners to ensure teams are delivering great design and customer value. Assesses talent of their organization, provides opportunities for individual growth. Proactively coaches and mentors our future leaders."

2. PATH TOGGLE
In src/app/components/UnifiedHandbook.tsx, add a two-option segmented toggle at the top of the filters, above the discipline chips, labeled "Path": "Individual contributor" (default) and "Manager". Style it like the existing chips: selected option #005D1F background with white text.

When "Individual contributor" is selected: everything behaves exactly as it does today.

When "Manager" is selected:
- Hide the discipline chips and the compare control.
- Level chips become: "All", "Design Manager", "Design Director".
- The matrix shows only the three MANAGER_ROWS with two columns, Design Manager and Design Director. No craft rows.
- Replace the page intro text under the title with: "Managers are assessed on three manager competencies that apply across every discipline. Each cell describes what Skilled looks like at that level."
- Clicking a cell opens the existing side panel, same as the IC view.

3. URL
Reflect the path in the URL as ?path=manager (omit for IC) so the manager view can be shared as a link. When path=manager, ignore the discipline and compare parameters. Keep back/forward navigation working.

4. LINKS FROM OTHER PAGES
In src/app/components/CareerPaths.tsx, make the "Design Manager" and "Design Director" cards clickable. Clicking opens the Career Handbook with the Manager path selected and that level chip selected. Make the IC role cards clickable the same way, opening the IC path at that level.

After making the changes, confirm: the IC view is unchanged; switching to Manager shows 3 rows and 2 columns with the text above; the ?path=manager link opens directly into the manager view.