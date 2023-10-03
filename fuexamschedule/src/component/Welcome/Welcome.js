import React from "react";
import "./Welcome.css";

export default function Welcome() {
    return (
        <div className="welcome-conatiner">
            <div className="welcome-card">
                <div className="card-element">
                    <div className="welcome-line">
                        <h1 className="animate-charcter">Welcome</h1>
                        <h2>to <span className="animate-charcter">FU Exam Schedule</span></h2>
                    </div>
                    <div className="details-line">
                        <p>
                            To use this portal, you need to login with your Google account.
                        </p>
                        <p>Click on the login button on the top right corner to login.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
