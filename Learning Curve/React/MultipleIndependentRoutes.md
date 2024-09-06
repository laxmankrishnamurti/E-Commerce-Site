#### This is how we can create a parent route and inside it we can render it's child route.

```ts
<Route path="/" element={<Root />}>
  <Route path="/" element={<Home />} />
</Route>
```

The Root Component/Layout looks like

```ts
import { Header, Footer } from "../components/index.components";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
```

## How we can Create Multiple Layout that render independently, In short how to create multiple independent routes which should not have a parent route.

```ts
// For Signup and Signin
// In this layout we can render multiple routes which dosen't have any aprent route. The layout itself is a child layout.
import { Outlet } from "react-router-dom";

function AuthRoot() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AuthRoot;
```

<code>Let's create multiple routes</code>

```ts
import AuthRoot from "./router/AuthRoot.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<AuthRoot />}>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </>
  )
);
```

We can also make both Signin and Signup page independent.

```ts

```
