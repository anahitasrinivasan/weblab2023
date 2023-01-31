import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
// import { acceptRequest } from "./PersonFound.js";

// import "./PersonFound.css";

import "./FriendsList.css";

const RequestsList = (props) => {
  const [requestsDisplay, setReqeustsDisplay] = useState([]);

  const acceptRequest = (idNum) => {
    // console.log("accepting request");
    post("/api/friend", { newFriend: idNum, userNumId: props.numId }).then(() => {
      // setFriendStatus("friends");
      // setFriendButton(findFriendingButton(friendStatus));
    });
  };

  useEffect(() => {
    if (typeof props.numId === "undefined") {
      // console.log("not logged in");
    } else {
      get("/api/requests", { userNumId: props.numId }).then((idsList) => {
        getNames(idsList);
      });
    }
  }, [props.numId]);

  const getNames = async (idsList) => {
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
    console.log(requestsDisplay);
  };

  return (
    <div className="FriendsList-container">
      <div className="Friend-header">these people have requested you: </div>
      <div>{requestsDisplay}</div>
    </div>
  );
};

export default RequestsList;
