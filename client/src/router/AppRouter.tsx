import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { appRoutes } from "./routes.const";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRouter;