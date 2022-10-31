import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormModal/SignupForm";
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import Navigation from "./components/Navigation";
import UsersIndex from './components/UsersIndex';

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/profilepage/:userId">
            <ProfilePage />
          </Route>
          <Route path="/homePage">
            <HomePage />
          </Route>
          <Route exact path="/users">
            <UsersIndex />
          </Route>
          <Route exact path="/">
            <LoginFormPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
