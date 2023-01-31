// code for modal from https://www.w3schools.com/howto/howto_css_modals.asp

import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import "./Home.css";

const Home = (props) => {
    const openModal = () => {
        document.getElementById("loginModal").style.display = "block";
    }

    window.onclick = function(event) {
        if (event.target == document.getElementById("loginModal")) {
            document.getElementById("loginModal").style.display = "none";
        }
    }

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
                {props.userId ? (
                <div className="description-item">
                    <Link to={`/journal/${props.userId}`} className="home-link">
                        <div>
                            <div className="icon-holder">
                                <div className="laptop-solid icon"></div>
                            </div>
                            <p className="description-item-header">journal</p>
                            <p className="description-item-text">write down your thoughts, log your sleep and hydration, and choose your mood as often as you want.</p>
                        </div>
                    </Link>
                </div>
                ) : (
                    <div className="description-item" onClick={openModal}>
                        <div className="icon-holder">
                            <div className="laptop-solid icon"></div>
                        </div>
                        <p className="description-item-header">journal</p>
                        <p className="description-item-text">write down your thoughts, log your sleep and hydration, and choose your mood as often as you want.</p>
                        
                        <div id="loginModal" class="modal">
                            <div class="modal-content">
                                <p>please login to continue!</p>
                            </div>
                        </div>
                    </div>
                )}
                {props.userId ? (
                <Link to={`/profile/${props.userId}`} className="description-item">
                    <div>
                        <div className="icon-holder">
                            <div className="profile-solid icon"></div>
                        </div>
                        <p className="description-item-header">profile</p>
                        <p className="description-item-text">view your past entries and see graphs of your mood, sleep, and hydration over time.</p>
                    </div>
                </Link>
                ) : (
                    <div className="description-item" onClick={openModal}>
                        <div className="icon-holder">
                            <div className="profile-solid icon"></div>
                        </div>
                        <p className="description-item-header">profile</p>
                        <p className="description-item-text">view your past entries and see graphs of your mood, sleep, and hydration over time.</p>

                        <div id="loginModal" class="modal">
                            <div class="modal-content">
                                <p>please login to continue!</p>
                            </div>
                        </div>
                    </div>
                )}
                {props.userId ? (
                <Link to={`/friends/${props.userId}`} className="description-item">
                    <div>
                        <div className="icon-holder">
                            <div className="friends1-solid icon"></div>
                            <div className="friends2-solid icon"></div>
                        </div>
                        <p className="description-item-header">friends</p>
                        <p className="description-item-text">make friends and check up on their health.</p>
                    </div>
                </Link>
                ) : (
                    <div className="description-item" onClick={openModal}>
                        <div className="icon-holder">
                            <div className="friends1-solid icon"></div>
                            <div className="friends2-solid icon"></div>
                        </div>
                        <p className="description-item-header">friends</p>
                        <p className="description-item-text">make friends and check up on their health.</p>

                        <div id="loginModal" class="modal">
                            <div class="modal-content">
                                <p>please login to continue!</p>
                            </div>
                        </div>
                    </div>
                )}
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