import * as React from "react";
import { cn } from "~/lib/utils"; // adjust if you keep a different helper

type NavItemButtonProps = {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
};

export const NavItemButton: React.FC<NavItemButtonProps> = ({
    label,
    isActive = false,
    onClick,
    className,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "text-sm font-medium transition-colors",
                isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                    : "text-gray-500 hover:text-blue-600",
                className,
            )}
        >
            {label}
        </button>
    );
};