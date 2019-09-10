import React, { createContext, useContext, useEffect } from "react";
import { Router as RouterOriginal, withRouter } from "react-router-dom";
import queryString from "query-string";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

/*
    A light-weight wrapper around React Router that adds a useRouter() hook so
    that any component can easily access the router and re-render on route change.
    Import React Router components from this file instead of react-router-dom directly.
  */

// <RouterContextProvider> gets routerProps (match, location, history)
// using the withRouter HOC and makes them available to useRouter via context.
const RouterContext = createContext();
const RouterContextProvider = withRouter(({ children, ...routerProps }) => {
  return (
    <RouterContext.Provider history={history} value={routerProps}>
      {children}
    </RouterContext.Provider>
  );
});

// Export <Router> component that wraps children with above <RouterContextProvider>
// We also inclide <ScrollManager /> to scroll to top on route change.
export function Router({ children }) {
  return (
    <RouterOriginal history={history}>
      <RouterContextProvider>
        <ScrollToTop />
        {children}
      </RouterContextProvider>
    </RouterOriginal>
  );
}

// Export our hook for getting router object inside any component
export function useRouter() {
  // Get routerProps from context
  const routerProps = useContext(RouterContext);

  // Throw error if no routerProps (means we aren't inside <Router>)
  if (!routerProps) {
    throw new Error("useRouter may only be called within <Router />");
  }

  // Return our custom router object
  return {
    // For convenience add push(), replace(), pathname at top level
    push: routerProps.history.push,
    replace: routerProps.history.replace,
    pathname: routerProps.location.pathname,
    // Add "query" which combines params and query string into one object.
    // Example: /user/gabe?sort=popular -> { name: "gabe", sort: "popular" }
    query: {
      ...queryString.parse(routerProps.location.search),
      ...routerProps.match.params
    },
    // Add routerProps (match, location, history) so we still have
    // access to rest of React Router functionality.
    ...routerProps
  };
}

// This can be customized if you need more advanced scroll behavior
function ScrollToTop() {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);
  return null;
}

// Export other react-router components
export { Route, Switch, Link, NavLink } from "react-router-dom";
