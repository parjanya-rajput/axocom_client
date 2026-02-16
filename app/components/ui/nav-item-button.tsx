import * as React from "react";
import { cn } from "~/lib/utils";

type NavItemButtonProps = {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
    /** "horizontal" = bottom border when active (app bar). "vertical" = left border when active (sidebar). */
    variant?: "horizontal" | "vertical";
};

export const NavItemButton: React.FC<NavItemButtonProps> = ({
    label,
    isActive = false,
    onClick,
    className,
    variant = "horizontal",
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "text-sm font-medium transition-colors",
                variant === "horizontal" && (
                    isActive
                        ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                        : "text-gray-500 hover:text-blue-600"
                ),
                variant === "vertical" && (
                    isActive
                        ? "text-blue-600 border-l-2 border-blue-600 pl-2 -ml-px"
                        : "text-gray-500 hover:text-blue-600 border-l-2 border-transparent pl-2 -ml-px"
                ),
                variant === "vertical" && "w-full text-left py-2",
                className,
            )}
        >
            {label}
        </button>
    );
};