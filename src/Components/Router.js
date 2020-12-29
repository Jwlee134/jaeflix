import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Movie from "Routes/Movie";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Header from "Components/Header";
import Detail from "Routes/Detail";

const Router = () => (
  <BrowserRouter>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Movie} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/movie/:id/credits" />
        <Route path="/movie/:id/videos" />
        <Route path="/tv/:id" component={Detail} />
        <Route path="/tv/:id/credits" />
        <Route path="/tv/:id/videos" />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </BrowserRouter>
);

export default Router;
