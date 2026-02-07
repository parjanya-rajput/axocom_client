import * as React from "react";
import { AppLogoIcon } from "~/components/ui/app-logo-icon";
import { AppTitleText } from "~/components/ui/app-title-text";
import { NavItemButton } from "~/components/ui/nav-item-button";
import { HeaderSearchIcon } from "~/components/ui/header-search-icon";
import { HeaderSearchInput } from "~/components/ui/header-search-input";
import { AvatarPlaceholder } from "~/components/ui/avatar-placeholder";

export type AppBarNavItem = {
    id: string;
    label: string;
};

type AppBarProps = {
    navItems: AppBarNavItem[];
    activeNavId: string;
    onNavChange?: (id: string) => void;
    searchValue?: string;
    defaultSearchValue?: string;
    onSearchChange?: (value: string) => void;
    className?: string;
};

export const AppBar: React.FC<AppBarProps> = ({
    navItems,
    activeNavId,
    onNavChange,
    searchValue,
    defaultSearchValue,
    onSearchChange,
    className = "",
}) => {
    const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        onSearchChange?.(e.target.value);
    };

    return (
        <header
            className={`sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 ${className}`}
        >
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <AppLogoIcon />
                        <AppTitleText>Axocom Analytics</AppTitleText>
                    </div>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <NavItemButton
                                key={item.id}
                                label={item.label}
                                isActive={item.id === activeNavId}
                                onClick={() => onNavChange?.(item.id)}
                            />
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative w-72">
                        <HeaderSearchIcon />
                        <HeaderSearchInput
                            value={searchValue}
                            defaultValue={defaultSearchValue}
                            placeholder="Search constituency, candidate..."
                            onChange={handleSearchChange}
                        />
                    </div>
                    <AvatarPlaceholder />
                </div>
            </div>
        </header>
    );
};