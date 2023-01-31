import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import Tab from "../modules/Tab.js";
import Content from "../modules/Content.js";
import "./FriendEntries.css";
import "../modules/Tab.css";

const FriendEntries = (props) => {
  const [friend, setFriend] = useState(undefined);
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState("entries");
  const [name, setName] = useState("loading");

  const [entriesVisibility, setEntriesVisibility] = useState(false);
  const [moodVisibility, setMoodVisibility] = useState(false);
  const [sleepVisibility, setSleepVisibility] = useState(false);
  const [hydrationVisibility, setHydrationVisibility] = useState(false);

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

  useEffect(() => {
    if (typeof friend === "object") {
      get("/api/settings", { userNumId: props.friendId }).then((settings) => {
        console.log(settings);
        setEntriesVisibility(settings[0]);
        setMoodVisibility(settings[1]);
        setSleepVisibility(settings[2]);
        setHydrationVisibility(settings[3]);
      });
    }
  }, [friend]);

  let entriesList = null;
  let moodList = null;
  let sleepList = null;
  let waterList = null;

  const hasEntries = entries.length !== 0;
  if (hasEntries) {
    entriesList = entries.map((entry) => {
      const date = new Date(entry.datePosted);
      return (
        <div className="FriendEntries-container">
          <div className="Profile-user">{entry.creator_name}</div>
          <div>
            <b>journal entry: </b>
            {entry.content}
          </div>
          <div>
            Posted: {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </div>
        </div>
      );
    });
    moodList = entries.map((entry) => {
      const date = new Date(entry.datePosted);
      return (
        <div className="FriendEntries-container">
          <div className="Profile-user">{entry.creator_name}</div>
          <div>
            <b>mood: </b>
            {entry.mood}
          </div>
          <div>
            Posted: {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </div>
        </div>
      );
    });
    sleepList = entries.map((entry) => {
      const date = new Date(entry.datePosted);
      return (
        <div className="FriendEntries-container">
          <div className="Profile-user">{entry.creator_name}</div>
          <div>
            <b>sleep: </b>
            {entry.sleep}
          </div>
          <div>
            Posted: {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </div>
        </div>
      );
    });
    waterList = entries.map((entry) => {
      const date = new Date(entry.datePosted);
      return (
        <div className="FriendEntries-container">
          <div className="Profile-user">{entry.creator_name}</div>
          <div>
            <b>water: </b>
            {entry.water}
          </div>
          <div>
            Posted: {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </div>
        </div>
      );
    });
  } else {
    entriesList = <div className="FriendEntries-container">No entries!</div>;
    moodList = <div className="FriendEntries-container">No entries!</div>;
    sleepList = <div className="FriendEntries-container">No entries!</div>;
    waterList = <div className="FriendEntries-container">No entries!</div>;
  }

  return (
    <div>
      <h2 className="FriendEntriesTitle">You're looking at {name}'s entries</h2>
      <ul className="blue">
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
          visible={entriesVisibility.toString()}
          graphBgColor="rgba(86, 128, 233, 0.2)"
          graphLineColor="rgba(86, 128, 233, 1)"
        />
        <Content
          id="moods"
          activeTab={activeTab}
          items={moodList}
          graphItems={entries}
          type="mood"
          visible={moodVisibility.toString()}
          graphBgColor="rgba(86, 128, 233, 0.2)"
          graphLineColor="rgba(86, 128, 233, 1)"
        />
        <Content
          id="sleep"
          activeTab={activeTab}
          items={sleepList}
          graphItems={entries}
          type="sleep"
          visible={sleepVisibility.toString()}
          graphBgColor="rgba(86, 128, 233, 0.2)"
          graphLineColor="rgba(86, 128, 233, 1)"
        />
        <Content
          id="water"
          activeTab={activeTab}
          items={waterList}
          graphItems={entries}
          type="hydration"
          visible={hydrationVisibility.toString()}
          graphBgColor="rgba(86, 128, 233, 0.2)"
          graphLineColor="rgba(86, 128, 233, 1)"
        />
      </div>
    </div>
  );
};

export default FriendEntries;
