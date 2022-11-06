import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SideMenu from "../components/SideMenu";
import usePopUpManager from "../Hooks/usePopUpManager";
import { PopUpTrigger, MessagePopup } from "../components/PopUps";
//#region libs
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import useLocalStorageState from "use-local-storage-state";
//#endregion

export default function DashboardPage() {
  const popUpManager = usePopUpManager();

  //#region date limiters
  var dateObjNow = new Date();
  var dateObjLim = new Date();
  dateObjLim = new Date(Date.now() + 6.048e8 * 2);
  //#endregion

  const [state, setState] = useState();
  const [daysEvent, setDaysEvent] = useState();

  const [userDataLS, setUserDataLS] = useLocalStorageState("schoolwork", {});
  const [userDataLSEvents, setUserDataLSEvents] = useLocalStorageState(
    "schoolevents",
    {}
  );
  useEffect(() => {
    console.log(userDataLSEvents);
    generateArrayOfEvents();
  }, []);

  function getEventsByDays() {
    let arrEventDays = [];
    state.map((x) => {
      var s = x.start;
      var date = new Date(s);
      if (arrEventDays.indexOf(date.getUTCDate()) == -1)
        arrEventDays.push(date.getUTCDate());
    });
    var res = [];
    arrEventDays.forEach((d) => {
      //console.log("picking day ", d);
      var eventsInADay = state.filter((x) => {
        return d == new Date(x.start).getUTCDate();
      });
      //console.log(eventsInADay);
      res.push({ day: d, events: eventsInADay });
      //console.log("---------------");
    });
    setDaysEvent(res);
    return res;
  }
  function splitHandler(duration) {
    switch (duration) {
      case "10":
        return [3, 4, 3];
      case "9":
        return [3, 3, 3];
      case "8":
        return [3, 2, 3];
      case "7":
        return [2, 2, 3];
      case "6":
        return [2, 2, 2];
      case "5":
        return [2, 3];
      case "4":
        return [2, 2];
      case "3":
        return [1, 2];
      case "2":
        return [2];
      case "1":
        return [1];
    }
  }

  function makeStudyEvent(arr) {}

  var generateArrayOfEvents = () => {
    var arr = [];
    userDataLSEvents.forEach((x) => {
      var eventObj = {};
      eventObj.id = x.id;
      eventObj.title = x.summary;
      eventObj.start = x.start.dateTime;
      eventObj.end = x.end.dateTime;
      arr.push(eventObj);
    });
    setState(arr);
    //console.log("arr is", arr);
  };

  var handlePopUpForEvent = (ee) => {
    let publicID = ee.event._def.publicId;
    console.log(publicID);
    const limStart = 5;

    let duration = window.prompt("Enter Duration for Event: ", "10");
    if (duration > 10) {
      return;
    }
    var res = getEventsByDays();
    var selectedEvent = state.filter((x) => x.id == publicID)[0];
    var todayDate = new Date();
    var startFromDate = new Date();
    startFromDate.setHours(limStart);
    console.log("starting on", startFromDate);

    if (
      new Date(selectedEvent.start).getDay() === todayDate.getDay() + 1 ||
      new Date(selectedEvent.start).getDay() === todayDate.getDay()
    ) {
      window.alert(
        "Any work for this assignment should be done immediatley to esnure the rest of your schedule is finished."
      );
      return;
    }

    var periods = splitHandler(duration);
    console.log(periods);
    for (var i = 0; i < periods.length; i++) {
      console.log("res is", res);
      var yourDayEvents = res.filter(
        (x) => x.day === startFromDate.getUTCDate()
      );
      var doesFallWithin = false;
      yourDayEvents.sort((x) => x.start);

      yourDayEvents.forEach((w) => {
        var check = startFromDate;
        var to = w.end;
        var from = w.start;

        if (
          check.getTime() <= to.getTime() &&
          check.getTime() >= from.getTime()
        )
          if (to == null) {
            startFromDate = from;
          } else {
            startFromDate = to;
          }
      });
      var event = {
        id: "calipro",
        title: "study time",
        start: startFromDate,
        end: new Date(startFromDate.getTime() + periods[i] * 60 * 60 * 1000),
      };
      startFromDate = new Date(
        startFromDate.getTime() + periods[i] * 60 * 60 * 1000
      );
      startFromDate = startFromDate.setDate(startFromDate.getDate() + 1);
    }
  };

  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex flex-row">
        <SideMenu />
        <div className="px-40 pt-12 w-100">
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            validRange={{
              start: dateObjNow.toISOString().split("T")[0],
              end: dateObjLim.toISOString().split("T")[0],
            }}
            weekNumbers={true}
            nowIndicator={true}
            height={1400}
            events={state}
            eventClick={handlePopUpForEvent}
          />
        </div>
      </div>
      <PopUpTrigger manager={popUpManager} />
    </div>
  );
}
/**[
              {
                id: "1",
                title: "event1",
                start: "2022-11-12 10:30:00",
              },
              {
                title: "event2",
                start: "2022-11-12 10:30:00",
                end: "2022-11-14 10:30:00",
              },
            ] */
