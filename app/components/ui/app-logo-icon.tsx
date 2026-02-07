import * as React from "react";
import { LayoutPanelLeft } from "lucide-react";

type AppLogoIconProps = {
    size?: number;
    className?: string;
};

export const AppLogoIcon: React.FC<AppLogoIconProps> = ({
    size = 20,
    className = "",
}) => {
    return (
        <div
            className={`size-8 bg-blue-600 rounded-md flex items-center justify-center text-white ${className}`}
        >
            <LayoutPanelLeft size={size} fill="currentColor" />
        </div>
    );
};