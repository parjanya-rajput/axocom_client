interface BadgeProps {
    children: React.ReactNode
    variant: "red" | "green" | "blue"
    icon?: React.ReactNode
}

export function Badge({ children, variant, icon }: BadgeProps) {
    const colors: Record<string, string> = {
        red: "bg-red-50 text-red-600 border-red-100",
        green: "bg-green-50 text-green-600 border-green-100",
        blue: "bg-blue-50 text-blue-600 border-blue-100",
    }

    return (
        <div
            className={`px-3 py-1 border rounded text-xs font-bold flex items-center gap-1 ${colors[variant]}`}
        >
            {icon} {children}
        </div>
    )
}
