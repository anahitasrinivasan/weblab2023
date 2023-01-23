import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

const FriendsList = (props) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    get("/api/friends", {}).then((friendsList) => {
      setFriends(friendsList);
    });
  }, []);

  let friendsList = null;
  if (friends.length === 0) {
    friendsList = "Search for people you know to make friends!";
  } else {
    //map these all to friend objects
    friendsList = friends;
  }
  return <div>{friendsList}</div>;
};

export default FriendsList;
