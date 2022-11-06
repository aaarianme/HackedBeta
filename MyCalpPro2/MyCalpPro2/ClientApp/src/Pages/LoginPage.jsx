import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import usePopUpManager from "../Hooks/usePopUpManager";
import { PopUpTrigger, MessagePopup } from "../components/PopUps";
import { gapi } from "gapi-script";

export default function LoginPage() {
  /*
  var handleUserLogin = (resposne) => {
    setUserDataLS(resposne.credential);
  };*/
  const [userDataLS, setUserDataLS] = useLocalStorageState("schoolwork", {});
  const popUpManager = usePopUpManager();

  var CLIENT_ID =
    "945650051591-ir08qv0tbcjgpqhl6fiial4a7v4d0iks.apps.googleusercontent.com";
  var API_KEY = "AIzaSyC_O5ryow9RgQIle5FrCVg9b5c8ZHdUFj0";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar";
  useEffect(() => {
    console.log("im changed to", userDataLS);
  }, [userDataLS]);

  /*
  useEffect(() => {
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
  */
  var loadPopUp = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded");
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        plugin_name: "calAuth", // you may use any custom name here
      });
      gapi.client.load("calendar", "v3", () => console.log("Cal loaded"));
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          //#region a
          var request = gapi.client.calendar.calendarList
            .list()
            .then((response) => {
              const res = response.result.items;
              var schoolworkcal = res.filter(
                (x) =>
                  x.summaryOverride == "SchoolWork" || x.summary == "SchoolWork"
              )[0];

              if (schoolworkcal == null) {
                popUpManager.setPopUp(
                  <MessagePopup
                    onClose={popUpManager.removePopUp}
                    header="Failed! Google Calendar not in sync"
                    message={`Your Google Calendar account does not have a SchoolWork calendar. Please follow the setup process.`}
                    buttonText={`Okay`}
                  />
                );
                return;
              }
              console.log("Cals: ", schoolworkcal);
              setUserDataLS(schoolworkcal);
              //#endregion

              var id = schoolworkcal.id;
              console.log(id);
              var request = gapi.client.calendar.events
                .list({
                  calendarId: id,
                  singleEvents: true,
                  timeMin: new Date().toISOString(), //gathers only events not happened yet
                  maxResults: 10,
                  showDeleted: false,
                  orderBy: "startTime",
                })
                .then((response) => {
                  const events = response.result;
                  console.log("EVENTS: ", events);
                });
              request.execute(function (event) {
                console.log(event);
              });
            });
        });
      /*
          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event1,
          });*/
    });
  };

  return (
    <div>
      login
      <div id="signInDiv"></div>
      <button onClick={loadPopUp}>Give us access first</button>
      <PopUpTrigger manager={popUpManager} />
    </div>
  );
}
