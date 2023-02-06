import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from "./components/SignupFormModal/SignupForm";
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import Navigation from "./components/Navigation";
import UsersIndex from './components/UsersIndex';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route exact path="/profilepage/:userId">
            <ProfilePage />
          </Route>
          <Route exact path="/homePage">
            <HomePage />
          </Route>
          <Route exact path="/users">
            <UsersIndex />
          </Route>
          <Route exact path="/">
            <LoginFormPage />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      <Footer />
    </>
  );
}

export default App;
