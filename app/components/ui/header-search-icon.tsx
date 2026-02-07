import * as React from "react";
import { Search } from "lucide-react";

type HeaderSearchIconProps = {
    className?: string;
};

export const HeaderSearchIcon: React.FC<HeaderSearchIconProps> = ({
    className = "",
}) => {
    return (
        <Search
            className={`absolute left-3 top-2.5 h-4 w-4 text-gray-400 ${className}`}
        />
    );
};