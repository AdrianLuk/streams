import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamShow from "./streams/StreamShow";
import history from "../history";

const App = () => {
  return (
    <div style={{ padding: "2rem" }} className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact>
              <StreamList />
            </Route>
            <Route path="/streams/new">
              <StreamCreate />
            </Route>
            <Route path="/streams/edit/:id">
              <StreamEdit />
            </Route>
            <Route path="/streams/delete/:id">
              <StreamDelete />
            </Route>
            <Route path="/streams/:id" exact>
              <StreamShow />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
