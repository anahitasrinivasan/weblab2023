import React, { useState } from "react";

import "./JournalEntry.css";
import { post } from "../../utilities";

const JournalEntry = (props) => {
    const [entryValue, setEntryValue] = useState("");
    const [sleepValue, setSleepValue] = useState();
    const [hydrationValue, setHydrationValue] = useState();
    const [moodValue, setMoodValue] = useState();

    //TO BE REMOVED: simply prints entry values underneath as a test
    const [textValue, setTextValue] = useState("");
    
    // called whenever the user types in the journal entry box
    const handleEntryChange = (event) => {
        setEntryValue(event.target.value);
    };

    // called whenever the user types in how many hours they slept
    const handleSleepChange = (event) => {
        setSleepValue(event.target.value);
    };

    // called whenever the user types in how much water they drank
    const handleHydrationChange = (event) => {
        setHydrationValue(event.target.value);
    };

    // called whenever the user selects a mood from 1-5
    const handleMoodChange = (event) => {
        setMoodValue(event.target.value);
    };

    //called whenever the user hits the submit button
    const handleSubmit = (event) => {
        event.preventDefault();

        const body = {
            content: entryValue,
            mood: moodValue,
            sleep: sleepValue,
            water: hydrationValue, 
        };
        post("/api/journal", body).then((story) => {
            // display "done" for now to show that we finished successfully
            setTextValue("done");
        });
    }

    return (
        <div>
            <div className="JournalEntry-input">
                <textarea
                    type="text"
                    className="JournalEntry-content"
                    placeholder={props.defaultEntryText}
                    value={entryValue}
                    onChange={handleEntryChange}
                />
            </div>
            <div className="JournalEntry-input">
                <input 
                    type="number"
                    className="JournalEntry-number"
                    placeholder={props.defaultSleepText}
                    value={sleepValue}
                    onChange={handleSleepChange}
                />
            </div>
            <div className="JournalEntry-input">
                <input 
                    type="number"
                    className="JournalEntry-number"
                    placeholder={props.defaultHydrationText}
                    value={hydrationValue}
                    onChange={handleHydrationChange}
                />
            </div>
            <div className="JournalEntry-input">
                <select onChange={handleMoodChange} className="JournalEntry-select">
                    <option value="" disabled selected>select mood from 1-5</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div className="JournalEntry-input">
                <button
                    type="submit"
                    value="Submit"
                    className="JournalEntry-button"
                    onClick={handleSubmit}>
                    submit
                </button>
            </div>
            <h1>{textValue}</h1>
        </div>
    );
};

export default JournalEntry;