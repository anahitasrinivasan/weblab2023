import React, { useState, useEffect } from "react";

import Search from "../modules/Search.js";
// THIS IS WHERE THE STUFF ON THE DEFAULT FRIENDS SCREEN WILL GO

const Friends = (props) => {
  return <Search userId={props.userId} />;
};

export default Friends;
