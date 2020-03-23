import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import StreamList from "./streams/StreamList";

const App = () => {
  return (
    <div className="ui container">
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact>
              <StreamList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
