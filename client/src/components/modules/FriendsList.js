import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

const FriendsList = (props) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let friendsList = [];
    if (typeof props.numId == "undefined") {
      return "not logged in";
    }
    get("/api/friends", { userNumId: props.numId }).then((idsList) => {
      console.log(idsList);
      let friendInfo = "hi";
      friendsList = idsList.map((idNum) => {
        get("/api/userFromNumId", { IdNum: idNum }).then((friend) => {
          console.log(friend);
          friendInfo = friend;
          console.log(friendInfo);
        });
        return friendInfo;
      });
      console.log(friendsList);
    });
  }, []);

  //   let friendsList = null;
  //   if (friends.length === 0) {
  //     friendsList = "Search for people you know to make friends!";
  //   } else {
  //     //map these all to friend objects
  //     friendsList = friends;
  //   }
  return <div>Hi</div>;
};

export default FriendsList;
