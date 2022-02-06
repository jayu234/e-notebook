import React from "react";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/NoteState';
import UserState from './context/UserState';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AlertState from "./context/AlertState";
const App = () => {

  return (
    <>
      <UserState>
        <AlertState>
          <NoteState>
            <Router>
              <Navbar />
              <Switch>
                <Route exact path={["/", "/home"]} >
                  <Home />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>

                <Route exact path="/signup">
                  <SignUp />
                </Route>

                <Route exact path="/about">
                  <About />
                </Route>
                
              </Switch>

            </Router>
          </NoteState>
        </AlertState>
      </UserState>
    </>
  );
}

export default App;
