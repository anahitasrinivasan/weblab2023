import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import Tab from "../modules/Tab.js";
import Content from "../modules/Content.js";

const FriendEntries = (props) => {
  const [friend, setFriend] = useState(undefined);
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState("entries");
  const [name, setName] = useState("loading");

  useEffect(() => {
    get("/api/userFromNumId", { IdNum: props.friendId }).then((friendInfo) => {
      console.log(friendInfo);
      setFriend(friendInfo);

      console.log("this is friend", friend);
      console.log(name);
    });
  }, []);

  useEffect(() => {
    if (typeof friend === "object") {
      get("/api/friendEntries", { id: friend._id }).then((entries) => {
        let reversedEntries = entries.reverse();
        setEntries(reversedEntries);
      });
      setName(friend.name);
    }
  }, [friend]);

  let entriesList = null;
  let moodList = null;
  let sleepList = null;
  let waterList = null;

  const hasEntries = entries.length !== 0;
  if (hasEntries) {
    entriesList = entries.map((entry) => (
      <div className="Profile-container">
        <div className="Profile-user">{entry.creator_name}</div>
        <div>
          <b>journal entry: </b>
          {entry.content}
        </div>
      </div>
    ));
    moodList = entries.map((entry) => (
      <div className="Profile-container">
        <div className="Profile-user">{entry.creator_name}</div>
        <div>
          <b>mood: </b>
          {entry.mood}
        </div>
      </div>
    ));
    sleepList = entries.map((entry) => (
      <div className="Profile-container">
        <div className="Profile-user">{entry.creator_name}</div>
        <div>
          <b>sleep: </b>
          {entry.sleep}
        </div>
      </div>
    ));
    waterList = entries.map((entry) => (
      <div className="Profile-container">
        <div className="Profile-user">{entry.creator_name}</div>
        <div>
          <b>water: </b>
          {entry.water}
        </div>
      </div>
    ));
  } else {
    entriesList = <div className="Profile-container">No entries!</div>;
    moodList = <div className="Profile-container">No entries!</div>;
    sleepList = <div className="Profile-container">No entries!</div>;
    waterList = <div className="Profile-container">No entries!</div>;
  }

  return (
    <div>
      <h2>You're looking at {name}'s entries</h2>
      <ul>
        <Tab id="entries" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab id="moods" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab id="sleep" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab id="water" activeTab={activeTab} setActiveTab={setActiveTab} />
      </ul>
      <div>
        <Content
          id="entries"
          activeTab={activeTab}
          items={entriesList}
          graphItems={entries}
          type="content"
        />
        <Content
          id="moods"
          activeTab={activeTab}
          items={moodList}
          graphItems={entries}
          type="mood"
        />
        <Content
          id="sleep"
          activeTab={activeTab}
          items={sleepList}
          graphItems={entries}
          type="sleep"
        />
        <Content
          id="water"
          activeTab={activeTab}
          items={waterList}
          graphItems={entries}
          type="hydration"
        />
      </div>
    </div>
  );
};

export default FriendEntries;
