import React, { useEffect, useRef, useState } from "react";
import apiClient from "../api/apiClient";
import {
  formatDate,
  formatTime,
  checkLocalStorageTimeVariable,
  checkLocalStorageTimeDateVariable,
  checkLocalStorageToggleState,
  checkLocalStorageSessionData,
} from "../utils/time";
import UserNameMock from "./UserNameMock";
import SessionHistoryUser from "./SessionHistoryUser";

export default function CheckInOut() {
  const [timeDateVariable, setTimeDateVariable] = useState(
    checkLocalStorageTimeDateVariable() || "not set yet",
  );
  const [timeVariable, setTimeVariable] = useState(
    checkLocalStorageTimeVariable() || "00:00:00",
  );
  const [toggleState, setToggleState] = useState(
    checkLocalStorageToggleState(),
  );

  const startRef = useRef(null);
  const [user, setUser] = useState({ name: "", userId: "" });

  function handleClick() {
    setToggleState((prev) => (prev === 0 ? 1 : 0));
  }

  useEffect(() => {
    localStorage.setItem("toggleState", JSON.stringify(toggleState));
  }, [toggleState]);

  useEffect(() => {
    const sessionDataObject = checkLocalStorageSessionData();
    //  toggleState === 1 && open === 0 -> neue Session starten, weil es noch keine offene gibt
    if (toggleState === 1 && sessionDataObject.open === 0) {
      const start = new Date();
      localStorage.setItem("clientStartTime", JSON.stringify(start));
      setTimeDateVariable(formatDate(start));
      startSession(start);
      const id = setInterval(() => {
        const clientStartTime = JSON.parse(
          localStorage.getItem("clientStartTime"),
        );

        if (!clientStartTime) return;
        setTimeVariable(
          formatTime(new Date().getTime() - Date.parse(clientStartTime)),
        );
      }, 1000);

      return () => clearInterval(id);
    }
    //  toggleState === 1 && open === 1 -> alte Session weiter führen, denn es gibt schon eine
    if (toggleState === 1 && sessionDataObject.open === 1) {
      const id = setInterval(() => {
        const clientStartTime = JSON.parse(
          localStorage.getItem("clientStartTime"),
        );

        if (!clientStartTime) return;
        setTimeVariable(
          formatTime(new Date().getTime() - Date.parse(clientStartTime)),
        );
      }, 1000);

      return () => clearInterval(id);
    }
    if (toggleState === 0) {
      // only end if there is an open session
      if (sessionDataObject.open === 1 && sessionDataObject.session_id) {
        endSession(Number(sessionDataObject.session_id), new Date());
      }

      localStorage.setItem("clientStartTime", JSON.stringify(0));
      localStorage.setItem(
        "sessionData",
        JSON.stringify({ session_id: 0, server_start_time: 0, open: 0 }),
      );

      setTimeVariable("00:00:00");
      setTimeDateVariable("not set yet");
    }
  }, [toggleState]);

  const isCheckedIn = toggleState === 1;

  async function endSession(sessionId, clientEndTime) {
    await apiClient.put(`/sessions/${sessionId}`, {
      clientEndTime: clientEndTime.toISOString(),
    });
  }

  async function startSession(clientStart) {
    const res = await apiClient.post("/sessions", {
      passId: 12039843,
      userName: user.name,
      userId: user.userId,
      clientStartTime: clientStart.toISOString(),
      open: 1,
    });

    const sessionData = {
      session_id: res.data.sessionId,
      server_start_time: res.data.serverStartTime,
      open: 1,
    };

    localStorage.setItem("sessionData", JSON.stringify(sessionData));
    console.log(
      "new session started:  -> sessionData:",
      JSON.parse(localStorage.getItem("sessionData")),
    );
  }

  function handleUserSubmit({ name, userId }) {
    setUser({ name, userId });

    console.log("From child:", name, userId);
    // you can store it in state, send to API, etc.
  }

  return (
    <div className="max-w-[1152px] mx-auto">
      <div>
        <UserNameMock onSubmitUser={handleUserSubmit} />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
        <div className="h-fit w-1/4 mb-4 h-12 bg-purple-500 text-white font-bold py-2 px-4 rounded">
          <p>Start Time: {timeDateVariable}</p>
        </div>

        <button
          className={[
            "h-fit w-1/4 mb-4 h-12 text-white font-bold py-2 px-4 rounded",
            isCheckedIn
              ? "bg-red-500 hover:bg-red-700"
              : "bg-purple-500 hover:bg-purple-700",
          ].join(" ")}
          onClick={handleClick}
        >
          {isCheckedIn ? "Check Out" : "Check In"}
        </button>

        <div className="h-fit w-1/4 mb-4 h-12 bg-purple-500 text-white font-bold py-2 px-4 rounded">
          {timeVariable}
        </div>
      </div>
      {user?.userId ? (
        <SessionHistoryUser userId={user.userId} />
      ) : (
        <div>Loading sessions…</div>
      )}
    </div>
  );
}
