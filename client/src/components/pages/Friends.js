import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import Search from "../modules/Search.js";
import FriendsList from "../modules/FriendsList.js";
import RequestsList from "../modules/RequestsList";
import Lists from "../modules/Lists";
import "./Friends.css";
// THIS IS WHERE THE STUFF ON THE DEFAULT FRIENDS SCREEN WILL GO

const Friends = (props) => {
  return (
    <div>
      <div className="Instructions">
        <div className="instructions-header">friends</div>
        <div className="instructions-info">
          search for your friends by friendID or by name (exactly as it appears on their google
          account)
        </div>
        <div className="instructions-info">Your friendID is: {props.numId}</div>
        <hr color="#8860d0" />
      </div>
      <div className="Friends-container">
        <div className="FriendsList">
          <Lists userId={props.userId} numId={props.numId} />
        </div>
        <div className="FriendsSearch">
          <Search userId={props.userId} numId={props.numId} />
        </div>
      </div>
    </div>
  );
};

export default Friends;
