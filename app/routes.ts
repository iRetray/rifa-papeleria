import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/seleccionar-numero", "routes/seleccionar-numero.tsx"),
  route("/inventario", "routes/inventario.tsx")
] satisfies RouteConfig;
