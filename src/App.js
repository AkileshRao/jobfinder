import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Home from './components/main/home/Home';
import UserProvider from './providers/UserProvider';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <UserProvider>
      <ToastContainer />

      <div className="App">
        <Router>
          <Switch>
            <Redirect exact from="/" to="auth" />
            <Route path='/auth' component={Auth}></Route>
            <Route path='/home' component={Home}></Route>
          </Switch>
        </Router>
      </div>
    </UserProvider>

  );
}

export default App;
