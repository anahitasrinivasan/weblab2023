import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "./PersonFound.css";

import FriendStatus from "./FriendStatus.js";

const PersonFound = (props) => {
  /**
   * @property {String} name
   * @property {Object} friend
   * @property {String} userId

   */

  const [friendStatus, setFriendStatus] = useState("no relationship");
  const [friendButton, setFriendButton] = useState("loading");

  const findFriendStatus = () => {
    console.log("finding friend status");
    if (props.userId === props.friend["_id"]) {
      setFriendStatus("this is you");
    } else {
      get("/api/friendInfo", { _id: props.friend["_id"] }).then((friendInfo) => {
        console.log(friendInfo["friends"]);
        if (friendInfo["friends"].includes(props.userId)) {
          setFriendStatus("friends");
        } else if (friendInfo.userRequested.includes(props.userId)) {
          setFriendStatus("you've requested this user as a friend");
        } else if (friendInfo.requestedByUser.includes(props.userId)) {
          setFriendStatus("this user has requested you as a friend");
        } else {
          console.log("no relation");
          setFriendStatus("no relation");
        }
      });
    }
  };

  const findFriendingButton = () => {
    if (friendStatus === "this is you") {
      console.log("this is you");
      return null;
    } else if (friendStatus === "friends") {
      return (
        <button
          className="FriendingButton"
          onClick={() => {
            unfriend();
            setFriendStatus("this user has requested you as a friend");
          }}
        >
          Unfriend
        </button>
      );
    } else if (friendStatus === "this user has requested you as a friend") {
      return (
        <button
          className="FriendingButton"
          onClick={() => {
            acceptRequest();
            setFriendStatus("friends");
          }}
        >
          Friend
        </button>
      );
    } else if (friendStatus === "you've requested this user as a friend") {
      return (
        <button
          className="FriendingButton"
          onClick={() => {
            unrequest();
            setFriendStatus("no relation");
          }}
        >
          Unrequest
        </button>
      );
    } else if (friendStatus === "no relation") {
      return (
        <button
          className="FriendingButton"
          onClick={() => {
            requestFriend();
            setFriendStatus("you've requested this user as a friend");
          }}
        >
          Request
        </button>
      );
    } else {
      return null;
    }
  };

  const requestFriend = () => {
    console.log("requested friend");
    post("/api/request", { requesting: props.friend._id }).then(() => {
      // setFriendStatus("you've requested this user as a friend");
      // setFriendButton(findFriendingButton(friendStatus));
    });
  };

  const acceptRequest = () => {
    console.log("accepting request");
    post("/api/friend", { newFriend: props.friend._id }).then(() => {
      // setFriendStatus("friends");
      // setFriendButton(findFriendingButton(friendStatus));
    });
  };

  const unrequest = () => {
    console.log("unrequesting :(");
    post("/api/unrequest", { unrequested: props.friend._id }).then(() => {
      // setFriendStatus("no relation");
      // setFriendButton(findFriendingButton(friendStatus));
    });
  };

  const unfriend = () => {
    console.log("unfriending :/");
    post("/api/unfriend", { rejected: props.friend._id }).then(() => {
      // setFriendStatus("this user has requested you as a friend");
      // setFriendButton(findFriendingButton(friendStatus));
    });
  };

  useEffect(() => {
    setFriendButton(findFriendingButton());
  }, [friendStatus]);

  useEffect(() => {
    findFriendStatus();
    console.log("finding friend status in useeffect");
  }, [props.name]);

  return (
    <div className="PersonFound-container">
      <span>{props.name} </span>
      <FriendStatus friendStatus={friendStatus} />
      {friendButton}
      <span className="u-rightAdjust"> Friending Id: {props.friend.idNum}</span>
    </div>
  );
};

export default PersonFound;
