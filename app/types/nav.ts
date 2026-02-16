export interface NavItem {
    id: string;
    label: string;
}

export const NAV_ITEMS: NavItem[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "constituencies", label: "Constituencies" },
    { id: "candidates", label: "Candidates" },
    { id: "parties", label: "Parties" },
    { id: "elections", label: "Elections" },
];