import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "./PersonFound.css";

const FriendStatus = (props) => {
  return <span className="FriendStatus-container"> {props.friendStatus}</span>;
};

export default FriendStatus;
