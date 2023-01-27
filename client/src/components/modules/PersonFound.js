import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "./PersonFound.css";
import { Link } from "@reach/router";
import FriendEntries from "../pages/FriendEntries.js";

import FriendStatus from "./FriendStatus.js";
// import { Link } from "react-router-dom";

const PersonFound = (props) => {
  /**
   * @property {String} name
   * @property {Object} friend
   * @property {String} userId

   */

  const [friendStatus, setFriendStatus] = useState("no relationship");
  const [friendButton, setFriendButton] = useState("loading");
  const [viewButton, setViewButton] = useState(" ");

  const findFriendStatus = () => {
    console.log("finding friend status");
    if (props.userId === props.friend["_id"]) {
      setFriendStatus("this is you");
    } else {
      get("/api/friendInfo", { _id: props.friend["_id"] }).then((friendInfo) => {
        console.log(friendInfo["friends"]);
        if (friendInfo["friends"].includes(props.numId)) {
          setFriendStatus("friends");
        } else if (friendInfo.userRequested.includes(props.numId)) {
          setFriendStatus("you've requested this user as a friend");
        } else if (friendInfo.requestedByUser.includes(props.numId)) {
          setFriendStatus("this user has requested you as a friend");
        } else {
          console.log("no relation");
          setFriendStatus("no relation");
        }
      });
    }
  };

  const findViewButton = () => {
    if (friendStatus === "friends") {
      return (
        <div>
          <Link to={`/friends/entries/${props.friend.idNum}`} className="ViewingButton-Search">
            View Entries{" "}
          </Link>
        </div>
      );
    } else {
      return null;
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
    console.log(props.numId);
    const body = { requesting: props.friend.idNum, userNumId: props.numId };
    post("/api/request", body).then(() => {
      // setFriendStatus("you've requested this user as a friend");
      // setFriendButton(findFriendingButton(friendStatus));
    });
  };

  const acceptRequest = () => {
    console.log("accepting request");
    post("/api/friend", { newFriend: props.friend.idNum, userNumId: props.numId }).then(() => {
      // setFriendStatus("friends");
      // setFriendButton(findFriendingButton(friendStatus));
    });
  };

  const unrequest = () => {
    console.log("unrequesting :(");
    post("/api/unrequest", { unrequested: props.friend.idNum, userNumId: props.numId }).then(() => {
      // setFriendStatus("no relation");
      // setFriendButton(findFriendingButton(friendStatus));
    });
  };

  const unfriend = () => {
    console.log("unfriending :/");
    post("/api/unfriend", { rejected: props.friend.idNum, userNumId: props.numId }).then(() => {
      // setFriendStatus("this user has requested you as a friend");
      // setFriendButton(findFriendingButton(friendStatus));
    });
  };

  useEffect(() => {
    setFriendButton(findFriendingButton());
  }, [friendStatus]);

  useEffect(() => {
    console.log("chaning view button");
    setViewButton(findViewButton());
  }, [friendButton]);

  useEffect(() => {
    findFriendStatus();
    console.log("finding friend status in useeffect");
  }, [props.name]);

  return (
    <div className="PersonFound-container">
      <div className="Name">{props.name} </div>
      <FriendStatus friendStatus={friendStatus} />
      {friendButton}
      <div className="viewButtonContainer">{viewButton}</div>

      <div className="FriendId"> Friending Id: {props.friend.idNum}</div>
    </div>
  );
};

export default PersonFound;
