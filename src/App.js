import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Home from './components/main/home/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Auth}></Route>
          <Route path='/home' component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
