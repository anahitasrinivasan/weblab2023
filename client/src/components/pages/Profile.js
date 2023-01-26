// Tabs come from https://blog.logrocket.com/how-to-build-tab-component-react/

import React, { useState, useEffect } from "react";
import Tab from "../modules/Tab";
import Content from "../modules/Content";

import { get } from "../../utilities";

import "./Profile.css";
import "../modules/Tab.css";

const Profile = (props) => {
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState("entries");

  useEffect(() => {
    document.title = "journal entries";
    get("/api/journals").then((entries) => {
      let reversedEntries = entries.reverse();
      setEntries(reversedEntries);
    });
  }, []);

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
      <ul className="purple">
        <Tab id="entries" activeTab={activeTab} setActiveTab={setActiveTab} color="purple" />
        <Tab id="moods" activeTab={activeTab} setActiveTab={setActiveTab} color="purple" />
        <Tab id="sleep" activeTab={activeTab} setActiveTab={setActiveTab} color="purple" />
        <Tab id="water" activeTab={activeTab} setActiveTab={setActiveTab} color="purple" />
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

export default Profile;
