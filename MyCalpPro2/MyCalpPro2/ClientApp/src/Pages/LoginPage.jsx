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
  const [userDataLSEvents, setUserDataLSEvents] = useLocalStorageState(
    "schoolevents",
    {}
  );

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
                  maxResults: 100,
                  showDeleted: false,
                  orderBy: "startTime",
                })
                .then((response) => {
                  const events = response.result;
                  console.log("EVENTS: ", events);
                  setUserDataLSEvents(events.items);
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
    <div className="flex flex-col justify-center">
      <div id="signInDiv"></div>

      <div className="flex items-center justify-center flex-col min-h-screen bg-slate-200">
        <div className="break-inside relative border-1 overflow-hidden flex flex-col justify-between space-y-3 text-sm rounded-xl max-w-[23rem] p-4 mb-4 bg-white text-black dark:bg-slate-800 dark:text-white">
          <div className="flex items-center justify-between font-medium">
            <span className="uppercase text-xs text-purple-500">Login</span>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <div className="flex flex-none items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="14 2 18 6 7 17 3 17 3 13 14 2" />
                <line x1="3" y1="22" x2="21" y2="22" />
              </svg>
            </div>
            <span className="text-base font-medium">
              Access to your google calendar is needed
            </span>
          </div>
          <div>
            Calipro will not access anything other than you Google Calendar
            data. Make sure you have renamed your calendar to ShcoolWork.
          </div>
          <div className="flex flex-row-reverse">
            <button className="flex items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">
              <label onClick={loadPopUp}>Give us access first</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h13M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div>
            <a href="/">
              {" "}
              <button
                className="flex items-center justify-right border-2 border-black-3 rounded-full px-4 py-1 space-x-1
      hover:bg-purple800 text-white100 dark:bg-slate-800 dark:text-white 
      dark:border-white"
              >
                Back To My Cali Pro
              </button>
            </a>
          </div>
        </div>
      </div>
      <PopUpTrigger manager={popUpManager} />
    </div>
  );
}
