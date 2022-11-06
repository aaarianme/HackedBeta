import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function LoginPage() {
  var handleUserLogin = (resposne) => {
    setUserDataLS(resposne.credential);
    //hi
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

  gapi.load("client:auth2", () => {
    console.log("loaded");
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });
    gapi.client.load("calendar", "v3", () => console.log("hi"));
    gapi.auth2.getAuthInstance().signIn();
  });
  useEffect(() => {
    /* global google */
    //@ts-ignore;
    console.log(gapi);
    //@ts-ignore;
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

  return (
    <div>
      login
      <div id="signInDiv"></div>
    </div>
  );
}
