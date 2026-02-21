interface ProfileDataProps {
    label: string
    value: string
}

export function ProfileData({ label, value }: ProfileDataProps) {
    return (
        <div className="space-y-1">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {label}
            </span>
            <p className="text-sm font-bold text-slate-800">{value}</p>
        </div>
    )
}