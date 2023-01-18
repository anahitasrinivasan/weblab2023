import React from "react";
import { Link } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "770563466492-votd285cfb04ssp4vrgjgoch464n6qd5.apps.googleusercontent.com";

const NavBar = ({userId, handleLogin, handleLogout}) => {
    return (
    <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">moody</div>
        <div className="NavBar-linkContainer u-inlineBlock">
            <Link to="/" className="NavBar-link">home</Link>
            {userId && (
            <Link to={`/journal/${userId}`} className="NavBar-link">
                journal
            </Link>
            )}
            {userId && (
            <Link to={`/profile/${userId}`} className="NavBar-link">
                profile
            </Link>
            )}
            {userId && (
            <Link to={`/friends/${userId}`} className="NavBar-link">
                friends
            </Link>
            )}
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {userId ? (
                <button
                onClick={() => {
                    googleLogout();
                    handleLogout();
                }}
                >
                Logout
                </button>
            ) : (
                <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
            )}
            </GoogleOAuthProvider>
        </div>
    </nav>
    );
};

export default NavBar;