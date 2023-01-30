import React, { useEffect, useState } from "react";
import { get, post } from "../../utilities";

import "./Options.css";

const Options = (props) => {
    const [entrySettings, setEntrySettings] = useState(true);
    const [sleepSettings, setSleepSettings] = useState(true);
    const [hydrationSettings, setHydrationSettings] = useState(true);
    const [moodSettings, setMoodSettings] = useState(true);

    useEffect(() => {
        if (typeof props.numId === "undefined") {
            console.log("not logged in");
        } 
        else {
            get("/api/settings", { userNumId: props.numId }).then((settings) => {
                console.log(settings);
                document.getElementById("entry").checked = settings[0];
                setEntrySettings(settings[0]);

                document.getElementById("mood").checked = settings[1];
                setMoodSettings(settings[1]);

                document.getElementById("sleep").checked = settings[2];
                setSleepSettings(settings[2]);

                document.getElementById("hydration").checked = settings[3];
                setHydrationSettings(settings[3]);
            });
        }
    }, [props.numId])

    const handleEntrySettings = (event) => {
        setEntrySettings(event.target.checked);
    };

    const handleMoodSettings = (event) => {
        setMoodSettings(event.target.checked);
    };

    const handleSleepSettings = (event) => {
        setSleepSettings(event.target.checked);
    };

    const handleHydrationSettings = (event) => {
        setHydrationSettings(event.target.checked);
    };

    const handleSettingsSubmit = (event) => {
        event.preventDefault();
        const body = {
            settings: [entrySettings, moodSettings, sleepSettings, hydrationSettings]
        };
        post("/api/settings", body).then(() => {
            console.log("done changing settings");
        })
    }

    return (
        <div>
            <div className="settings-header">my settings</div>
            <div className="settings-info">flip a switch off to make a section private</div>
            <hr color="#8860d0"/>
            <div className="switch-container">
                <p className="switch-text">journal entries</p>
                <label class="switch">
                    <input type="checkbox" id="entry" defaultChecked onChange={handleEntrySettings}/>
                    <span class="slider round"></span>
                </label>
            </div>
            <div className="switch-container">
                <p className="switch-text">mood</p>
                <label class="switch">
                    <input type="checkbox" id="mood" defaultChecked onChange={handleMoodSettings} />
                    <span class="slider round"></span>
                </label>
            </div>
            <div className="switch-container">
                <p className="switch-text">sleep</p>
                <label class="switch">
                    <input type="checkbox" id="sleep" defaultChecked onChange={handleSleepSettings}/>
                    <span class="slider round"></span>
                </label>
            </div>
            <div className="switch-container">
                <p className="switch-text">hydration</p>
                <label class="switch">
                    <input type="checkbox" id="hydration" defaultChecked onChange={handleHydrationSettings}/>
                    <span class="slider round"></span>
                </label>
            </div>
            <div className="button-container">
                <button
                    type="submit"
                    value="Submit"
                    className="Settings-button"
                    onClick={handleSettingsSubmit}>
                    submit
                </button>
            </div>
        </div>
    );
}

export default Options;