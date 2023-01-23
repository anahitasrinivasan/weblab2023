import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import "./PersonFound.css";

const PersonFound = (props) => {
  /**
   * @property {String} name
   * @property {Object} friend
   * @property {String} userId

   */

  const [friendStatus, setFriendStatus] = useState("no relationship");
  const [friendButton, setFriendButton] = useState(undefined);

  const findFriendStatus = (userId, friend) => {
    console.log(userId, friend["_id"]);
    if (userId === friend["_id"]) {
      setFriendStatus("this is you");
    } else {
      get("/api/friendInfo", { _id: friend["_id"] }).then((friendInfo) => {
        console.log(friendInfo["friends"]);
        if (friendInfo["friends"].includes(userId)) {
          setFriendStatus("friends");
        } else if (friendInfo.userRequested.includes(userId)) {
          setFriendStatus("this user has requested you as a friend");
        } else if (friendInfo.requestedByUser.includes(userId)) {
          setFriendStatus("you've requested this user as a friend");
        } else {
          console.log("no relation");
          setFriendStatus("no relation");
        }
      });
    }
  };

  const findFriendingButton = (friendStatus) => {
    if (friendStatus === "this is you") {
      return null;
    } else if (friendStatus === "friends") {
      return <button className="FriendingButton">Unfriend</button>;
    } else if (friendStatus === "this user has requested you as a friend") {
      return <button className="FriendingButton">Friend</button>;
    } else if (friendStatus === "you've requested this user as a friend") {
      return <button className="FriendingButton">Unrequest</button>;
    } else if (friendStatus === "no relation") {
      return <button className="FriendingButton">Request</button>;
    }
  };

  useEffect(() => {
    setFriendButton(findFriendingButton(friendStatus));
  }, [friendStatus]);

  useEffect(() => {
    findFriendStatus(props.userId, props.friend);
  }, [props.name]);

  return (
    <div className="PersonFound-container">
      <span>{props.name} </span>
      <span className="FriendStatus-container"> {friendStatus}</span>
      <span className="u-rightAdjust"> Friending Id: {props.friend.idNum}</span>
      {friendButton}
    </div>
  );
};

export default PersonFound;
