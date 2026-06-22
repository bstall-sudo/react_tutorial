import React, { useState, useEffect, useMemo } from "react";
import PageTitle from "../PageTitle";
import apiClient from "../../api/apiClient";
import AdminCheckInOutTable from "./AdminCheckInOutTable";
import SearchUserBar from "../SearchUserBar";
import { useCart } from "../../store/cart-context";
import { endSession, startSession } from "../../utils/sessions";
import { formatDateTime, calculateDuration } from "../../utils/time";

export default function AdminCheckInOut() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openSessions, setOpenSessions] = useState([]);
  const [now, setNow] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addStudioTimeToCart } = useCart();

  async function getListOpenSessions(userId) {
    const res = await apiClient.get(`/sessions/open/user/${userId}`);
    return res.data;
  }

  async function loadOpenSessionsForUser(userId) {
    if (!userId) {
      setOpenSessions([]);
      return;
    }

    try {
      const data = await getListOpenSessions(userId);
      setOpenSessions(data);
    } catch (error) {
      console.error("Failed to load open sessions:", error);
      setOpenSessions([]);
    }
  }

  useEffect(() => {
    if (!selectedUser?.userId) {
      setOpenSessions([]);
      return;
    }

    loadOpenSessionsForUser(selectedUser.userId);
  }, [selectedUser]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const currentOpenSession = useMemo(() => {
    return openSessions.find((session) => session.open) ?? null;
  }, [openSessions]);

  const isCheckedIn = !!currentOpenSession;

  async function handleCheckButton() {
    if (!selectedUser?.userId || isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (currentOpenSession) {
        const data = await endSession(currentOpenSession.sessionId, new Date());

        addStudioTimeToCart(
          data.userName,
          data.checkInAt,
          data.checkOutAt,
          data.sessionId,
          data.allocations,
        );
      } else {
        await startSession(selectedUser.userId, selectedUser.userName);
      }

      await loadOpenSessionsForUser(selectedUser.userId);
    } catch (error) {
      console.error("Check in/out failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const liveDuration = currentOpenSession?.checkInAt
    ? calculateDuration(currentOpenSession.checkInAt, now.toISOString())
    : "-";

  return (
    <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary transition">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Check In and Out" />

        <SearchUserBar
          onUserSelect={(user) => {
            setSelectedUser(user);
            console.log("selected:", user);
          }}
          onClear={() => {
            setSelectedUser(null);
            setOpenSessions([]);
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <textarea
            readOnly
            rows={1}
            className="cursor-not-allowed px-2 py-2 text-base rounded-md transition focus:outline-none text-gray-600 dark:text-lighter bg-gray-100 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300 resize-none whitespace-pre-wrap break-words overflow-y-auto"
            value={selectedUser ? String(selectedUser.userName ?? "") : ""}
          />

          <textarea
            readOnly
            rows={1}
            className="cursor-not-allowed px-2 py-2 text-base rounded-md transition focus:outline-none text-gray-600 dark:text-lighter bg-gray-100 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300 resize-none whitespace-pre-wrap break-words overflow-y-auto"
            value={selectedUser ? String(selectedUser.userId ?? "") : ""}
          />

          <button
            className={[
              "h-12 text-white font-bold py-2 px-4 rounded disabled:opacity-50",
              isCheckedIn
                ? "bg-red-500 hover:bg-red-700"
                : "bg-purple-500 hover:bg-purple-700",
            ].join(" ")}
            onClick={handleCheckButton}
            disabled={!selectedUser || isSubmitting}
          >
            {isSubmitting
              ? "Please wait..."
              : isCheckedIn
                ? "Check Out"
                : "Check In"}
          </button>
        </div>

        <div className="mb-4">
          <textarea
            readOnly
            rows={2}
            className="cursor-not-allowed w-full px-2 py-2 text-base rounded-md transition focus:outline-none text-gray-600 dark:text-lighter bg-gray-100 dark:bg-darkbg placeholder-gray-400 dark:placeholder-gray-300 resize-none whitespace-pre-wrap break-words overflow-y-auto"
            value={selectedUser ? String(selectedUser.comments ?? "") : ""}
          />
        </div>

        {selectedUser && (
          <div className="mb-6 rounded-md border border-primary/20 dark:border-light/20 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
              <div>
                <span className="font-semibold text-primary dark:text-light">
                  Status:
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-200">
                  {isCheckedIn ? "Currently checked in" : "Not checked in"}
                </span>
              </div>

              <div>
                <span className="font-semibold text-primary dark:text-light">
                  Open session ID:
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-200">
                  {currentOpenSession?.sessionId ?? "-"}
                </span>
              </div>

              <div>
                <span className="font-semibold text-primary dark:text-light">
                  Check-In:
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-200">
                  {currentOpenSession?.checkInAt
                    ? formatDateTime(currentOpenSession.checkInAt)
                    : "-"}
                </span>
              </div>

              <div>
                <span className="font-semibold text-primary dark:text-light">
                  Live duration:
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-200">
                  {liveDuration}
                </span>
              </div>
            </div>
          </div>
        )}

        <AdminCheckInOutTable />
      </div>
    </div>
  );
}
