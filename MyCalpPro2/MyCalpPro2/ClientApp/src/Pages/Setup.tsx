import React from "react";
import Nav from "../components/Nav";

export default function Setup() {
  return (
    <div className="">
      <Nav></Nav>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col">
          <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
            <div className="flex justify-center md:justify-end -mt-16">
              <img
                className="w-20 h-20 object-cover rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/826/826022.png"
              ></img>
            </div>
            <div>
              <h2 className="text-gray-800 text-3xl font-semibold py-4 text-purple-800">
                Guide to Using MyCaliPro
              </h2>
              <p className="mt-2 text-gray-600"></p>
            </div>
            <div className="flex justify-end mt-4"></div>
          </div>

          <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <div>
              <label className="text-gray-800 text-3xl font-semibold">
                Step 1
              </label>
              <p className="mt-2 text-gray-600">
                Navigate to Moodle or Beartracks and open your course calendar
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <a href="#" className="text-xl font-medium text-indigo-500"></a>
            </div>
          </div>

          <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <div>
              <label className="text-gray-800 text-3xl font-semibold">
                Step 2
              </label>
              <p className="mt-2 text-gray-600">
                Export Your Calendar and ensure Your selecting all events and
                custom range
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <a href="#" className="text-xl font-medium text-indigo-500"></a>
            </div>
          </div>

          <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <div>
              <label className="text-gray-800 text-3xl font-semibold">
                Step 3
              </label>
              <p className="mt-2 text-gray-600">
                Get Calendar URL from the export and copy it
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <a href="#" className="text-xl font-medium text-indigo-500"></a>
            </div>
          </div>

          <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <div>
              <label className="text-gray-800 text-3xl font-semibold">
                Step 4
              </label>
              <p className="mt-2 text-gray-600">
                Navigate to Google Calendar and add a new calender from URL and
                insert the URL from before
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <a
                href="https://calendar.google.com/"
                className="text-xl font-medium text-indigo-500"
              >
                Google Calendar
              </a>
            </div>
          </div>

          <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <div>
              <label className="text-gray-800 text-3xl font-semibold">
                Step 5
              </label>
              <p className="mt-2 text-gray-600">
                Change Calendar Name to "SchoolWork"
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <a href="#" className="text-xl font-medium text-indigo-500"></a>
            </div>
          </div>

          <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <div>
              <label className="text-gray-800 text-3xl font-semibold">
                Step 6
              </label>
              <p className="mt-2 text-gray-600">
                Navigate To Our Login Page and authorize access to your Google
                Calendar
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <a href="#" className="text-xl font-medium text-indigo-500"></a>
            </div>
          </div>

          <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-4">
            <div>
              <label className="text-gray-800 text-3xl font-semibold">
                Go Back!
              </label>
              <p className="mt-2 text-gray-600"></p>
            </div>
            <div className="flex justify-end mt-4">
              <a href="/" className="text-xl font-medium text-indigo-500">
                Back
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
