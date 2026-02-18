import { useNavigate } from "react-router";
import { NAV_ITEMS } from "~/types/nav";

const routeForId: Record<string, string> = {
    dashboard: "/",
    constituencies: "/constituency",
    candidates: "/candidates",
    parties: "/parties",
    elections: "/elections",
};

export function useNavigation() {
    const navigate = useNavigate();

    const onNavChange = (id: string) => {
        const path = routeForId[id] ?? `/${id}`;
        navigate(path);
    };

    return {
        navItems: NAV_ITEMS,
        onNavChange,
    };
}