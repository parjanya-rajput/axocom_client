import * as React from "react";
import { Menu } from "lucide-react";
import { AppLogoIcon } from "~/components/ui/app-logo-icon";
import { AppTitleText } from "~/components/ui/app-title-text";
import { NavItemButton } from "~/components/ui/nav-item-button";
import { cn } from "~/lib/utils";

export type SidebarNavItem = {
    id: string;
    label: string;
};

const SIDEBAR_WIDTH_OPEN = "w-56";   // 14rem
const SIDEBAR_WIDTH_CLOSED = "w-14"; // 3.5rem

type SidebarProps = {
    navItems: SidebarNavItem[];
    activeNavId: string;
    onNavChange?: (id: string) => void;
    /** Controlled: when provided, parent controls open state so main content can shift. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
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

            {/* Sidebar - fixed width, never overlaps; main content uses pl-14 / pl-56 to shift */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200",
                    "flex flex-col transition-[width] duration-200 ease-out overflow-hidden",
                    open ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
                    className
                )}
            >
                {/* Header: three-line icon in line with Axocom for consistent look */}
                <div className="flex items-center gap-2 px-3 py-4 border-b border-gray-200 min-h-[3.5rem] shrink-0">
                    <button
                        type="button"
                        onClick={toggle}
                        className="shrink-0 flex items-center justify-center size-8 text-gray-600 hover:text-gray-900 transition-colors rounded"
                        aria-label={open ? "Close sidebar" : "Open sidebar"}
                    >
                        <Menu className="size-4" />
                    </button>
                    {open && (
                        <>
                            <AppLogoIcon />
                            <AppTitleText>Axocom Analytics</AppTitleText>
                        </>
                    )}
                </div>

                {/* Nav - only when open */}
                {open && (
                    <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
                        {navItems.map((item) => (
                            <NavItemButton
                                key={item.id}
                                label={item.label}
                                isActive={item.id === activeNavId}
                                onClick={() => onNavChange?.(item.id)}
                                variant="vertical"
                            />
                        ))}
                    </nav>
                )}

                {/* Profile row - only when open */}
                {open && (
                    <div className="px-3 py-4 border-t border-gray-200 shrink-0">
                        <span className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors cursor-default">
                            Profile
                        </span>
                    </div>
                )}
            </aside>
        </>
    );
};

/** Use with Sidebar for consistent main padding: pl-14 when closed, pl-56 when open. */
export const getSidebarMainClass = (open: boolean) =>
    open ? "pl-56" : "pl-14";