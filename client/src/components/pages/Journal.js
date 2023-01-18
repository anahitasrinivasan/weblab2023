import React, { useState, useEffect } from "react";
import JournalEntry from "../modules/JournalEntry";

const Journal = (props) => {
    return (
        <JournalEntry 
            defaultEntryText="journal entry"
            defaultSleepText="hours slept"
            defaultHydrationText="water drank (oz.)"/>
    );
};

export default Journal;