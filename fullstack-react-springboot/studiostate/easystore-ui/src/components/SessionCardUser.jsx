import React from "react";
import {
  extractLocalDate,
  extractLocalTime,
  calculateDuration,
} from "../utils/time";

export default function SessionCardUser({ session }) {
  return (
    <div className="w-72 rounded-md mx-auto border border-gray-300 shadow-md overflow-hidden flex flex-col bg-white hover:shadow-lg transition">
      <div className="relative h-48 p-4 flex flex-col font-primary">
        <h2 className="text-xl font-semibold text-primary mb-2">
          {extractLocalDate(session.serverStartTime, session.sesssionId)}
        </h2>
        <p className="text-base text-gray-600 mb-4">
          From: {extractLocalTime(session.serverStartTime)} To:{" "}
          {extractLocalTime(session.serverEndTime)}
        </p>
        <p className="text-base text-gray-600 mb-4">
          Duration:{" "}
          {calculateDuration(
            session.serverStartTime,
            session.serverEndTime,
            session.sessionId,
          )}
        </p>
        {session.passType ? (
          <p className="text-base text-gray-600 mb-4">
            Pass Type: {session.passType}
          </p>
        ) : (
          <p className="text-base text-gray-600 mb-4">Pass Type: No Pass</p>
        )}
      </div>
    </div>
  );
}
