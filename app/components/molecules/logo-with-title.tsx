import * as React from "react";
import { AppLogoIcon } from "~/components/ui/app-logo-icon";
import { AppTitleText } from "~/components/ui/app-title-text";

type LogoWithTitleProps = {
    title?: string;
    className?: string;
};

export const LogoWithTitle: React.FC<LogoWithTitleProps> = ({
    title = "Axocom Analytics",
    className = "",
}) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <AppLogoIcon />
            <AppTitleText>{title}</AppTitleText>
        </div>
    );
};