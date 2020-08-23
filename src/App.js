import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { Login } from "./components/Login";
import { BlogEditor } from "./components/BlogEditor";
import { Blog } from "./components/Blog";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/editor" component={BlogEditor} />
          <Route path="/" component={Blog} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
