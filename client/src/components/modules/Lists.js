import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";

import "./FriendsList.css";

const Lists = (props) => {
  const [requestsDisplay, setReqeustsDisplay] = useState([]);
  const [friendsDisplay, setFriendsDisplay] = useState([]);
  const [requestsIds, setRequestsIds] = useState([]);
  const [friendsIds, setFriendsIds] = useState([]);

  //   const acceptRequest = (idNum) => {
  //     // console.log("accepting request");
  //     post("/api/friend", { newFriend: idNum, userNumId: props.numId }).then((message) => {
  //       console.log(message);
  //       get("/api/requests", { userNumId: props.numId }).then((idsList) => {
  //         getNamesRequests(idsList);
  //       });
  //       get("/api/friends", { userNumId: props.numId }).then((idsList) => {
  //         getNamesFriends(idsList);
  //       });
  //     });
  //   };

  const postNewFriend = async (idNum) => {
    return post("/api/friend", { newFriend: idNum, userNumId: props.numId });
  };

  const acceptRequest = async (idNum) => {
    await postNewFriend(idNum);
    // console.log("friends ids are", friendsIds);
    const newArray = friendsIds.concat([idNum]);
    // console.log("newArray is ", newArray);
    setFriendsIds(newArray);
    setRequestsIds(requestsIds.filter((id) => id !== idNum));
    // console.log("changing lists");
  };

  useEffect(() => {
    if (typeof props.numId === "undefined") {
      // console.log("not logged in");
    } else {
      get("/api/requests", { userNumId: props.numId }).then((idsList) => {
        // console.log("setting requests");
        setRequestsIds(idsList);
        getNamesRequests(idsList);
      });
      get("/api/friends", { userNumId: props.numId }).then((idsList) => {
        setFriendsIds(idsList);
        getNamesFriends(idsList);
      });
    }
  }, [props.numId]);

  useEffect(() => {
    // console.log("in use effect");
    getNamesRequests(requestsIds);
    getNamesFriends(friendsIds);
  }, [requestsIds]);

  const getNamesRequests = async (idsList) => {
    // console.log("getting names requests", idsList);
    const res = await Promise.all(idsList.map((id) => get("/api/userFromNumId", { IdNum: id })));
    // console.log(res);
    if (res.length === 0) {
      // console.log("no friends");
      setReqeustsDisplay(<div className="Friend-container">no unaccepted requests!</div>);
    } else {
      setReqeustsDisplay(
        res.map((requester) => (
          <div className="Friend-container">
            <div>
              <b>name: </b>
              {requester.name}
            </div>
            <div>
              <b>friend ID: </b>
              {requester.idNum}
            </div>
            <div className="ViewButton-container">
              <button
                className="ViewingButton"
                onClick={() => {
                  acceptRequest(requester.idNum);
                  //   setFriendStatus("friends");
                }}
              >
                Friend
              </button>
            </div>
          </div>
        ))
      );
    }
    // console.log(requestsDisplay);
  };

  const getNamesFriends = async (idsList) => {
    // console.log("getting names friends", idsList);
    const res = await Promise.all(idsList.map((id) => get("/api/userFromNumId", { IdNum: id })));
    // console.log(res);
    if (res.length === 0) {
      // console.log("no friends");
      setFriendsDisplay(
        <div className="Friend-container">you haven't connected with any friends yet!</div>
      );
    } else {
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
            <div className="ViewButton-container">
              <Link to={`/friends/entries/${friend.idNum}`} className="ViewingButton">
                View Entries{" "}
              </Link>
            </div>
          </div>
        ))
      );
    }
    // console.log(friendsDisplay);
  };

  return (
    <div>
      <div className="FriendsList-container">
        <div className="Friend-header">your friends: </div>
        <div>{friendsDisplay}</div>
      </div>
      <div className="FriendsList-container">
        <div className="Friend-header">these people have requested you: </div>
        <div>{requestsDisplay}</div>
      </div>
    </div>
  );
};

export default Lists;
