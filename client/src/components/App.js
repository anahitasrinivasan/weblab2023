import React, { useState, useEffect } from "react";
import NavBar from "./modules/NavBar.js";
import { Router, navigate } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import Journal from "./pages/Journal.js";
import Profile from "./pages/Profile.js";
import Friends from "./pages/Friends.js";
import FriendEntries from "./pages/FriendEntries.js";
import Settings from "./pages/Settings.js";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [numId, setNumId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        // console.log(user._id);
        setNumId(user.idNum);
        // console.log(user.idNum);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    // console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setNumId(user.idNum);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
    navigate("/");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <div className="App-container">
        <Router>
          <Home path="/" userId={userId}/>
          <Journal path="/journal/:userId" />
          <Profile path="/profile/:userId" />
          <Friends path="/friends/:userId" userId={userId} numId={numId} />
          <FriendEntries path="/friends/entries/:friendId" userId={userId} numId={numId} />
          <Settings path="/settings/:userId" userId={userId} numId={numId} />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
