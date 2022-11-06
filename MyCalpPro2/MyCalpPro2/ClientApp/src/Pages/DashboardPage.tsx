import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SideMenu from "../components/SideMenu";

//#region libs
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import useLocalStorageState from "use-local-storage-state";
//#endregion

//#region  Interfaces
interface IUserPlan {
  planName: string;
  allEvents: Array<IEvent>;
  isBookmarked: boolean;
}
interface IEvent {
  id: string;
  start: Date;
  end: Date;
  title: string;
}
//#endregion

export default function DashboardPage() {
  //#region date limiters
  var dateObjNow = new Date();
  var dateObjLim = new Date();
  dateObjLim = new Date(Date.now() + 6.048e8 * 2);
  //#endregion

  const [state, setState] = useState();

  const [userDataLS, setUserDataLS] = useLocalStorageState("schoolwork", {});

  useEffect(() => {
    console.log(userDataLS);
  }, []);

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
            events={[
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
            ]}
          />
        </div>
      </div>
    </div>
  );
}
