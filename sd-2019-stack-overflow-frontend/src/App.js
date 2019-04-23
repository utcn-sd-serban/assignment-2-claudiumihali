import React from 'react';
import './App.css';
import {HashRouter, Switch, Route} from "react-router-dom";
import SmartQuestionList from './view/SmartQuestionList';

const App = () => (
  <div className="App">
    <HashRouter>
      <Switch>
        <Route exact={true} component={SmartQuestionList} path="/" />
      </Switch>
    </HashRouter>
  </div>
);

export default App;