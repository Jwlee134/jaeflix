import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Movie from "Routes/Movie";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Header from "components/Header";
import Detail from "Routes/Detail";
import Credits from "./Credits";
import Videos from "./Videos";

const Router = () => (
  <BrowserRouter>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Movie} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/movie/:id/credits" component={Credits} />
        <Route path="/movie/:id/videos" component={Videos} />
        <Route path="/tv/:id" component={Detail} />
        <Route path="/tv/:id/credits" component={Credits} />
        <Route path="/tv/:id/videos" component={Videos} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </BrowserRouter>
);

export default Router;
