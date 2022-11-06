import React, { ReactElement, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
interface IPopUpTrigger {
  manager: any;
  state?: any;
}
/**
 * Put this component at the bottom of your page, set manager to a popUpManager returned by usePopUpManager
 * @param props must contain manager which is what the popUpmanagerHookReturns. In class manager, there is the following properties: isVisible:boolean popUp:ReactElement
 * @returns
 */
export function PopUpTrigger(props: IPopUpTrigger) {
  const [internalManager, setInternalManager] = useState(props.manager);
  const [updatedCount, setUpdatedCount] = useState(0);
  useEffect(() => {
    setUpdatedCount((preval) => preval + 1);
  }, [props.manager.popUp, props.manager.isVisible]);

  useEffect(() => {
    setInternalManager(props.manager);
  }, [props.manager]);

  return internalManager.isVisible === true ? (
    <>{ReactDOM.createPortal(internalManager.popUp, document.body)}</>
  ) : (
    <></>
  );
}

interface IYesCancelPopUp {
  header: string;
  message?: string | null;
  acceptFunction: Function;
  acceptButtonText?: string;
  declineFunction?: Function;
  declineButtonText?: string;
}

export function YesCancelPopUp(props: IYesCancelPopUp) {
  const [isVisible, setIsvisible] = useState(true);

  return isVisible ? (
    <div className="fixed z-10 inset-x-0 bottom-20 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white text-center px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
            <div className="text-center justify-center sm:flex">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {props.header}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{props.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 text-center px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => {
                props.acceptFunction();
                setIsvisible(false);
              }}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {props.acceptButtonText ?? "Yes"}
            </button>
            <button
              onClick={() => {
                if (props.declineFunction instanceof Function)
                  props.declineFunction();
                setIsvisible(false);
              }}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {props.declineButtonText ?? "No"}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

interface ILinkPopUp {
  header: string;
  message?: string | null;
  link: string;
  buttonText?: string | "Go";
  onClose?: Function;
}
export function LinkPopUp(props: ILinkPopUp) {
  const [isVisible, setIsvisible] = useState(true);

  return isVisible ? (
    <div className="fixed z-10 inset-x-0 bottom-20 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-center">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {props.header}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{props.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <a
              type="button"
              href={props.link}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {props.buttonText ?? "Go"}
            </a>
            <button
              onClick={() => {
                if (props.onClose instanceof Function) props.onClose();
                setIsvisible(false);
              }}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 white text-base font-medium text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

interface IMessagePopUp {
  header: string | null;
  message?: string | null;
  buttonText?: string | "Okay";
  onClose?: Function;
}
export function MessagePopup(props: IMessagePopUp) {
  const [isVisible, setIsvisible] = useState(true);

  return isVisible ? (
    <div
      className="fixed z-10 inset-x-0 bottom-20 overflow-y-auto"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 pb-40">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-800"
                  id="modal-title"
                >
                  {props.header}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{props.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => {
                if (props.onClose instanceof Function) props.onClose();
                setIsvisible(false);
              }}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {props.buttonText ?? "Okay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
