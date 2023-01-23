import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
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
          setFriendStatus("you've requested this user as a friend");
        } else if (friendInfo.requestedByUser.includes(userId)) {
          setFriendStatus("this user has requested you as a friend");
        } else {
          console.log("no relation");
          setFriendStatus("no relation");
        }
      });
    }
  };

  const requestFriend = () => {
    console.log("requested friend");
    post("/api/request", { requesting: props.friend._id }).then((message) => {
      setFriendStatus("you've requested this user as a friend");
      console.log(message);
    });
  };

  const acceptRequest = () => {
    console.log("accepting request");
    post("/api/friend", { newFriend: props.friend._id }).then((message) => {
      console.log(message);
      setFriendStatus("friends");
    });
  };

  const unrequest = () => {
    //unrequest a user
  };

  const unfriend = () => {
    //unfriend someone
  };

  const findFriendingButton = (friendStatus) => {
    if (friendStatus === "this is you") {
      return null;
    } else if (friendStatus === "friends") {
      return (
        <button className="FriendingButton" onClick={unfriend}>
          Unfriend
        </button>
      );
    } else if (friendStatus === "this user has requested you as a friend") {
      return (
        <button className="FriendingButton" onClick={acceptRequest}>
          Friend
        </button>
      );
    } else if (friendStatus === "you've requested this user as a friend") {
      return (
        <button className="FriendingButton" onClick={unrequest}>
          Unrequest
        </button>
      );
    } else if (friendStatus === "no relation") {
      return (
        <button className="FriendingButton" onClick={requestFriend}>
          Request
        </button>
      );
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
