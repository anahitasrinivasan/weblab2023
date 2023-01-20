import React, { useState, useEffect } from "react";
import "./PersonFound.css";

const PersonFound = (props) => {
  /**
   * @property {String} name
   * @property {Object} friend
   * @property {String} userId

   */

  const [friendStatus, setFriendStatus] = useState("no relationship");

  const assignFriendStatus = (userId, friend) => {
    console.log("running");
    // if (userId == friend["_id"]) {

    //   setFriendStatus("same person");
    // }
  };

  useEffect(() => {
    if (props.userId == props.friend["_id"]) {
      setFriendStatus("same person");
    } else {
      setFriendStatus("no change");
    }
  }, [props.name]);

  return (
    <div className="PersonFound-container">
      <span>
        {props.name} {props.userId} {props.friend["_id"]}
      </span>
      <span>{friendStatus}</span>
    </div>
  );
};

export default PersonFound;
