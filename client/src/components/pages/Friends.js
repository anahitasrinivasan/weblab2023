import React, { useState, useEffect } from "react";

import Search from "../modules/Search.js";
import FriendsList from "../modules/FriendsList.js";
// THIS IS WHERE THE STUFF ON THE DEFAULT FRIENDS SCREEN WILL GO

const Friends = (props) => {
  return (
    <div>
      <Search userId={props.userId} numId={props.numId} />
      <FriendsList userId={props.userId} numId={props.numId} />
    </div>
  );
};

export default Friends;
