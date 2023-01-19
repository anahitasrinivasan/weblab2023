import React, { useState, useEffect } from "react";

const Content = (props) => {
    return (
        props.activeTab === props.id ?
        <div>
            {props.items}
        </div>
        : <></>
    );
}

export default Content;