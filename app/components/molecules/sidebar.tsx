import * as React from "react";
import {
    Menu,
    LayoutDashboard,
    Map,
    Users,
    User,
    Settings,
    Calendar,
} from "lucide-react";
import { cn } from "~/lib/utils";

export type SidebarNavItem = {
    id: string;
    label: string;
};

const SIDEBAR_WIDTH_OPEN = "w-56";  // match candidates.tsx width
const SIDEBAR_WIDTH_CLOSED = "w-16";

type SidebarProps = {
    navItems: SidebarNavItem[];
    activeNavId: string;
    onNavChange?: (id: string) => void;
    /** Controlled: when provided, parent controls open state so main content can shift. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
};

const iconForNavId = (id: string) => {
    switch (id) {
        case "dashboard":
            return <LayoutDashboard size={20} />;
        case "constituencies":
        case "constituency":
            return <Map size={20} />;
        case "candidates":
            return <Users size={20} />;
        case "profile":
            return <User size={20} />;
        case "settings":
            return <Settings size={20} />;
        case "parties":
            return <Users size={20} />;
        case "elections":
            return <Calendar size={20} />;
        default:
            return null;
    }
};

export const Sidebar: React.FC<SidebarProps> = ({
    navItems,
    activeNavId,
    onNavChange,
    open: controlledOpen,
    onOpenChange,
    className = "",
}) => {
    const [internalOpen, setInternalOpen] = React.useState(true);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const setOpen = React.useCallback(
        (value: boolean) => {
            if (isControlled) {
                onOpenChange?.(value);
            } else {
                setInternalOpen(value);
            }
        },
        [isControlled, onOpenChange]
    );

    const toggle = () => setOpen(!open);

    return (
        <>
            {/* Overlay when sidebar is open - click to close on small screens only */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 md:bg-transparent md:pointer-events-none"
                    aria-hidden
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 flex flex-col transition-[width] duration-200 ease-out overflow-hidden",
                    open ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
                    className
                )}
            >
                {/* Header: menu button + Axocom logo/title from candidates page */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-200">
                    <button
                        type="button"
                        onClick={toggle}
                        className="shrink-0 flex items-center justify-center size-8 text-slate-600 hover:text-slate-900 transition-colors rounded"
                        aria-label={open ? "Close sidebar" : "Open sidebar"}
                    >
                        <Menu className="size-4" />
                    </button>

                    {open && (
                        <div className="flex items-center gap-3">
                            <div className="size-7 text-blue-600">
                                <svg
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900">
                                Axocom
                            </h1>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navItems.map((item) => {
                        const active = item.id === activeNavId;
                        const icon = iconForNavId(item.id);

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => onNavChange?.(item.id)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 text-sm font-semibold rounded-lg transition-colors w-full",
                                    active
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                {icon && <span className="shrink-0">{icon}</span>}
                                {open && <span className="truncate">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>

                {/* Profile row from candidates page */}
                <div className="p-4 mt-auto border-t border-slate-100">
                    <div className="flex items-center gap-3 px-2">
                        {open && (
                            <div className="flex flex-col">
                                <span className="text-small text-slate-900">
                                    Profile
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

/** Use with Sidebar for consistent main padding: pl-16 when closed, pl-64 when open. */
export const getSidebarMainClass = (open: boolean) =>
    open ? "pl-56" : "pl-16";