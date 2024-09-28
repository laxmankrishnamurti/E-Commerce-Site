  import { StrictMode } from "react";
  import { createRoot } from "react-dom/client";
  import "./index.css";

  import Root from "./router/Root.tsx";
  import { Admin, Signup, Signin, AccountDashboard } from "./components/index.components.ts";

  import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
  } from "react-router-dom";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
          <Route path="/:sellerId" element={<Admin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/:sellerId/profile" element={<AccountDashboard />} />
        </Route>
      </>
    )
  );

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
