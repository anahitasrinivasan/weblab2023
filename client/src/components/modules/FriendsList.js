import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import { Link } from "@reach/router";

import "./FriendsList.css";

const FriendsList = (props) => {
  const [friendsDisplay, setFriendsDisplay] = useState([]);

  useEffect(() => {
    if (typeof props.numId === "undefined") {
      console.log("not logged in");
    } else {
      get("/api/friends", { userNumId: props.numId }).then((idsList) => {
        getNames(idsList);
      });
    }
  }, [props.numId]);

  const getNames = async (idsList) => {
    const res = await Promise.all(idsList.map((id) => get("/api/userFromNumId", { IdNum: id })));
    console.log(res);
    setFriendsDisplay(
      res.map((friend) => (
        <div className="Friend-container">
          <div>
            <b>name: </b>
            {friend.name}
          </div>
          <div>
            <b>friend ID: </b>
            {friend.idNum}
          </div>
          <span>
            <Link to={`/friends/entries/${friend.idNum}`} className="ViewingButton">
              View Entries{" "}
            </Link>
          </span>
        </div>
      ))
    );
    console.log(friendsDisplay);
  };

  return (
    <div>
      <div className="Friend-header">your friends: </div>
      <div>{friendsDisplay}</div>
    </div>
  );
};

export default FriendsList;
