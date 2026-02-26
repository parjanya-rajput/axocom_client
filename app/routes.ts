import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("candidates", "routes/candidates.tsx"),
    route("constituency", "routes/constituency.tsx"),
    route("candidates/:id", "routes/candidate-profile.tsx"),
] satisfies RouteConfig;