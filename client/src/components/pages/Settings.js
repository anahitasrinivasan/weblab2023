import React, { useState, useEffect } from "react";
import Options from "../modules/Options";

const Settings = (props) => {
    return (
        <Options numId={props.numId}/>
    );
};

export default Settings;