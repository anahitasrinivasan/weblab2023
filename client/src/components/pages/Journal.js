import React, { useState, useEffect } from "react";
import JournalEntry from "../modules/JournalEntry";

const Journal = (props) => {
    return (
        <JournalEntry 
            defaultEntryText=""
            defaultSleepText=""
            defaultHydrationText=""/>
    );
};

export default Journal;