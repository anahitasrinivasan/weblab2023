import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "./PersonFound.css";

const FriendStatus = (props) => {
  return <div className="FriendStatus-container"> {props.friendStatus}</div>;
};

export default FriendStatus;
