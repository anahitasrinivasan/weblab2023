import React, { useState, useEffect } from "react";

import "./Home.css";

const Home = (props) => {
    return (
        <div className="flex-container">
            <div className="flex-item">
                <div className="img-div">
                <img src="https://images.unsplash.com/photo-1525923838299-2312b60f6d69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2322&q=80" alt="happy plant!"></img>
                </div>
                <a href="https://unsplash.com/photos/jt6QxZwSOCQ" title="nature icons"
                className="image-link u-link">
                    unsplash
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