import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { formatDateTime, calculateDuration } from "../../utils/time";
import { endSession } from "../../utils/sessions";

export default function AdminCheckInOutTable() {
  const [openAndTodaySessions, setOpenAndTodaySessions] = useState([]);

  async function getListOpenSessionsAndSessionsToday() {
    const res = await apiClient.get("/sessions/today/or/open");
    return res.data;
  }

  useEffect(() => {
    async function loadOpenSessions() {
      try {
        const openTodaySessions = await getListOpenSessionsAndSessionsToday();
        setOpenAndTodaySessions(openTodaySessions);
        localStorage.setItem(
          "openOrTodaySessions",
          JSON.stringify(openTodaySessions),
        );
      } catch (error) {
        console.error("Failed to load open sessions:", error);
        setOpenAndTodaySessions([]);
      }
    }

    loadOpenSessions();
  }, []);

  return (
    <div className="min-h-80 max-w-5xl mx-auto my-8 w-full font-primary">
      <table className="w-full">
        <thead>
          <tr className="uppercase text-sm text-primary dark:text-light border-b border-primary dark:border-light">
            <th className="px-6 py-4">User ID</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Session ID</th>
            <th className="px-6 py-4">Check-In Time</th>
            <th className="px-6 py-4">Check-Out Time</th>
            <th className="px-6 py-4">Current Time</th>
            <th className="px-6 py-4">Total Time</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-primary dark:divide-light">
          {openAndTodaySessions.map((session) => (
            <tr
              key={session.sessionId}
              className="text-sm sm:text-base text-primary dark:text-light text-center"
            >
              <td className="px-4 sm:px-6 py-4">{session.userId}</td>
              <td className="px-4 sm:px-6 py-4">{session.userName}</td>

              <td className="px-4 sm:px-6 py-4">{session.sessionId}</td>

              <td className="px-4 sm:px-6 py-4">
                {formatDateTime(session.checkInAt)}
              </td>

              <td className="px-4 sm:px-6 py-4">
                {session.checkOutAt ? formatDateTime(session.checkOutAt) : "-"}
              </td>

              <td className="px-4 sm:px-6 py-4 text-base font-light">
                {session.open
                  ? calculateDuration(
                      session.checkInAt,
                      new Date().toISOString(),
                    )
                  : "-"}
              </td>

              <td className="px-4 sm:px-6 py-4">
                {session.open
                  ? "-"
                  : calculateDuration(session.checkInAt, session.checkOutAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
