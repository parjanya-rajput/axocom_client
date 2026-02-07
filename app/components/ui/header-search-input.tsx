import * as React from "react";
import { Input } from "~/components/ui/input";

type HeaderSearchInputProps = React.ComponentProps<typeof Input>;

export const HeaderSearchInput: React.FC<HeaderSearchInputProps> = ({
    className,
    ...props
}) => {
    return (
        <Input
            {...props}
            className={`pl-10 bg-gray-100 border-none rounded-lg h-9 text-xs ${className ?? ""}`}
        />
    );
};