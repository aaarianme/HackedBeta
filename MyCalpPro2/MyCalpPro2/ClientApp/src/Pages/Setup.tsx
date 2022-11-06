import React from "react";
import Nav from "../components/Nav";

export default function Setup() {
  return (
    <div className="site">
      <Nav></Nav>

      <h1>Guide to Using MyCaliPro:</h1>
      <h4>Step 1:</h4>
      <p> Login to Moodle/Beartracks</p>
      <div>Navigate to your course calendar.</div>
      <div>
        Ensure you are selecting options for all events and custom range
      </div>
      <div>Export Your Calendar</div>
      <div>Recieve your Calendar URL</div>
      <div> Navigate to Google Calendar </div>

      <div>
        Add a calendar by URL and insert your Moodle/Beartracks URL into the
        provided area Rename that Calendar to specifically SchoolWork{" "}
      </div>
    </div>
  );
}
