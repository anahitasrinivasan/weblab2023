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

        if((entryValue === "") || (!moodValue) || (!sleepValue) || (!hydrationValue)) {
            setTextValue("nope bby gorl");
        }

        else {
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

                <label>
                    <input type="radio" name="moods" onChange={handleMoodChange} value={1} />
                    <img src="https://cdn-icons-png.flaticon.com/512/927/927551.png"></img>
                    <a href="https://www.flaticon.com/free-icons/sad-face" title="sad face icons">Sad face icons created by th studio - Flaticon</a>
                </label>
                <label>
                    <input type="radio" name="moods" onChange={handleMoodChange} value={2} />
                    <img src="https://cdn-icons-png.flaticon.com/512/927/927561.png"></img>
                    <a href="https://www.flaticon.com/free-icons/sad" title="sad icons">Sad icons created by Vitaly Gorbachev - Flaticon</a>
                </label>
                <label>
                    <input type="radio" name="moods" onChange={handleMoodChange} value={3} />
                    <img src="https://cdn-icons-png.flaticon.com/512/927/927557.png"></img>
                    <a href="https://www.flaticon.com/free-icons/emoji" title="emoji icons">Emoji icons created by Vitaly Gorbachev - Flaticon</a>
                </label>
                <label>
                    <input type="radio" name="moods" onChange={handleMoodChange} value={4} />
                    <img src="https://cdn-icons-png.flaticon.com/512/927/927566.png"></img>
                    <a href="https://www.flaticon.com/free-icons/smile" title="smile icons">Smile icons created by Vitaly Gorbachev - Flaticon</a>
                </label>
                <label>
                    <input type="radio" name="moods" onChange={handleMoodChange} value={5} />
                    <img src="https://cdn-icons-png.flaticon.com/512/927/927554.png"></img>
                    <a href="https://www.flaticon.com/free-icons/emoji" title="emoji icons">Emoji icons created by Vitaly Gorbachev - Flaticon</a>
                </label>

                
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