import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import PinBuilder from "./components/PinBuilder";
import SinglePin from "./components/SinglePin";
import EditPin from "./components/EditPin";
import SplashPage from "./components/SplashPage";
import { authenticate } from "./store/session";

import Main from "./components/Main";
import ProfilePage from "./components/ProfilePage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {!currentUser ? (
        <>
          <NavBar />
          <SplashPage />
          <Switch>
            <Route path="/login" exact={true}>
              <LoginForm />
            </Route>
            <Route path="/sign-up" exact={true}>
              <SignUpForm />
            </Route>
          </Switch>
        </>
      ) : (
        <>
          <NavBar />
          <Switch>
            <ProtectedRoute path="/users" exact={true}>
              <UsersList />
            </ProtectedRoute>
            <ProtectedRoute path="/users/:userId" exact={true}>
              <User />
            </ProtectedRoute>
            <Route path="/profile/:profileId">
              <ProfilePage />
            </Route>
            <Route path="/pins/:pinId/edit">
              <EditPin />
            </Route>
            <Route path="/pins/:pinId" exact={true}>
              <SinglePin />
            </Route>
            <Route path="/pin-builder" exact={true}>
              <PinBuilder />
            </Route>
            <Route path="/" exact={true}>
              <Main />
            </Route>
            <Route>Page not found</Route>
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
