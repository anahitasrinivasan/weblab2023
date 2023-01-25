import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";

const FriendEntries = (props) => {
  let friend = undefined;

  useEffect(() => {
    get("/api/userFromNumId", { IdNum: props.friendId }).then((friendInfo) => {
      console.log(friendInfo);
      friend = friendInfo;
      name = friend.name;
      console.log("this is friend", friend);
      console.log(name);
    });
  }, []);

  return <div>{name}</div>;
};

export default FriendEntries;
