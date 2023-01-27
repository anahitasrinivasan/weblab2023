import React, { useState } from "react";
import { post } from "../../utilities";

import "./Options.css";

const Options = (props) => {
    const [entrySettings, setEntrySettings] = useState(true);
    const [sleepSettings, setSleepSettings] = useState(true);
    const [hydrationSettings, setHydrationSettings] = useState(true);
    const [moodSettings, setMoodSettings] = useState(true);

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

    return (
        <div>
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
                    className="Settings-button">
                    submit
                </button>
            </div>
            <div>{entrySettings.toString()}</div>
            <div>{moodSettings.toString()}</div>
            <div>{sleepSettings.toString()}</div>
            <div>{hydrationSettings.toString()}</div>
        </div>
    );
}

export default Options;