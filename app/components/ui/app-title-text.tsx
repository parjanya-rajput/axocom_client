import * as React from "react";

type AppTitleTextProps = {
    children?: React.ReactNode;
    as?: React.ElementType;
    className?: string;
};

export const AppTitleText: React.FC<AppTitleTextProps> = ({
    children = "Axocom Analytics",
    as: Component = "h1",
    className = "",
}) => {
    return (
        <Component
            className={`text-lg font-bold tracking-tight text-[#111318] ${className}`}
        >
            {children}
        </Component>
    );
};