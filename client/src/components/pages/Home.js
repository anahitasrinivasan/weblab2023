import React, { useState, useEffect } from "react";

import "./Home.css";

const Home = (props) => {
    return (
        <div className="flex-container">
            <div className="flex-item">
                <div className="img-div">
                    <img src="https://cdn-icons-png.flaticon.com/512/616/616516.png" alt="cloud!"></img>
                </div>
                <a href="https://www.flaticon.com/free-icons/cloud" title="cloud icons"
                className="image-link u-link">
                    Cloud icons created by Freepik - Flaticon
                </a>
            </div>
            <div className="flex-item">
                <div className="text-header">welcome to moody.</div>
                <div className="text">
                    <h3>to get started: </h3>
                    login and click on the <u>journal</u> tab to log an entry
                    <h3>to see your entries: </h3>
                    click on the <u>profile</u> tab
                    <h3>to make friends: </h3>
                    click on the <u>friends</u> tab to add others and view their content
                </div>
            </div>
        </div>
    );
};

export default Home;