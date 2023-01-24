import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

import "./FriendsList.css";

const FriendsList = (props) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    get("/api/friends", {userNumId: props.numId}).then((idsList) => {
      setFriends(idsList.map((id) => 
        (<div className="Friend-container" id={id} onClick={handleClick}>{id}</div>))
      );
    });
  }, []);

  const handleClick = (event) => {
    const idValue = event.target.id;
    event.preventDefault();
    get("/api/userFromNumId", {IdNum: idValue}).then((user) => {
      document.getElementById(idValue).innerHTML = user.name;
    })
  }


  //   useEffect(() => {
  //     let friendsList = [];
  //     get("/api/friends", { userNumId: props.numId }).then((idsList) => {
  //       console.log(idsList);
  //       friendsList = idsList.map((idNum) => {
  //         get("/api/userFromNumId", { IdNum: idNum }).then((friend) => {
  //           console.log(friend);
  //         });
  //       });
  //       console.log(friendsList);
  //     });
  //   }, []);

  //   let friendsList = null;
  //   if (friends.length === 0) {
  //     friendsList = "Search for people you know to make friends!";
  //   } else {
  //     //map these all to friend objects
  //     friendsList = friends;
  //   }

  return (
    <div>
      <div className="Friend-header">your friends: (click on a user ID to see the name)</div>
      <div>{friends}</div>
    </div>
  );
};

export default FriendsList;
