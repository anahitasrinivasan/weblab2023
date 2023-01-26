import React, { useState } from "react";

import "./JournalEntry.css";
import { post } from "../../utilities";

const JournalEntry = (props) => {
    const [entryValue, setEntryValue] = useState("");
    const [sleepValue, setSleepValue] = useState(8);
    const [hydrationValue, setHydrationValue] = useState(8);
    const [moodValue, setMoodValue] = useState();

    //TO BE REMOVED: simply prints entry values underneath as a test
    const [textValue, setTextValue] = useState("submit");
    
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
            setTextValue("please fill out all entries.");
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
                setTextValue("successfully submitted entry!");
                setEntryValue("");
                setSleepValue("");
                setHydrationValue("");
            });
        }
    }

    return (
        <div className="JournalEntry-wrapper">
            <div className="form-header">my journal</div>
            <hr color="#c1c8e4"/>
            <div className="form-text">recap your day.</div>
            <div className="JournalEntry-input">
                <textarea
                    type="text"
                    className="JournalEntry-content"
                    placeholder={props.defaultEntryText}
                    value={entryValue}
                    onChange={handleEntryChange}
                    maxLength="2000"
                />
            </div>
            <div className="form-text">how many hours did you sleep last night?</div>
            <div class="JournalEntry-input">
                <input 
                    type="range" 
                    className="JournalEntry-slider"
                    min="0" 
                    max="24" 
                    step="0.5"
                    defaultValue="8" 
                    onChange={handleSleepChange} 
                />
                <div className="rangeValue">{sleepValue}</div>
            </div>
            <div className="form-text">how many glasses of water have you drank today?</div>
            <div class="JournalEntry-input">
                <input 
                    type="range" 
                    className="JournalEntry-slider"
                    min="0" 
                    max="20" 
                    defaultValue="8" 
                    onChange={handleHydrationChange} 
                />
                <div className="rangeValue">{hydrationValue}</div>
            </div>
            <div className="form-text">click on the image that most closely represents your mood.</div>
            <div className="JournalEntry-input">
                <label>
                    <input type="radio" name="moods" onChange={handleMoodChange} value={1} />
                    <img src="https://cdn-icons-png.flaticon.com/512/927/927551.png" className="cry emotion"></img>
                </label>
                <label>
                    <input type="radio" name="moods" onChange={handleMoodChange} value={2} />
                    <img src="https://cdn-icons-png.flaticon.com/512/927/927561.png" className="sad emotion"></img>
                </label>
                <label>
                    <input type="radio" name="moods" onChange={handleMoodChange} value={3} />
                    <img src="https://cdn-icons-png.flaticon.com/512/927/927557.png" className="mid emotion"></img>
                </label>
                <label>
                    <input type="radio" name="moods" onChange={handleMoodChange} value={4} />
                    <img src="https://cdn-icons-png.flaticon.com/512/927/927566.png" className="happy emotion"></img>
                </label>
                <label>
                    <input type="radio" name="moods" onChange={handleMoodChange} value={5} />
                    <img src="https://cdn-icons-png.flaticon.com/512/927/927554.png" className="thrilled emotion"></img>
                </label>

                
            </div>
            <div className="JournalEntry-input">
                <button
                    type="submit"
                    value="Submit"
                    className="JournalEntry-button"
                    onClick={handleSubmit}>
                    {textValue}
                </button>
            </div>
            {/* <p className="paragraph">
                emoji images from:
            </p>
            <p className="paragraph"><a href="https://www.flaticon.com/free-icons/sad-face" title="sad face icons">Sad face icons created by th studio - Flaticon</a></p>
            <p className="paragraph"><a href="https://www.flaticon.com/free-icons/sad" title="sad icons">Sad icons created by Vitaly Gorbachev - Flaticon</a></p>
            <p className="paragraph"><a href="https://www.flaticon.com/free-icons/emoji" title="emoji icons">Emoji icons created by Vitaly Gorbachev - Flaticon</a></p>
            <p className="paragraph"><a href="https://www.flaticon.com/free-icons/smile" title="smile icons">Smile icons created by Vitaly Gorbachev - Flaticon</a></p>
            <p className="paragraph"><a href="https://www.flaticon.com/free-icons/emoji" title="emoji icons">Emoji icons created by Vitaly Gorbachev - Flaticon</a></p> */}
        </div>
    );
};

export default JournalEntry;