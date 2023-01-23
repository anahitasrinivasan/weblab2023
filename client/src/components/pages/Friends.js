import React, { useState, useEffect } from "react";

import Search from "../modules/Search.js";
import FriendsList from "../modules/FriendsList.js";
// THIS IS WHERE THE STUFF ON THE DEFAULT FRIENDS SCREEN WILL GO

const Friends = (props) => {
  return (
    <div>
      <Search userId={props.userId} />
      <FriendsList />
    </div>
  );
};

export default Friends;
