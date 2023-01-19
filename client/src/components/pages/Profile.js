import React, { useState, useEffect } from "react";

import { get } from "../../utilities";

import "./Profile.css";

const Profile = (props) => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        document.title = "journal entries";
        get("/api/journals").then((entries) => {
          let reversedEntries = entries.reverse();
          setEntries(reversedEntries);
        });
    }, []);

    let entriesList = null;
    const hasEntries = entries.length !== 0;
    if (hasEntries) {
        entriesList = entries.map((entry) => (
            <div className="Profile-container">
                <div className="Profile-user">{entry.creator_name}</div>
                <div><b>journal entry: </b>{entry.content}</div>
                <div><b>mood: </b>{entry.mood}</div>
                <div><b>sleep: </b>{entry.sleep}</div>
                <div><b>water: </b>{entry.water}</div>
            </div>
        ));
    } else {
        entriesList = <div>No entries!</div>;
    }

    return (
        <div>
            {entriesList}
        </div>
    );
};

export default Profile;