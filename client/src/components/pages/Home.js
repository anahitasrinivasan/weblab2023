import React, { useState, useEffect } from "react";

import "./Home.css";

const Home = (props) => {
    return (
        <div className="flex-container">
            <div className="flex-item image-stack">
                <img src="https://cdn-icons-png.flaticon.com/512/616/616516.png" className="image-item-1" alt="cloud!"></img>
                <img src="https://cdn-icons-png.flaticon.com/512/616/616516.png" className="image-item-2" alt="cloud!"></img>
                <img src="https://cdn-icons-png.flaticon.com/512/616/616516.png" className="image-item-3" alt="cloud!"></img>
            </div>
            <div className="flex-item">
                <h1 className="text-header">welcome to moody.</h1>
            </div>
            <div className="flex-item inner-flex-container">
                <div className="description-item">
                    <p className="description-item-header">journal</p>
                    <p className="description-item-text">write down your thoughts, log your sleep and hydration, and choose your mood as often as you want.</p>
                </div>
                <div className="description-item">
                    <p className="description-item-header">profile</p>
                    <p className="description-item-text">view your past entries and see graphs of your mood, sleep, and hydration over time.</p>
                </div>
                <div className="description-item">
                    <p className="description-item-header">friends</p>
                    <p className="description-item-text">make friends and check up on their health.</p>
                </div>
            </div>
            <div className="flex-item">
                <a href="https://www.flaticon.com/free-icons/cloud" title="cloud icons"
                className="image-link u-link">
                    Cloud icons created by Freepik - Flaticon
                </a>
            </div>
        </div>
    );
};

export default Home;