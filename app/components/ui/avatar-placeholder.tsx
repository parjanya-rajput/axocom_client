import * as React from "react";

type AvatarPlaceholderProps = {
    className?: string;
};

export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
    className = "",
}) => {
    return (
        <div
            className={`size-8 bg-gray-200 rounded-full flex items-center justify-center ${className}`}
        />
    );
};