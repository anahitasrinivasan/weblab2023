import React, { useState, useEffect } from "react";

import Search from "../modules/Search.js";
import FriendsList from "../modules/FriendsList.js";
import "./Friends.css";
// THIS IS WHERE THE STUFF ON THE DEFAULT FRIENDS SCREEN WILL GO

const Friends = (props) => {
  return (
    <div className="Friends-container">
      <div className="FriendsList">
        <FriendsList userId={props.userId} numId={props.numId} />
      </div>
      <div className="FriendsSearch">
        <Search userId={props.userId} numId={props.numId} />
      </div>
    </div>
  );
};

export default Friends;
