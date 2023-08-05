import React from "react";
import { google } from "googleapis";

const eventData =  {
    "name": "ProjectEuler+",
    "url": "https://hackerrank.com/contests/projecteuler",
    "start_time": "2014-07-07T15:38:00.000Z",
    "end_time": "2024-07-30T18:30:00.000Z",
    "duration": "317616720.0",
    "site": "HackerRank",
    "in_24_hours": "No",
    "status": "CODING"
};

const Google = async () => {
  try {
    // Load the Google Calendar API
    const gapi = window.gapi;
    await gapi.load("client:auth2");

    // Set up the OAuth2.0 client with your credentials
    await gapi.client.init({
      apiKey: "AIzaSyB7Bfx_vfiVj2MTpThrIP04BFt6dBlZodk",
      clientId: "230439579935-5u3gdemap9uncs7oc8sd6qav98c8td8p.apps.googleusercontent.com",
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: "https://www.googleapis.com/auth/calendar.events",
    });

    // Check if the user is already signed in, if not, prompt for authorization
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      await gapi.auth2.getAuthInstance().signIn();
    }

    // Create the event in the user's Google Calendar
    await gapi.client.calendar.events.insert({
      calendarId: "primary", // Use "primary" for the user's primary calendar
      resource: eventData,
    });

    alert("Event added to Google Calendar!");
  } catch (error) {
    console.error("Error adding event to Google Calendar:", error);
  }
};

const AddToCalendarButton = () => {
  return (
    <button onClick={handleAddToGoogleCalendar}>
      Add to Google Calendar
    </button>
  );
};

export default Google;
