import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function SideMenu() {
  const [userDataLS, setUserDataLS] = useLocalStorageState("schoolwork", {});
  const [userDataLSEvents, setUserDataLSEvents] = useLocalStorageState(
    "schoolevents",
    {}
  );

  return (
    <aside
      id="sidebar"
      className="z-20 h-full top-0 left-0 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
      aria-label="Sidebar"
    >
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 bg-white divide-y space-y-1">
            <ul className="space-y-2 pb-2">
              <li>
                <form action="#" method="GET" className="lg:hidden">
                  <label className="sr-only">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="email"
                      id="mobile-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5"
                      placeholder="Search"
                    />
                  </div>
                </form>
              </li>

              <li>
                <a
                  href="#"
                  target="_blank"
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                >
                  <svg
                    className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Main calendar
                  </span>
                  {
                    //@ts-ignore
                    userDataLSEvents.length < 20 ? (
                      <span
                        className="bg-gray-200 text-gray-800 ml-3 text-sm font-medium
                     inline-flex items-center justify-center px-2 rounded-full"
                      >
                        {
                          //@ts-ignore
                          userDataLSEvents.length
                        }
                      </span>
                    ) : (
                      <div>
                        <span
                          className="bg-red-400 text-gray-800 ml-3 text-sm font-medium
                     inline-flex items-center justify-center px-2 rounded-full text-white"
                        >
                          {
                            //@ts-ignore
                            userDataLSEvents.length + "!"
                          }
                        </span>
                      </div>
                    )
                  }
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                >
                  <svg
                    className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                  </svg>

                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Due Today
                  </span>
                  <span className="bg-gray-200 text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">
                    {
                       userDataLSEvents!=undefined &&
                       <div>                       
                         {
                          //@ts-ignore
                         userDataLSEvents.filter(x=>new Date(x.start).getUTCDate()==new Date().getUTCDate()).length
                         }
                       </div>
                    }
                  </span>
                </a>
              </li>
            </ul>
            <div className="space-y-2 pt-2"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
