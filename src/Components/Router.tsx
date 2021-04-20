import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Header from "Components/Header";
import Loader from "./Loader";

const Movie = lazy(() => import("Routes/Movie"));
const TV = lazy(() => import("Routes/TV"));
const Search = lazy(() => import("Routes/Search"));
const Detail = lazy(() => import("Routes/Detail"));

const Router = () => {
  useEffect(() => {
    import("Routes/TV");
    import("Routes/Search");
    import("Routes/Detail");
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route path="/" exact component={Movie} />
          <Route path="/tv" exact component={TV} />
          <Route path="/search" component={Search} />
          <Route path="/movie/:id" component={Detail} />
          <Route path="/tv/:id" component={Detail} />
          <Redirect from="*" to="/" />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
