import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function LoginPage() {
  var handleUserLogin = (resposne) => {
    setUserDataLS(resposne.credential);
  };
  const [userDataLS, setUserDataLS] = useLocalStorageState(
    "googleAuthToken",
    {}
  );

  var gapi = window.gapi;
  var CLIENT_ID =
    "945650051591-ir08qv0tbcjgpqhl6fiial4a7v4d0iks.apps.googleusercontent.com";
  var API_KEY = "";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id:
        "945650051591-ir08qv0tbcjgpqhl6fiial4a7v4d0iks.apps.googleusercontent.com",
      callback: handleUserLogin,
    });
    //@ts-ignore;
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  var loadPopUp = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded");
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      gapi.client.load("calendar", "v3", () => console.log("hi"));
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event1 = {
            summary: "Google I/O 2015",
            location: "800 Howard St., San Francisco, CA 94103",
            description:
              "A chance to hear more about Google's developer products.",
            start: {
              dateTime: "2022-11-05T09:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: "2022-11-06T17:00:00-11:00",
              timeZone: "America/Los_Angeles",
            },
          };
          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event1,
          });
          request.execute(function (event) {
            console.log(event);
          });
        });
    });
  };

  return (
    <div>
      login
      <div id="signInDiv"></div>
      <button onClick={loadPopUp}>Give us access first</button>
    </div>
  );
}
