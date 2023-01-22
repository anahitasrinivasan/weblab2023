import React, { useState, useEffect } from "react";

import "./Home.css";

const Home = (props) => {
    return (
        <>
            <div className="flex-container">
                <div className="flex-item">
                    <img src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" alt="happy plant!"></img>
                    <a href="https://www.flaticon.com/free-icons/nature" title="nature icons"
                    className="image-link u-link">
                        Nature icons created by Freepik - Flaticon
                    </a>
                </div>
                <div className="flex-item text">
                moody is designed to help you keep track of how you’re doing. it keeps your friends in the loop, too, so that you all can thrive together.
                </div>
            </div>
        </>
    );
};

export default Home;