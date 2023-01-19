import React, { useState, useEffect } from "react";

import { get } from "../../utilities";

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
            <div>
                {entry.creator_name}
                {entry.content}
                {entry.mood}
                {entry.sleep}
                {entry.water}
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